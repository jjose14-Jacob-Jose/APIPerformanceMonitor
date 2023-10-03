package com.jacob.apm.services;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.models.APICall;
import com.jacob.apm.models.RequestToAPICall;
import com.jacob.apm.repositories.IncomingRequestsRepository;
import com.jacob.apm.utilities.APISystemTime;
import com.jacob.apm.utilities.APMLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {

    @Autowired
    private IncomingRequestsRepository incomingRequestsRepository;

    /**
     *  Saves record to database.
     * @param requestToAPICall: contains parameters to be saved to databse.
     * @return boolean based on success of operation.
     */
    public boolean saveToDatabaseAPICall(RequestToAPICall requestToAPICall) {
        String methodNameForLogs = "saveToDatabaseAPICall()";
        APMLogger.logMethodEntry(methodNameForLogs);

//        Mapping arguments to Database model.
        APICall APICall = new APICall();
        APICall.setMessage(requestToAPICall.getMessage());
        APICall.setTimeStampSystem(APISystemTime.getInstantTimeAsString());

        try {
    //      Saving to database.
            incomingRequestsRepository.save(APICall);
            APMLogger.logMethodExit(methodNameForLogs);
            return MainConstants.FLAG_SUCCESS;

        } catch (Exception exception) {
            APMLogger.logError(methodNameForLogs, exception);
            return MainConstants.FLAG_FAILURE;
        }
    }

    public List<APICall> getAPICallsList () {
        String methodNameForLogs = "getAPICallsList";
        APMLogger.logMethodEntry(methodNameForLogs);

        List<APICall> listAPICallsFromDB = null;

        try {
            listAPICallsFromDB = incomingRequestsRepository.findAll();
        } catch (Exception exception) {
            APMLogger.logError(methodNameForLogs, exception);
        }
        return listAPICallsFromDB;
    }

}
