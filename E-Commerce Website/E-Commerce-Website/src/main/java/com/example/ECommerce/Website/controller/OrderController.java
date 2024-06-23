package com.example.ECommerce.Website.controller;

import com.example.ECommerce.Website.entity.Orders;
import com.example.ECommerce.Website.entity.User;
import com.example.ECommerce.Website.repository.OrdersRepository;
import com.example.ECommerce.Website.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private UserRepository userRepository;

    // GET all orders
    @GetMapping
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> orders = ordersRepository.findAll();
        return ResponseEntity.ok().body(orders);
    }

    // GET a specific order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable("id") Integer id) {
        Optional<Orders> orderOptional = ordersRepository.findById(id);
        if (orderOptional.isPresent()) {
            return ResponseEntity.ok().body(orderOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST a new order
    @PostMapping
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
        User user = userRepository.findById(order.getUser_id().getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(null); // User not found, return bad request
        }

        // Set the user on the order
        order.setUser_id(user);
        Orders createdOrder = ordersRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    // PUT (update) an existing order
    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable("id") Integer id, @RequestBody Orders order) {
        if (ordersRepository.existsById(id)) {
            order.setOrderId(id); // Set the ID explicitly
            Orders updatedOrder = ordersRepository.save(order);
            return ResponseEntity.ok().body(updatedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE an order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") Integer id) {
        if (ordersRepository.existsById(id)) {
            ordersRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
