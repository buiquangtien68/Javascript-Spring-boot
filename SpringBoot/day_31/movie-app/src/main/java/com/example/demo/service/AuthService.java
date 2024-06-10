package com.example.demo.service;


import com.example.demo.entities.User;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.enums.UserRole;
import com.example.demo.model.request.LoginRequest;
import com.example.demo.model.request.RegisterRequest;
import com.example.demo.model.request.UpdatePasswordRequest;
import com.example.demo.model.request.UpdateProfileUserRequest;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.CustomUserDetails;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final HttpSession httpSession;
    private final AuthenticationManager authenticationManager;


    //TODO: refactor Login
    public void login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            httpSession.setAttribute("MY_SESSION", authentication.getName());
        }catch (DisabledException e) {
            throw new BadRequestException("Tài khoản chưa được kích hoạt");
        }catch (AuthenticationException e) {
            throw new BadRequestException("Email or password is incorrect");
        }
    }

    public User createUser(RegisterRequest registerRequest) {
        //Cần kiểm tra user đã tồn tại hay chưa
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            throw new BadRequestException("Email is already in use");
        }
        //kiểm tra đã điền mật khẩu chưa
        if (registerRequest.getPassword() == null){
            throw new BadRequestException("Password is required");
        }
        if (!registerRequest.getConfirmPassword().equals(registerRequest.getPassword())){
            throw new BadRequestException("Passwords do not match");
        }

        //Lưu password vào database cần mã hóa password
        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .avatar("https://placehold.co/600x400?text=" +String.valueOf(registerRequest.getName().charAt(0)).toUpperCase())
                .createdAt(LocalDate.now())
                .updatedAt(LocalDate.now())
                .role(UserRole.USER)
                .build();
        userRepository.save(user);
        return user;
    }

    //TODO: sử dụng SecurityContextHolder để lấy user
    public User updateProfile(UpdateProfileUserRequest updateProfileUserRequest, Integer id) {
        //Kiểm tra user này có tồn tại hay ko
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        if (!Objects.equals(user.getId(), id)){
            throw new ResourceNotFoundException("User not found");
        }

        user.setName(updateProfileUserRequest.getName());
        user.setUpdatedAt(LocalDate.now());
        userRepository.save(user);
        return user;
    }

    //TODO: sử dụng SecurityContextHolder để lấy user
    public User updatePassword(UpdatePasswordRequest updatePasswordRequest, Integer id) {
        //Kiểm tra user này có tồn tại hay ko
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = (User) userDetails.getUser();

        if (!Objects.equals(user.getId(), id)){
            throw new ResourceNotFoundException("User not found");
        }

        if (!passwordEncoder.matches(updatePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Mật khẩu cũ sai");
        }
        if (!updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getConfirmPassword())){
            throw new BadRequestException("Mật khẩu mới và mật khẩu confirm khác nhau");
        }

        if (updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getOldPassword())){
            throw new BadRequestException("Mật khẩu mới và mật khẩu cũ giống nhau");
        }
        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);
        return user;
    }

    public void logout() {
        httpSession.setAttribute("user", null);
    }


}
