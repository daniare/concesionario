package com.concesionario.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.concesionario.app.domain.Modelo} entity.
 */
public class ModeloDTO implements Serializable {

    private Long id;

    @NotNull
    private String nombre;

    private MarcaDTO marca;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public MarcaDTO getMarca() {
        return marca;
    }

    public void setMarca(MarcaDTO marca) {
        this.marca = marca;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ModeloDTO)) {
            return false;
        }

        ModeloDTO modeloDTO = (ModeloDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, modeloDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ModeloDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", marca=" + getMarca() +
            "}";
    }
}
