package com.jacob.apm.repositories;

import com.jacob.apm.models.APICall;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface APILogRepository extends MongoRepository<APICall, String> {
    List<APICall> findByCallTimestampUTCBetween(String dateStart, String dateEnd);
}
