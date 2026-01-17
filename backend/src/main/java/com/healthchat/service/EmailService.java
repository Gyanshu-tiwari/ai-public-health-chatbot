package com.healthchat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOTPEmail(String recipientEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail);
            helper.setTo(recipientEmail);
            helper.setSubject("Health Chat - Password Recovery");

            String htmlContent = "<!DOCTYPE html>" +
                    "<html lang=\"en\">" +
                    "<head>" +
                    "<meta charset=\"UTF-8\">" +
                    "<title>OTP Email Template</title>" +
                    "</head>" +
                    "<body>" +
                    "<div style=\"font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2\">" +
                    "  <div style=\"margin:50px auto;width:70%;padding:20px 0\">" +
                    "    <div style=\"border-bottom:1px solid #eee\">" +
                    "      <a href=\"\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">Health Chat</a>" +
                    "    </div>" +
                    "    <p style=\"font-size:1.1em\">Hi,</p>" +
                    "    <p>Thank you for choosing Health Chat. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>" +
                    "    <h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">" + otp + "</h2>" +
                    "    <p style=\"font-size:0.9em;\">Regards,<br />Health Chat</p>" +
                    "    <hr style=\"border:none;border-top:1px solid #eee\" />" +
                    "    <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">" +
                    "      <p>Health Chat Inc</p>" +
                    "      <p>1600 Amphitheatre Parkway</p>" +
                    "      <p>California</p>" +
                    "    </div>" +
                    "  </div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }
}
