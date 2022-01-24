package com.concesionario.app.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CocheMapperTest {

    private CocheMapper cocheMapper;

    @BeforeEach
    public void setUp() {
        cocheMapper = new CocheMapperImpl();
    }
}
