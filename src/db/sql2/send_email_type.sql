CREATE TABLE SEND_EMAIL_TYPE(
   id            SERIAL       PRIMARY KEY, 
   "type"         VARCHAR(50) NOT NULL 
);
INSERT INTO SEND_EMAIL_TYPE(type) VALUES('email_verification');
INSERT INTO SEND_EMAIL_TYPE(type) VALUES('account_verification');


