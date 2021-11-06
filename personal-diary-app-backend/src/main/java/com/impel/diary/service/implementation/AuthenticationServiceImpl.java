package com.impel.diary.service.implementation;

import com.impel.diary.service.AuthenticationService;
import com.impel.diary.service.UserService;
import com.impel.diary.utils.JwtUtil;
import com.impel.diary.utils.Utils;
import com.impel.diary.web.dto.UserDTO;
import com.impel.diary.web.dto.request.SignInRequest;
import com.impel.diary.web.dto.request.SignUpRequest;
import com.impel.diary.web.dto.response.SignInResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@AllArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final Utils utils;

    @Override
    public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest) {
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getUserName(), signInRequest.getPassword())
            );
            if (authenticate.isAuthenticated()) {
                SignInResponse signInResponse = new SignInResponse();
                signInResponse.setToken(jwtUtil.generateToken(signInRequest.getUserName()));
                signInResponse.setUserName(signInRequest.getUserName());
                return new ResponseEntity<>(signInResponse, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> signUp(SignUpRequest signUpRequest) {
        UserDTO userDTO = userService.saveUser(signUpRequest);
        if (userDTO != null) {
            return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Override
    public UserDTO getUser() {
        return userService.getUserByUserName(utils.getLoggedInUserName());
    }
}
