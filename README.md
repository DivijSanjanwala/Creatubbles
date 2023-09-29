# Creatubbles

Simple quiz web app, called "SuperQuizApp". 

The app has the following flow:

1. Retrieve a list of questions from the API:
2. Send a GET request to https://scs-interview-api.herokuapp.com/questions
3. Display a timed multiple-choice form for each question in the list.
4. Accept user input for each question.
5. When the timer elapses, evaluate the user input & provide feedback to the user (i.e. correct / incorrect).
6. After a brief pause, advance to the next question in the list.
7. If there are no more questions, display a summary with the total number of questions the user answered correctly.