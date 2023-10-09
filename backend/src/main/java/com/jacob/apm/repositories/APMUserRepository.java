package com.jacob.apm.repositories;

import com.jacob.apm.models.APMUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface APMUserRepository extends MongoRepository<APMUser, String> {
    APMUser findAPMUserByUserName(String username);
    APMUser findAPMUserByEmailID(String emailID);
}
