package br.com.projeto.rejescweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.projeto.rejescweb.models.Order;
import br.com.projeto.rejescweb.repository.OrderRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order addOrder(Order user) {
        return orderRepository.save(user);
    }

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    public Order findOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<Order> findOrdersById(String renterId) {
        List<Order> orders = orderRepository.findAll();
        List<Order> finalList = new ArrayList<>();
        for (Order order : orders) {
            if (order.getRenterId().equals(renterId)) {
                finalList.add(order);
            }
        }
        return finalList;
    }

    public Order findOrderByCpf(String id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }
}
