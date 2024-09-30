package br.com.projeto.rejescweb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import br.com.projeto.rejescweb.models.Vehicle;
import br.com.projeto.rejescweb.services.VehicleService;

@Controller
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/vehicle")
    public String vehicle(Vehicle vehicle, Model model) {
        model.addAttribute("vehicleList", vehicleService.findAllVehicles());
        return "vehicleManagement";
    }

    @PostMapping("/vehicle")
    public String addVehicle(@ModelAttribute Vehicle vehicle, Model model) {
        vehicle.setAvaliable(true);
        vehicleService.addVehicle(vehicle);
        model.addAttribute("vehicleList", vehicleService.findAllVehicles());
        return "vehicleManagement";
    }

    @PostMapping("/vehicle/delete")
    public String deleteVehicle(@RequestParam("idDelete") String idDelete, Vehicle vehicle, Model model) {
        vehicleService.deleteVehicle(idDelete);
        model.addAttribute("vehicleList", vehicleService.findAllVehicles());
        return "vehicleManagement";
    }
}


