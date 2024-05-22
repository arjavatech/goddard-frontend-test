import {isAuthenticated} from "./authentication_verify.js";


// Function to submit the form data
// function submitForm() {
//     let response1 = window.localStorage.getItem("responseClassDetails");
//     let jsonParse =JSON.parse(response1);
//     console.log(jsonParse.class_id);
//     const form = document.getElementById("classRoomForm");
//     const formData = new FormData(form);
//     const obj = Object.fromEntries(formData);

//     if(!jsonParse.class_id){
//     // if(response1.class_id == '' || response1.class_name == ''){
//         let json = JSON.stringify(obj);
//         console.log(json);
//         $.ajax({
//             url: "https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/ClassId_ClassName_info/add",
//             type: "POST",
//             contentType: "application/json",
//             data: json,
//             success: function (response) {
//                 alert(response.message)
//                 $(".success-msg-save").show();
//                     setTimeout(function(){
//                     $(".success-msg-save").hide();
//                     window.location.reload();
//                     // window.location.href = 'parent_dashboard.html';
//                 }, 3000);  
//             },
//             error: function (xhr, status, error) {
//                 alert("failed to save admission form");
//             }
//         });
//     }else{
//         obj.class_id = jsonParse.class_id;
//         console.log(obj);
//         let json = JSON.stringify(obj);
//         console.log(json);
//         $.ajax({
//             url: "https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/ClassId_ClassName_info/update",
//             type: "PUT",
//             contentType: "application/json",
//             data: json,
//             success: function (response) {
//                 alert(response.message)
//                 $(".success-msg-save").show();
//                     setTimeout(function(){
//                     $(".success-msg-save").hide();
//                     window.location.reload();
//                     // window.location.href = 'parent_dashboard.html';
//                 }, 3000);  
//             },
//             error: function (xhr, status, error) {
//                 alert("failed to save admission form");
//             }
//         });
//     }
// }

//this function is used to add caste details
var form = document.getElementById("classRoomForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData);
    const json=JSON.stringify(obj);
    console.log(json)
    // $.ajax({
    //     url: "https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/ClassId_ClassName_info/add",
    //     type: "POST",
    //     contentType: "application/json",
    //     data: json,
    //     success: function (response) {
    //         alert(response.message)
    //         $(".success-msg-save").show();
    //             setTimeout(function(){
    //             $(".success-msg-save").hide();
    //             window.location.reload();
    //             // window.location.href = 'parent_dashboard.html';
    //         }, 3000);  
    //     },
    //     error: function (xhr, status, error) {
    //         alert("failed to save admission form");
    //     }
    // });
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const data = xhr.responseText;
        console.log(data)
        if (xhr.status == 200) {
            var confirmationRes = window.confirm(data);
            if (confirmationRes) {
                alert(response.message)
                $(".success-msg-save").show();
                    setTimeout(function(){
                    $(".success-msg-save").hide();
                    window.location.reload();
                    // window.location.href = 'parent_dashboard.html';
                }, 3000);  
            } else {
                alert("failed to save");
            }
        }       
    };

    xhr.open("POST", 'https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/ClassId_ClassName_info/add');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
});

$(document).ready(function () {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    } else {
        document.body.style.visibility = 'visible';
       
        let editID = window.location.search.slice(4);
        if(editID != ''){
            //for waking up the aws lambda server
            $.ajax({
                url: `https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/ClassId_ClassName_info/fetch/${editID}`,
                type: 'get',
                //this is uesd to get the response and return the result
                success: function(response){
                    if (typeof response.class_name !== "undefined")
                    document.getElementsByName('class_name')[0].value = response.class_name;
                    //to set all response value into local storage variable
                    window.localStorage.setItem("responseClassDetails",JSON.stringify(response));
                }
            });
            //to get values from local storage variable.
            var form = document.getElementById("classRoomForm");
            var old = form;
            //The cloneNode() method allows you to create a duplicate of an existing DOM element
            var new_element = old.cloneNode(true);
            //replace the element
            old.parentNode.replaceChild(new_element,old);
            new_element.addEventListener("submit", (e) => {
                e.preventDefault();
                //to get form data values
                const formData = new FormData(e.target);
                const obj = Object.fromEntries(formData);
                //to get values from local storage variable and stored it into response1 variable.
                var response1=JSON.parse(window.localStorage.getItem("responseClassDetails"));
                //to set local response variable id value for obj id value.
                obj.class_id = response1.class_id;
                const json=JSON.stringify(obj);
                console.log(json);
                
                var msg = confirm("Are you sure?");      
                if (msg == true) {  
                //  sending post request to the server
                    let xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        const data = xhr.responseText;
                        console.log(data)
                        if (xhr.status == 200) {
                            var confirmationRes = window.confirm(data);
                            if (confirmationRes) {
                                // window.location.href = "reg_form/student.html";
                                window.location.reload();
                            } else {
                                window.location.href = "forms_repository.html";
                            }
                        }       
                    };

                    xhr.open("PUT", 'https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/ClassId_ClassName_info/update');
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(json);
                }
            });
        }
        // $(document).on("click", "#deletebutton", function(e) {
        //     e.preventDefault();
        //     deleteClassroom();
        // });
        
    }
});




