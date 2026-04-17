package com.tracker.backend.repository;

import com.tracker.backend.model.ActivityLog;
import com.tracker.backend.model.User;
import com.tracker.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUserOrderByLogDateDesc(User user);

    List<ActivityLog> findByUserAndCategoryOrderByLogDateDesc(User user, Category category);

    boolean existsByUserAndCategoryAndLogDate(User user, Category category, LocalDate logDate);
}
