package com.jacob.apm.controllers;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.models.APICall;
import com.jacob.apm.models.RequestForDateRange;
import com.jacob.apm.models.RequestToAPICall;
import com.jacob.apm.services.MainService;
import com.jacob.apm.utilities.APMLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class MainController {

    @Autowired
    MainService mainService;

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
        APMLogger.logMethodExit("processAPICall()");
        return ResponseEntity.ok(response);
    }

//    Return list of all entries.
    @PostMapping(value = "/getAPICalls", produces = "application/json")
    public ResponseEntity<List<APICall>> getAPICalls() {
        APMLogger.logMethodEntry("getAPICalls()");
        List<APICall> listAPICalls = mainService.getAPICallsList();

        APMLogger.logMethodExit("getAPICalls()");
        return ResponseEntity.ok(listAPICalls);
    }

    @PostMapping(value = "/getAPICalls/range", produces = "application/json")
    public ResponseEntity<List<APICall>> getAPICallsInRange(@RequestBody RequestForDateRange requestForDateRange) {
        String methodNameForLogger = "getAPICallsInRange()";
        APMLogger.logMethodEntry(methodNameForLogger);

        List<APICall> listAPICalls = mainService.getAPICallsList(requestForDateRange.getDateStart(), requestForDateRange.getDateEnd());

        APMLogger.logMethodExit(methodNameForLogger);
        return ResponseEntity.ok(listAPICalls);
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
