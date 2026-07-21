package com.Company.SMS.Service;

import io.mailtrap.client.MailtrapClient;
import io.mailtrap.config.MailtrapConfig;
import io.mailtrap.factory.MailtrapClientFactory;
import io.mailtrap.model.request.emails.Address;
import io.mailtrap.model.request.emails.MailtrapMail;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Slf4j
@Service
public class EmailAndPasswordService {

    private static final String TOKEN = "092d26fefbcc9b8a17fe12162379b4ac";

    private static final SecureRandom RANDOM = new SecureRandom();

    private static final String PASSWORD_CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                    "abcdefghijklmnopqrstuvwxyz" +
                    "0123456789" +
                    "!@#$%^&*";

    private static final int PASSWORD_LENGTH = 16;

    /**
     * Generates a secure random password.
     */
    public String generatePassword() {

        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);

        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            password.append(
                    PASSWORD_CHARACTERS.charAt(
                            RANDOM.nextInt(PASSWORD_CHARACTERS.length())
                    )
            );
        }

        return password.toString();
    }

    /**
     * Sends password email.
     */
    public void sendPasswordEmail(String password, String email) {

        MailtrapConfig config = new MailtrapConfig.Builder()
                .token(TOKEN)
                .build();

        MailtrapClient client = MailtrapClientFactory.createMailtrapClient(config);

        MailtrapMail mail = MailtrapMail.builder()
                .from(new Address(
                        "ntgsms.noreply@demomailtrap.co",
                        "NTG School Management System"))
                .to(List.of(new Address(email)))
                .subject("Welcome to NTG School Management System")
                .text("""
                        Welcome to NTG School Management System.
                        
                        Your account has been created successfully.
                        
                        Email:
                        %s
                        
                        Temporary Password:
                        %s
                        
                        Please change your password after your first login.
                        """.formatted(email, password))
                .build();

        try {

            log.info("Sending password email to {}", email);

            var response = client.send(mail);

            log.info("Email sent successfully.");
            log.info("Mailtrap Response: {}", response);

        } catch (Exception e) {

            log.error("==============================================");
            log.error("EMAIL COULD NOT BE SENT");
            log.error("Recipient : {}", email);
            log.error("Generated Password : {}", password);
            log.error("Reason : {}", e.getMessage());
            log.error("==============================================");
        }
    }
}