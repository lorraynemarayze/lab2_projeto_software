package br.com.projeto.rejescweb.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    private String licensePlate ;
    private String brand;
    private String model;
    private int year;
    private BigDecimal pricePerDay;
    private boolean isAvaliable;
}
