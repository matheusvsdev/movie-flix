package com.matheusvsdev.backendmovieflix.dto;

import com.matheusvsdev.backendmovieflix.entities.MovieEntity;

public class MovieDTO {

    private Long id;
    private String imgUrl;
    private String title;
    private String description;
    private Integer duration;
    private String videoUrl;
    private Long genreId;

    public MovieDTO() {}

    public MovieDTO(Long id, String imgUrl, String title, String description, Integer duration, String videoUrl,Long genreId) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.videoUrl = videoUrl;
        this.genreId = genreId;
    }

    public MovieDTO(MovieEntity entity) {
        this.id = entity.getId();
        this.imgUrl = entity.getImgUrl();
        this.title = entity.getTitle();
        this.description = entity.getDescription();
        this.duration = entity.getDuration();
        this.videoUrl = entity.getVideoUrl();
        this.genreId = entity.getGenre().getId();
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

    public String getVideoUrl() {
        return videoUrl;
    }

    public Long getGenreId() {
        return genreId;
    }
}
