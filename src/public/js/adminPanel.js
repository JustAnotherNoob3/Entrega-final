let chatBox = document.getElementById('chatBox');
let curUser = "";
let page = document.getElementById('showcase');


function SelectUser() {
    curUser = chatBox.value;
    fetch(`/api/users/${curUser}`, {
        method: 'GET',
    }).then(async (data) => {
        if (data.status >= 400 && data.status < 500) {
            Swal.fire({
                title: "Error",
                text: (await data.json()).error,
                allowOutsideClick: false
            })
        } else {
            page.innerText = JSON.stringify((await data.json()).payload);
        }
    });
}
function ChangeRole() {
    fetch(`/api/users/premium/${curUser}`, {
        method: 'GET',
    }).then(async (data) => {
        if (data.status >= 400 && data.status < 500) {
            Swal.fire({
                title: "Error",
                text: (await data.json()).error,
                allowOutsideClick: false
            })
        } else {
            Swal.fire({
                title: "Success!",
                text: "Changed role of the user. Please select the user again to see the changes.",
                allowOutsideClick: false
            })
        }
    });
}
function DeleteUser() {
    fetch(`/api/users/${curUser}`, {
        method: 'DELETE',
    }).then(async (data) => {
        if (data.status >= 400 && data.status < 500) {
            Swal.fire({
                title: "Error",
                text: (await data.json()).error,
                allowOutsideClick: false
            })
        } else {
            Swal.fire({
                title: "Success!",
                text: "Successfully deleted the user.",
                allowOutsideClick: false
            })
        }
    });
}