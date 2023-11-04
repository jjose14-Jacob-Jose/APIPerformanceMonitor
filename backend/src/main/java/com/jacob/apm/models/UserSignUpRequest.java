package com.jacob.apm.models;

import lombok.Data;

@Data
public class UserSignUpRequest {
    private String nameFirst;
    private String nameLast;
    private String username;
    private String emailId;
    private String password;
    private String googleReCaptchaToken;
}
