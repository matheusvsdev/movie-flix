package com.matheusvsdev.backendmovieflix.dto;

import com.matheusvsdev.backendmovieflix.entities.MovieEntity;

public class MovieDTO {

    private Long id;
    private String imgUrl;
    private String title;
    private String description;
    private Integer duration;

    public MovieDTO() {}

    public MovieDTO(Long id, String imgUrl, String title, String description, Integer duration) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.title = title;
        this.description = description;
        this.duration = duration;
    }

    public MovieDTO(MovieEntity entity) {
        this.id = entity.getId();
        this.imgUrl = entity.getImgUrl();
        this.title = entity.getTitle();
        this.description = entity.getDescription();
        this.duration = entity.getDuration();
    }

    public Long getId() {
        return id;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Integer getDuration() {
        return duration;
    }
}
