package com.concesionario.app.service;

import com.concesionario.app.domain.Coche;
import com.concesionario.app.repository.CocheRepository;
import com.concesionario.app.service.dto.CocheDTO;
import com.concesionario.app.service.mapper.CocheMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Coche}.
 */
@Service
@Transactional
public class CocheService {

    private final Logger log = LoggerFactory.getLogger(CocheService.class);

    private final CocheRepository cocheRepository;

    private final CocheMapper cocheMapper;

    public CocheService(CocheRepository cocheRepository, CocheMapper cocheMapper) {
        this.cocheRepository = cocheRepository;
        this.cocheMapper = cocheMapper;
    }

    /**
     * Save a coche.
     *
     * @param cocheDTO the entity to save.
     * @return the persisted entity.
     */
    public CocheDTO save(CocheDTO cocheDTO) {
        log.debug("Request to save Coche : {}", cocheDTO);
        Coche coche = cocheMapper.toEntity(cocheDTO);
        coche = cocheRepository.save(coche);
        return cocheMapper.toDto(coche);
    }

    /**
     * Partially update a coche.
     *
     * @param cocheDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CocheDTO> partialUpdate(CocheDTO cocheDTO) {
        log.debug("Request to partially update Coche : {}", cocheDTO);

        return cocheRepository
            .findById(cocheDTO.getId())
            .map(existingCoche -> {
                cocheMapper.partialUpdate(existingCoche, cocheDTO);

                return existingCoche;
            })
            .map(cocheRepository::save)
            .map(cocheMapper::toDto);
    }

    /**
     * Get all the coches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CocheDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Coches");
        return cocheRepository.findAll(pageable).map(cocheMapper::toDto);
    }

    /**
     * Get one coche by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CocheDTO> findOne(Long id) {
        log.debug("Request to get Coche : {}", id);
        return cocheRepository.findById(id).map(cocheMapper::toDto);
    }

    /**
     * Delete the coche by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Coche : {}", id);
        cocheRepository.deleteById(id);
    }
}
