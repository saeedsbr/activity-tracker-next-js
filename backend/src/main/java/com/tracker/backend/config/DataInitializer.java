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
            if (categoryRepository.count() == 0) {
                categoryRepository.save(new Category(null, "Academics"));
                categoryRepository.save(new Category(null, "Business"));
                categoryRepository.save(new Category(null, "Health"));
            }
        };
    }
}
