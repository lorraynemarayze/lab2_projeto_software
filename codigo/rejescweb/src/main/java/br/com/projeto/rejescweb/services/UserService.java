package br.com.projeto.rejescweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.projeto.rejescweb.models.User;
import br.com.projeto.rejescweb.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public void changeUserType(String id) {
        User user = findUserByCpf(id);
        user.setAgente(!user.isAgente());
        userRepository.save(user);
    }

    public User findUserByCpf(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }
}
