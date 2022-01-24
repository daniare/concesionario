package com.concesionario.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.concesionario.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ModeloDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModeloDTO.class);
        ModeloDTO modeloDTO1 = new ModeloDTO();
        modeloDTO1.setId(1L);
        ModeloDTO modeloDTO2 = new ModeloDTO();
        assertThat(modeloDTO1).isNotEqualTo(modeloDTO2);
        modeloDTO2.setId(modeloDTO1.getId());
        assertThat(modeloDTO1).isEqualTo(modeloDTO2);
        modeloDTO2.setId(2L);
        assertThat(modeloDTO1).isNotEqualTo(modeloDTO2);
        modeloDTO1.setId(null);
        assertThat(modeloDTO1).isNotEqualTo(modeloDTO2);
    }
}
