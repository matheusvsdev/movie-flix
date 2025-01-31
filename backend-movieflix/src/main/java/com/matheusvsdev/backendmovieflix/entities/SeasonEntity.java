package com.matheusvsdev.backendmovieflix.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_seasons")
public class SeasonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer seasonNumber;

    @ManyToOne
    @JoinColumn(name = "serie_id")
    private SerieEntity serie;

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    private List<EpisodeEntity> episodes = new ArrayList<>();

    public SeasonEntity() {}

    public SeasonEntity(Long id, Integer seasonNumber, SerieEntity serie) {
        this.id = id;
        this.seasonNumber = seasonNumber;
        this.serie = serie;
    }

    public Long getId() {
        return id;
    }

    public Integer getSeasonNumber() {
        return seasonNumber;
    }

    public void setSeasonNumber(Integer seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public SerieEntity getSerie() {
        return serie;
    }

    public void setSerie(SerieEntity serie) {
        this.serie = serie;
    }

    public List<EpisodeEntity> getEpisodes() {
        return episodes;
    }
}
