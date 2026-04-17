package com.tracker.backend.payload.response;

import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivitySummaryResponse {
    private List<CategoryStreak> streaks;
    private List<HeatmapData> heatmap;
    private List<String> warnings;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategoryStreak {
        private String category;
        private int count;
        private String lastActivity;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HeatmapData {
        private String date;
        private int count;
    }
}
