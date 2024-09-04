package com.devsuperior.movieflix.services;

import com.devsuperior.movieflix.dto.MovieCardDTO;
import com.devsuperior.movieflix.dto.MovieDetailsDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private AuthService authService;

    @Transactional(readOnly = true)
    public Page<MovieCardDTO> findMoviesByGenre(Integer genreId, Pageable pageable) {
        Page<Movie> moviePage = movieRepository.searchMoviesByGenre(genreId, pageable);

        User user = authService.authenticated();

        return moviePage.map(x -> new MovieCardDTO(x));
    }

    @Transactional(readOnly = true)
    public MovieDetailsDTO findById(Long id) {
        Optional<Movie> obj = movieRepository.findById(id);

        User user = authService.authenticated();

        Movie movie = obj.orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        return new MovieDetailsDTO(movie);
    }
}
