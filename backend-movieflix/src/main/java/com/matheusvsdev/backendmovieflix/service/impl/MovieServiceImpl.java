package com.matheusvsdev.backendmovieflix.service.impl;

import com.matheusvsdev.backendmovieflix.dto.MovieDTO;
import com.matheusvsdev.backendmovieflix.entities.MovieEntity;
import com.matheusvsdev.backendmovieflix.repository.MovieRepository;
import com.matheusvsdev.backendmovieflix.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MovieDTO> findAll(Pageable pageable) {
        Page<MovieEntity> result = movieRepository.findAll(pageable);
        return result.map(MovieDTO::new);
    }
}
