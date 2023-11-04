package com.jacob.apm.utilities;

import com.jacob.apm.constants.MainConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APMLogger {
    private static final Logger logger = LoggerFactory.getLogger(APMLogger.class.getName());

//    To be called when entering a method.
    public static void logMethodEntry(String message) {

        logger.info(message + MainConstants.MSG_DELIMITER_MESSAGE_TO_MESSAGE + MainConstants.MSG_REQUEST_RECEIVED);
    }

//    To be called just-before exiting a method.
    public static void logMethodExit(String message) {
        logger.info(message + MainConstants.MSG_DELIMITER_MESSAGE_TO_MESSAGE + MainConstants.MSG_SUCCESS);
    }

    public static void logError(String message, Throwable throwable) {

        logger.error(message + MainConstants.MSG_DELIMITER_MESSAGE_TO_MESSAGE + MainConstants.MSG_FAILURE, throwable);
    }

    public static void logError(String message) {

        logger.error(message + MainConstants.MSG_DELIMITER_MESSAGE_TO_MESSAGE + MainConstants.MSG_FAILURE);
    }
    public static void logInfo(String message) {

        logger.info(message);
    }

}
