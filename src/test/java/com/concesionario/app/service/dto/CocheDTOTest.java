package com.concesionario.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.concesionario.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CocheDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CocheDTO.class);
        CocheDTO cocheDTO1 = new CocheDTO();
        cocheDTO1.setId(1L);
        CocheDTO cocheDTO2 = new CocheDTO();
        assertThat(cocheDTO1).isNotEqualTo(cocheDTO2);
        cocheDTO2.setId(cocheDTO1.getId());
        assertThat(cocheDTO1).isEqualTo(cocheDTO2);
        cocheDTO2.setId(2L);
        assertThat(cocheDTO1).isNotEqualTo(cocheDTO2);
        cocheDTO1.setId(null);
        assertThat(cocheDTO1).isNotEqualTo(cocheDTO2);
    }
}
