package com.progwise.backend.modelo;


import jakarta.persistence.*;
import lombok.Data;

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

    @Column(nullable = false, length = 45)
    private String correo;

    @Column(name = "contraseña", nullable = false, length = 45)
    private String contraseña;

    @Column(name = "fecha_registro", columnDefinition = "DATE")
    private LocalDate fechaRegistro;
}
