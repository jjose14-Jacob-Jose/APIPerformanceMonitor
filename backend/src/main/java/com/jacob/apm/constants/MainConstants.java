package com.jacob.apm.constants;

public class MainConstants {
    public static String MSG_SUCCESS = "SUCCESS";
    public static String MSG_REQUEST_RECEIVED = "RECEIVED";
    public static String MSG_FAILURE = "FAILED";
    public static String MSG_DUPLICATE_EMAIL_ID = "This email ID is already in use.";
    public static String MSG_DUPLICATE_USERNAME = "This username is already in use.";
    public static String STRING_EMPTY = "";
    public static String COOKIE_HEADER_AUTHORIZATION = "Authorization";
    public static String COOKIE_HEADER_LOGIN_STATUS = "Login_Status";
    public static String COOKIE_HEADER_LOGIN_STATUS_MESSAGE_SUCCESS = "Login Success";
    public static String COOKIE_HEADER_LOGIN_STATUS_MESSAGE_FAILED = "Invalid credentials";
    public static String COOKIE_HEADER_USERNAME = "username";
    public static String MSG_DELIMITER_MESSAGE_TO_MESSAGE = " ";
    public static String MSG_ACCOUNT_LOCK_STATUS_UNLOCKED = "Account Unlocked";
    public static String MSG_ACCOUNT_LOCK_STATUS_LOCKED = "Account locked";
    public static String URL_GOOGLE_RECAPTCHA_VERIFICATION = "https://www.google.com/recaptcha/api/siteverify";

    public static String KEY_GOOGLE_RECAPTCHA_SERVER = "6LcBzNYoAAAAAGpbkM0UzHd0HENtDSFFVZBqZyir";

    public static int JWT_TOKEN_VALIDITY_IN_HOURS = 24;

    public static boolean FLAG_SUCCESS = true;
    public static boolean FLAG_FAILURE = false;

    public static int DURATION_MILLISECONDS_IN_ONE_HOUR = 60 * 60 * 1000;
    
    public static int LOGIN_ATTEMPTS_FAILED_MAX_COUNT = 5;
    public static int LOGIN_ATTEMPTS_FAILED_RESET_VALUE = 0;


}
