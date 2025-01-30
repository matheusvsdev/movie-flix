package com.matheusvsdev.backendmovieflix.service.impl;

import com.matheusvsdev.backendmovieflix.dto.GenreDTO;
import com.matheusvsdev.backendmovieflix.entities.GenreEntity;
import com.matheusvsdev.backendmovieflix.repository.GenreRepository;
import com.matheusvsdev.backendmovieflix.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    private GenreRepository genreRepository;

    @Override
    @Transactional(readOnly = true)
    public List<GenreDTO> findAll() {
        List<GenreEntity> genres = genreRepository.findAll();
        return genres.stream().map(GenreDTO::new).collect(Collectors.toList());
    }
}
