import {isAuthenticated} from "./authenticationVerify.js";


export function authorizationFormDetails(callback) {
    $.ajax({
        url: `https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/bill_ach/fetch/${localStorage.getItem('child_id')}`,
        type: 'get',
        success: function(response){
            // Set values of form fields
            if (typeof response.child_name !== "undefined"){
                document.getElementById("child_name").value = response.child_name;
            }
            if (typeof response.parent_name !== "undefined"){
                document.getElementById("parent_name").value = response.parent_name;
            }
            if (typeof response.bank_routing !== "undefined"){
                document.getElementById("bank_routing").value = response.bank_routing;
            }
            if (typeof response.bank_account !== "undefined"){
                document.getElementById("bank_account").value = response.bank_account;
            }
            if (typeof response.driver_license !== "undefined"){
                document.getElementById("driver_license").value = response.driver_license;
            }
            if (typeof response.state !== "undefined"){
                document.getElementById("state").value = response.state;
            }
            if (typeof response.email !== "undefined"){
                document.getElementById("email").value = response.email;
            }
            if (typeof response.i !== "undefined"){
                document.getElementById("i").value = response.i;
            }
            if (typeof response.signature !== "undefined"){
                document.getElementById("signature").value = response.signature;
            }
            if (typeof response.date !== "undefined"){
                document.getElementById("date").value = response.date;
            }
            if (typeof callback === 'function') {
                callback();
            }
        }
    })
}


// Function to submit the form data
function submitForm() {
    const form = document.getElementById(".authorization_form");
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData);
    obj.child_id = localStorage.getItem('child_id');
    obj.year = new Date().getFullYear() + '';
    obj.form_status = 'Reviewing';
    const json=  JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            window.location.href = "parent_dashboard.html";
        }else{
            window.location.reload();
        }
    };
    xhr.open("POST", "https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/bill_ach/add");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
}

function mainEntryPoint() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    } else {
        document.body.style.visibility = 'visible';
        $("#submit_button").on("click", function (e) {
            e.preventDefault(); // Prevent the default form submission
            submitForm();
        });
        authorizationFormDetails();
    }
}
// Check if this script is the main entry point and call the main function
if (window.location.pathname.endsWith('./forms/authorization_form.html')) {
    mainEntryPoint();
}



