package com.matheusvsdev.backendmovieflix.service.impl;

import com.matheusvsdev.backendmovieflix.dto.SerieDTO;
import com.matheusvsdev.backendmovieflix.entities.SerieEntity;
import com.matheusvsdev.backendmovieflix.repository.SerieRepository;
import com.matheusvsdev.backendmovieflix.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SerieServiceImpl implements SerieService {

    @Autowired
    private SerieRepository serieRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<SerieDTO> findSeriesByCategoryAndTitle(Long categoryId, String title, Pageable pageable) {
        Page<SerieEntity> result = serieRepository.findSeriesByCategoryAndTitle(categoryId, title, pageable);
        return result.map(SerieDTO::new);
    }
}
