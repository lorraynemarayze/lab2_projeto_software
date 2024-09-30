package br.com.projeto.rejescweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.projeto.rejescweb.models.Vehicle;
import br.com.projeto.rejescweb.repository.VehicleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> findAllVehicles() {
        return vehicleRepository.findAll();
    }

    public void deleteVehicle(String id) {
        vehicleRepository.deleteById(id);
    }

    public void changeVehicleAvailability(Vehicle vehicle) {
        vehicle.setAvaliable(!vehicle.isAvaliable());
        vehicleRepository.save(vehicle);
    }

    public Vehicle findVehicleById(String id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return vehicle.orElse(null);
    }
}
