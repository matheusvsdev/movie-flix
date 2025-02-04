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
    public Page<MovieDTO> findMoviesByCategoryAndTitle(Long categoryId, String title, Pageable pageable) {
        Page<MovieEntity> result = movieRepository.findMoviesByCategoryAndTitle(categoryId, title, pageable);
        return result.map(MovieDTO::new);
    }

    @Override
    @Transactional(readOnly = true)
    public MovieDTO findMovieById(Long id) {
        MovieEntity movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
        return new MovieDTO(movie);
    }
}
