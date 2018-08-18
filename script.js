/*
      Project 01_06_02

      Author: Gabriel Ortega
      Date: 8.16.16  

      Filename: script.js
*/

"use strict"

var formValidity = false;

// Function to validate form on submit

function validateForm(evt) {

    // Stops the form from being submitted and going to results page (results.html)
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }

    validateRequired();

    if (formValidity === true) {
        document.getElementsByTagName("form")[0].submit();
    }
}

// Function to  validate required fields (all)

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
            throw "Please fill in all fields";
        } else {
            fieldsetValidity = true;
            formValidity = true;
        }
    } catch (err) {
        errorDiv.innerHTML = err;
        errorDiv.style.display = "block";
        errorDiv.style.color = "red";
    }
}

// Remove fallback placeholder test

function zeroPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    addressBox.style.color = "black";
    if (addressBox.value === addressBox.placeholder) {
        addressBox.value = "";
    }
}

// Restore placeholder text if box contains no user entry

function checkPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    if (addressBox.value === "") {
        addressBox.style.color = "rgb(178, 184, 183)"
        addressBox.value = addressBox.placeholder;
    }
}

// Restore placeholder text if box contains no user entry

function generatePlaceholder() {
    if (!Modernizr.input.placeholder) {
        var addressBox = document.getElementById("addrinput");
        addressBox.style.color = "rgb(178, 184, 183)"
        addressBox.value = addressBox.placeholder;
        if (addressBox.addEventListener) {
            addressBox.addEventListener("focus", zeroPlaceholder, false);
            addressBox.addEventListener("blur", checkPlaceholder, false);
        } else if (addressBox.attachEvent) {
            addressBox.attachEvent("onfocus", zeroPlaceholder);
            addressBox.attachEvent("blur", checkPlaceholder);
        }
    }
}

// Function to set up page

function setUpPage() {
    createEventListeners();
    generatePlaceholder();
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

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}
