package com.jacob.apm.repositories;

import com.jacob.apm.models.APMUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface APMUserRepository extends MongoRepository<APMUser, String> {
    Optional<APMUser> findByUsername(String username);
    APMUser findAPMUserByUsername(String username);
    APMUser findAPMUserByEmailId(String emailId);
}
