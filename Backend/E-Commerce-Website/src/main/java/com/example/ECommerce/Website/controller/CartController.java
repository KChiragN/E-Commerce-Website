package com.example.ECommerce.Website.controller;
import com.example.ECommerce.Website.entity.Cart;
import com.example.ECommerce.Website.entity.Product;
import com.example.ECommerce.Website.entity.User;
import com.example.ECommerce.Website.repository.CartRepository;
import com.example.ECommerce.Website.repository.ProductRepository;
import com.example.ECommerce.Website.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCartItems() {
        List<Cart> cartItems = cartRepository.findAll();
        return ResponseEntity.ok(cartItems);
    }
    @PostMapping
    public ResponseEntity<Cart> addCartItem(@RequestBody Cart cartItem) {
        try {

            if (cartItem.getProduct() == null || cartItem.getUser() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }


            User user = userRepository.findById(cartItem.getUser().getUserId()).orElse(null);


            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }


            cartItem.setUser(user);


            Product product = productRepository.findById(cartItem.getProduct().getProductId()).orElse(null);

            if (product == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }


            cartItem.setProduct(product);
            Cart savedCartItem = cartRepository.save(cartItem);


            System.out.println("Saved Cart item: " + savedCartItem);


            return ResponseEntity.status(HttpStatus.CREATED).body(savedCartItem);
        } catch (Exception e) {

            System.err.println("Error adding cart item: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @PatchMapping("/{id}")
    public ResponseEntity<Cart> partiallyUpdateCartItem(@PathVariable Long id, @RequestBody Cart partialCartItem) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            Cart existingCartItem = cartOptional.get();
            if (partialCartItem.getProduct() != null) {
                existingCartItem.setProduct(partialCartItem.getProduct());
            }
            if (partialCartItem.getQuantity() != null) {
                existingCartItem.setQuantity(partialCartItem.getQuantity());
            }
            return ResponseEntity.ok(cartRepository.save(existingCartItem));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            cartRepository.deleteById(id);
            System.out.println("Item with ID " + id + " deleted successfully");
            return ResponseEntity.noContent().build();
        } else {
            System.out.println("Item with ID " + id + " not found");
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<Cart>> getCartItemsByUserId(@PathVariable Integer userId) {
        try {
            // Fetch the user from the database based on the user ID
            Optional<User> userOptional = userRepository.findById(userId);

            // If the user is not found, return a 404 Not Found response
            if (!userOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            // Fetch cart items associated with the user
            List<Cart> cartItems = cartRepository.findByUser(userOptional.get());

            // Return the cart items in the response
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            // Log any exceptions that occur during the process
            System.err.println("Error fetching cart items by user ID: " + e.getMessage());
            e.printStackTrace();
            // Return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}



