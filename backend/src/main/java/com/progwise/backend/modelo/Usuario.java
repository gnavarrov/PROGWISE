package com.progwise.backend.modelo;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.security.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "usuarios", schema = "progwise")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuario_id;

    @Column(nullable = false, length = 45)
    private String nombre;

    @Getter
    @Column(nullable = false, length = 45)
    private String correo;

    @Getter
    @Column(name = "password", nullable = false, length = 45)
    private String contraseña;

    @Column(name = "fecha_registro", columnDefinition = "DATE")
    private LocalDate fechaRegistro;

}
