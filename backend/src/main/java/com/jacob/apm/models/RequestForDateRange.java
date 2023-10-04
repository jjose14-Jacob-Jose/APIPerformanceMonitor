package com.jacob.apm.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class RequestForDateRange {
    private Date dateStart;
    private Date dateEnd;
}
