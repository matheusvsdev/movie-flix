package com.matheusvsdev.backendmovieflix.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_series")
public class SerieEntity extends Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numberOfSeasons;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private GenreEntity genre;

    @OneToMany(mappedBy = "serie", cascade = CascadeType.ALL)
    private List<SeasonEntity> seasons = new ArrayList<>();

    public SerieEntity() {}

    public SerieEntity(Long id, Integer numberOfSeasons, GenreEntity genre) {
        this.id = id;
        this.numberOfSeasons = numberOfSeasons;
        this.genre = genre;
    }

    public SerieEntity(String imgUrl, String title, String description, String videoUrl, Long id, Integer numberOfSeasons, GenreEntity genre) {
        super(imgUrl, title, description, videoUrl);
        this.id = id;
        this.numberOfSeasons = numberOfSeasons;
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public Integer getNumberOfSeasons() {
        return numberOfSeasons;
    }

    public void setNumberOfSeasons(Integer numberOfSeasons) {
        this.numberOfSeasons = numberOfSeasons;
    }

    public GenreEntity getGenre() {
        return genre;
    }

    public void setGenre(GenreEntity genre) {
        this.genre = genre;
    }

    public List<SeasonEntity> getSeasons() {
        return seasons;
    }
}
