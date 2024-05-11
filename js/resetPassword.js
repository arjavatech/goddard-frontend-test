
function validatePassword() {
    var password1 = document.getElementById('reset_pswd').value;
    var password2 = document.getElementById('password').value;
    // Retrieve password input values
    if (password1 !== password2) {
        $(".error-msg-mismatch").show();
        setTimeout(function(){ 
            $(".error-msg-mismatch").hide(); 
        }, 3000);
    //     document.getElementById("errorMessage").style.display = "none";
    //     document.getElementById("errorMessageDiv").style.display = "none";
    // }else{
    //     document.getElementById("errorMessage").style.display = "block";
    //     document.getElementById("errorMessageDiv").style.display = "block";
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

function signupFunction(){
    console.log('che')
    let email_id = document.getAnimations('email_id').value;
    var password1 = document.getElementById('reset_pswd').value;
    var password2 = document.getElementById('password').value;

    if (email_id != '' && password1 !='' && password2 !=''){
        console.log('king')
        // Check if passwords match
        if (password1 === password2) {
            console.log('pas')
            // document.getElementById("errorMessage").style.display = "none";
            // document.getElementById("errorMessageDiv").style.display = "none";
            const form = document.getElementById("reset_password");
            const formData = new FormData(form);
            const password = formData.get("password");
            // Hash the password
            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
            
            // Replace the original password with the hashed password in the form data
            formData.set("password", hashedPassword);
            const obj = Object.fromEntries(formData);
            console.log(obj);
            $.ajax({
                url: "http://localhost:8080/sign_up/password_reset",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(obj),
                success: function (response) {
                    if(response.message == "User not found"){
                        $(".error-msg-notfound").show();
                        setTimeout(function(){ 
                            $(".error-msg-notfound").hide(); 
                        }, 3000);
                    }else{
                        $(".success-msg-reset").show();
                        setTimeout(function(){ 
                            $(".success-msg-reset").hide(); 
                            window.location.href = "login.html";
                        }, 3000);
                    }
                },
            });
        } else {
            console.log('else')
            $(".error-msg-mismatch").show();
            setTimeout(function(){ 
                $(".error-msg-mismatch").hide(); 
            }, 3000);
            // document.getElementById("errorMessage").style.display = "block";
            // document.getElementById("errorMessageDiv").style.display = "block";
            // Display an error message
            // alert("Passwords do not match!");
        }
    }else{
        $(".error-msg-empty").show();
        setTimeout(function(){ 
            $(".error-msg-empty").hide(); 
        }, 3000);
    }

}
$(document).ready(function () {
    $("#resetButton").on("click", function (e) {
        e.preventDefault(); // Prevent the default form submission
        signupFunction();
    });
});

