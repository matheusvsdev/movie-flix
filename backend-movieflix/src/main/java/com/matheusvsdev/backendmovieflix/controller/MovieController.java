package com.matheusvsdev.backendmovieflix.controller;

import com.matheusvsdev.backendmovieflix.dto.MovieDTO;
import com.matheusvsdev.backendmovieflix.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieController {

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = "/list")
    public ResponseEntity<Page<MovieDTO>> findAll(Pageable pageable) {
        Page<MovieDTO> movieDTOPage = movieService.findMovies(pageable);
        return ResponseEntity.ok(movieDTOPage);
    }

    @RequestMapping(value = "/list/{categoryId}")
    public ResponseEntity<Page<MovieDTO>> findMoviesByGenre(@PathVariable Long categoryId, Pageable pageable) {
        Page<MovieDTO> result = movieService.findMoviesByCategory(categoryId, pageable);
        return ResponseEntity.ok(result);
    }
}
