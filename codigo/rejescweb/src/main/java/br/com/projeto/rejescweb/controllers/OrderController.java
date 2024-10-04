package br.com.projeto.rejescweb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import br.com.projeto.rejescweb.models.Order;
//import br.com.projeto.rejescweb.models.User;
import br.com.projeto.rejescweb.models.Vehicle;
import br.com.projeto.rejescweb.services.OrderService;
import br.com.projeto.rejescweb.services.UserService;
import br.com.projeto.rejescweb.services.VehicleService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Controller
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/order")
    public String order(Order order, Model model) {
        model.addAttribute("orderList", orderService.findAllOrders());
        return "orderManagement";
    }

    @GetMapping("/myorders")
    public String myorder(Order order, Model model, Authentication authentication) {
        List<Order> orders = orderService.findOrdersById(authentication.getName());

        System.out.println(orders);

        model.addAttribute("orderList", orders);
        return "myOrders";
    }

    @PostMapping("/order")
    public String addOrder(@ModelAttribute Order order, Model model, RedirectAttributes redirectAttributes) {
        if (userService.findUserByCpf(order.getRenterId()) == null || vehicleService.findVehicleById(order.getVehicleId()) == null) {
            redirectAttributes.addAttribute("iderror", "true");
            model.addAttribute("orderList", orderService.findAllOrders());
            return "redirect:/order";
        }

        Vehicle vehicle = vehicleService.findVehicleById(order.getVehicleId());

        if (!vehicle.isAvaliable()) {
            redirectAttributes.addAttribute("vehiclenotavailable", "true");
            model.addAttribute("orderList", orderService.findAllOrders());
            return "redirect:/order";
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate startDate = LocalDate.parse(order.getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(order.getEndDate(), formatter);

        int daysDifference = (int) ChronoUnit.DAYS.between(startDate, endDate);

        BigDecimal pricePerDay = vehicle.getPricePerDay();

        order.setId(UUID.randomUUID().toString().substring(0, 5));
        order.setTotal(pricePerDay.multiply(BigDecimal.valueOf(daysDifference)));

        vehicleService.changeVehicleAvailability(vehicle);

        orderService.addOrder(order);
        model.addAttribute("orderList", orderService.findAllOrders());
        return "orderManagement";
    }

    @PostMapping("/order/delete")
    public String deleteOrder(@RequestParam("idDelete") String idDelete, Order order, Model model) {
        Order orderFound = orderService.findOrderById(idDelete);
        vehicleService.changeVehicleAvailability(vehicleService.findVehicleById(orderFound.getVehicleId()));

        orderService.deleteOrder(idDelete);

        model.addAttribute("orderList", orderService.findAllOrders());
        return "orderManagement";
    }

    @PutMapping("/order/{id}/{action}")
public ResponseEntity<List<Order>> updateOrder(@PathVariable String id, @PathVariable String action) {
    Order order = orderService.findOrderById(id);
    if (order == null) {
        return ResponseEntity.notFound().build();
    }

    if (action.equals("approve")) {
        // Lógica para aprovar o pedido (ex: atualizar status, enviar notificação, etc.)
        // ...
    } else if (action.equals("reject")) {
        // Lógica para recusar o pedido (ex: atualizar status, enviar notificação, etc.)
        // ... 
        vehicleService.changeVehicleAvailability(vehicleService.findVehicleById(order.getVehicleId())); 
    } else {
        return ResponseEntity.badRequest().build();
    }

    orderService.addOrder(order); // Salva o pedido atualizado
    return ResponseEntity.ok(orderService.findAllOrders());
}

}




