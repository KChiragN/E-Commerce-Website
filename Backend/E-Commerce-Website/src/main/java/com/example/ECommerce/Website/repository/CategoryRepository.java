package com.example.ECommerce.Website.repository;

import com.example.ECommerce.Website.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
