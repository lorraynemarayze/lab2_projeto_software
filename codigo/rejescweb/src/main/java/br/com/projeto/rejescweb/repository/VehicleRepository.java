package br.com.projeto.rejescweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.projeto.rejescweb.models.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
}
