const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
let currentQuestionIndex = 0;
let isChatLocked = false;

function appendMessage(message, isUser = false) {
  const messageContainer = document.createElement('div');
  messageContainer.className = `message-container ${isUser ? 'user-message' : 'bot-message'}`;
  messageContainer.innerHTML = `${isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>'} ${message}`;
  chatMessages.appendChild(messageContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Automatically scroll down
}

function provideInformation(info) {
  appendMessage(info, false);
  currentQuestionIndex++;
}

function handleWelcome() {
  appendMessage('Welcome to Concept N Controls! I am your virtual assistant. Let\'s get to know you better.');
  provideInformation(questions[currentQuestionIndex]);
}

function handleQuestion(answer) {
  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'no') {
    appendMessage(`You answered: ${answer}. Great! Let's move on to the next question.`);
    provideInformation(questions[currentQuestionIndex]);
  } else {
    appendMessage('Please answer the question in a yes/no format (e.g., "yes" or "no").');
  }
}

function handleFeedback(answer) {
  const feedback = getFeedbackForAnswers(answer);
  provideInformation(feedback);
  isChatLocked = true;
}

function getFeedbackForAnswers(answer) {
  // Customize the feedback based on the user's answers
  if (answer.toLowerCase() === 'no') {
    return 'Thank you for your feedback. We appreciate your honesty.';
  }
  return 'Thank you for answering the questions. Your feedback is valuable to us.';
}

function handleUserInput() {
  if (!isChatLocked) {
    const userAnswer = userInput.value;
    appendMessage(`You: ${userAnswer}`, true);

    if (currentQuestionIndex < questions.length) {
      handleQuestion(userAnswer);
    } else {
      handleFeedback(userAnswer);
    }

    userInput.value = '';
  } else {
    appendMessage('The chat is locked. You have already provided feedback. Type "restart" to begin a new conversation.', true);
    userInput.value = '';
  }
}

// Questions
const questions = [
  'Question 1: How would you rate your overall experience with Concept N Controls?',
  'Question 2: Are you satisfied with the quality of our products?',
  'Question 3: Do you find our products to be competitively priced?',
  'Question 4: How would you describe the level of customer service you have received?',
  'Question 5: Would you recommend our products and services to others?',
  'Question 6: Would you consider purchasing from us again in the future?',
];

handleWelcome();

userInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    handleUserInput();
  }
});
