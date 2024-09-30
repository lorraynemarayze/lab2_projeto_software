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
@Table(name = "orders")
public class Order {

    @Id
    private String id;
    private String renterId;
    private String vehicleId;
    private String startDate;
    private String endDate;
    private BigDecimal total;
}