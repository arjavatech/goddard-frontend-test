$(document).ready(function () {

    //for avoid datatable error popup messages//
    $.fn.dataTable.ext.errMode = 'none';
    let form_name = document.getElementById('form_name').value;
    console.log(form_name);
    if(!form_name){
        console.log('if checking');
        //datatable creating function//
        $('#example').DataTable({
            //for adding horizontal scrool bar
            scrollX: true,
            Info : false,
            //option is used to define the layout and elements that should be displayed around the table.
            dom: 'Qlfrtip',
            //for waking up the aws lambda server
            ajax: {
                url:'https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/admission_child_personal/all_child_status',
                dataSrc: '',
            },
            //it is used to define and configure the individual columns of the table.
            columns: [
                { data: 'child_name',
                    render: function ( data, type, full, meta ) {
                        window.location.replace = `${window.location.origin}/goddard-frontend-test/parent_dashboard.html?id=${full.parent_email}`;
                        let url =`${window.location.origin}/goddard-frontend-test/parent_dashboard.html?id=${full.parent_email} ` //Question
                    return `<a href="${url}">${full.child_name}</a>`;
                    },
                },
                { data: 'child_class_name'},
                { data: 'parent_email'},
                { data: 'parent_two_email'},
                { data: 'form_status'},
                { data: 'edit',
                    render: function ( data, type, full, meta ) {
                        // return '<a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="17" height="17" class="action-icons m-2" id="deletebutton"  name="deletebutton"><path fill="#bb1b1b" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></a>';
                        return '<img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" id="deletebutton"  name="deletebutton"  height="20px;" style="text-align:right !important;cursor: pointer !important;" onclick="deletedata('+full.child_id+',\''+full.parent_email+'\');">';
                    },
                },
            ],
            "pageLength": 5,
        });
    }
       
   
});
$('#form_name').on('focus', function(){
    console.log("else checking");
    //for waking up the aws lambda server
    $.ajax({
        url: 'https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/goddard_all_form/all_active_forms',
        type: 'get',
        datasrc:'',
        dataType:'json',
        //this is uesd to get the response and return the result
        success: function(response){
            console.log(response);
            var form_name_value = ''; 
            if(response !== ""){
                for (var i = 0; i < response.length; i++) { 
                    if(response[i].main_topic != "" && response[i].main_topic != undefined ){                      
                        form_name_value += '<option value="' + response[i].main_topic + '">' + response[i].main_topic + '</option>';  
                    }  
                } 
            } 
            document.getElementById('form_name').innerHTML =form_name_value;
        }
    });
    //datatable creating function//
    $('#example').DataTable({
        //for adding horizontal scrool bar
        scrollX: true,
        Info : false,
        //option is used to define the layout and elements that should be displayed around the table.
        dom: 'Qlfrtip',
        //for waking up the aws lambda server
        ajax: {
            url:`https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/admission_child_personal/form_status?formName=${form_name}`,
            dataSrc: '',
        },
        //it is used to define and configure the individual columns of the table.
        columns: [
            { data: 'child_name',
                render: function ( data, type, full, meta ) {
                    console.log(full);
                    window.location.replace = `${window.location.origin}/parent_dashboard.html?id=${full.parent_email}`;
                    let url =`${window.location.origin}/parent_dashboard.html?id=${full.parent_email} ` //Question
                return `<a href="${url}">${full.child_name}</a>`;
                },
            },
            { data: 'child_class_name'},
            { data: 'parent_email'},
            { data: 'parent_two_email'},
            { data: 'form_status'},
            { data: 'edit',
                render: function ( data, type, full, meta ) {
                    window.location.replace = `${window.location.origin}/add_class_room.html?id=${full.id} `;
                    let url =`${window.location.origin}/add_class_room.html?id=${full.id}` //Question
                return '<a href="'+ url +'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="17" height="17" class="action-icons m-2" id="editbutton" name="editbutton"><path fill="#0F2D52" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="17" height="17" class="action-icons m-2" id="deletebutton"  name="deletebutton"><path fill="#bb1b1b" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></a>';
                //return '<a href="'+ url +'"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9RvaUyBbAGaB9dcdAZxQvJJHKnd8vqQpsqgJpRuNrFCwk2ZY5vl5RgEj_b2wcGXW8OwE&usqp=CAU" id="editbutton"  name="editbutton"  height="20px;" style="text-align:right !important;"><img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" id="deletebutton"  name="deletebutton"  height="20px;" style="text-align:right !important;cursor: pointer !important;"></a>';
                },
            },
        ],
        "pageLength": 5,
    });
});

//this function is used to delete course fields details
function deletedata(id,email) {
    var delete_object={child_id : id,primary_parent_email : email};
    const json=JSON.stringify(delete_object);
    console.log(json)
    var msg = confirm("Are you sure?"); 
    //it check the user confirmation if yes or no       
    if (msg == true) { 
        //  sending post request to the server
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const data = xhr.responseText;
            if (xhr.status == 200) {
                var confirmationRes = window.confirm(data);
                if (confirmationRes) {
                    // window.location.href = "../reg_form/sponsorreport.html";
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            }
        };

        xhr.open("DELETE", 'https://jvirbzj4p1.execute-api.us-west-2.amazonaws.com/goddard_test/admission_child_personal/remove');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(json);
    }
};