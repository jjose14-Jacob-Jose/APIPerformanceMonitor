package com.jacob.apm.services;

import com.jacob.apm.constants.MainConstants;
import com.jacob.apm.models.APMUser;
import com.jacob.apm.repositories.APMUserRepository;
import com.jacob.apm.utilities.APISystemTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class APMUserServiceTest {

    @Mock
    private APMUserRepository apmUserRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private APMUserService apmUserService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize annotated mocks
    }

    private List<APMUser> getAPMUserList() {

        List<APMUser> listAPMUsers = new ArrayList<APMUser>();

        // Create a user instance
        APMUser apmUser1 = new APMUser();
        apmUser1.setUsername("username");
        apmUser1.setNameFirst("First");
        apmUser1.setNameLast("Last");
        apmUser1.setEmailId("first.last@email.com");
        apmUser1.setPassword("passwordHash");
        apmUser1.setTimestampRegistration(APISystemTime.getInstantTimeAsString());
        apmUser1.setLoginAttemptsFailed(0);
        listAPMUsers.add(apmUser1);

        APMUser apmUser2 = new APMUser();
        apmUser2.setUsername("username2");
        apmUser2.setNameFirst("First2");
        apmUser2.setNameLast("Last2");
        apmUser2.setEmailId("first.last2@email.com");
        apmUser2.setPassword("passwordHash2");
        apmUser2.setTimestampRegistration(APISystemTime.getInstantTimeAsString());
        apmUser2.setLoginAttemptsFailed(1);
        listAPMUsers.add(apmUser2);

        return listAPMUsers;
    }

    @Test
    void testSaveUserToDatabase1() {

        APMUser apmUser = getAPMUserList().get(0);

        // Set up the behavior of apmUserRepository.save
        Mockito.when(apmUserRepository.save(apmUser)).thenReturn(apmUser);

        // Perform the action you're testing
        String result = apmUserService.saveUserToDatabase(apmUser);

        // Verify that the repository's save method was called
        Mockito.verify(apmUserRepository).save(apmUser);

        // Assert the expected outcome of the test
        assertEquals(MainConstants.MSG_SUCCESS, result);
    }

    @Test
    void testSaveUserWithDuplicateEmail() {
        // Create a new user with a duplicate email ID
        APMUser newUser = new APMUser();
        newUser.setEmailId("existing.email@example.com");

        // Mock the behavior of apmUserRepository.findAPMUserByEmailID to return an existing user
        Mockito.when(apmUserRepository.findAPMUserByEmailId(newUser.getEmailId()))
                .thenReturn(newUser);

        // Perform the action you're testing
        String result = apmUserService.saveUserToDatabase(newUser);

        // Verify that the repository's findAPMUserByEmailID method was called
        Mockito.verify(apmUserRepository).findAPMUserByEmailId(newUser.getEmailId());

        // Assert the expected outcome of the test
        assertEquals(MainConstants.MSG_DUPLICATE_EMAIL_ID, result);
    }

    @Test
    void testSaveUserWithDuplicateUsername() {
        APMUser newUser = new APMUser();
        newUser.setUsername("usernameForTest");

        // Mock the behavior of apmUserRepository.findAPMUserByUserName to return an existing user
        Mockito.when(apmUserRepository.findAPMUserByUsername(newUser.getUsername()))
                .thenReturn(newUser);

        // Perform the action you're testing
        String result = apmUserService.saveUserToDatabase(newUser);

        // Verify that the repository's findAPMUserByEmailID method was called
        Mockito.verify(apmUserRepository).findAPMUserByUsername(newUser.getUsername());

        // Assert the expected outcome of the test
        assertEquals(MainConstants.MSG_DUPLICATE_USERNAME, result);
    }

    @Test
    void testGetAPMUserWithUserName1() {

        APMUser apmUser = getAPMUserList().get(0);
        String username = "testUsernameForMockito";
        apmUser.setUsername(username);

//        Specifying what repository should when it receives a call to 'findAPMUserByUser' with 'username' as variable.
        Mockito.when(apmUserRepository.findAPMUserByUsername(username)).thenReturn(apmUser);

//        Calling service this, this will invoking the Mockito method.
        APMUser apmUserWithUsernameFromDB = apmUserService.getAPMUserByUsername(username);

//        Ensuring the service class in previous line has called the mocked repository method.
        Mockito.verify(apmUserRepository).findAPMUserByUsername(username);

        assertNotNull(apmUserWithUsernameFromDB);
        assertEquals(apmUserWithUsernameFromDB, apmUser);

    }

    @Test
    void testGetAPMUserWithUserName2() {

        APMUser apmUser1 = getAPMUserList().get(0);
        String username = "testUsernameForMockito";
        apmUser1.setUsername(username);

        APMUser apmUser2 = getAPMUserList().get(1);

//        Specifying what repository should when it receives a call to 'findAPMUserByUser' with 'username' as variable.
        Mockito.when(apmUserRepository.findAPMUserByUsername(username)).thenReturn(apmUser2);

//        Calling service this, this will invoking the Mockito method.
        APMUser apmUserWithUsernameFromDB = apmUserService.getAPMUserByUsername(username);

//        Ensuring the service class in previous line has called the mocked repository method.
        Mockito.verify(apmUserRepository).findAPMUserByUsername(username);

        assertNotNull(apmUserWithUsernameFromDB);
        assertNotEquals(apmUserWithUsernameFromDB, apmUser1);

    }

    @Test
    void testGetAPMUserWithEmailID1() {

        APMUser apmUser = getAPMUserList().get(0);
        String emailID = "testEmail@email.com";
        apmUser.setEmailId(emailID);

//        Specifying what repository should when it receives a call to 'findAPMUserByUser' with 'username' as variable.
        Mockito.when(apmUserRepository.findAPMUserByEmailId(emailID)).thenReturn(apmUser);

//        Calling service this, this will invoking the Mockito method.
        APMUser apmUserWithEmailIDFromDB = apmUserService.getAPMUserByEmailID(emailID);

//        Ensuring the service class in previous line has called the mocked repository method.
        Mockito.verify(apmUserRepository).findAPMUserByEmailId(emailID);

        assertNotNull(apmUserWithEmailIDFromDB);
        assertEquals(apmUserWithEmailIDFromDB, apmUser);

    }

    @Test
    void testGetAPMUserWithEmailID2() {

        APMUser apmUser = getAPMUserList().get(0);
        String emailID = "testEmail@email.com";
        apmUser.setEmailId(emailID);

        APMUser apmUser2 = getAPMUserList().get(1);

//        Specifying what repository should when it receives a call to 'findAPMUserByUser' with 'username' as variable.
        Mockito.when(apmUserRepository.findAPMUserByEmailId(emailID)).thenReturn(apmUser2);

//        Calling service this, this will invoking the Mockito method.
        APMUser apmUserWithEmailIDFromDB = apmUserService.getAPMUserByEmailID(emailID);

//        Ensuring the service class in previous line has called the mocked repository method.
        Mockito.verify(apmUserRepository).findAPMUserByEmailId(emailID);

        assertNotNull(apmUserWithEmailIDFromDB);
        assertNotEquals(apmUserWithEmailIDFromDB, apmUser);

    }

    @Test
    void testUnlockAPMUserAfterDurationInHours1() {

        long durationMaxForAccountLockInHours = 2;
        int loginAttemptsFailed = 2;
        Instant instantTimestampNow = Instant.now();

        APMUser apmUser = getAPMUserList().get(0);
        apmUser.setLoginAttemptsFailed(loginAttemptsFailed);
        apmUser.setTimestampAccountLocked(instantTimestampNow.toString());
        String accountStatus = apmUserService.unlockAPMUserAfterDurationInHours(apmUser, durationMaxForAccountLockInHours);

        assertEquals(accountStatus, MainConstants.MSG_ACCOUNT_LOCK_STATUS_LOCKED);
    }

    @Test
    void testUnlockAPMUserAfterDurationInHours2() {

        long durationMaxForAccountLockInHours = 2;
        int loginAttemptsFailed = 2;
        Instant instantTimestampNow = Instant.now().minus(Duration.ofHours(durationMaxForAccountLockInHours * 2));

        APMUser apmUser = getAPMUserList().get(0);
        apmUser.setLoginAttemptsFailed(loginAttemptsFailed);
        apmUser.setTimestampAccountLocked(instantTimestampNow.toString());
        String accountStatus = apmUserService.unlockAPMUserAfterDurationInHours(apmUser, durationMaxForAccountLockInHours);

        assertEquals(accountStatus, MainConstants.MSG_ACCOUNT_LOCK_STATUS_UNLOCKED);
    }
}