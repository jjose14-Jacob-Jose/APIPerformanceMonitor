package com.stc.apm.controllers;

import com.stc.apm.constants.MainConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@Tag(name = "Home", description = "Endpoints for HTML pages")
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class.getName());

    /**
     * Method to check server availability.
     * @return MainConstants.MSG_SUCCESS (String).
     */
    @GetMapping("/status")
    @Operation(summary = "Check server availability", description = "This endpoint checks if the server is up and running and returns a success message.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Server is available",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    public String status() {
        logger.info("Request received at /status.");
        return MainConstants.MSG_SUCCESS;
    }

    @GetMapping("/home")
    @Operation(summary = "Home page", description = "This endpoint returns the home page view.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved home page"),
            @ApiResponse(responseCode = "500", description = "Failed to retrieve home page")
    })
    public ModelAndView home() {
        logger.info("Request received at /home.");
        try {
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("home");
            return modelAndView;
        } catch (Exception exception) {
            logger.error("Failed to get /home. exception: {}", exception.getMessage());
            return handleException(exception);
        }
    }

    @GetMapping({"/login", "/"})
    @Operation(summary = "Login page", description = "This endpoint returns the login page view.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved login page"),
            @ApiResponse(responseCode = "500", description = "Failed to retrieve login page")
    })
    public ModelAndView login() {
        logger.info("Request received at /login.");
        try {
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("login"); // Set the view name to your error page (e.g., "error.html")
            return modelAndView;

        } catch (Exception exception) {
            logger.error("Failed to get login page. exception: {}", exception.getMessage());
            return null;
        }
    }

    @GetMapping({"/signup"})
    @Operation(summary = "Sign-up page", description = "This endpoint returns the sign-up page view.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved sign-up page"),
            @ApiResponse(responseCode = "500", description = "Failed to retrieve sign-up page")
    })
    public ModelAndView signUp() {
        logger.info("Request received at /signup.");
        try {
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("signup"); // Set the view name to your error page (e.g., "error.html")
            return modelAndView;

        } catch (Exception exception) {
            logger.error("Failed to retrieve /signup. exception: {}", exception.getMessage());
            return null;
        }
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception exception) {
        logger.error("Exception occurred while calling HTML endpoints. exception: {}", exception.getMessage());
        try {
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("error"); // Set the view name to your error page (e.g., "error.html")
            modelAndView.addObject("exceptionMessage", exception.toString()); // Specify attributes you want to pass to the error page.
            return modelAndView;

        } catch (Exception exceptionLocal) {
            logger.error("Exception while handling HTML-API exception. exceptionLocal: {}", exceptionLocal.getMessage());
            return null;
        }
    }


}
