# CURA Login and Appointment Test Plan

## Application Overview

This plan covers the CURA Healthcare Service login and appointment flow for a fresh user, including valid authentication, invalid credential validation, and successful appointment booking.

## Test Scenarios

### 1. CURA Healthcare Service

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid login to book an appointment

**File:** `tests/demo/login.spec.ts`

**Steps:**
  1. Open the CURA Healthcare homepage and click the Make Appointment link.
    - expect: The browser loads the login page and the Login heading is visible.
  2. Enter the valid username and password.
    - expect: The user is authenticated and redirected to the appointment form.
  3. Verify the appointment form is displayed.
    - expect: The Make Appointment heading is visible on the page.

#### 1.2. Invalid login validation

**File:** `tests/demo/login.spec.ts`

**Steps:**
  1. Navigate to the login page and submit incorrect credentials.
    - expect: A login failure message appears and the user remains on the login screen.
  2. Review the error copy and page state.
    - expect: The error text clearly indicates the credentials are invalid.

#### 1.3. Successful appointment booking after login

**File:** `tests/demo/login.spec.ts`

**Steps:**
  1. Log in with valid credentials.
    - expect: The appointment form is displayed.
  2. Select a facility, healthcare program, visit date, and comment.
    - expect: The chosen values are visible in the form and the form accepts input.
  3. Submit the appointment request.
    - expect: An Appointment Confirmation page appears with the selected facility details.
