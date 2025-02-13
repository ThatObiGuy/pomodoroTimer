// Here we are to add functionality to the timer that tracks the time since the start button was pressed.
// When the timer reaches 0, display an alert to take a break.
// Pressing the stop button resets the timer, which only starts again when the start button is clicked. 
// We should also implement functionality to pause the timer instead of resetting it.
// When the pause button is clicked, the text should switch to "Resume",
// and clicking it again should return to "Pause" while the timer continues running.
 
var milisec = 0;
var sec = 0;
var min = 25;
var toggle = 0; // used for toggling pause - could have alternatively used boolean
var session = null; // allows us to ensure only 1 timer session is running

function setRed(){ // Here we change CSS elements using javascript, nice. This occurs when there's 5 minutes left
    document.getElementById('minutes').style.color = "red";
    document.getElementById('seconds').style.color = "red";
    document.getElementById('miliseconds').style.color = "red";
    document.getElementById('appleBase').style.fill = "#1E90FF";
    document.getElementById('appleDepth').style.fill = "#4682B4";
    document.getElementById('appleLeftShine').style.fill = "#87CEFA";
    document.getElementById('appleRightShine').style.fill = "#87CEFA";
    document.getElementById('appleLeftShade').style.fill = "#1C86EE";
    document.getElementById('appleRightShade').style.fill = "#1C86EE";
    document.getElementById('appleDephtShade').style.fill = "#5F9EA0";
    document.getElementById('appleDephtDeepShade').style.fill = "#27408B";

}// Not required in spec but we turn the apple blue when the text turns red to make it pop

function setWhite(){ // This is necessary for the reset when we hit the stop button
    document.getElementById('minutes').style.color = "white";
    document.getElementById('seconds').style.color = "white";
    document.getElementById('miliseconds').style.color = "white";
    document.getElementById('appleBase').style.fill = "#E12C00";
    document.getElementById('appleDepth').style.fill = "#F6520A";
    document.getElementById('appleLeftShine').style.fill = "#FF5146";
    document.getElementById('appleRightShine').style.fill = "#FF5146";
    document.getElementById('appleLeftShade').style.fill = "#CC1300";
    document.getElementById('appleRightShade').style.fill = "#CC1300";
    document.getElementById('appleDephtShade').style.fill = "#A94804";
    document.getElementById('appleDephtDeepShade').style.fill = "#7A5000";

}

function decreaseMilisec(){
    if (milisec == 0) {
        milisec = 10; // our code only runs 10 times per milisecond - we can only see so many numbers per ms + refreshrates anyways
        decreaseSec();
    }
    milisec--;
    document.getElementById("miliseconds").innerText = milisec; // Updating displayed milisecond value

}

function decreaseSec(){
    if (sec == 0) {
        sec = 60;
        decreaseMin();
    }
    sec--;
    document.getElementById("seconds").innerText = sec;

}

function decreaseMin(){
    min--;
    if (min == 1) { // Visual change lets user know timer is almost up
        setRed()
    }
    if (min == 0) {
        alert("Take a break.");
        stopTimer();
    }
    document.getElementById("minutes").innerText = min;

}

function startTimer(){ // For the start button
    if (session == null) { // if session == null checks if there's already a timer active, we only want one running at a time
        session = setInterval(decreaseMilisec, 100);  // if we set interval to 100 we only need to display 10 integers for miliseconds
    }

}

function pauseTimer(){ // For the pause button
    toggle++; // Works on even and odd measurements for pause and resume
    if (toggle%2 == 0) { // On even values we'll resume
        startTimer(); // may aswell call the function as it also checks for other sessions, efficiency
        document.getElementById("pause").innerText = "pause"; // Now we've resumed we prompt user to pause
    } else { // On odd values we'll pause, makes sense as press numero uno will then be a pause
        clearInterval(session); // clearing session means we're no longer calling decrease milisecond every 100 miliseconds
        session = null; // If the session still exsists, we won't be able to resume
        document.getElementById("pause").innerText = "resume"; // Now we're paused so we can prompt user to resume
    }

}

function stopTimer(){ // For the stop button - the great reset - we reset most variables to the initialised values
    clearInterval(session); // Stop the countdown
    session = null; // Reset the session
    milisec = 0;
    sec = 0;
    min = 25; // Reset time
    document.getElementById("miliseconds").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.getElementById("minutes").innerText = "25"; // Reset time displayed
    setWhite() // Incase we were below 5 mins, reset visual que
    if (toggle%2 == 1) {
        document.getElementById("pause").innerText = "pause";
        toggle = 0;
    } // If pause was activated, reset

}