package com.matheusvsdev.backendmovieflix.dto;

import com.matheusvsdev.backendmovieflix.entities.GenreEntity;

public class GenreDTO {

    private Long id;
    private String description;

    public GenreDTO() {
    }

    public GenreDTO(Long id, String description) {
        this.id = id;
        this.description = description;
    }

    public GenreDTO(GenreEntity entity) {
        this.id = entity.getId();
        this.description = entity.getDescription().getDescription();
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }
}
