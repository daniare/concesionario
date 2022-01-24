package com.concesionario.app.web.rest;

import com.concesionario.app.repository.MarcaRepository;
import com.concesionario.app.service.MarcaService;
import com.concesionario.app.service.dto.MarcaDTO;
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
 * REST controller for managing {@link com.concesionario.app.domain.Marca}.
 */
@RestController
@RequestMapping("/api")
public class MarcaResource {

    private final Logger log = LoggerFactory.getLogger(MarcaResource.class);

    private static final String ENTITY_NAME = "marca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MarcaService marcaService;

    private final MarcaRepository marcaRepository;

    public MarcaResource(MarcaService marcaService, MarcaRepository marcaRepository) {
        this.marcaService = marcaService;
        this.marcaRepository = marcaRepository;
    }

    /**
     * {@code POST  /marcas} : Create a new marca.
     *
     * @param marcaDTO the marcaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new marcaDTO, or with status {@code 400 (Bad Request)} if the marca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/marcas")
    public ResponseEntity<MarcaDTO> createMarca(@Valid @RequestBody MarcaDTO marcaDTO) throws URISyntaxException {
        log.debug("REST request to save Marca : {}", marcaDTO);
        if (marcaDTO.getId() != null) {
            throw new BadRequestAlertException("A new marca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MarcaDTO result = marcaService.save(marcaDTO);
        return ResponseEntity
            .created(new URI("/api/marcas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /marcas/:id} : Updates an existing marca.
     *
     * @param id the id of the marcaDTO to save.
     * @param marcaDTO the marcaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marcaDTO,
     * or with status {@code 400 (Bad Request)} if the marcaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the marcaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/marcas/{id}")
    public ResponseEntity<MarcaDTO> updateMarca(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MarcaDTO marcaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Marca : {}, {}", id, marcaDTO);
        if (marcaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marcaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!marcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MarcaDTO result = marcaService.save(marcaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, marcaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /marcas/:id} : Partial updates given fields of an existing marca, field will ignore if it is null
     *
     * @param id the id of the marcaDTO to save.
     * @param marcaDTO the marcaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marcaDTO,
     * or with status {@code 400 (Bad Request)} if the marcaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the marcaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the marcaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/marcas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MarcaDTO> partialUpdateMarca(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MarcaDTO marcaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Marca partially : {}, {}", id, marcaDTO);
        if (marcaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marcaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!marcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MarcaDTO> result = marcaService.partialUpdate(marcaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, marcaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /marcas} : get all the marcas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of marcas in body.
     */
    @GetMapping("/marcas")
    public ResponseEntity<List<MarcaDTO>> getAllMarcas(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Marcas");
        Page<MarcaDTO> page = marcaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /marcas/:id} : get the "id" marca.
     *
     * @param id the id of the marcaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the marcaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/marcas/{id}")
    public ResponseEntity<MarcaDTO> getMarca(@PathVariable Long id) {
        log.debug("REST request to get Marca : {}", id);
        Optional<MarcaDTO> marcaDTO = marcaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(marcaDTO);
    }

    /**
     * {@code DELETE  /marcas/:id} : delete the "id" marca.
     *
     * @param id the id of the marcaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/marcas/{id}")
    public ResponseEntity<Void> deleteMarca(@PathVariable Long id) {
        log.debug("REST request to delete Marca : {}", id);
        marcaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
