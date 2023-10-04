package com.jacob.apm.services;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.models.APICall;
import com.jacob.apm.repositories.IncomingRequestsRepository;
import com.jacob.apm.utilities.APISystemTime;
import com.jacob.apm.utilities.APMLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class MainService {

    @Autowired
    private IncomingRequestsRepository incomingRequestsRepository;

    /**
     *  Saves record to database.
     * @param apiCall: contains parameters to be saved to database.
     * @return boolean based on success of operation.
     */
    public boolean saveToDatabaseAPICall(APICall apiCall) {
        String methodNameForLogger = "saveToDatabaseAPICall()";
        APMLogger.logMethodEntry(methodNameForLogger);

        if(apiCall.getCallTimestampUTC() == null)
            apiCall.setCallTimestampUTC(APISystemTime.getInstantTimeAsString());

        try {
    //      Saving to database.
            incomingRequestsRepository.save(apiCall);
            APMLogger.logMethodExit(methodNameForLogger);
            return MainConstants.FLAG_SUCCESS;

        } catch (Exception exception) {
            APMLogger.logError(methodNameForLogger, exception);
            return MainConstants.FLAG_FAILURE;
        }
    }

    /**
     * Get all rows.
     * @return : ArrayList containing all API logs.
     */
    public List<APICall> getAPICallsList () {
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
     * @param dateStart : Timeframe start date (date, month, year, hour, and minutes).
     * @param dateEnd : Timeframe end date (date, month, year, hour, and minutes).
     * @return : ArrayList containing all API calls within the range.
     */
    public List<APICall> getAPICallsList (Date dateStart, Date dateEnd) {
        String methodNameForLogger = "getAPICallsList";
        APMLogger.logMethodEntry(methodNameForLogger);

        List<APICall> listAPICallsFromDB = null;

        try {
            listAPICallsFromDB = incomingRequestsRepository.findByCallTimestampUTCBetween(dateStart, dateEnd);
        } catch (Exception exception) {
            APMLogger.logError(methodNameForLogger, exception);
        }
        return listAPICallsFromDB;
    }

}
