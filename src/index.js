// let url = "https://jsonplaceholder.typicode.com/users"


// document.getElementById('clickMeButton').addEventListener('click', function () {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         console.log('bk');
//         document.getElementById('element').innerHTML = xhr.response;
//         JSON.parse(xhr.response).forEach(function (ele) {
//             console.log(ele.company);

//         })

//     }
//     xhr.open('GET', url);
//     xhr.send();
// })

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(function (res) {
//         return res.json();
//     })
//     .then(function (res) {
//         res.forEach(function (ele) {
//             document.getElementById('element').innerHTML = `${document.getElementById('element').innerHTML} <br> name : ${ele.name}`;
//         })
//     })
// .catch()

// let axios = require('axios');

// axios.get('https://jsonplaceholder.typicode.com/users')
//     .then(res => {
//         document.getElementById('clickMeButton').addEventListener('click', () => {
//             res.data.forEach(function (ele) {
//                 document.getElementById('element').innerHTML = `${document.getElementById('element').innerHTML} <br> name : ${ele.name}`;
//             })
//         })
//     })
//     .catch(err => console.log(err));


let axios = require('axios');
let baseUrl = 'http://127.0.0.1:3000/contacts';

window.onload = function () {
    axios.get(baseUrl)
        .then(res => {
            res.data.forEach(contact => {
                createRow(contact, document.getElementById('body'));
            })
        })
        .catch(err => err)

    document.getElementById('save').addEventListener('click', () => {
        createNewContact();
    })
}

function createRow(contact, parentElement) {
    let tr = document.createElement('tr');

    let thID = document.createElement('th');
    thID.innerHTML = contact.id;
    tr.appendChild(thID);

    let tdName = document.createElement('td');
    tdName.innerHTML = contact.name;
    tr.appendChild(tdName);

    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = contact.email;
    tr.appendChild(tdEmail);

    let tdPhone = document.createElement('td');
    tdPhone.innerHTML = contact.phone;
    tr.appendChild(tdPhone);

    let tdAction = document.createElement('td');

    let tdEditButton = document.createElement('button');
    tdEditButton.setAttribute('id', 'modalForEdit');
    tdEditButton.className = 'btn btn-warning';
    tdEditButton.innerHTML = 'edit';
    tdEditButton.addEventListener('click', function () {
        $('#editContactModal').modal('toggle');

        document.getElementById('nameEdit').value = contact.name;
        document.getElementById('phoneEdit').value = contact.phone;
        document.getElementById('emailEdit').value = contact.email;

        document.getElementById('editSave').addEventListener('click', () => {
            axios.put(`${baseUrl}/${contact.id}`, {
                name: document.getElementById('nameEdit').value,
                phone: document.getElementById('phoneEdit').value,
                email: document.getElementById('emailEdit').value
            })
                .then(res => {
                    thId = res.data.id;
                    tdName.innerHTML = res.data.name;
                    tdEmail.innerHTML = res.data.email;
                    tdPhone.innerHTML = res.data.phone;

                    $('#editContactModal').modal('hide');
                })
                .catch(err => console.log(err));
        })

    })
    tdAction.appendChild(tdEditButton);



    let tdDeleteButton = document.createElement('button');
    tdDeleteButton.className = 'btn btn-danger mx-1';
    tdDeleteButton.innerHTML = 'delete';
    tdDeleteButton.addEventListener('click', function () {
        axios.delete(`${baseUrl}/${contact.id}`)
            .then(res => parentElement.removeChild(tr))
            .catch(err => console.log(err))

    })
    tdAction.appendChild(tdDeleteButton);

    tr.appendChild(tdAction);
    parentElement.appendChild(tr);
}


function createNewContact() {

    let nameField = document.getElementById('nameField');
    let emailField = document.getElementById('emailField');
    let phoneField = document.getElementById('phoneField');

    let contact = {
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value
    }
    axios.post(baseUrl, contact)
        .then(res => {
            createRow(res.data, document.getElementById('body'));
            nameField.value = '';
            emailField.value = '';
            phoneField.value = '';
        })
        .catch(err => console.log(err));
}