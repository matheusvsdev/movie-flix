package com.matheusvsdev.backendmovieflix.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_movies")
public class MovieEntity extends Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer duration;

    public MovieEntity() {}

    public MovieEntity(Long id, Integer duration) {
        this.id = id;
        this.duration = duration;
    }

    public MovieEntity(String imgUrl, String title, String description, Long id, Integer duration) {
        super(imgUrl, title, description);
        this.id = id;
        this.duration = duration;
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
}
