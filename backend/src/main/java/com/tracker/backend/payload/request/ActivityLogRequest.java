package com.tracker.backend.payload.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ActivityLogRequest {
    @NotNull
    private Long categoryId;
    @NotBlank
    private String activityName;
}
