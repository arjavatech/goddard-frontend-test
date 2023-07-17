//name validation with particular format
function namevalidation(inputtxtID,errorSpanId){
    let regName =  /^[a-zA-Z\s]+$/;
    if (regName.test(inputtxtID.value) == true) {
        console.log('if');
        document.getElementById(errorSpanId).style.display = "none";
    } else if(inputtxtID.value == ''){
        console.log('else if');
        document.getElementById(errorSpanId).style.display = "none";
    } else {
        console.log('else');
        document.getElementById(errorSpanId).style.display = "block";
        inputtxtID.focus();
    }
}

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

// function appendparent(val,element) {
//     var course1 = document.getElementById("course1");
//     var course2 = document.getElementById("course2");
//     if(val <=2 && val >=0){
//         if (val == 1) {
//             course1.style.display = "block";
//             course2.style.display = "none";
//             document.getElementById(element).style.display = "none";
//         }else if (val == 2) {
//             course1.style.display = "block";
//             course2.style.display = "block";
//             document.getElementById(element).style.display = "none";
//         }else {
//             course1.style.display = "none";
//             course2.style.display = "none";
//         }
//     }else if(val== ''){
        
//         course1.style.display = "none";
//         course2.style.display = "none";
//         document.getElementById(element).style.display = "none";
//     }else{
//         // alert('else');
//         document.getElementById(element).style.display = "block";
//         course1.style.display = "none";
//         course2.style.display = "none";
//     }
// }

$(document).ready(function() {
    namevalidation();
    validatePhone();
    emailValidation();
    dateValidation();
});