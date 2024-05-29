package com.progwise.backend.modelo;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "archivos", schema = "progwise")
@Data
public class Archivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long archivo_id;

    @Column(nullable = false, length = 255)
    private String nombre_archivo;

    @Column(length = 255)
    private String tipo;

    @Column(nullable = false, length = 255)
    private String ruta_acceso;

    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private Proyecto proyecto;
}
