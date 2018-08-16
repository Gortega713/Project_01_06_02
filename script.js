/*
      Project 01_06_01

      Author: Gabriel Ortega
      Date: 8.15.16  

      Filename: script.js
*/

"use strict"

var formValidity = true;

// Function to validate form on submit

function validateForm(evt) {

    // Stops the form from being submitted and going to results page (results.html)
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }

    validateRequired();
}

// Function to  Validate required fields

function validateRequired() {
    var inputElements = document.querySelectorAll("#contactinfo input");
    var errorDiv = document.getElementById("errorText");
    var fieldsetValidity = true;
    var elementLength = inputElements.length;
    var currentElement = null;
    var invColor = "rgb(255, 200, 200)";

    try {
        // Loop through all of the input elements and set "[i]" to the current element (which is currently null)
        for (var i = 0; i < elementLength; i++) {
            currentElement = inputElements[i];
            
            // Test for blank fields
            if (currentElement.value === "") {
                currentElement.style.background = invColor;
                fieldsetValidity = false;
               
            } else {
                currentElement.style.background = "white";
            }
        }
        
        // Throw the message if there are fieldsets which are invalid/empty (fieldsetValidity is set to "false")
        if (fieldsetValidity === false) {
            throw "Please fill in all fields"
        } else {
            fieldsetValidity = true;
        }
    } catch (err) {
        errorDiv.innerHTML = err;
        errorDiv.style.display = "block";
        errorDiv.style.color = "red";
    }
}

// Function to create all event listeners

function createEventListeners() {

    // Submits the form on the submit event
    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }
}

// Event listener for when the page loads
window.addEventListener("load", createEventListeners);
