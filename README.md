# Chaabi Remix Quiz App

App is a remix project with admin and student login functionality, CreateQuiz page that the Admin can use to create the quiz. TakeQuiz page that the Student user can use to attempt the quiz the Admin has create. 

## Important Passwords

- [AdminLoginPage] Username: adminuser Password: password
- [StudentLoginPage] Username: studentuser Password: password


## Flow of Application

### 1. Welcome screen:
- Welcome screen gives you option to choose the user type as Admin or Student, so choose to login as Admin

### 2. Admin Login page:
- fill the username and password mentioned above to login, you will be redirected to Create Quiz Page

### 3. Create Quiz Page
- for 1st time login it will be blank, with only one canvas,
- Drag and drop Title or any other element from left panel to the canvas to frame the question
- Edit the values by clicking on the text
- One of the option can be set as correct by directly selecting the option. And its text can be eddited as well
- +Add Question button will add a new question to the right question pannel. Select the question to frame it. 
- Use delete button to delete any question
- Once the desired number of questions with Correct Answer are set, save the quiz using Save button.
- Save button will store the quiz object in the localStorage.
- If user will reload the page, the quiz will load with the last progress. 
- after saving Logout and go to Student Login Page

### 4. Student Login Page
- Use the username and password provided above to login
- Admin can also use their username and password to login
- Successfull login will redirect to Take Quiz Page

### 5. Take Quiz Page
- When the page loads, it takes the quiz object from the localStorage and creates the Quiz.
- User will have to select all the right answers to the best of his knowledge
- use the question navigator to navigate between questions
- On clicking the Submit button will generate the report with the total score.

## Extra Features
- Student can only login into TakeQuiz Page but Admin can log into both
- Once a user is logged in, it can not move back to any login page untill it logs out
- Once a user logged out, it can not move back to any of the Take QUiz or Create quiz page
- Resposive design is made keeping in mind small, medium and large screen size

## Scope of improvement for Production

- The project need a database integration, currently the databse functionaly is achieved using hardcoded values for user info and browser localStorage for questions
- Signup Page should be added, but couldn't because databse is not involved
- Many objects can be give custom types like Question, Element, Title, Options etc. but they are currently given a normaly objects with type as any
- Syling can be improved to be a lot better, but time required for designing
- Some elements were not added to the elements Panel, simply because lack of understanding of there functionality and due to lack of time. Eg. Progress Bar, Timer, Multiple Select Options.
- Validations and checks can be added to user events, for example not allowing blank questions or questions without correctAnsewer to be saved, etc.
- Elements added to the canvas are fixed for now, but the can also be made draggable to adjust their position or to remove them. But couldn't impliment to avoid complexity that due to lake to time.
- Marking scheme can be implimented, setting marks for correct answer for each question
- currently image is saved as a url, but can we stored in cloud storage in the production

## Furter Implimentation
- Similar app structure can be extended or used to create other designing Apps like, picture book or courses. It will require more variety of the elements
- one good example of such app is Canva desiging app.


## 🔗 Referenced Resources

- **[Remix Documentation](https://remix.run/docs)**: Official Remix documentation
- **[Tailwind CSS](https://tailwindcss.com/)**: Styling framework used in this project
- **[PedroTech Youtube Channel](https://www.youtube.com/@PedroTechnologies)**: Video Lecture

