package com.concesionario.app.service.mapper;

import com.concesionario.app.domain.Coche;
import com.concesionario.app.service.dto.CocheDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Coche} and its DTO {@link CocheDTO}.
 */
@Mapper(componentModel = "spring", uses = { MarcaMapper.class, ModeloMapper.class })
public interface CocheMapper extends EntityMapper<CocheDTO, Coche> {
    @Mapping(target = "marca", source = "marca", qualifiedByName = "nombre")
    @Mapping(target = "modelo", source = "modelo", qualifiedByName = "nombre")
    CocheDTO toDto(Coche s);

    @Named("matricula")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "matricula", source = "matricula")
    CocheDTO toDtoMatricula(Coche coche);
}
