package com.jacob.apm.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class User {

    private String userName;
    private String passwordHash;
    private String nameFirst;
    private String nameLast;
    private String timestampRegistration;
    private int loginAttemptsFailed;

}
