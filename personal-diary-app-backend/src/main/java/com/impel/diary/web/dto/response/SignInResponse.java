package com.impel.diary.web.dto.response;

import lombok.Data;

@Data
public class SignInResponse {

    private String userName;
    private String token;
}
