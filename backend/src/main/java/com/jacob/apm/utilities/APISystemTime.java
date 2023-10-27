package com.jacob.apm.utilities;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.TimeZone;

public class APISystemTime {

    public static Instant getInstantTimeAsInstant () {
        return Instant.now();
    }

    public static String getInstantTimeAsString () {
        return getInstantTimeAsInstant().toString();
    }

    public static Date getInstantTimeAsUTCDate() {
        Instant instant = Instant.parse(getInstantTimeAsString());
        return Date.from(instant);
    }

}
