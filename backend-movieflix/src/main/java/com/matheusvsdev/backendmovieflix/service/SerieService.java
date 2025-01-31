package com.matheusvsdev.backendmovieflix.service;

import com.matheusvsdev.backendmovieflix.dto.SerieDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SerieService {

    Page<SerieDTO> findSeriesByCategoryAndTitle(Long categoryId, String title, Pageable pageable);
}
