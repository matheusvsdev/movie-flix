package com.matheusvsdev.backendmovieflix.entities;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Content {
    private String imgUrl;
    private String title;
    private String description;

    public Content() {
    }

    public Content(String imgUrl, String title, String description) {
        this.imgUrl = imgUrl;
        this.title = title;
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
