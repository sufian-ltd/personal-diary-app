package com.impel.diary.service;

import com.impel.diary.web.dto.UserDTO;
import com.impel.diary.web.dto.request.SignUpRequest;

public interface UserService {
    UserDTO saveUser(SignUpRequest signUpRequest);

    UserDTO getUserByUserName(String userName);
}
