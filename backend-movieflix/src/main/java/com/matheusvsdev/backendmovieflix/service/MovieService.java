package com.matheusvsdev.backendmovieflix.service;

import com.matheusvsdev.backendmovieflix.dto.MovieDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MovieService {
    Page<MovieDTO> findMovies(Pageable pageable);
    Page<MovieDTO> findMoviesByCategory(Long categoryId, Pageable pageable);
}
