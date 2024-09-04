package com.devsuperior.movieflix.services;

import com.devsuperior.movieflix.dto.MovieDetailsDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private AuthService authService;

    @Transactional
    public ReviewDTO insert(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setText(reviewDTO.getText());

        Movie movie = movieRepository.findById(reviewDTO.getMovieId())
                        .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        review.setMovie(movie);

        User user = authService.authenticated();
        review.setUser(user);

        review = repository.save(review);

        return new ReviewDTO(review);
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> findReviewsByMovieId(Long movieId) {
        List<Review> reviews = repository.searchByMovieId(movieId);
        return reviews.stream().map(review -> new ReviewDTO(review)).collect(Collectors.toList());
    }
}
