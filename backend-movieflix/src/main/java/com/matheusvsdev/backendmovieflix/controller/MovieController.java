package com.matheusvsdev.backendmovieflix.controller;

import com.matheusvsdev.backendmovieflix.dto.MovieDTO;
import com.matheusvsdev.backendmovieflix.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieController {

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = "/movies")
    public ResponseEntity<Page<MovieDTO>> findMoviesPersonal(
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MovieDTO> result = movieService.findMoviesByCategoryAndTitle(categoryId, title, pageable);
        return ResponseEntity.ok(result);
    }
}
