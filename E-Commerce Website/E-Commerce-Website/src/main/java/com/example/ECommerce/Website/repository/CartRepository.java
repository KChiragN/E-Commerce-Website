package com.example.ECommerce.Website.repository;

import com.example.ECommerce.Website.entity.Cart;
import com.example.ECommerce.Website.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
}
