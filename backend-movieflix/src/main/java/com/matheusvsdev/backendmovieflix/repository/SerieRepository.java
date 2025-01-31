package com.matheusvsdev.backendmovieflix.repository;

import com.matheusvsdev.backendmovieflix.entities.SerieEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SerieRepository extends JpaRepository<SerieEntity, Long> {

    @Query("""
            SELECT s FROM SerieEntity s
            JOIN s.genre g
            WHERE (:categoryId IS NULL OR g.id = :categoryId)
            AND (:title IS NULL OR LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%')))
            ORDER BY s.numberOfSeasons
            """)
    Page<SerieEntity> findSeriesByCategoryAndTitle(@Param("categoryId") Long categoryId,
                                                   @Param("title") String title,
                                                   Pageable pageable);
}
