
CREATE  TABLE user_details(
id  BIGINT,
first_name VARCHAR(32),
last_name   VARCHAR(32),
age INTEGER CHECK(age>0) ,
date_of_birth TIMESTAMP,
registered_date TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ,
gender VARCHAR(6) NOT NULL,
CHECK (gender IN ('Male', 'Female', 'Others')),
FOREIGN KEY(id) REFERENCES USERS(id));