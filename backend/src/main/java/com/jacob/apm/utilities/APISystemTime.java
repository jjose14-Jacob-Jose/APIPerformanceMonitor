package com.jacob.apm.utilities;

import java.time.Instant;
import java.util.Date;

public class APISystemTime {

    public static String getInstantTimeAsString () {
        return Instant.now().toString();
    }
    public static Date getInstantTimeAsDate () {
        return Date.from(Instant.now());
    }

    public static Instant getInstantTimeAsInstant () {
        return Instant.now();
    }

}
