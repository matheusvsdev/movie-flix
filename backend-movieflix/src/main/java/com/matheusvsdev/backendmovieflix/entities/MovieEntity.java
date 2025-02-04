package com.matheusvsdev.backendmovieflix.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_movies")
public class MovieEntity extends Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer duration;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private GenreEntity genre;

    public MovieEntity() {}

    public MovieEntity(Long id, Integer duration, GenreEntity genre) {
        this.id = id;
        this.duration = duration;
        this.genre = genre;
    }

    public MovieEntity(String imgUrl, String title, String description, String videoUrl, Long id, Integer duration, GenreEntity genre) {
        super(imgUrl, title, description, videoUrl);
        this.id = id;
        this.duration = duration;
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public GenreEntity getGenre() {
        return genre;
    }

    public void setGenre(GenreEntity genre) {
        this.genre = genre;
    }
}
