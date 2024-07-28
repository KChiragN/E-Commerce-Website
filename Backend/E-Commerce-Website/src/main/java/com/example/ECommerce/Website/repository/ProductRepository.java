package com.example.ECommerce.Website.repository;
import com.example.ECommerce.Website.entity.Category;
import com.example.ECommerce.Website.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByNameContainingIgnoreCase(String query);

    List<Product> findByCategory(Category category);
}
