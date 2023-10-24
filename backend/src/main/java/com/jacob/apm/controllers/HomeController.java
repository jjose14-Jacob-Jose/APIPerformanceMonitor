package com.jacob.apm.controllers;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.utilities.APMLogger;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class HomeController {

    /**
     * Method to check server availability.
     * @return MainConstants.MSG_SUCCESS (String).
     */
    @GetMapping("/status")
    public String status() {
        APMLogger.logMethodEntry("status()");
        return MainConstants.MSG_SUCCESS;
    }

    @GetMapping("/home")
    public ModelAndView home() {
        APMLogger.logMethodEntry("home()");
        try {
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("home");
            return modelAndView;
        } catch (Exception exception) {
            return handleException(exception);
        }
    }

    @GetMapping("/login")
    public ModelAndView login() {
        try {
            APMLogger.logMethodEntry("login()");
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("login"); // Set the view name to your error page (e.g., "error.html")
            return modelAndView;

        } catch (Exception exception) {
            APMLogger.logError( "loginPage()", exception);
            return null;
        }
    }


    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception exception) {
        try {
            APMLogger.logMethodEntry("handleException() " + exception.toString());
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("error"); // Set the view name to your error page (e.g., "error.html")
            modelAndView.addObject("exceptionMessage", exception.toString()); // Specify attributes you want to pass to the error page.
            return modelAndView;

        } catch (Exception exceptionLocal) {
            APMLogger.logError("ERROR - EditionController - @ExceptionHandler(Exception.class) - handleException( " + exception.toString() + ")", exception);
            return null;
        }
    }


}
