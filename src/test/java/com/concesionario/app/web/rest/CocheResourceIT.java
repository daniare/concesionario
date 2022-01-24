package com.concesionario.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.concesionario.app.IntegrationTest;
import com.concesionario.app.domain.Coche;
import com.concesionario.app.repository.CocheRepository;
import com.concesionario.app.service.dto.CocheDTO;
import com.concesionario.app.service.mapper.CocheMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CocheResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CocheResourceIT {

    private static final String DEFAULT_MATRICULA = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULA = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    private static final Double DEFAULT_PRECIO = 1D;
    private static final Double UPDATED_PRECIO = 2D;

    private static final String DEFAULT_NUMERO_SERIE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_SERIE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/coches";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CocheRepository cocheRepository;

    @Autowired
    private CocheMapper cocheMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCocheMockMvc;

    private Coche coche;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Coche createEntity(EntityManager em) {
        Coche coche = new Coche()
            .matricula(DEFAULT_MATRICULA)
            .color(DEFAULT_COLOR)
            .precio(DEFAULT_PRECIO)
            .numeroSerie(DEFAULT_NUMERO_SERIE);
        return coche;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Coche createUpdatedEntity(EntityManager em) {
        Coche coche = new Coche()
            .matricula(UPDATED_MATRICULA)
            .color(UPDATED_COLOR)
            .precio(UPDATED_PRECIO)
            .numeroSerie(UPDATED_NUMERO_SERIE);
        return coche;
    }

    @BeforeEach
    public void initTest() {
        coche = createEntity(em);
    }

    @Test
    @Transactional
    void createCoche() throws Exception {
        int databaseSizeBeforeCreate = cocheRepository.findAll().size();
        // Create the Coche
        CocheDTO cocheDTO = cocheMapper.toDto(coche);
        restCocheMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cocheDTO)))
            .andExpect(status().isCreated());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeCreate + 1);
        Coche testCoche = cocheList.get(cocheList.size() - 1);
        assertThat(testCoche.getMatricula()).isEqualTo(DEFAULT_MATRICULA);
        assertThat(testCoche.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testCoche.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testCoche.getNumeroSerie()).isEqualTo(DEFAULT_NUMERO_SERIE);
    }

    @Test
    @Transactional
    void createCocheWithExistingId() throws Exception {
        // Create the Coche with an existing ID
        coche.setId(1L);
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        int databaseSizeBeforeCreate = cocheRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCocheMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cocheDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkMatriculaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cocheRepository.findAll().size();
        // set the field null
        coche.setMatricula(null);

        // Create the Coche, which fails.
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        restCocheMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cocheDTO)))
            .andExpect(status().isBadRequest());

        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkColorIsRequired() throws Exception {
        int databaseSizeBeforeTest = cocheRepository.findAll().size();
        // set the field null
        coche.setColor(null);

        // Create the Coche, which fails.
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        restCocheMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cocheDTO)))
            .andExpect(status().isBadRequest());

        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrecioIsRequired() throws Exception {
        int databaseSizeBeforeTest = cocheRepository.findAll().size();
        // set the field null
        coche.setPrecio(null);

        // Create the Coche, which fails.
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        restCocheMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cocheDTO)))
            .andExpect(status().isBadRequest());

        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCoches() throws Exception {
        // Initialize the database
        cocheRepository.saveAndFlush(coche);

        // Get all the cocheList
        restCocheMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coche.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricula").value(hasItem(DEFAULT_MATRICULA)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR)))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].numeroSerie").value(hasItem(DEFAULT_NUMERO_SERIE)));
    }

    @Test
    @Transactional
    void getCoche() throws Exception {
        // Initialize the database
        cocheRepository.saveAndFlush(coche);

        // Get the coche
        restCocheMockMvc
            .perform(get(ENTITY_API_URL_ID, coche.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(coche.getId().intValue()))
            .andExpect(jsonPath("$.matricula").value(DEFAULT_MATRICULA))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.numeroSerie").value(DEFAULT_NUMERO_SERIE));
    }

    @Test
    @Transactional
    void getNonExistingCoche() throws Exception {
        // Get the coche
        restCocheMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCoche() throws Exception {
        // Initialize the database
        cocheRepository.saveAndFlush(coche);

        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();

        // Update the coche
        Coche updatedCoche = cocheRepository.findById(coche.getId()).get();
        // Disconnect from session so that the updates on updatedCoche are not directly saved in db
        em.detach(updatedCoche);
        updatedCoche.matricula(UPDATED_MATRICULA).color(UPDATED_COLOR).precio(UPDATED_PRECIO).numeroSerie(UPDATED_NUMERO_SERIE);
        CocheDTO cocheDTO = cocheMapper.toDto(updatedCoche);

        restCocheMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cocheDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cocheDTO))
            )
            .andExpect(status().isOk());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
        Coche testCoche = cocheList.get(cocheList.size() - 1);
        assertThat(testCoche.getMatricula()).isEqualTo(UPDATED_MATRICULA);
        assertThat(testCoche.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testCoche.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testCoche.getNumeroSerie()).isEqualTo(UPDATED_NUMERO_SERIE);
    }

    @Test
    @Transactional
    void putNonExistingCoche() throws Exception {
        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();
        coche.setId(count.incrementAndGet());

        // Create the Coche
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCocheMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cocheDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cocheDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCoche() throws Exception {
        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();
        coche.setId(count.incrementAndGet());

        // Create the Coche
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCocheMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cocheDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCoche() throws Exception {
        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();
        coche.setId(count.incrementAndGet());

        // Create the Coche
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCocheMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cocheDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCocheWithPatch() throws Exception {
        // Initialize the database
        cocheRepository.saveAndFlush(coche);

        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();

        // Update the coche using partial update
        Coche partialUpdatedCoche = new Coche();
        partialUpdatedCoche.setId(coche.getId());

        partialUpdatedCoche.color(UPDATED_COLOR);

        restCocheMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCoche.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCoche))
            )
            .andExpect(status().isOk());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
        Coche testCoche = cocheList.get(cocheList.size() - 1);
        assertThat(testCoche.getMatricula()).isEqualTo(DEFAULT_MATRICULA);
        assertThat(testCoche.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testCoche.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testCoche.getNumeroSerie()).isEqualTo(UPDATED_NUMERO_SERIE);
    }

    @Test
    @Transactional
    void fullUpdateCocheWithPatch() throws Exception {
        // Initialize the database
        cocheRepository.saveAndFlush(coche);

        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();

        // Update the coche using partial update
        Coche partialUpdatedCoche = new Coche();
        partialUpdatedCoche.setId(coche.getId());

        partialUpdatedCoche.matricula(UPDATED_MATRICULA).color(UPDATED_COLOR).precio(UPDATED_PRECIO).numeroSerie(UPDATED_NUMERO_SERIE);

        restCocheMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCoche.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCoche))
            )
            .andExpect(status().isOk());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
        Coche testCoche = cocheList.get(cocheList.size() - 1);
        assertThat(testCoche.getMatricula()).isEqualTo(UPDATED_MATRICULA);
        assertThat(testCoche.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testCoche.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testCoche.getNumeroSerie()).isEqualTo(UPDATED_NUMERO_SERIE);
    }

    @Test
    @Transactional
    void patchNonExistingCoche() throws Exception {
        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();
        coche.setId(count.incrementAndGet());

        // Create the Coche
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCocheMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cocheDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cocheDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCoche() throws Exception {
        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();
        coche.setId(count.incrementAndGet());

        // Create the Coche
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCocheMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cocheDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCoche() throws Exception {
        int databaseSizeBeforeUpdate = cocheRepository.findAll().size();
        coche.setId(count.incrementAndGet());

        // Create the Coche
        CocheDTO cocheDTO = cocheMapper.toDto(coche);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCocheMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cocheDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Coche in the database
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCoche() throws Exception {
        // Initialize the database
        cocheRepository.saveAndFlush(coche);

        int databaseSizeBeforeDelete = cocheRepository.findAll().size();

        // Delete the coche
        restCocheMockMvc
            .perform(delete(ENTITY_API_URL_ID, coche.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Coche> cocheList = cocheRepository.findAll();
        assertThat(cocheList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
