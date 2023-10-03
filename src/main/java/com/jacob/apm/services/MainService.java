package com.jacob.apm.services;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.models.APICall;
import com.jacob.apm.models.RequestToAPICall;
import com.jacob.apm.repositories.IncomingRequestsRepository;
import com.jacob.apm.utilities.APISystemTime;
import com.jacob.apm.utilities.APMLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainService {

    @Autowired
    private IncomingRequestsRepository repository;

    public boolean saveToDatabaseAPICall(RequestToAPICall requestToAPICall) {

        APMLogger.logMethodEntry("saveToDatabaseAPICall()") ;
//        Mapping arguments to Database model.
        APICall APICall = new APICall();
        APICall.setMessage(requestToAPICall.getMessage());
        APICall.setTimeStampSystem(APISystemTime.getInstantTimeAsString());

        try {
    //      Saving to database.
            repository.save(APICall);
            APMLogger.logMethodExit("saveToDatabaseAPICall()");
            return MainConstants.FLAG_SUCCESS;

        } catch (Exception exception) {
            APMLogger.logError("saveToDatabaseAPICall()", exception);
            return MainConstants.FLAG_FAILURE;
        }
    }
}
