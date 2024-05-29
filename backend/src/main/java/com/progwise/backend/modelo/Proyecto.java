package com.progwise.backend.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Table(name = "proyectos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proyectoId;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_propietario", nullable = false)
    private Usuario propietario;

    @ManyToMany
    @JoinTable(
            name = "proyectos_has_usuarios_colaboradores",
            joinColumns = @JoinColumn(name = "proyecto_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> colaboradores;

    // Getter for propietarioId
    public Long getPropietarioId() {
        return propietario != null ? propietario.getUsuarioId() : null;
    }

    // Setter for propietarioId
    public void setPropietarioId(Long propietarioId) {
        if (propietario == null) {
            propietario = new Usuario();
        }
        propietario.setUsuarioId(propietarioId);
    }
}
