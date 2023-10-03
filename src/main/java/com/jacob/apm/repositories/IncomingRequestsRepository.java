package com.jacob.apm.repositories;

import com.jacob.apm.models.APICall;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomingRequestsRepository extends MongoRepository<APICall, String> {
    // Custom query methods here
}
