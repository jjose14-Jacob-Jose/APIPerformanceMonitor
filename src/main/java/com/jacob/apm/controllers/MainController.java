package com.jacob.apm.controllers;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.models.RequestToAPICall;
import com.jacob.apm.services.MainService;
import com.jacob.apm.utilities.APMLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MainController {

    @Autowired
    MainService mainService;

//    Return index.html
    public String index() {
        try {
            APMLogger.logMethodEntry("index()");
            return "index";
        } catch (Exception exception) {
            APMLogger.logError("index()", exception);
            return "error";
        }
    }

//    Method to be pinged by request-pinging service to ensure the server does not hibernate.
    @GetMapping("/status")
    public String status() {
        APMLogger.logMethodEntry("status()");
        return MainConstants.MSG_SUCCESS;
    }

//    Receiving incoming requests from other APIs.
    @PostMapping(value = "/apiCall", produces = "application/json")
    public ResponseEntity<String> processAPICall(@RequestBody RequestToAPICall requestToAPICall) {
        APMLogger.logMethodEntry("processAPICall()");

        boolean isOperationASuccess = mainService.saveToDatabaseAPICall(requestToAPICall);
        String response;
        if (isOperationASuccess)
            response = MainConstants.MSG_SUCCESS;
        else
            response = MainConstants.MSG_FAILURE;

        return ResponseEntity.ok(response);
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
