package com.concesionario.app.service.mapper;

import com.concesionario.app.domain.Modelo;
import com.concesionario.app.service.dto.ModeloDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Modelo} and its DTO {@link ModeloDTO}.
 */
@Mapper(componentModel = "spring", uses = { MarcaMapper.class })
public interface ModeloMapper extends EntityMapper<ModeloDTO, Modelo> {
    @Mapping(target = "marca", source = "marca", qualifiedByName = "nombre")
    ModeloDTO toDto(Modelo s);

    @Named("nombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    ModeloDTO toDtoNombre(Modelo modelo);
}
