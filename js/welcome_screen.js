import {isAuthenticated} from "./authentication_verify.js";

let child_response = null;

function clearLocalStorageExcept(keysToKeep) {
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && !keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    }
}

function checkParentAuthentication(editID,callback) {
    const logged_in_email = localStorage.getItem('logged_in_email');
    let url;
    if(editID != ''){
        url = `https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/admission_child_personal/parent_email?email=${editID}`
    }else{
        url = `https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/admission_child_personal/parent_email?email=${logged_in_email}`
    }
   
    $.ajax({
        url: url,
        type: 'get',
        success: function (response) {
            let keysToKeep = ['logged_in_email'];
            clearLocalStorageExcept(keysToKeep);
            console.log(response['parent_name']);
            // localStorage.clear()
            if (response['parent_name']) {
                localStorage.setItem('parent_name',response['parent_name'])
            //    localStorage.setItem('parent_id', response[0].id)
            }
            if (typeof callback === 'function') {
                callback();
            }
        }
    });
}

function getAllInfo(editID,callback) {
    const logged_in_email = localStorage.getItem('logged_in_email');
    let url;
    if(editID != ''){
        url = `https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/admission_child_personal/parent_email?email=${editID}`
    }else{
        url = `https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/admission_child_personal/parent_email?email=${logged_in_email}`
    }
   
    $.ajax({
        url: url,
        type: 'get',
        success: function (response) {
            // localStorage.clear()
            if (response['children']) {
                // Iterate through all the child and store the response
                child_response = response['children'];
                localStorage.setItem('number_of_children', response['children'].length.toString());
            }
            if (typeof callback === 'function') {
                callback();
            } 
        }
    })
}

function responseToAuthenticationCheck() {
    const parentName = localStorage.getItem('logged_in_email');
    if (parentName !== 'undefined' && parentName !== null) {
        document.body.style.visibility = 'visible';
    } else {
        document.getElementById('welcomeText').innerHTML = 'Parent not found';
        window.alert("Parent Not found");
        window.history.back();
    }
}

function loadDynamicCards() {
    let responseSize = localStorage.getItem('number_of_children');
    let parentContainer = document.getElementById('dynamicChildCards');
    for (let i = 0; i < responseSize; i++) {
        let on_process = child_response[i].on_process;

        // Create the elements for child card
        let div = document.createElement('li');
        div.setAttribute('class', 'nav-item');
        // div.setAttribute('style', 'width:10%;');

        let anchor = document.createElement('a');
        anchor.setAttribute('class', 'nav-link');
        anchor.setAttribute('data-child-id', child_response[i].child_id);

        let card = document.createElement('div');
        card.setAttribute('style', 'height:40px');
        // card.classList.add('card', 'dashboard_card_style');

        anchor.addEventListener('click', function () {
            // Remove 'active' class from all tabs
            let allTabs = document.querySelectorAll('.nav-link');
            allTabs.forEach(tab => tab.classList.remove('active'));
            anchor.classList.add('active');

            const selectedChildName = child_response[i].child_first_name;
            const selectedChildId = child_response[i].child_id;
            localStorage.setItem('child_name', selectedChildName);
            localStorage.setItem('child_id', selectedChildId);
            checking(selectedChildId);
        });
        // if (on_process === true) {
            // card.classList.add('card', 'dashboard_card_style');
        // } else {
        //     card.classList.add('card', 'dashboard_card_style1');
        // }
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let childName = document.createElement('h6');
        childName.id = child_response[i].child_id;
        childName.classList.add('text-center', 'dashboard_card_text', 'h6');
        childName.innerHTML = child_response[i].child_first_name;

        cardBody.appendChild(childName);
        card.appendChild(cardBody);
        anchor.appendChild(card);
        div.appendChild(anchor);
        parentContainer.appendChild(div);
    }
}

function welcomeText() {
    const parentName = localStorage.getItem('parent_name');
   
    if(localStorage.getItem('logged_in_email') == 'goddard01arjava@gmail.com'){
        document.getElementById('welcomeText').innerHTML = 'Welcome Admin';
        loadDynamicCards();
    }else{
        document.getElementById('welcomeText').innerHTML = 'Welcome ' + parentName;
        loadDynamicCards();
    }
    // createAddChildButton();
    // additionalHtmlContainer.style.display = 'block';
}

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})


$(document).ready(function () {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    } else {
        let editID = window.location.search.slice(4);
        // checks the parent info table to see if parent entry is present
        checkParentAuthentication(editID,function () {
            responseToAuthenticationCheck();
            // Checks the admission info table
            getAllInfo(editID,function () {
                welcomeText();
            });
        });
        $("#basic_child_button").on("click", function (e) {
            e.preventDefault(); // Prevent the default form submission
            submitForm();
        });
    }
});