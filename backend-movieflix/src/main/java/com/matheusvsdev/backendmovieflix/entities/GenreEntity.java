package com.matheusvsdev.backendmovieflix.entities;

import com.matheusvsdev.backendmovieflix.entities.enums.GenreEnum;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_genre")
public class GenreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private GenreEnum description;

    @OneToMany(mappedBy = "genre")
    private List<MovieEntity> movies = new ArrayList<>();

    @OneToMany(mappedBy = "genre")
    private List<SerieEntity> series = new ArrayList<>();

    public GenreEntity() {
    }

    public GenreEntity(Long id, GenreEnum description) {
        this.id = id;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public GenreEnum getDescription() {
        return description;
    }

    public void setDescription(GenreEnum description) {
        this.description = description;
    }

    public List<MovieEntity> getMovies() {
        return movies;
    }

    public List<SerieEntity> getSeries() {
        return series;
    }
}
