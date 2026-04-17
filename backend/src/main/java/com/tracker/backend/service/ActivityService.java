package com.tracker.backend.service;

import com.tracker.backend.model.*;
import com.tracker.backend.repository.*;
import com.tracker.backend.payload.response.ActivitySummaryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ActivityService {
    @Autowired
    ActivityLogRepository activityLogRepository;
    @Autowired
    CategoryRepository categoryRepository;

    public ActivitySummaryResponse getUserSummary(User user) {
        List<Category> categories = categoryRepository.findAll();
        List<ActivitySummaryResponse.CategoryStreak> streaks = new ArrayList<>();
        List<String> warnings = new ArrayList<>();

        for (Category cat : categories) {
            List<ActivityLog> logs = activityLogRepository.findByUserAndCategoryOrderByLogDateDesc(user, cat);
            int streakCount = calculateStreak(logs);
            String lastActivity = logs.isEmpty() ? null : logs.get(0).getLogDate().toString();
            streaks.add(new ActivitySummaryResponse.CategoryStreak(cat.getName(), streakCount, lastActivity));

            // Two-Day Rule Warning
            if (isTwoDayRuleRisk(logs)) {
                warnings.add("Warning: You haven't logged " + cat.getName()
                        + " activity today. Don't break the two-day rule!");
            }
        }

        List<ActivityLog> allLogs = activityLogRepository.findByUserOrderByLogDateDesc(user);
        Map<LocalDate, Long> heatmapMap = allLogs.stream()
                .collect(Collectors.groupingBy(ActivityLog::getLogDate, Collectors.counting()));

        List<ActivitySummaryResponse.HeatmapData> heatmap = heatmapMap.entrySet().stream()
                .map(e -> new ActivitySummaryResponse.HeatmapData(e.getKey().toString(), e.getValue().intValue()))
                .collect(Collectors.toList());

        return ActivitySummaryResponse.builder()
                .streaks(streaks)
                .heatmap(heatmap)
                .warnings(warnings)
                .build();
    }

    private int calculateStreak(List<ActivityLog> logs) {
        if (logs.isEmpty())
            return 0;

        LocalDate today = LocalDate.now();
        LocalDate expectedDate = logs.get(0).getLogDate();

        // If last activity was before yesterday, streak is broken
        if (expectedDate.isBefore(today.minusDays(1)))
            return 0;

        int streak = 0;
        LocalDate current = expectedDate;
        Set<LocalDate> dates = logs.stream().map(ActivityLog::getLogDate).collect(Collectors.toSet());

        while (dates.contains(current)) {
            streak++;
            current = current.minusDays(1);
        }
        return streak;
    }

    private boolean isTwoDayRuleRisk(List<ActivityLog> logs) {
        LocalDate today = LocalDate.now();
        if (logs.isEmpty())
            return false;

        LocalDate lastLog = logs.get(0).getLogDate();
        boolean loggedToday = lastLog.equals(today);
        boolean loggedYesterday = lastLog.equals(today.minusDays(1));

        // Risk if not logged today AND last log was yesterday (must log today to avoid
        // 2-day gap tomorrow)
        // Actually, the 2-day rule means "never miss twice".
        // If I missed yesterday, I MUST log today.
        return !loggedToday && !loggedYesterday;
    }
}
