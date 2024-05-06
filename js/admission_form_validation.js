'use strict';

// document.getElementById("outside_waiver_parent_date").value = new Date();

//number validation with particular format
function validatePhone(inputtxtID, errorSpanId) {
    let numbersformat =/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/im;
    if (inputtxtID.value.match(numbersformat) && inputtxtID.value.length <= 15) {
        document.getElementById(errorSpanId).style.display = "none";
    } else if(inputtxtID.value == ''){
        document.getElementById(errorSpanId).style.display = "none";
    } else {
        document.getElementById(errorSpanId).style.display = "block";
        inputtxtID.focus();
    }
}

//email validation with particular format
function emailValidation(inputtxtID,errorSpanID) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(inputtxtID.value) == true) {
        document.getElementById(errorSpanID).style.display = "none";
    } else if(inputtxtID.value == ''){
        document.getElementById(errorSpanID).style.display = "none";
    } else {
        document.getElementById(errorSpanID).style.display = "block";
        inputtxtID.focus();
    }
}

//this function restrict future date
function dateValidation(id){
    document.getElementById(id).max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

//pincode validation
function ValidatePincode(inputtxt, errorSpan) {
    var numbers = /^[0-9]+$/;
    if (inputtxt.value.length == 5 && inputtxt.value.match(numbers)) {
        document.getElementById(errorSpan).style.display = "none";
    } else if(inputtxt.value == ''){
        document.getElementById(errorSpan).style.display = "none";
    } else {
        document.getElementById(errorSpan).style.display = "inline";
        inputtxt.focus();
    }
}

// function checkbox() {
//     var additional_parent_info = document.getElementById("additional_parent_info");
//     if ($('input[id="additional_parent_details"]').is(":checked")) {
//         additional_parent_info.style.display = "block";
//     }
//     else{
//         additional_parent_info.style.display = "none";
//     }
// }
//custom textbox hide and show function
function CustomChange(inputtxt,labelvalue) {
    console.log('checck custom change');
    if (inputtxt == "Yes") {
        document.getElementById(labelvalue).style.display = "block";
    } else {
        document.getElementById(labelvalue).style.display = "none";
    }   
}

function autoPopulateAddress(inputtxtId,copyAddressId){
    var parent1_street = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_street;

    var parent1_city = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_city;

    var parent1_state = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_state;

    var parent1_zip = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_zip;

    var parent1_business_street = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_business_street;

    var parent1_business_city = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_business_city;

    var parent1_business_state = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_business_state;

    var parent1_business_zip = inputtxtId;
    document.getElementById(copyAddressId).value = parent1_business_zip;
}

function parentSignValidation(val){
    alert(`${val},This Signature will be taken as your signature forever.`)
}

