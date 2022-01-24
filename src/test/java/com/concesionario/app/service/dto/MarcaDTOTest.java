package com.concesionario.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.concesionario.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MarcaDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MarcaDTO.class);
        MarcaDTO marcaDTO1 = new MarcaDTO();
        marcaDTO1.setId(1L);
        MarcaDTO marcaDTO2 = new MarcaDTO();
        assertThat(marcaDTO1).isNotEqualTo(marcaDTO2);
        marcaDTO2.setId(marcaDTO1.getId());
        assertThat(marcaDTO1).isEqualTo(marcaDTO2);
        marcaDTO2.setId(2L);
        assertThat(marcaDTO1).isNotEqualTo(marcaDTO2);
        marcaDTO1.setId(null);
        assertThat(marcaDTO1).isNotEqualTo(marcaDTO2);
    }
}
