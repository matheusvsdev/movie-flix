package com.matheusvsdev.backendmovieflix.controller;

import com.matheusvsdev.backendmovieflix.dto.GenreDTO;
import com.matheusvsdev.backendmovieflix.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping(value = "/genres")
    public ResponseEntity<List<GenreDTO>> findAll() {
        List<GenreDTO> genres = genreService.findAll();
        return new ResponseEntity<>(genres, HttpStatus.OK);
    }
}
