package com.devsuperior.movieflix.controllers;

import com.devsuperior.movieflix.dto.MovieCardDTO;
import com.devsuperior.movieflix.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/genre")
    public ResponseEntity<Page<MovieCardDTO>> getMoviesByGenre(@RequestParam Integer genreId, Pageable pageable) {
        Page<MovieCardDTO> movieCardDTOPage = movieService.findMoviesByGenre(genreId, pageable);
        return ResponseEntity.ok().body(movieCardDTOPage);
    }
}
