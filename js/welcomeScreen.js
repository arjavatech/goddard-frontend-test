import {isAuthenticated} from "./authenticationVerify.js";

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
        url = `http://localhost:8080/admission_child_personal/parent_email?email=${editID}`
    }else{
        url = `http://localhost:8080/admission_child_personal/parent_email?email=${logged_in_email}`
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
        url = `http://localhost:8080/admission_child_personal/parent_email?email=${editID}`
    }else{
        url = `http://localhost:8080/admission_child_personal/parent_email?email=${logged_in_email}`
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

    // Loop through the response size and create the child divs
    for (let i = 0; i < responseSize; i++) {
        let on_process = child_response[i].on_process;

        // Create the elements for child card
        let div = document.createElement('li');
        div.setAttribute('class', 'nav-item');
        // div.setAttribute('style', 'width:10%;');

        let anchor = document.createElement('a');
        anchor.setAttribute('class', 'nav-link');
        
        // Add an identifier to the anchor element
        anchor.setAttribute('data-child-id', child_response[i].child_id);

        let card = document.createElement('div');
        card.setAttribute('style', 'height:40px');
        // card.classList.add('card', 'dashboard_card_style');

        anchor.addEventListener('click', function () {
            // Remove 'active' class from all tabs
            let allTabs = document.querySelectorAll('.nav-link');
            allTabs.forEach(tab => tab.classList.remove('active'));

            // Add 'active' class to the clicked tab
            anchor.classList.add('active');

            const selectedChildName = child_response[i].child_first_name;
            const selectedChildId = child_response[i].child_id;
            localStorage.setItem('child_name', selectedChildName);
            localStorage.setItem('child_id', selectedChildId);

            // Update the styles for the clicked tab
           

            // Call your checking function
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

    // let div = document.createElement('li');
    // div.setAttribute('class','nav-item');
    // // Create "Add Child" button
    // let outerDiv = document.createElement('li');
    // outerDiv.setAttribute('style','width:10%;');
    // // outerDiv.classList.add('class','m-4');
    // // outerDiv.setAttribute('style','width:10%;hight:50px;');
    // // outerDiv.setAttribute('style','hight:30px;display:inline-flex;');
    // outerDiv.setAttribute('id', 'showDiv');
    // outerDiv.onclick = function(){
    //     divShow();
    // }

    // let anchor = document.createElement('a');
    // anchor.href = '#myBookmark';
    // anchor.onclick = function () {
    //     goToBookmark();
    // };

    // let card = document.createElement('div');
    // card.classList.add('card', 'dashboard_card_style');

    // let cardBody = document.createElement('div');
    // cardBody.classList.add('card-body');

    // let iconH5 = document.createElement('h6');
    // iconH5.classList.add('card-title', 'dashboard_card_icon');

    // let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // svg.setAttribute('width', '30');
    // svg.setAttribute('height', '30');
    // svg.setAttribute('fill', 'currentColor');
    // svg.setAttribute('class', 'bi bi-plus-circle-fill');
    // svg.setAttribute('viewBox', '0 0 17 17');
   
    // // svg.setAttribute('value', 'Add child');

    // let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // path.setAttribute('d', 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z');
    // // path.setAttribute('style','align-items: center')
    // // let textH5 = document.createElement('h6');
    // // textH5.classList.add('text-center', 'dashboard_card_icon');
    // // textH5.textContent = 'Add Child';

    // iconH5.appendChild(svg);
    // svg.appendChild(path);

    // cardBody.appendChild(iconH5);

    // // iconH5.appendChild(textH5); 

    // card.appendChild(cardBody);

    // anchor.appendChild(card);

    // outerDiv.appendChild(anchor);

    // parentContainer.appendChild(outerDiv);
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

function goToBookmark() {
    // Set the hash to the ID of the bookmarked section
    window.location.href = "#myBookmark";
    // Add a delay before scrolling to the bookmarked section
    setTimeout(scrollToBookmark, 2);
}

function scrollToBookmark() {
    // Scroll to the bookmarked section
    var element = document.getElementById("myBookmark");
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

var formdiv = document.getElementById('formdiv');
var addChildDiv = document.getElementById('addChildDiv');

// function divShow(){
//     if(addChildDiv){
//         addChildDiv.style.display = 'block';
//         formdiv.style.display = 'none';;
//         // formdiv.classList.add('hide1');
//     }else{
//         addChildDiv.style.display = 'none';
//         formdiv.style.display = 'block';
//         // formdiv.classList.remove('hide1');
//     }
//     // formdiv.classList.remove('hide');
// }


var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})


$(document).ready(function () {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    } else {
        let editID = window.location.search.slice(4);
        // Checks the parent info table to see if parent entry is present
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