package com.impel.diary.service.implementation;

import com.impel.diary.model.domain.User;
import com.impel.diary.model.repositories.UserRepository;
import com.impel.diary.service.UserService;
import com.impel.diary.web.dto.UserDTO;
import com.impel.diary.web.dto.request.SignUpRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserDTO saveUser(SignUpRequest signUpRequest) {
        User user = modelMapper.map(signUpRequest, User.class);
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO getUserByUserName(String userName) {
        User user = userRepository.findByUserName(userName);
        return modelMapper.map(user, UserDTO.class);
    }
}
