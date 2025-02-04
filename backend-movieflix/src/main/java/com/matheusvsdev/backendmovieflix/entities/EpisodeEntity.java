package com.matheusvsdev.backendmovieflix.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_episodes")
public class EpisodeEntity extends Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer episodeNumber;
    private Integer duration;

    @ManyToOne
    @JoinColumn(name = "season_id")
    private SeasonEntity season;

    public EpisodeEntity() {}

    public EpisodeEntity(Long id, Integer episodeNumber, Integer duration, SeasonEntity season) {
        this.id = id;
        this.episodeNumber = episodeNumber;
        this.duration = duration;
        this.season = season;
    }

    public EpisodeEntity(String imgUrl, String title, String description, String videoUrl, Long id, Integer episodeNumber, Integer duration, SeasonEntity season) {
        super(imgUrl, title, description, videoUrl);
        this.id = id;
        this.episodeNumber = episodeNumber;
        this.duration = duration;
        this.season = season;
    }

    public Long getId() {
        return id;
    }

    public Integer getEpisodeNumber() {
        return episodeNumber;
    }

    public void setEpisodeNumber(Integer episodeNumber) {
        this.episodeNumber = episodeNumber;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public SeasonEntity getSeason() {
        return season;
    }

    public void setSeason(SeasonEntity season) {
        this.season = season;
    }
}
