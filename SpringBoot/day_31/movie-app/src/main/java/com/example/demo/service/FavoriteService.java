package com.example.demo.service;

import com.example.demo.entities.Favorite;
import com.example.demo.entities.Movie;
import com.example.demo.entities.Review;
import com.example.demo.entities.User;
import com.example.demo.exception.ResourceNotFoundException;

import com.example.demo.model.request.FavoriteRequest;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.MovieRepository;
import com.example.demo.security.CustomUserDetails;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    HttpSession httpSession;
    @Autowired
    MovieRepository movieRepository;

    //TODO: sử dụng SecurityContextHolder để lấy user
    //TODO: đang sai ở lâ favorites
    public Page<Favorite> findByUser_IdOrderByCreatedAtDesc(int page, int pageSize) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        PageRequest pageRequest = PageRequest.of(page-1, pageSize, Sort.by("createdAt").descending());
        return favoriteRepository.findByUser_IdOrderByCreatedAtDesc(user.getId(), pageRequest);
    }
    //TODO: đang sai ở lâ favorites
    public List<Favorite> findByUser_IdOrderByCreatedAtDesc(Integer userId) {
        return favoriteRepository.findByUser_IdOrderByCreatedAtDesc(userId);
    }

    //TODO: sử dụng SecurityContextHolder để lấy user
    public Favorite createFavorite(FavoriteRequest favoriteRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        //Kiểm tra xem movie có tồn tại hay không
        Movie movie = movieRepository.findById(favoriteRequest.getMovieId()).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        //Tạo review
        Favorite favorite = Favorite.builder()
                .createdAt(LocalDate.now())
                .movie(movie)
                .user(user).build();
        favoriteRepository.save(favorite);
        return favorite;
    }

    //TODO: sử dụng SecurityContextHolder để lấy user
    public void deleteFavorite(Integer movieid) {
        //Kiểm tra user này có tồn tại hay ko
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        //Kiểm tra review xem tồn tại ko
        Favorite favorite = favoriteRepository.findByMovie_IdAndUser_Id(movieid,user.getId()).orElseThrow(() -> new ResourceNotFoundException("Favorite not found"));

        //Kiểm tra xem review này có của user này ko
        if (!favorite.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized to update favorite");
        }

        favoriteRepository.delete(favorite);
    }
}
