package com.jacob.apm.utilities;

import java.time.Instant;

public class APISystemTime {

    public static String getInstantTimeAsString () {
        return Instant.now().toString();
    }

}
