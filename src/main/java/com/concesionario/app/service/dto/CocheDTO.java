package com.concesionario.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.concesionario.app.domain.Coche} entity.
 */
public class CocheDTO implements Serializable {

    private Long id;

    @NotNull
    private String matricula;

    @NotNull
    private String color;

    @NotNull
    private Double precio;

    private String numeroSerie;

    private MarcaDTO marca;

    private ModeloDTO modelo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public MarcaDTO getMarca() {
        return marca;
    }

    public void setMarca(MarcaDTO marca) {
        this.marca = marca;
    }

    public ModeloDTO getModelo() {
        return modelo;
    }

    public void setModelo(ModeloDTO modelo) {
        this.modelo = modelo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CocheDTO)) {
            return false;
        }

        CocheDTO cocheDTO = (CocheDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cocheDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "CocheDTO [color=" +
            color +
            ", id=" +
            id +
            ", marca=" +
            marca +
            ", matricula=" +
            matricula +
            ", modelo=" +
            modelo +
            ", numeroSerie=" +
            numeroSerie +
            ", precio=" +
            precio +
            "]"
        );
    }
}
