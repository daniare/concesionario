package com.concesionario.app.service.mapper;

import com.concesionario.app.domain.Venta;
import com.concesionario.app.service.dto.VentaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Venta} and its DTO {@link VentaDTO}.
 */
@Mapper(componentModel = "spring", uses = { CocheMapper.class })
public interface VentaMapper extends EntityMapper<VentaDTO, Venta> {
    @Mapping(target = "coche", source = "coche", qualifiedByName = "matricula")
    VentaDTO toDto(Venta s);
}
