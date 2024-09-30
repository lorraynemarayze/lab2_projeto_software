package br.com.projeto.rejescweb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import br.com.projeto.rejescweb.models.User;
import br.com.projeto.rejescweb.services.UserService;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public String user(User user, Model model) {
        model.addAttribute("userList", userService.findAllUsers());
        return "userManagement";
    }

    @PostMapping("/user")
    public String addUser(@ModelAttribute User user, Model model) {
        userService.addUser(user);
        model.addAttribute("userList", userService.findAllUsers());
        return "userManagement";
    }

    @PostMapping("/user/delete")
    public String deleteUser(@RequestParam("idDelete") String idDelete, User user, Model model) {
        userService.deleteUser(idDelete);
        model.addAttribute("userList", userService.findAllUsers());
        return "userManagement";
    }

    @PostMapping("/user/update")
    public String updateUser(@RequestParam("idUpdate") String idUpdate, User user, Model model) {
        userService.changeUserType(idUpdate);
        model.addAttribute("userList", userService.findAllUsers());
        return "userManagement";
    }
}
