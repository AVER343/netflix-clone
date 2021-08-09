INSERT INTO API_NAMES(API_NAME) VALUES('ROLE');

INSERT INTO USER_ROLE_TYPE(user_role) VALUES('ADMIN');
INSERT INTO USER_ROLE_TYPE(user_role) VALUES('DEFAULT');

/* TODO ------------- AUTOMATE */
INSERT INTO ACTIVE_STATUS(active_status) 
       VALUES ('ACTIVE'),('INACTIVE'),('DELETED'); 
       
INSERT INTO api_names(api_name) VALUES('PUT_ROLE');
INSERT INTO api_names(api_name) VALUES('GET_ROLE');
INSERT INTO api_names(api_name) VALUES('ME');

INSERT INTO ROLE_PERMISSIONS_API(api_id,role_type) 
       VALUES( 
               (SELECT id from API_NAMES where api_name='ROLE'),
               (SELECT id from USER_ROLE_TYPE WHERE user_role='ADMIN')
               );

INSERT INTO ROLE_PERMISSIONS_API(api_id,role_type) 
       VALUES (
               (SELECT id from API_NAMES where api_name='PUT_ROLE'),
               (SELECT id from USER_ROLE_TYPE WHERE user_role='ADMIN')
        ); 

INSERT INTO ROLE_PERMISSIONS_API(api_id,role_type) 
       VALUES ( 
               (SELECT id from API_NAMES where api_name='ME'),
               (SELECT id from USER_ROLE_TYPE WHERE user_role='ADMIN')
        ); 

