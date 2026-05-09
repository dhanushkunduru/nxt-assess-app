# Requirement Document Template

## Title

Nxt Assess Application

## Objective

Develop a modern online assessment platform where users can securely log in, participate in assessments, answer multiple types of questions, monitor assessment time, navigate between questions, and instantly view their results after submission.

---

## Tech Stack

Frontend - React JS (React Router DOM, JavaScript, CSS3, js-cookie, Vite, Git, GitHub)

---

# Completion Instructions

## Functionality

### Must Have

* Develop a ReactJS application with multiple pages/components including Login, Home, Assessment, Results, and Not Found pages.
* Implement protected routing for authenticated users.
* Integrate Login Authentication using APIs.
* Fetch assessment questions dynamically from the backend API.
* Add timer functionality during assessments.
* Enable smooth question navigation.
* Support multiple question formats:

  * Default Options
  * Image Options
  * Single Select Options
* Implement score calculation logic.
* Provide Reattempt Assessment functionality.
* Implement Logout functionality.
* Ensure responsive UI design for both mobile and desktop devices.

### Nice to Have

* Deploy the application using platforms like Vercel or Netlify.
* Add animations and smooth transitions.
* Implement dark mode support.
* Add leaderboard functionality.

---

# Guidelines to Develop a Project

## Must Have

* Use GitHub for repository management.
* Commit code frequently with meaningful commit messages.
* Include a README.md file containing:

  * Project setup instructions
  * Features overview
  * Usage guidelines
  * Deployment process
* Maintain a clean and organized folder structure.
* Build modular and reusable components.
* Handle API loading, success, and error states effectively.
* Design a fully responsive and professional user interface.

## Nice to Have

* Add Unit Testing support.
* Use Redux or Context API for state management.
* Implement API caching and optimization techniques.

---

# Submission Instructions

## Must Have

* Deliver a fully functional ReactJS assessment platform.
* Implement authentication and protected routes.
* Include assessment timer and result tracking features.
* Render questions dynamically using APIs.
* Build a responsive and visually appealing UI.

## Nice to Have

* Deploy the project publicly.
* Optimize application performance.
* Add animations and transitions for better user experience.

---

# Pages

## Page: Login

### Page Details:

* Username Input
* Password Input
* Show Password Checkbox
* Login Authentication
* Error Handling

### Navigation:

* Successful Login → Home Page

---

## Page: Home

### Page Details:

* Instructions Section
* Assessment Overview
* Start Assessment Button

### Navigation:

* Start Assessment → Assessment Page

---

## Page: Assessment

### Page Details:

* Dynamic Questions
* Timer
* Question Navigation
* Answer Tracking
* Submit Assessment
* Question Status Indicators

### Navigation:

* Submit Assessment → Results Page
* Timer Completion → Results Page

---

## Page: Results

### Page Details:

* Score Display
* Time Taken
* Reattempt Button
* Time Up View

### Navigation:

* Reattempt → Assessment Page

---

## Page: Not Found

### Page Details:

* Invalid Route Handling
* Navigation Error Message

### Navigation:

* Redirect to Home Page

---

# Resources

## Design Files

* Login UI
* Home UI
* Assessment UI
* Results UI
* Not Found UI

---

## APIs

### Login API

* User Authentication API

### Questions API

* Dynamic Assessment Questions API

---

## Third-party Packages

* react-router-dom
* js-cookie

---

| Page       | Route      | Path        |
| ---------- | ---------- | ----------- |
| Login      | Login      | /login      |
| Home       | Home       | /           |
| Assessment | Assessment | /assessment |
| Results    | Results    | /results    |
| Not Found  | Not Found  | *           |
