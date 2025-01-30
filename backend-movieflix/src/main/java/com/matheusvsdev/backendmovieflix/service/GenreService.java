package com.matheusvsdev.backendmovieflix.service;

import com.matheusvsdev.backendmovieflix.dto.GenreDTO;

import java.util.List;

public interface GenreService {
    List<GenreDTO> findAll();
}
