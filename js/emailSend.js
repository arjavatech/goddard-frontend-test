import {fetchEnrollmentFormTitle, fetchEnrollmentFormBody} from './enrollmentForm.js'

let obj = {
    "from": "noreply.goddard@gmail.com",
    "to": "noreply.goddard@gmail.com",
    "subject": "subject",
    "body": "message data",
    "attachmentName": "AttachmentForm",
    "attachmentKey": "attachments/Test.pdf"
}

function emailSend() {
    try {
        let messageData = $('#messageData').val();
        obj.body = messageData;
        $.ajax({
               url: "http://localhost:8080/email/send",
               type: "POST",
               contentType: "application/json",
               data: JSON.stringify(obj),
               success: function (response) {
                   alert("Email Sent Successfully")
                   let modal = document.querySelector('.modal');
                   let bootstrapModal = bootstrap.Modal.getInstance(modal);
                   bootstrapModal.hide();
               },
               error: function (xhr, status, error) {  
                   alert("Email sending failed")
               }
           });  
    } catch (error) {
        console.error('Error:', error);
    }
}

$(document).ready(function () {
    $('#sendButton').click(function () {
        fetchEnrollmentFormTitle(function () {
            fetchEnrollmentFormBody(function () {
                emailSend();
                // Clear the text area
                $('#staticBackdrop').on('show.bs.modal', function() {
                    $('#messageData').val('');
                });
            });
        });
    });
})