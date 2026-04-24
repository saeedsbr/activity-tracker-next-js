package com.tracker.backend.config;

import com.tracker.backend.model.Category;
import com.tracker.backend.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner init(CategoryRepository categoryRepository) {
        return args -> {
            String[] defaultCategories = {
                    "Academics", "Business", "Health",
                    "Religion", "Finance", "Social", "Creativity", "Personal Development"
            };
            for (String name : defaultCategories) {
                if (!categoryRepository.existsByName(name)) {
                    categoryRepository.save(new Category(null, name));
                }
            }
        };
    }
}
