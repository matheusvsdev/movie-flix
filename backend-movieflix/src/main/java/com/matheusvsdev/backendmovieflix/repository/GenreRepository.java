package com.matheusvsdev.backendmovieflix.repository;

import com.matheusvsdev.backendmovieflix.entities.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<GenreEntity, Long> {
}
