package br.com.projeto.rejescweb.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User {

    @Getter
    @Id
    private String id;
    private String password;
    private String nome;
    private String rg;
    private String endereco;
    private boolean agente;
}
