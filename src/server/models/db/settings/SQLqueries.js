
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
    user_registered_at TIMESTAMPTZ,
    user_edited_at TIMESTAMPTZ,
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
export const CREATE_TABLE_APPLY_FOR_SOFTWARE_DEV_JUNIOR = `DROP TABLE IF EXISTS 
     apply_for_software_dev_junior CASCADE;
     CREATE TABLE IF NOT EXISTS apply_for_software_dev_junior (
     application_id SERIAL PRIMARY KEY, 
     fname VARCHAR(255),
     middle_name VARCHAR(255),
     lname VARCHAR(255),
     gender CHAR,
     nationality VARCHAR(255),
     education_level VARCHAR(50),
     option_of_study VARCHAR(50),
     employed_before VARCHAR(50),
     job_position VARCHAR(50),
     coding_experience VARCHAR(50),
     currently_employed VARCHAR(50),
     year_of_birth INT,
     email VARCHAR(50) UNIQUE,
     phone_number VARCHAR(20),
     linkedin_profile VARCHAR(255),
     applied_at TIMESTAMPTZ,
     read boolean DEFAULT false,
     replied boolean DEFAULT true,
     replied_at TIMESTAMPTZ);`;

export const ADD_NEW_APPLICATION = `INSERT INTO apply_for_software_dev_junior (
      fname,
      middle_name,
      lname,
      gender,
      nationality,
      education_level,
      option_of_study,
      employed_before,
      job_position,
      coding_experience,
      currently_employed,
      year_of_birth,
      email,
      phone_number,
      linkedin_profile,
      applied_at)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW());`;

/** CHECKING IF AN EMAIL EXISTS FROM TABLE USER OR NOT */
export const CHECK_EMAIL_FROM_TABLE_APPLICATIONS = `
SELECT EXISTS(SELECT 1 FROM apply_for_software_dev_junior WHERE email=$1);
`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_UNREPLIED_APPLICATIONS = `SELECT * FROM 
apply_for_software_dev_junior WHERE replied=false
 ORDER BY application_id DESC`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_REPLIED_APPLICATIONS = `SELECT * FROM 
apply_for_software_dev_junior WHERE replied=true
 ORDER BY application_id DESC`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_UNREAD_APPLICATIONS = `SELECT * FROM 
apply_for_software_dev_junior WHERE read=false
 ORDER BY application_id DESC`;

/** GETTING ALL UNREPLIED APPLICATIONS */
export const GET_READ_APPLICATIONS = `SELECT * FROM 
apply_for_software_dev_junior WHERE read=true
 ORDER BY application_id DESC`;

/** GETTING ALL THE APPLICATIONS */
export const GET_ALL_APPLICATIONS = `SELECT * FROM 
apply_for_software_dev_junior ORDER BY application_id DESC`;

/** UPDATING READ IN TABLE APPLICATIONS */
export const UPDATE_READ_IN_TABLE_APPLICATION = `
UPDATE apply_for_software_dev_junior SET read=true WHERE application_id=$1;
`;

/** UPDATING REPLIED IN TABLE APPLICATIONS */
export const UPDATE_REPLIED_IN_TABLE_APPLICATION = `
UPDATE apply_for_software_dev_junior SET replied=$1 WHERE email=$2;
`;
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
    error_occurred varchar(255),
    user_registered_at TIMESTAMPTZ,
    CONSTRAINT initial_email_for_application_status_fk FOREIGN KEY(email) 
    REFERENCES apply_for_software_dev_junior(email));
