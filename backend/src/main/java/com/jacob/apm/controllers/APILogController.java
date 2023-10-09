package com.jacob.apm.controllers;

import com.jacob.apm.models.APICall;
import com.jacob.apm.models.RequestForDateRange;
import com.jacob.apm.services.APILogService;
import com.jacob.apm.utilities.APMLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/apiCall")
public class APILogController {

    @Autowired
    APILogService apiLogService;

    //    Receiving incoming requests from other APIs.

    /**
     * Receiving and stores incoming API call logs.
     * @param apiCall : Object of APICall containing details of the log.
     * @return String response from Service clas.
     */
    @PostMapping(value = "/save", produces = "application/json")
    public ResponseEntity<String> saveAPICall(@RequestBody APICall apiCall) {
        APMLogger.logMethodEntry("saveAPICall()");
        String operationStatus = apiLogService.saveToDatabaseAPICall(apiCall);
        APMLogger.logMethodExit("saveAPICall()");
        return ResponseEntity.ok(operationStatus);
    }

    /**
     * Returns list of all logs.
     * @return List of type APICall.
     */
    @PostMapping(value = "/getAll", produces = "application/json")
    public ResponseEntity<List<APICall>> getAll() {
        APMLogger.logMethodEntry("getAll()");
        List<APICall> listAPICalls = apiLogService.getAPICallsList();

        APMLogger.logMethodExit("getAll()");
        return ResponseEntity.ok(listAPICalls);
    }

    @PostMapping(value = "/getAll/range", produces = "application/json")
    public ResponseEntity<List<APICall>> getAllInDateRange(@RequestBody RequestForDateRange requestForDateRange) {
        String methodNameForLogger = "getAllInDateRange()";
        APMLogger.logMethodEntry(methodNameForLogger);

        List<APICall> listAPICalls = apiLogService.getAPICallsWithinRange(requestForDateRange.getDateTimeRangeStartString(), requestForDateRange.getDateTimeRangeEndString());

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
