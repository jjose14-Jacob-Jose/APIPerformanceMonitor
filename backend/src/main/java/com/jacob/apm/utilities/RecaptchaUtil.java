package com.jacob.apm.utilities;

import com.jacob.apm.models.ReCaptchaResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class RecaptchaUtil {

    @Autowired
    private RestTemplate restTemplate;

    private boolean validateRecaptcha(String recaptchaResponse) {
        // Use RestTemplate or other HTTP client to send a POST request to the Google reCAPTCHA verification endpoint
        String url = "https://www.google.com/recaptcha/api/siteverify";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("secret", "YOUR_SECRET_KEY");
        map.add("response", recaptchaResponse);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<ReCaptchaResponse> reCaptchaApiResponse = restTemplate.postForEntity(url, request, ReCaptchaResponse.class);

        if (reCaptchaApiResponse.getBody() != null && reCaptchaApiResponse.getBody().isSuccess()) {
            return true; // reCAPTCHA validation successful
        }
        return false; // reCAPTCHA validation failed
    }

}
