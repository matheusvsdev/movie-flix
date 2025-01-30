package com.matheusvsdev.backendmovieflix.entities.enums;

public enum GenreEnum {
    ACTION("Ação"),
    ANIME("Anime"),
    COMEDY(("Comédia")),
    DOCUMENTARY(("Documentário")),
    DRAMA("Drama"),
    FANTASY("Fantasia"),
    SCIENCE_FICTION("Ficção Científica"),
    FAMILY("Para toda família");

    private final String description;

    GenreEnum(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
