package auca.ac.rw.BankingSystem.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import auca.ac.rw.BankingSystem.model.User;
import auca.ac.rw.BankingSystem.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        // Save the password as plain text (not recommended for production)
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public boolean deleteUserById(Long id) {
        try {
            User user = userRepository.findById(id).orElse(null); // Use your repository to fetch the user
            if (user != null) {
                userRepository.delete(user); // Delete the user
                return true;
            }
            return false; // User not found
        } catch (Exception e) {
            logger.error("Error deleting user with ID {}: {}", id, e.getMessage());
            throw e; // Rethrow or handle exception as needed
        }
    }


}