`;

/** SAVING NEW STATUS */
export const ADD_NEW_INITIAL_EMAIL_STATUS = `
INSERT INTO initial_email_status_for_application(
    email,email_sent_status,error_occurred,user_registered_at
) VALUES ($1,$2,$3,NOW());
`;

/** GETTING ALL REGISTERED UNADDED INITIAL EMAIL */
export const GET_UNSENT_INITIAL_EMAIL = `SELECT email FROM 
initial_email_status_for_application ORDER BY status_id DESC;`;

/** DELETING FROM UNSENT INITIAL EMAILS */
export const DELETE_UNSENT_INITIAL_EMAIL_AFTER_REPLYING = `
DELETE FROM initial_email_status_for_application WHERE email=$1;
`;

/** ===================================================================== */

/**
 * =======================================================================
 *
 *
 * TABLE ALL SENT EMAILS
 *
 *
 */

/** CREATE TABLE ALLSENTEMAILS */
export const CREATE_TABLE_ALL_SENT_EMAILS = `
DROP TABLE IF EXISTS all_sent_emails CASCADE; 
    CREATE TABLE IF NOT EXISTS all_sent_emails (
        sent_email_id SERIAL PRIMARY KEY,
        email_address VARCHAR(255),
        email_subject VARCHAR(255),
        sender_email_address VARCHAR(255),
        email_message TEXT,
        sent_on TIMESTAMPTZ);
`;

/** ADDING NEW EMAILS */
export const ADD_NEW_SENT_EMAIL = `
INSERT INTO all_sent_emails(
    email_address, email_subject, sender_email_address, email_message, sent_on)
    VALUES($1,$2,$3,$4,NOW())`;

/** GETTING ALL SENT EMAILS */
export const GET_ALL_SENT_EMAILS = `
    SELECT * FROM all_sent_emails ORDER BY sent_email_id DESC;`;


/** =========================================================================================
 *
 *
 *
 * TABLE MANAGE HOMEPAGE
 *
 *
 * ==============================================================================================
 */

/** CREATING TABLE MANAGE HOMPAGE */
export const CREATE_TABLE_MANAGE_HOMEPAGE = `
DROP TABLE IF EXISTS manage_homepage CASCADE; 
    CREATE TABLE IF NOT EXISTS manage_homepage (
        manage_id SERIAL PRIMARY KEY,
        what_nezarecruit_title VARCHAR(255),
        what_nezarecruit TEXT,
        why_nezarecruit_title VARCHAR(255),
        why_nezarecruit TEXT,
        manage_creator_email VARCHAR(255),
        manage_created_on TIMESTAMPTZ); 
`;

/** ADDING NEW MANAGE */
export const ADD_NEW_MANAGE = `
INSERT INTO manage_homepage (
    what_nezarecruit_title,
    what_nezarecruit,
    why_nezarecruit_title,
    why_nezarecruit,
    manage_creator_email,
    manage_created_on
) VALUES($1,$2,$3,$4,$5,NOW());
`;

/** GETTING ALL MANAGES */
export const GET_ALL_MANAGES = `
SELECT * FROM manage_homepage ORDER BY manage_id DESC LIMIT 1;
`;

/** =====================================================================================
 * ======================================================================================
 * ===========================TABLE CRETE CREATE JOB TMP=================================
 * ======================================================================================
 * ======================================================================================
 */

/** CREATE TABLE JOB_LIST */
export const CREATE_TABLE_JOB_LIST_TMP = `
DROP TABLE IF EXISTS job_list_tmp CASCADE; 
CREATE TABLE IF NOT EXISTS job_list_tmp (
        job_id SERIAL PRIMARY KEY,
        job_title VARCHAR(255),
        company_name VARCHAR(255),
        company_email VARCHAR(255),
        job_creator_email VARCHAR(255),
        job_deadline DATE,
        job_description TEXT,
        custom_email_msg_to_applicants TEXT,
        job_requirements TEXT,
        application_form_url VARCHAR(255),
        job_created_on TIMESTAMPTZ,
        job_edited_on TIMESTAMPTZ); 
