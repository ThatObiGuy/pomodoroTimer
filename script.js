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
var started = false; // Allows us to make pause button useless until timer started with start button
var audio = new Audio('ding.mp3'); // Timer is for studying, so audio que for finishing may be helpful

function changeBorderBlue() { // Extra functions added to facilitate requirement, word in conjuction with 1 min remaining event
    var timeComponents = document.getElementsByClassName('time'); // Saves the min/sec/milisec to an array
    for(i = 0; i < timeComponents.length; i++) { // loops through array
        timeComponents[i].style.backgroundColor = '#87CEFA'; // sets each element to have the same background colour
    }  
} // turns border text of timer to blue, as we're required to have a border around our timer at this time

function changeBorderRed() { // Extra functions added to facilitate requirement, word in conjuction with 1 min remaining event
    var timeComponents = document.getElementsByClassName('time');
    for(i = 0; i < timeComponents.length; i++) {
        timeComponents[i].style.backgroundColor = '#FF5146';
    }  
} // necessary for reset when we stop timer, changing border colour back to something more suitable for the theme

function setRed(){ // Here we change CSS elements using javascript, nice. This occurs when there's 5 minutes left
    document.getElementById('minutes').style.color = "red";
    document.getElementById('seconds').style.color = "red";
    document.getElementById('miliseconds').style.color = "red";
    document.getElementById('leftColon').style.color = "red";
    document.getElementById('rightColon').style.color = "red";
    document.getElementById('appleBase').style.fill = "#1E90FF";
    document.getElementById('appleDepth').style.fill = "#4682B4";
    document.getElementById('appleLeftShine').style.fill = "#87CEFA";
    document.getElementById('appleRightShine').style.fill = "#87CEFA";
    document.getElementById('appleLeftShade').style.fill = "#1C86EE";
    document.getElementById('appleRightShade').style.fill = "#1C86EE";
    document.getElementById('appleDephtShade').style.fill = "#5F9EA0";
    document.getElementById('appleDephtDeepShade').style.fill = "#27408B";
    document.getElementById('appleDephtDeepShade').style.fill = "#27408B";
    changeBorderBlue()

}// Not required in spec but we turn the apple blue when the text turns red to make it pop

function setWhite(){ // This is necessary for the reset when we hit the stop button
    document.getElementById('minutes').style.color = "white";
    document.getElementById('seconds').style.color = "white";
    document.getElementById('miliseconds').style.color = "white";
    document.getElementById('leftColon').style.color = "white";
    document.getElementById('rightColon').style.color = "white";
    document.getElementById('appleBase').style.fill = "#E12C00";
    document.getElementById('appleDepth').style.fill = "#F6520A";
    document.getElementById('appleLeftShine').style.fill = "#FF5146";
    document.getElementById('appleRightShine').style.fill = "#FF5146";
    document.getElementById('appleLeftShade').style.fill = "#CC1300";
    document.getElementById('appleRightShade').style.fill = "#CC1300";
    document.getElementById('appleDephtShade').style.fill = "#A94804";
    document.getElementById('appleDephtDeepShade').style.fill = "#7A5000";
    changeBorderRed()

}

function decreaseMilisec(){
    if (milisec == 0) {
        milisec = 10; // our code only runs 10 times per milisecond - we can only see so many numbers per ms + refresh rates anyways
        decreaseSec();
    }
    milisec--;
    document.getElementById("miliseconds").innerText = milisec; // Updating displayed milisecond value

}

function decreaseSec(){
    if(min == 0){ // these nested if statements check for the timer depleated condition
        if(sec == 0){
            audio.play();
            stopTimer(); // Timer resets on the page
            alert("Take a break."); // User gets a pop-up telling them to take a break

        }

    }
    if (sec == 0) {
        sec = 60;
        decreaseMin();

    }
    sec--;
    document.getElementById("seconds").innerText = sec;

}

function decreaseMin(){
    min--;
    if (min == 0) { // Visual change lets user know timer is almost up
        setRed()
    }
    document.getElementById("minutes").innerText = min;

}

function startTimer(){ // For the start button
    if (session == null) { // if session == null checks if there's already a timer active, we only want one running at a time
        session = setInterval(decreaseMilisec, 100);  // if we set interval to 100 we only need to display 10 integers for miliseconds
        started = true;
        if(toggle%2 != 0) { // start also resumes
            toggle++; // increments to keep in fashion with pause
            document.getElementById("pause").innerText = "pause"; // reverts the button back to pause
        }
    }

}

function pauseTimer(){ // For the pause button
    if (started) { // pause button will not work until timer is started
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
    
}

function stopTimer(){ // For the stop button - the great reset - we reset most variables to the initialised values
    clearInterval(session); // Stop the countdown
    session = null; // Reset the session
    started = false; // The timer has not start, we must reflect that so pause button cannot be abused
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
