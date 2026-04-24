package com.tracker.backend.controller;

import com.tracker.backend.model.User;
import com.tracker.backend.payload.request.RoutinePlanItemRequest;
import com.tracker.backend.payload.response.MessageResponse;
import com.tracker.backend.repository.UserRepository;
import com.tracker.backend.security.UserDetailsImpl;
import com.tracker.backend.service.RoutinePlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/routine")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RoutinePlanController {

    @Autowired
    private RoutinePlanService routinePlanService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/plan")
    public ResponseEntity<?> getPlan() {
        User user = getCurrentUser();
        return ResponseEntity.ok(routinePlanService.getActivePlanItems(user));
    }

    @PostMapping("/plan")
    public ResponseEntity<?> addPlanItem(@Valid @RequestBody RoutinePlanItemRequest request) {
        User user = getCurrentUser();
        return ResponseEntity.ok(routinePlanService.addPlanItem(user, request.getCategoryId(), request.getActivityName()));
    }

    @DeleteMapping("/plan/{id}")
    public ResponseEntity<?> removePlanItem(@PathVariable Long id) {
        User user = getCurrentUser();
        try {
            routinePlanService.deactivatePlanItem(user, id);
            return ResponseEntity.ok(new MessageResponse("Plan item removed."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/consistency")
    public ResponseEntity<?> getConsistency(@RequestParam(defaultValue = "14") int days) {
        User user = getCurrentUser();
        return ResponseEntity.ok(routinePlanService.getConsistency(user, days));
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkPlanItem(@RequestBody Map<String, Long> body) {
        User user = getCurrentUser();
        Long planItemId = body.get("planItemId");
        if (planItemId == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("planItemId is required"));
        }
        try {
            routinePlanService.checkPlanItem(user, planItemId);
            return ResponseEntity.ok(new MessageResponse("Activity logged from routine!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId()).orElse(null);
    }
}
