package com.jacob.apm.models;

import lombok.Data;

@Data
public class ApmDashboardApiCall {

    private String username;
    private String googleReCaptchaToken;
    private APICall apiCall;

}
