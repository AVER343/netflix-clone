CREATE TABLE  IF NOT EXISTS   ACTIVE_STATUS(
   id            SERIAL       PRIMARY KEY, 
   active_status VARCHAR(24)     UNIQUE NOT NULL
   );
CREATE TABLE   IF NOT EXISTS  API_NAMES(
   id            SERIAL       PRIMARY KEY, 
   api_name      VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE   IF NOT EXISTS   USERS(
    id            SERIAL       PRIMARY KEY,
    email      VARCHAR(128) NOT NULL UNIQUE,
    username   VARCHAR(128) NOT NULL UNIQUE,
    password      VARCHAR(64) NOT NULL CONSTRAINT PASSWORD_LENGTH CHECK(char_length(password)>8),
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_time  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_verified BOOLEAN DEFAULT false,
    USER_ROLE_TYPE_ID SMALLINT NOT NULL    
);

CREATE TABLE   IF NOT EXISTS  USER_ROLE_TYPE(
    id            SERIAL       PRIMARY KEY ,
    user_role     VARCHAR(64)  UNIQUE 
);

CREATE TABLE   IF NOT EXISTS  QUEUE_TYPES(
   id            SERIAL       PRIMARY KEY, 
   "type"        VARCHAR(50) NOT NULL UNIQUE,
   priority      SMALLINT   DEFAULT(3) 
);


CREATE TABLE   IF NOT EXISTS  QUEUE_ACTIVE(
   id            SERIAL       PRIMARY KEY, 
   "type"        VARCHAR(50) NOT NULL,
   data          JSONB DEFAULT '{}',
   user_id       BIGINT 
);

CREATE TABLE   IF NOT EXISTS JOB_TABLE(
   id            BIGSERIAL       PRIMARY KEY, 
   "type"        VARCHAR(50) NOT NULL,
   data          JSONB DEFAULT '{}',
   user_id       BIGINT NOT NULL ,
   CREATED_TIME TIMESTAMP DEfAULT NOW(),
   MODIFIED_TIME TIMESTAMP DEFAULT NOW(),
   completed    BOOLEAN DEFAULT FALSE,
   completed_on TIMESTAMP 
);

CREATE TABLE   IF NOT EXISTS  USER_OTP(
    id            SERIAL       PRIMARY KEY ,
    OTP            VARCHAR(6)  ,
    email          VARCHAR(128) NOT NULL,
    generated_on TIMESTAMP DEFAULT now(),
    OTP_TRIED_FOR SMALLINT CHECK(OTP_TRIED_FOR<5) DEFAULT 0,
    OTP_ACTIVE BOOLEAN DEFAULT TRUE
);

CREATE TABLE   IF NOT EXISTS  ROLE_PERMISSIONS_API(
   id             SERIAL       PRIMARY KEY, 
   api_id         INTEGER      NOT NULL,
   role_type      SMALLINT     NOT NULL ,
   FOREIGN KEY(role_type) REFERENCES USER_ROLE_TYPE(id),
   FOREIGN KEY(api_id) REFERENCES API_NAMES(id) ,
   UNIQUE(role_type,api_id)
);

CREATE TABLE  IF NOT EXISTS   SPECIAL_PERMISSIONS(
   id             SERIAL       PRIMARY KEY, 
   api_id         INTEGER      NOT NULL,
   user_id        BIGINT       NOT NULL ,
   FOREIGN KEY(user_id) REFERENCES USERS(id),
   FOREIGN KEY(api_id) REFERENCES API_NAMES(id)  
);
CREATE TABLE  IF NOT EXISTS   CONTENT_TABLE(
   id             SERIAL       PRIMARY KEY, 
   data           JSONB     DEFAULT '{}' NOT NULL,
   ACTIVE_STATUS  SMALLINT   DEfAULT 1
   );
CREATE TABLE  IF NOT EXISTS   USER_DETAILS(
   id             BIGSERIAL       PRIMARY KEY, 
   active_status  SMALLINT DEfAULT 1,
   user_custom_properties  JSONB  DEFAULT '{}',
   FOREIGN KEY(id) REFERENCES USERS(id)  
   );
