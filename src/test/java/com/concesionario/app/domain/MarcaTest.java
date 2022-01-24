package com.concesionario.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.concesionario.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MarcaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Marca.class);
        Marca marca1 = new Marca();
        marca1.setId(1L);
        Marca marca2 = new Marca();
        marca2.setId(marca1.getId());
        assertThat(marca1).isEqualTo(marca2);
        marca2.setId(2L);
        assertThat(marca1).isNotEqualTo(marca2);
        marca1.setId(null);
        assertThat(marca1).isNotEqualTo(marca2);
    }
}
