'use strict';

let title, globalBase64;
let obj = {
    "from": "noreply.goddard@gmail.com",
    "to": "noreply.goddard@gmail.com",
    "subject": "subject",
    "body": "You are invited",
    "attachmentName": "AttachmentForm",
    "attachmentKey": "attachment"
}

async function emailSend(child_full_name,parent_name,
    parent_email,parent_mobile,invite_status) {
    try {
        const obj = {};
        obj.child_full_name = child_full_name;
        obj.parent_name = parent_name;
        obj.parent_email = parent_email;
        obj.parent_mobile = parent_mobile;
        obj.invite_status = invite_status;
        obj.from = "noreply.goddard@gmail.com";
        let email_to =  $('#parent_email').val();
        obj.to = email_to;
        let randomID = Math.floor(Date.now() / 1000);
        obj.invite_id =randomID;
        obj.subject = 'Invite parents';
        let messageData = 'https://arjavatech.github.io/goddard-frontend-dev/signup.html';
        obj.body = `${messageData}?id=${randomID}`;
        obj.attachmentName ="AttachmentForm";
        obj.attachmentKey ="attachment";
        const json =JSON.stringify(obj);

        $.ajax({
            url: "https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/email/send",
            type: "POST",
            contentType: "application/json",
            data: json,
            success: function (response) {
                alert("Email Sent Successfully");
                window.location.reload();
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("Email sending failed")
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function applicationStatusYear(val) {
    localStorage.setItem('form_year_value', val);
    let applicationStatusYear = document.getElementById("applicationStatusYear");
    applicationStatusYear.textContent = val;
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.visibility = 'visible';
    let defaultdate = new Date().getFullYear();
    // parentDashBoardDetails(defaultdate);
    applicationStatusYear(defaultdate);
    // applicationStatusAllYear();
});

