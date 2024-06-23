package com.example.ECommerce.Website.repository;

import com.example.ECommerce.Website.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    boolean existsById(Integer id);

    void deleteById(Integer orderId);

    Optional<Orders> findById(Integer id);

    List<Orders> findAll();
}
