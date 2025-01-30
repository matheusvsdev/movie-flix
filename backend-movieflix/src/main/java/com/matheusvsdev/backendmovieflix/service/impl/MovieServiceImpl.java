package com.matheusvsdev.backendmovieflix.service.impl;

import com.matheusvsdev.backendmovieflix.dto.MovieDTO;
import com.matheusvsdev.backendmovieflix.entities.MovieEntity;
import com.matheusvsdev.backendmovieflix.repository.MovieRepository;
import com.matheusvsdev.backendmovieflix.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<MovieDTO> findMovies(Pageable pageable) {
        Page<MovieEntity> result = movieRepository.findMovies(pageable);
        return result.map(MovieDTO::new);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MovieDTO> findMoviesByCategory(Long categoryId, Pageable pageable) {
        Page<MovieEntity> result = movieRepository.findMovieByCategoryId(categoryId, pageable);
        return result.map(MovieDTO::new);
    }
}
