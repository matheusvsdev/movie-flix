package com.devsuperior.movieflix.repositories;

import com.devsuperior.movieflix.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m " +
            "WHERE (:genreId IS NULL OR m.genre.id = :genreId) " +
            "ORDER BY m.title")
    Page<Movie> searchMoviesByGenre(@Param("genreId") Integer genreId, Pageable pageable);
}
