package com.impel.diary.service;

import com.impel.diary.web.dto.UserDTO;
import com.impel.diary.web.dto.request.SignInRequest;
import com.impel.diary.web.dto.request.SignUpRequest;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {

    ResponseEntity<?> signIn(SignInRequest signInRequest);

    ResponseEntity<?> signUp(SignUpRequest signUpRequest);

    UserDTO getUser();
}
