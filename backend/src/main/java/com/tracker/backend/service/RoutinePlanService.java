package com.tracker.backend.service;

import com.tracker.backend.model.*;
import com.tracker.backend.payload.response.RoutineConsistencyResponse;
import com.tracker.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoutinePlanService {

    @Autowired
    private RoutinePlanItemRepository planItemRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<RoutinePlanItem> getActivePlanItems(User user) {
        return planItemRepository.findByUserAndIsActiveTrue(user);
    }

    public RoutinePlanItem addPlanItem(User user, Long categoryId, String activityName) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        RoutinePlanItem item = RoutinePlanItem.builder()
                .user(user)
                .category(category)
                .activityName(activityName)
                .isActive(true)
                .build();

        return planItemRepository.save(item);
    }

    public void deactivatePlanItem(User user, Long planItemId) {
        RoutinePlanItem item = planItemRepository.findById(planItemId)
                .orElseThrow(() -> new RuntimeException("Plan item not found"));

        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        item.setActive(false);
        planItemRepository.save(item);
    }

    public RoutineConsistencyResponse getConsistency(User user, int days) {
        List<RoutinePlanItem> planItems = planItemRepository.findByUserAndIsActiveTrue(user);
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days - 1);

        List<RoutineConsistencyResponse.PlanItemConsistency> consistencyItems = new ArrayList<>();

        for (RoutinePlanItem planItem : planItems) {
            // Only count days from when the plan item was created
            LocalDate effectiveStart = planItem.getCreatedAt() != null
                    ? planItem.getCreatedAt().toLocalDate()
                    : startDate;
            if (effectiveStart.isBefore(startDate)) {
                effectiveStart = startDate;
            }

            // Find all matching activity logs in the date range
            List<ActivityLog> logs = activityLogRepository
                    .findByUserAndCategoryAndActivityNameAndLogDateBetween(
                            user, planItem.getCategory(), planItem.getActivityName(),
                            effectiveStart, endDate);

            Set<LocalDate> loggedDates = logs.stream()
                    .map(ActivityLog::getLogDate)
                    .collect(Collectors.toSet());

            // Build daily status map
            Map<String, Boolean> dailyStatus = new LinkedHashMap<>();
            int completedDays = 0;
            int totalDaysForItem = 0;

            for (LocalDate date = effectiveStart; !date.isAfter(endDate); date = date.plusDays(1)) {
                boolean completed = loggedDates.contains(date);
                dailyStatus.put(date.toString(), completed);
                if (completed) completedDays++;
                totalDaysForItem++;
            }

            double completionRate = totalDaysForItem > 0
                    ? (double) completedDays / totalDaysForItem
                    : 0.0;

            consistencyItems.add(RoutineConsistencyResponse.PlanItemConsistency.builder()
                    .planItemId(planItem.getId())
                    .activityName(planItem.getActivityName())
                    .categoryName(planItem.getCategory().getName())
                    .completedDays(completedDays)
                    .totalDays(totalDaysForItem)
                    .completionRate(Math.round(completionRate * 100.0) / 100.0)
                    .dailyStatus(dailyStatus)
                    .build());
        }

        return RoutineConsistencyResponse.builder()
                .items(consistencyItems)
                .totalDays(days)
                .startDate(startDate.toString())
                .endDate(endDate.toString())
                .build();
    }

    public void checkPlanItem(User user, Long planItemId) {
        RoutinePlanItem item = planItemRepository.findById(planItemId)
                .orElseThrow(() -> new RuntimeException("Plan item not found"));

        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        // Check if already logged today
        if (activityLogRepository.existsByUserAndActivityNameAndLogDate(
                user, item.getActivityName(), LocalDate.now())) {
            throw new RuntimeException("Already logged for today");
        }

        ActivityLog log = ActivityLog.builder()
                .user(user)
                .category(item.getCategory())
                .activityName(item.getActivityName())
                .logDate(LocalDate.now())
                .build();

        activityLogRepository.save(log);
    }
}
