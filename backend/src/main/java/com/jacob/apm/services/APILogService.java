package com.jacob.apm.services;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.models.APICall;
import com.jacob.apm.models.ApmDashboardApiCall;
import com.jacob.apm.repositories.APILogRepository;
import com.jacob.apm.utilities.APISystemTime;
import com.jacob.apm.utilities.APMLogger;
import com.jacob.apm.utilities.RecaptchaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class APILogService {

    @Autowired
    private APILogRepository incomingRequestsRepository;

    /**
     * Save an API from the APM Dashboard.
     * @param apmDashboardApiCall Object containing username, Google reCaptcha token, and API Log.
     * @return MainConstants.MSG_FAILURE or MainConstants.MSG_SUCCESS
     */
    public String saveToDbApiCallFromApmDashboard(ApmDashboardApiCall apmDashboardApiCall) {
        String methodNameForLogger = "saveToDatabaseAPICall()";
        APMLogger.logMethodEntry(methodNameForLogger);

//        Checking Google reCaptcha.
        if(! (RecaptchaUtil.validateRecaptcha(apmDashboardApiCall.getGoogleReCaptchaToken())))
            return MainConstants.MSG_FAILURE;

        if (apmDashboardApiCall == null || apmDashboardApiCall.getApiCall() == null)
            return MainConstants.MSG_FAILURE;

//        Adding username to the API caller name.
        APICall apiCallFromRequest = apmDashboardApiCall.getApiCall();
        String apiLogCallerNameWithUsername = apmDashboardApiCall.getUsername() + MainConstants.MSG_DELIMITER_USERNAME_TO_CALLER_NAME + apiCallFromRequest.getCallerName();
        apiCallFromRequest.setCallerName(apiLogCallerNameWithUsername);

        return saveToDatabaseAPICall(apiCallFromRequest);

    }

    /**
     *  Saves API to database.
     * @param apiCall: contains parameters to be saved to database.
     * @return boolean based on success of operation.
     */
    public String saveToDatabaseAPICall(APICall apiCall) {
        String methodNameForLogger = "saveToDatabaseAPICall()";
        APMLogger.logMethodEntry(methodNameForLogger);

        if(apiCall.getCallerTimestampUTC() == null || apiCall.getCallerTimestampUTC().equalsIgnoreCase(MainConstants.STRING_EMPTY))
            apiCall.setCallerTimestampUTC(APISystemTime.getInstantTimeAsString());
        apiCall.setCallId(null);

        try {
    //      Saving to database.
            incomingRequestsRepository.save(apiCall);
            APMLogger.logMethodExit(methodNameForLogger);
            return MainConstants.MSG_SUCCESS;

        } catch (Exception exception) {
            APMLogger.logError(methodNameForLogger, exception);
            return MainConstants.MSG_FAILURE;
        }
    }

    /**
     * Get all rows.
     * @return : ArrayList containing all API logs.
     */
    public List<APICall> getAPICallsList() {
        String methodNameForLogger = "getAPICallsList";
        APMLogger.logMethodEntry(methodNameForLogger);

        List<APICall> listAPICallsFromDB = null;

        try {
            listAPICallsFromDB = incomingRequestsRepository.findAll();
        } catch (Exception exception) {
            APMLogger.logError(methodNameForLogger, exception);
        }
        return listAPICallsFromDB;
    }

    /**
     * Return rows that are within the timeframe.
     * @param dateTimeRangeStartString : Timeframe start date (date, month, year, hour, and minutes).
     * @param dateTimeRangeEndString : Timeframe end date (date, month, year, hour, and minutes).
     * @return : ArrayList containing all API calls within the range.
     */
    public List<APICall> getAPICallsWithinRange(String dateTimeRangeStartString, String dateTimeRangeEndString) {
        String methodNameForLogger = "getAPICallsList";
        APMLogger.logMethodEntry(methodNameForLogger);

        List<APICall> listAPICallsFromDB = null;

        try {
            listAPICallsFromDB = incomingRequestsRepository.findByCallerTimestampUTCBetween(dateTimeRangeStartString, dateTimeRangeEndString);
        } catch (Exception exception) {
            APMLogger.logError(methodNameForLogger, exception);
        }
        return listAPICallsFromDB;
    }

    /**
     * Saves API call by a user in APM interface.
     * @param apmDashboardApiCall: Object containing username and also API call.
     * @return MainConstants.MSG_FAILURE or MainConstants.MSG_SUCCESS
     */
    public String handleApiLogFromApmUser(ApmDashboardApiCall apmDashboardApiCall) {

        String methodNameForLogger = "handleApiLogFromApmUser(): ";
        APMLogger.logMethodEntry(methodNameForLogger);

        if (apmDashboardApiCall == null || apmDashboardApiCall.getApiCall() == null) {
            APMLogger.logError("null object", new NullPointerException());
            return MainConstants.MSG_FAILURE;
        }


        APICall apiCall = apmDashboardApiCall.getApiCall();

        apiCall.setCallId(null);
        String apiCallIdWithCallerUsername = apmDashboardApiCall.getUsername() + MainConstants.MSG_DELIMITER_USERNAME_TO_CALLER_NAME + apiCall.getCallerName();
        apiCall.setCallerName(apiCallIdWithCallerUsername);

        saveToDatabaseAPICall(apiCall);

        APMLogger.logMethodExit("handleApiLogFromApmUser(): logged call by "+ apmDashboardApiCall.getUsername());
        return MainConstants.MSG_SUCCESS;

    }
}