`;

export const ADDDING_NEW_JOB_TMP = `
INSERT INTO job_list_tmp(
    job_title,
    company_name,
    company_email,
    job_creator_email,
    job_deadline,
    job_description,
    custom_email_msg_to_applicants,
    job_requirements,
    application_form_url,
    job_created_on,
    job_edited_on
) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW(),NOW());
`;

/** UPDATING TABLE job_list_tmp */
export const EDITING_JOB_TMP = `
UPDATE job_list_tmp SET 
    job_title=$1,
    company_name=$2,
    company_email=$3,
    job_creator_email=$4,
    job_deadline=$5,
    job_description=$6,
    custom_email_msg_to_applicants=$7,
    job_requirements=$8,
    application_form_url=$9,
    job_edited_on=NOW() WHERE job_id=$10;
`;

/** deleting a job from a table job_list_tmp */
export const DELETE_JOB_FROM_TMP = `
DELETE FROM job_list_tmp WHERE job_id=$1;
`;

/** GETTING ALL JOBS */
export const GET_ALL_JOBS_TMP = `
SELECT * FROM job_list_tmp ORDER BY job_id DESC;
`;

/** =====================================================================================
 * ======================================================================================
 * ===========================TABLE CRETE CREATE JOB=====================================
 * ======================================================================================
 * ======================================================================================
 */

/** CREATE TABLE JOB_LIST */
export const CREATE_TABLE_JOB_LIST = `
DROP TABLE IF EXISTS job_list CASCADE; 
CREATE TABLE IF NOT EXISTS job_list (
        job_id SERIAL PRIMARY KEY,
        job_title VARCHAR(255),
        company_name VARCHAR(255),
        company_email VARCHAR(255),
        job_creator_email VARCHAR(255),
        job_deadline DATE,
        job_description TEXT,
        custom_email_msg_to_applicants TEXT,
        job_requirements TEXT,
        application_form_url VARCHAR(255),
        job_created_on TIMESTAMPTZ,
        job_edited_on TIMESTAMPTZ); 
`;

export const ADDDING_NEW_JOB = `
INSERT INTO job_list(
    job_title,
    company_name,
    company_email,
    job_creator_email,
    job_deadline,
    job_description,
    custom_email_msg_to_applicants,
    job_requirements,
    application_form_url,
    job_created_on,
    job_edited_on
) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW(),NOW());
`;

export const EDITING_JOB = `
UPDATE job_list SET 
    job_title=$1,
    company_name=$2,
    company_email=$3,
    job_creator_email=$4,
    job_deadline=$5,
    job_description=$6,
    custom_email_msg_to_applicants=$7,
    job_requirements=$8,
    application_form_url=$9,
    job_edited_on=NOW() WHERE job_id=$10;
`;

/** GETTING ALL JOBS */
export const GET_ALL_JOBS = `
SELECT * FROM job_list ORDER BY job_id DESC;
`;

export const GET_PARTICULAR_JOB = `
SELECT * FROM job_list WHERE job_id=$1;
`;
/**
 * =========================================================================================
 * =========================================================================================
 * ===========================TABLE APPLICATION_FORM_URLS===================================
 * =========================================================================================
 * =========================================================================================
 */
export const CREATE_TABLE_APPLICATION_FORM_URLS = `
DROP TABLE IF EXISTS application_form_urls CASCADE; 
CREATE TABLE IF NOT EXISTS application_form_urls(
    url_id SERIAL PRIMARY KEY,
    application_form_url VARCHAR(255),
    url_created_on TIMESTAMPTZ);
`;

/** ADDING NEW APPLICATION FORM URL */
export const ADD_NEW_APPLICATION_FORM_URL = `
INSERT INTO application_form_urls(application_form_url,url_created_on)VALUES($1,NOW());
`;

/** GETTING ALL APPLICATION URLS */
export const GETT_ALL_APPLICATION_FORM_URLS = `
SELECT * FROM application_form_urls ORDER BY url_id DESC;
`;

/** CHECKING IF AN APPLICATION_FORM_URL EXISTS */
export const CHECK_IF_APPLICATION_FORM_URL_EXISTS = `
SELECT EXISTS(SELECT 1 FROM application_form_urls WHERE application_form_url = $1);
`;
