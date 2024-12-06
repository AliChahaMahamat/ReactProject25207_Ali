package auca.ac.rw.BankingSystem.controller;

import auca.ac.rw.BankingSystem.dto.LoginRequest;
import auca.ac.rw.BankingSystem.model.Role;
import auca.ac.rw.BankingSystem.model.User;
import auca.ac.rw.BankingSystem.repository.UserRepository;
import auca.ac.rw.BankingSystem.service.UserService;
import auca.ac.rw.BankingSystem.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;


    // Inject UserRepository
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    // Sign-up endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        try {
            logger.info("Received sign-up request for username: {}", user.getUsername());

            // Encrypt password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Assign default role
            user.setRoles(Collections.singleton(Role.ROLE_USER));

            User savedUser = userService.saveUser(user);
            logger.info("User successfully signed up: {}", savedUser.getUsername());

            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            logger.error("Error during sign-up: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during sign-up: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during sign-up.");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtil.generateToken(loginRequest.getUsername());
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            return ResponseEntity.ok(Map.of(
                    "token", jwt,
                    "role", role,
                    "username", loginRequest.getUsername()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "error", "Invalid username or password"
            ));
        }
    }

    // Fetch all users (Admin only)
    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        logger.info("Fetching all users");
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/user-dashboard")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        Map<String, String> response = new HashMap<>();
        response.put("username", userDetails.getUsername());
        response.put("role", userDetails.getAuthorities().iterator().next().toString());
        return ResponseEntity.ok(response);
    }

    //Add users
    @PostMapping("/addUser")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
            logger.info("Received add user request for username: {}", user.getUsername());

            // Encrypt password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Assign default role
            user.setRoles(Collections.singleton(Role.ROLE_USER));

            User savedUser = userService.saveUser(user);
            logger.info("User successfully added: {}", savedUser.getUsername());

            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            logger.error("Error during add user: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during add user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the user.");
        }
    }

    //edit user
    @PutMapping("/editUser/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> editUser(@PathVariable Long id, @RequestBody User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));

        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setFullName(user.getFullName());
        existingUser.setDob(user.getDob());
        existingUser.setIdType(user.getIdType());
        existingUser.setIdNumber(user.getIdNumber());
        existingUser.setPhoneNumber(user.getPhoneNumber());

        // Only update the password if it's non-empty
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        userRepository.save(existingUser);

        return ResponseEntity.ok(existingUser);
    }



    // Handle delete user request
    @PostMapping("/api/users/{id}/delete")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);  // Use instance
        return "redirect:/admin";
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, null);
        return ResponseEntity.ok("Logged out successfully");
    }


}

