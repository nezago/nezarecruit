
/** CREATION AND OPERATIONS ON TABLES */

/** ======================================================================== */

/** 1. TABLE USERS */
export const CREATE_TABLE_USERS = `
    DROP TABLE IF EXISTS users CASCADE; 
    CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY, 
    fname VARCHAR(255),
    middle_name VARCHAR(255),
    lname VARCHAR(255),
    date_of_birth DATE,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    user_registered_at timestamp,
    user_edited_at timestamp,
    user_authorities VARCHAR(255));`;

export const ADD_DEFAULT_USER = (hashedKey) => (`INSERT INTO users(
        fname,
        middle_name,
        lname,
        date_of_birth,
        email,
        password,
        user_registered_at,
        user_edited_at,
        user_authorities
    ) VALUES(
        'MUGIRASE',
        'descholar',
        'Emmanuel',
        '1990-1-1',
        'emmamugira@gmail.com',
        '${hashedKey}',
        NOW(),
        NOW(),
        'SUPERUSER');`);
export const ADD_NEW_USER = `INSERT INTO users(
        fname,
        middle_name,
        lname,
        date_of_birth,
        email,
        password,
        user_registered_at,
        user_edited_at,
        user_authorities)
VALUES($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7);`;

/** CHECKING IF AN EMAIL EXISTS FROM TABLE USERS OR NOT */
export const CHECK_EMAIL_FROM_TABLE_USERS = `
SELECT EXISTS(SELECT 1 FROM users WHERE email = $1);
`;

/** GET A USER BY EMAIL */
export const GET_USER_BY_EMAIL = `
SELECT * FROM users WHERE email=$1;
`;
/** ============================================================================= */
/** ============================================================================= */


/** 2. TABLE APPLICATION FOR MEMBERSHIP */
export const CREATE_TABLE_APPLICATIONS = `DROP TABLE IF EXISTS 
     applications_for_job CASCADE;
     CREATE TABLE IF NOT EXISTS applications_for_job (
     application_id SERIAL PRIMARY KEY, 
     fname VARCHAR(255),
     middle_name VARCHAR(255),
     lname VARCHAR(255),
     gender CHAR,
     country_residence VARCHAR(255),
     education_level VARCHAR(50),
     graduation_year INT,
     field_of_study VARCHAR(50),
     employed_before VARCHAR(50),
     job_position VARCHAR(50),
     started_programming_year INT,
     currently_employed VARCHAR(50),
     date_of_birth DATE,
     email VARCHAR(50) UNIQUE,
     phone_number VARCHAR(20),
     linkedin_profile VARCHAR(255),
     applied_at timestamp,
     read boolean DEFAULT false,
     replied boolean DEFAULT false,
     replied_at timestamp);`;

export const ADD_NEW_APPLICATION = `INSERT INTO applications_for_job (
      fname,
      middle_name,
      lname,
      gender,
      country_residence,
      education_level,
      graduation_year,
      field_of_study,
      employed_before,
      job_position,
      started_programming_year,
      currently_employed,
      date_of_birth,
      email,
      phone_number,
      linkedin_profile,
      applied_at)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,NOW());`;

/** CHECKING IF AN EMAIL EXISTS FROM TABLE USER OR NOT */
export const CHECK_EMAIL_FROM_TABLE_APPLICATIONS = `
SELECT EXISTS(SELECT 1 FROM applications_for_job WHERE email=$1);
`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_UNREPLIED_APPLICATIONS = `SELECT * FROM 
applications_for_job WHERE replied=false
 ORDER BY application_id DESC`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_REPLIED_APPLICATIONS = `SELECT * FROM 
applications_for_job WHERE replied=true
 ORDER BY application_id DESC`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_UNREAD_APPLICATIONS = `SELECT * FROM 
applications_for_job WHERE read=false
 ORDER BY application_id DESC`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_READ_APPLICATIONS = `SELECT * FROM 
applications_for_job WHERE read=true
 ORDER BY application_id DESC`;

/** GETTING ALL THE APPLICATIONS */
export const GET_ALL_APPLICATIONS = `SELECT * FROM 
applications_for_job ORDER BY application_id DESC`;
/** ======================================================================== */

/** ========================================================================\
 *
 * TABLE INITIAL EMAIL STATUS
 */
export const CREATE_TABLE_INITIAL_EMAIL_FOR_APPLICATION_STATUS = `
DROP TABLE IF EXISTS initial_email_status_for_application CASCADE; 
    CREATE TABLE IF NOT EXISTS initial_email_status_for_application (
    status_id SERIAL PRIMARY KEY, 
    email VARCHAR(50),
    email_sent_status boolean DEFAULT true,
    user_registered_at timestamp,
    CONSTRAINT initial_email_for_application_status_fk FOREIGN KEY(email) REFERENCES applications_for_job(email));
`;

/** SAVING NEW STATUS */
export const ADD_NEW_INITIAL_EMAIL_STATUS = `
INSERT INTO initial_email_status_for_application(
    email,email_sent_status,user_registered_at
) VALUES ($1,$2,NOW());
`;
