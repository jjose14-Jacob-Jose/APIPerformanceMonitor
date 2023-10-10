package com.jacob.apm.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Getter
@Setter
@ToString
@Document(collection = "apm_users")
public class APMUser {

    @Id
    private String userName;

//    emailId should be unique.
    @Indexed(unique = true)
    private String emailID;

    private String password;
    private String nameFirst;
    private String nameLast;
    private String roles;

    private String timestampRegistration;
    private int loginAttemptsFailed;
    private String timestampAccountLocked;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof APMUser apmUser)) return false;
        return getLoginAttemptsFailed() == apmUser.getLoginAttemptsFailed() && Objects.equals(getUserName(), apmUser.getUserName()) && Objects.equals(getEmailID(), apmUser.getEmailID()) && Objects.equals(getPassword(), apmUser.getPassword()) && Objects.equals(getNameFirst(), apmUser.getNameFirst()) && Objects.equals(getNameLast(), apmUser.getNameLast()) && Objects.equals(getTimestampRegistration(), apmUser.getTimestampRegistration()) && Objects.equals(getTimestampAccountLocked(), apmUser.getTimestampAccountLocked());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserName(), getEmailID(), getPassword(), getNameFirst(), getNameLast(), getTimestampRegistration(), getLoginAttemptsFailed(), getTimestampAccountLocked());
    }
}