package com.jacob.apm.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString
@Document(collection = "api_calls")
public class APICall {

//    Following arguments represent the columns on the table 'incoming_requests'.
//    Data type of the arguments will be same as that in the table.

    @Id
    private String id; // Use a String id for MongoDB
    private String message;
    private String timeStampSystem;

}
