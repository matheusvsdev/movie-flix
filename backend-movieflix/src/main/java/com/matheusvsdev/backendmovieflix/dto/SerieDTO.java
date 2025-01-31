package com.matheusvsdev.backendmovieflix.dto;

import com.matheusvsdev.backendmovieflix.entities.SerieEntity;

public class SerieDTO {

    private Long id;
    private String imgUrl;
    private String title;
    private String description;
    private Integer numberOfSeasons;
    private Long genreId;

    public SerieDTO() {
    }

    public SerieDTO(Long id, String imgUrl, String title, String description, Integer numberOfSeasons, Long genreId) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.title = title;
        this.description = description;
        this.numberOfSeasons = numberOfSeasons;
        this.genreId = genreId;
    }

    public SerieDTO(SerieEntity entity) {
        this.id = entity.getId();
        this.imgUrl = entity.getImgUrl();
        this.title = entity.getTitle();
        this.description = entity.getDescription();
        this.numberOfSeasons = entity.getNumberOfSeasons();
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

    public Integer getNumberOfSeasons() {
        return numberOfSeasons;
    }

    public Long getGenreId() {
        return genreId;
    }
}
