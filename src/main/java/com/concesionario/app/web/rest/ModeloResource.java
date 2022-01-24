package com.concesionario.app.web.rest;

import com.concesionario.app.repository.ModeloRepository;
import com.concesionario.app.service.ModeloService;
import com.concesionario.app.service.dto.ModeloDTO;
import com.concesionario.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.concesionario.app.domain.Modelo}.
 */
@RestController
@RequestMapping("/api")
public class ModeloResource {

    private final Logger log = LoggerFactory.getLogger(ModeloResource.class);

    private static final String ENTITY_NAME = "modelo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModeloService modeloService;

    private final ModeloRepository modeloRepository;

    public ModeloResource(ModeloService modeloService, ModeloRepository modeloRepository) {
        this.modeloService = modeloService;
        this.modeloRepository = modeloRepository;
    }

    /**
     * {@code POST  /modelos} : Create a new modelo.
     *
     * @param modeloDTO the modeloDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modeloDTO, or with status {@code 400 (Bad Request)} if the modelo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/modelos")
    public ResponseEntity<ModeloDTO> createModelo(@Valid @RequestBody ModeloDTO modeloDTO) throws URISyntaxException {
        log.debug("REST request to save Modelo : {}", modeloDTO);
        if (modeloDTO.getId() != null) {
            throw new BadRequestAlertException("A new modelo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ModeloDTO result = modeloService.save(modeloDTO);
        return ResponseEntity
            .created(new URI("/api/modelos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /modelos/:id} : Updates an existing modelo.
     *
     * @param id the id of the modeloDTO to save.
     * @param modeloDTO the modeloDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modeloDTO,
     * or with status {@code 400 (Bad Request)} if the modeloDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the modeloDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/modelos/{id}")
    public ResponseEntity<ModeloDTO> updateModelo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ModeloDTO modeloDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Modelo : {}, {}", id, modeloDTO);
        if (modeloDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, modeloDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!modeloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ModeloDTO result = modeloService.save(modeloDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, modeloDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /modelos/:id} : Partial updates given fields of an existing modelo, field will ignore if it is null
     *
     * @param id the id of the modeloDTO to save.
     * @param modeloDTO the modeloDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modeloDTO,
     * or with status {@code 400 (Bad Request)} if the modeloDTO is not valid,
     * or with status {@code 404 (Not Found)} if the modeloDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the modeloDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/modelos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ModeloDTO> partialUpdateModelo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ModeloDTO modeloDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Modelo partially : {}, {}", id, modeloDTO);
        if (modeloDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, modeloDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!modeloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ModeloDTO> result = modeloService.partialUpdate(modeloDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, modeloDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /modelos} : get all the modelos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modelos in body.
     */
    @GetMapping("/modelos")
    public ResponseEntity<List<ModeloDTO>> getAllModelos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Modelos");
        Page<ModeloDTO> page = modeloService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /modelos/:id} : get the "id" modelo.
     *
     * @param id the id of the modeloDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modeloDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/modelos/{id}")
    public ResponseEntity<ModeloDTO> getModelo(@PathVariable Long id) {
        log.debug("REST request to get Modelo : {}", id);
        Optional<ModeloDTO> modeloDTO = modeloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(modeloDTO);
    }

    /**
     * {@code DELETE  /modelos/:id} : delete the "id" modelo.
     *
     * @param id the id of the modeloDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/modelos/{id}")
    public ResponseEntity<Void> deleteModelo(@PathVariable Long id) {
        log.debug("REST request to delete Modelo : {}", id);
        modeloService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
