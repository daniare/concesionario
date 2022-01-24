package com.concesionario.app.service;

import com.concesionario.app.domain.Marca;
import com.concesionario.app.repository.MarcaRepository;
import com.concesionario.app.service.dto.MarcaDTO;
import com.concesionario.app.service.mapper.MarcaMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Marca}.
 */
@Service
@Transactional
public class MarcaService {

    private final Logger log = LoggerFactory.getLogger(MarcaService.class);

    private final MarcaRepository marcaRepository;

    private final MarcaMapper marcaMapper;

    public MarcaService(MarcaRepository marcaRepository, MarcaMapper marcaMapper) {
        this.marcaRepository = marcaRepository;
        this.marcaMapper = marcaMapper;
    }

    /**
     * Save a marca.
     *
     * @param marcaDTO the entity to save.
     * @return the persisted entity.
     */
    public MarcaDTO save(MarcaDTO marcaDTO) {
        log.debug("Request to save Marca : {}", marcaDTO);
        Marca marca = marcaMapper.toEntity(marcaDTO);
        marca = marcaRepository.save(marca);
        return marcaMapper.toDto(marca);
    }

    /**
     * Partially update a marca.
     *
     * @param marcaDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<MarcaDTO> partialUpdate(MarcaDTO marcaDTO) {
        log.debug("Request to partially update Marca : {}", marcaDTO);

        return marcaRepository
            .findById(marcaDTO.getId())
            .map(existingMarca -> {
                marcaMapper.partialUpdate(existingMarca, marcaDTO);

                return existingMarca;
            })
            .map(marcaRepository::save)
            .map(marcaMapper::toDto);
    }

    /**
     * Get all the marcas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<MarcaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Marcas");
        return marcaRepository.findAll(pageable).map(marcaMapper::toDto);
    }

    /**
     * Get one marca by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MarcaDTO> findOne(Long id) {
        log.debug("Request to get Marca : {}", id);
        return marcaRepository.findById(id).map(marcaMapper::toDto);
    }

    /**
     * Delete the marca by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Marca : {}", id);
        marcaRepository.deleteById(id);
    }
}
