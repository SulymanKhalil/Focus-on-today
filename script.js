const checkBoxes = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const quote = document.querySelector(".quote");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Almost there, relentless forward momentum now!",
  "Just a step away, keep going!",
  "Whoa! You just completed all goals, time for chill :D",
];

const allQuotes2 = [
  "“Move one step ahead, today!“",
  "“Keep going, You are doing great!”",
  "“Nice job, your future depends on what you do today!”",
];

// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
//   first:
//     {name: "", completed: false},
//   second:
//     {name: "", completed: false},
//   third:
//     {name: "", completed: false}
// };

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoals = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${(completedGoals / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoals} /${inputFields.length} Completed`;
progressLabel.innerText = allQuotes[completedGoals];

if (!completedGoals) {
  quote.innerText = allQuotes2[0];
}

if (completedGoals >= 1) {
  quote.innerText = allQuotes2[1];
}

if (completedGoals == 3) {
  quote.innerText = allQuotes2[2];
}

checkBoxes.forEach((allCheckboxes) => {
  allCheckboxes.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });

    if (allGoalsAdded) {
      allCheckboxes.parentElement.classList.toggle("completed");
      const inputId = allCheckboxes.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoals = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoals / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoals} /${inputFields.length } Completed`;
      progressLabel.innerText = allQuotes[completedGoals];
      if (!completedGoals) {
        quote.innerText = allQuotes2[0];
      }

      if (completedGoals >= 1) {
        quote.innerText = allQuotes2[1];
      }

      if (completedGoals == 3) {
        quote.innerText = allQuotes2[2];
      }
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// inputFields.forEach((input) => {
//   input.value = allGoals[input.id].name;

//   if(allGoals[input.id].completed){
//     input.parentElement.classList.add("completed");
//   }

//   input.addEventListener("focus", () => {
//     progressBar.classList.remove("show-error");
//   });

//   input.addEventListener("input", (e) => {
//     if (allGoals[input.id].completed){
//       input.value = allGoals[input.id].name;
//       return;
//     }
//     allGoals[input.id].name = input.value;
//     localStorage.setItem("allGoals", JSON.stringify(allGoals));
//   });
// });