/*QUIZ SCRIPT*/

const quizData = [
  {
    question:
      "How often does the average American consume fast food in a typical week?",
    options: [
      "Never",
      "Once a week",
      "2-3 times a week",
      "4 or more times a week",
    ],
    correctAnswer: "2-3 times a week",
  },
  {
    question:
      "On average, how many servings of vegetables does the average American eat each day?",
    options: [
      "Less than 1 serving",
      "1-2 servings",
      "3-4 servings",
      "5 or more servings",
    ],
    correctAnswer: "3-4 servings",
  },
  {
    question:
      "How often do most Americans have home-cooked meals for dinner throughout the week?",
    options: [
      "Rarely or never",
      "1-2 times a week",
      "3-4 times a week",
      "Almost every night",
    ],
    correctAnswer: "3-4 times a week",
  },
  {
    question:
      "How often does the average American say they consume sugar-sweetened beverages?",
    options: [
      "I don't consume sugary drinks",
      "Rarely, maybe once a week",
      "2-3 times a week",
      "Daily or multiple times a day",
    ],
    correctAnswer: "Rarely, maybe once a week",
  },
  {
    question:
      "How often do most Americans read nutrition labels before making a food purchase?",
    options: ["Always", "Often", "Occasionally", "Rarely or never"],
    correctAnswer: "Occasionally",
  },
];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  optionsContainer.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    button.addEventListener("click", selectAnswer);
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct =
    selectedButton.innerText === quizData[currentQuestionIndex].correctAnswer;

  if (correct) {
    score++;
  }

  selectedButton.classList.add(correct ? "correct" : "incorrect", "selected");

  // Disable all buttons to prevent further selections
  Array.from(optionsContainer.children).forEach((button) => {
    button.disabled = true;
  });

  // Enable the next button
  nextButton.disabled = false;
}

function resetState() {
  nextButton.disabled = true;
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
}

function showNextQuestion() {
  resetState();
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion(quizData[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionElement.innerText = `Your Score: ${score} out of ${quizData.length}`;
  nextButton.style.display = "none";
}

nextButton.addEventListener("click", showNextQuestion);

startQuiz();

/*COUNTDOWN SCRIPT*/

// Get the target date (December 29th, 2023)
const targetDate = new Date("2023-12-29T00:00:00Z");

function calculateDaysRemaining() {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;
  const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Display the number of days remaining on the webpage
  const daysRemainingElement = document.getElementById("countdown-number");
  daysRemainingElement.textContent = `${daysRemaining} days remaining until December 29th, 2023!`;
}

// Call the function to calculate and display days remaining
calculateDaysRemaining();

/*BORED SCRIPT*/

document.addEventListener("DOMContentLoaded", function () {
  const activityContainer = document.getElementById("activity-container");
  const getActivityButton = document.getElementById("get-activity-btn");

  async function fetchActivity() {
    try {
      const response = await fetch("https://www.boredapi.com/api/activity");
      const data = await response.json();
      return data.activity;
    } catch (error) {
      console.error("Error fetching activity:", error);
      return null;
    }
  }

  async function displayActivity() {
    const activity = await fetchActivity();
    if (activity) {
      activityContainer.textContent = activity;
    } else {
      activityContainer.textContent =
        "Failed to fetch activity. Please try again.";
    }
  }

  getActivityButton.addEventListener("click", displayActivity);
});

/*CONTACT SCRIPT*/

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Send the form data to an external API endpoint using fetch
  fetch("https://api.example.com/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((jsonResponse) => {
      // Handle the API response as needed
      console.log(jsonResponse);
      alert("Form submitted successfully!");
      contactForm.reset();
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
      alert("Form submission failed. Please try again later.");
    });
});
