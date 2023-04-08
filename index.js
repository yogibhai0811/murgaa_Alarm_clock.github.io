// Get elements from the DOM
const clockElement = document.getElementById("clock");
const alarmForm = document.getElementById("alarm-form");
const alarmHoursInput = document.getElementById("alarm-hours");
const alarmMinutesInput = document.getElementById("alarm-minutes");
const alarmSecondsInput = document.getElementById("alarm-seconds");
const alarmAMPMSelect = document.getElementById("alarm-ampm");
const alarmList = document.getElementById("alarm-list");

// Update the clock every second
setInterval(() => {
  const now = new Date();
  clockElement.textContent = now.toLocaleTimeString();
}, 1000);

//  Alarm tune
var audio = new Audio(
  "./Good Morning With Murga.mp3"
);

// function to play alarm tune

function play() {
  audio.play();
}

function pause(){
  audio.pause();
}
// Handle alarm form submission
alarmForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get alarm values from inputs
  var hours = Number(alarmHoursInput.value);
  const minutes = Number(alarmMinutesInput.value);
  const seconds = Number(alarmSecondsInput.value);
  const ampm = alarmAMPMSelect.value;

  // Validate input values
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    alert("Invalid alarm time");
    return;
  }

  // Convert 12-hour time to 24-hour time
  if (ampm === "pm" && hours !== 12) {
    hours += 12;
  } else if (ampm === "am" && hours === 12) {
    hours = 0;
  }
  // valid input values
  if (
    hours > 24 ||
    hours < 0 ||
    minutes > 60 ||
    minutes < 0 ||
    seconds > 60 ||
    seconds < 0
  ) {
    alert("Invalid alarm time");
    return;
  }

  // Create a new alarm object
  const alarmTime = new Date();
  alarmTime.setHours(hours);
  alarmTime.setMinutes(minutes);
  alarmTime.setSeconds(seconds);
  const alarm = {
    time: alarmTime,
    element: document.createElement("li"),
  };
  alarm.element.textContent = alarmTime.toLocaleTimeString();

  // Set the alarm to trigger at the specified time
  let resetAlarm = setTimeout(() => {
    play();
    alert("Alarm!");
    pause();
    alarmList.removeChild(alarm.element);
  }, alarmTime - new Date());

  // Add the new alarm to the list
  alarmList.appendChild(alarm.element);

  // Handle alarm deletion
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    alarmList.removeChild(alarm.element);
    clearTimeout(resetAlarm);
  });
  alarm.element.appendChild(deleteButton);

  // Clear the alarm form inputs
  alarmHoursInput.value = "";
  alarmMinutesInput.value = "";
  alarmSecondsInput.value = "";
  alarmAMPMSelect.selectedIndex = 0;
});
