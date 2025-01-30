package com.matheusvsdev.backendmovieflix.repository;

import com.matheusvsdev.backendmovieflix.entities.MovieEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity, Long> {

    @Query("""
            SELECT m FROM MovieEntity m
            JOIN m.genre g
            WHERE (:categoryId IS NULL OR g.id = :categoryId)
            AND (:title IS NULL OR LOWER(m.title) LIKE LOWER(CONCAT('%', :title, '%')))
            ORDER BY m.title
            """)
    Page<MovieEntity> findMoviesByCategoryAndTitle(@Param("categoryId") Long categoryId,
                                                   @Param("title") String title,
                                                   Pageable pageable);
}
