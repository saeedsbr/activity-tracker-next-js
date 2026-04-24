package com.tracker.backend.payload.response;

import lombok.*;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoutineConsistencyResponse {
    private List<PlanItemConsistency> items;
    private int totalDays;
    private String startDate;
    private String endDate;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlanItemConsistency {
        private Long planItemId;
        private String activityName;
        private String categoryName;
        private int completedDays;
        private int totalDays;
        private double completionRate;
        private Map<String, Boolean> dailyStatus;
    }
}
