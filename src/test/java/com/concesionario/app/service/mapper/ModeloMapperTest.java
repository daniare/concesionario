package com.concesionario.app.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ModeloMapperTest {

    private ModeloMapper modeloMapper;

    @BeforeEach
    public void setUp() {
        modeloMapper = new ModeloMapperImpl();
    }
}
