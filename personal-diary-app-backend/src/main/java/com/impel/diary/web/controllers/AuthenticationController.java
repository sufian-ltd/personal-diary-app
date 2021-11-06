package com.impel.diary.web.controllers;

import com.impel.diary.config.annotations.RestApiController;
import com.impel.diary.constants.AuthConstant;
import com.impel.diary.service.AuthenticationService;
import com.impel.diary.web.dto.request.SignInRequest;
import com.impel.diary.web.dto.request.SignUpRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestApiController
@AllArgsConstructor
@RequestMapping(AuthConstant.AUTH)
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping(AuthConstant.SIGNIN)
    public ResponseEntity<?> authenticateUser(@RequestBody SignInRequest signInRequest) {
        return authenticationService.signIn(signInRequest);
    }

    @PostMapping(AuthConstant.SIGNUP)
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        return authenticationService.signUp(signUpRequest);
    }

    @GetMapping(AuthConstant.GET_USER)
    public ResponseEntity<?> getLoggedInUser() {
        return new ResponseEntity<>(authenticationService.getUser(), HttpStatus.OK);
    }
}
