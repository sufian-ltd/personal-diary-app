package com.impel.diary.web.dto.request;

import lombok.Data;

@Data
public class SignInRequest {

    private String userName;
    private String password;
}
