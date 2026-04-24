package com.tracker.backend.repository;

import com.tracker.backend.model.RoutinePlanItem;
import com.tracker.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoutinePlanItemRepository extends JpaRepository<RoutinePlanItem, Long> {
    List<RoutinePlanItem> findByUserAndIsActiveTrue(User user);
}
