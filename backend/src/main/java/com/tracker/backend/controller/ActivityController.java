package com.tracker.backend.controller;

import com.tracker.backend.model.*;
import com.tracker.backend.payload.request.ActivityLogRequest;
import com.tracker.backend.payload.response.MessageResponse;
import com.tracker.backend.repository.*;
import com.tracker.backend.security.UserDetailsImpl;
import com.tracker.backend.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ActivityController {
    @Autowired
    ActivityService activityService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ActivityLogRepository activityLogRepository;

    @GetMapping("/summary")
    public ResponseEntity<?> getSummary() {
        User user = getCurrentUser();
        return ResponseEntity.ok(activityService.getUserSummary(user));
    }

    @GetMapping
    public ResponseEntity<?> getActivities() {
        User user = getCurrentUser();
        return ResponseEntity.ok(activityLogRepository.findByUserOrderByLogDateDesc(user));
    }

    @PostMapping("/log")
    public ResponseEntity<?> logActivity(@Valid @RequestBody ActivityLogRequest request) {
        User user = getCurrentUser();
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Error: Category not found."));

        if (activityLogRepository.existsByUserAndCategoryAndLogDate(user, category, LocalDate.now())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Activity already logged for this category today."));
        }

        ActivityLog log = ActivityLog.builder()
                .user(user)
                .category(category)
                .activityName(request.getActivityName())
                .logDate(LocalDate.now())
                .build();

        activityLogRepository.save(log);
        return ResponseEntity.ok(new MessageResponse("Activity logged successfully!"));
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId()).orElse(null);
    }
}
