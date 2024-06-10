package com.example.demo.service;

import com.example.demo.entities.Movie;
import com.example.demo.entities.Review;
import com.example.demo.entities.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.request.UpsertReviewRequest;
import com.example.demo.repository.MovieRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.CustomUserDetails;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    HttpSession httpSession;

    public List<Review> findByMovie_IdOrderByCreatedAtDesc(Integer movieId) {
        return reviewRepository.findByMovie_IdOrderByCreatedAtDesc(movieId);
    }

    //TODO: sử dụng SecurityContextHolder để lấy user
    public Review createReview(UpsertReviewRequest reviewRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        //Kiểm tra xem movie có tồn tại hay không
        Movie movie = movieRepository.findById(reviewRequest.getMovieId()).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        //Tạo review
        Review review = Review.builder()
                .content(reviewRequest.getContent())
                .rating(reviewRequest.getRating())
                .createdAt(LocalDate.now())
                .updatedAt(LocalDate.now())
                .movie(movie)
                .user(user).build();
        reviewRepository.save(review);
        return review;
    }

    //TODO: sử dụng SecurityContextHolder để lấy user
    public Review updateReview(UpsertReviewRequest reviewRequest, Integer id) {
        //Kiểm tra review xem tồn tại ko
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        //Kiểm tra user này có tồn tại hay ko
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        //Kiểm tra xem movie có tồn tại hay không
        Movie movie = movieRepository.findById(reviewRequest.getMovieId()).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        //Kiểm tra xem review này có của user này ko
        if (!review.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized to update review");
        }

        //Kểm tra xem review này có thuộc movie hay k
        if (!review.getMovie().getId().equals(movie.getId())) {
            throw new RuntimeException("Not review's movie");
        }

        review.setContent(reviewRequest.getContent());
        review.setRating(reviewRequest.getRating());
        review.setUpdatedAt(LocalDate.now());
        reviewRepository.save(review);
        return review;

    }


    //TODO: sử dụng SecurityContextHolder để lấy user
    public void deleteReview(Integer id) {
        //Kiểm tra review xem tồn tại ko
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        //Kiểm tra user này có tồn tại hay ko
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        //Kiểm tra xem review này có của user này ko
        if (!review.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized to update review");
        }

        reviewRepository.delete(review);
    }
}
