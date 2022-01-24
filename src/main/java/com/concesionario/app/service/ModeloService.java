package com.concesionario.app.service;

import com.concesionario.app.domain.Modelo;
import com.concesionario.app.repository.ModeloRepository;
import com.concesionario.app.service.dto.ModeloDTO;
import com.concesionario.app.service.mapper.ModeloMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Modelo}.
 */
@Service
@Transactional
public class ModeloService {

    private final Logger log = LoggerFactory.getLogger(ModeloService.class);

    private final ModeloRepository modeloRepository;

    private final ModeloMapper modeloMapper;

    public ModeloService(ModeloRepository modeloRepository, ModeloMapper modeloMapper) {
        this.modeloRepository = modeloRepository;
        this.modeloMapper = modeloMapper;
    }

    /**
     * Save a modelo.
     *
     * @param modeloDTO the entity to save.
     * @return the persisted entity.
     */
    public ModeloDTO save(ModeloDTO modeloDTO) {
        log.debug("Request to save Modelo : {}", modeloDTO);
        Modelo modelo = modeloMapper.toEntity(modeloDTO);
        modelo = modeloRepository.save(modelo);
        return modeloMapper.toDto(modelo);
    }

    /**
     * Partially update a modelo.
     *
     * @param modeloDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ModeloDTO> partialUpdate(ModeloDTO modeloDTO) {
        log.debug("Request to partially update Modelo : {}", modeloDTO);

        return modeloRepository
            .findById(modeloDTO.getId())
            .map(existingModelo -> {
                modeloMapper.partialUpdate(existingModelo, modeloDTO);

                return existingModelo;
            })
            .map(modeloRepository::save)
            .map(modeloMapper::toDto);
    }

    /**
     * Get all the modelos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ModeloDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Modelos");
        return modeloRepository.findAll(pageable).map(modeloMapper::toDto);
    }

    /**
     * Get one modelo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ModeloDTO> findOne(Long id) {
        log.debug("Request to get Modelo : {}", id);
        return modeloRepository.findById(id).map(modeloMapper::toDto);
    }

    /**
     * Delete the modelo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Modelo : {}", id);
        modeloRepository.deleteById(id);
    }
}
