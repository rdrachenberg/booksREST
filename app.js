let url = `https://baas.kinvey.com/appdata/kid_SyIdiNmWP/books`;

myHeaders = new Headers({
    "Authorization": "Basic a2lkX1N5SWRpTm1XUDpjN2I1OWNhZTQwZWQ0ODA2OTc3MTYxYzk5MDdmZTA2ZQ==",
    "Host":"https://baas.kinvey.com",
    "Content-Type":"application/json",
    "X-Kinvey-API-Version": 5
    
});

var obj = {
    method: 'GET',
    headers: myHeaders,
    
};

var deleteObj = {
    method: 'DELETE',
    headers: myHeaders,
};

//***************************** Function get to fetch GET request from Database *****************************//
function get() { // function to do a get request from the kinvey database
    fetch(url, obj).then((res)=>{ // call the fetch method and pass in needed get url request and basic authentication headers
        res.json().then(function(response){ // take the res and run the json method to pull out the needed info in usable format
            // console.log(response); // console the reponse
            document.getElementsByTagName('tbody')[0].innerHTML = '';
            response.forEach(element => { // run the forEach method to dynamically select and create needed elements along with database values to be displayed
                console.log(element);
                
                let tbody = document.getElementsByTagName('tbody')[0]; // grab tbody [0]

                tbody.setAttribute('id', 'tbody'); // add element id

                let newTr = document.createElement('tr'); // create tr
                newTr.setAttribute('data-id', element._id);

                let newTd = document.createElement('td'); // create td
                let newTd2 = document.createElement('td'); // create td

                let newTd3 = document.createElement('td'); // create td
                let newTd4 = document.createElement('td'); // create td

                let buttonEdit = document.createElement('button'); // create Edit button
                let buttonDelete = document.createElement('button'); // create delete button

                tbody.append(newTr); // append the tbody with the new tr element
                newTd.textContent = element.title; // set the text content equal to the database title value 

                newTd2.textContent = element.author; // set the text content equal to the database author value 
                newTd3.textContent = element.isbn; // set the text content equal to the database isbn value 

                newTd4.textContent = ''; // set the empty string to the tag td
                buttonEdit.textContent = 'Edit';
                buttonDelete.textContent = 'Delete';

                buttonEdit.classList.add('edit');
                buttonDelete.classList.add('delete');
                buttonEdit.setAttribute('type', 'button');
                buttonDelete.setAttribute('type', 'button');
                

                newTr.append(newTd); // append the tr with td
                newTr.append(newTd2); // append the tr with td

                newTr.append(newTd3); // append the tr with td
                newTr.append(newTd4);

                newTd4.append(buttonEdit); // append the td with the Edit button
                newTd4.append(buttonDelete); // append the td with the Delete button

                newTd.addEventListener('click', function () {
                    console.log('book clicked');
                    console.log(this.parentElement.getAttribute('data-id')); // id
                    console.log(this.innerText);

                    document.getElementById('title').value = this.innerText;
                    document.getElementById('author').value = this.nextSibling.innerText;
                    document.getElementById('isbn').value = this.nextSibling.nextSibling.innerText;

                    document.getElementById('submit').style.display = 'none';
                });

            });

            let editButtons = document.getElementsByClassName('edit').length;

            for (let i = 0; i < editButtons; i++) {
                document.getElementsByClassName('edit')[i].addEventListener('click', function(){
                    console.log(this.parentElement.parentElement.getAttribute('data-id'));
                    let id = this.parentElement.parentElement.getAttribute('data-id');
                    let titleField = document.getElementById('title').value;
                    let authorField = document.getElementById('author').value;
                    let isbnField = document.getElementById('isbn').value;
                    console.log(titleField);
                    console.log(authorField);
                    console.log(isbnField);
                    
                    let postObj = {
                        isbn: isbnField,
                        title: titleField,
                        author: authorField,

                    };

                    var putObj = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: JSON.stringify(postObj),

                    };

                    fetch(`${url}/${id}`, putObj).then(function(res){
                        res.json().then(function(response){
                            console.log(response);
                            document.getElementById('title').value = '';
                            document.getElementById('author').value = '';
                            document.getElementById('isbn').value = '';
                            document.getElementById('submit').style.display = 'block';
                            get();
                        });
                    });

                });
                
                document.getElementsByClassName('delete')[i].addEventListener('click', function(){
                    // console.log(this.parentElement.parentElement.getAttribute('data-id'));
                    let id = this.parentElement.parentElement.getAttribute('data-id');
                    fetch(`${url}/${id}`, deleteObj).then(function(res){
                        res.json().then(function(response) {
                            
                            console.log(response);
                            get();
                        });
                    });
                });
            }
        });
    });
}
//******************************** Load Books Button Click event listener ********************************//
document.getElementById('loadBooks').addEventListener('click', function(){ // add event listener and run get function to pull info from kinvey database
    get(); // run get function 
});
// let length = HTMLCollection.length - 1;

let submitButton = document.getElementById('isbn').nextSibling.nextSibling;
submitButton.setAttribute('id', 'submit');
submitButton.setAttribute('type', 'button');

// console.log(submitButton);
let postURL = ' https://baas.kinvey.com/appdata/kid_SyIdiNmWP/books';

    
submitButton.addEventListener('click', function () {
    console.log('submit button clicked');
    let titleField = document.getElementById('title').value;
    let authorField = document.getElementById('author').value;
    let isbnField = document.getElementById('isbn').value;
    console.log(titleField);
    console.log(authorField);
    console.log(isbnField);

    let postObj = {
        isbn: isbnField,
        title: titleField,
        author: authorField,
        
    };

    myPostHeaders = new Headers({
        "Authorization": "Basic a2lkX1N5SWRpTm1XUDpjN2I1OWNhZTQwZWQ0ODA2OTc3MTYxYzk5MDdmZTA2ZQ==",
        "Host": "https://baas.kinvey.com",
        "Content-Type": "application/json",
        "X-Kinvey-API-Version": 5,

    });
    
    let myPostHeader = {
        method: "POST",
        headers: myPostHeaders,
        body: JSON.stringify(postObj),
    };
    // console.log('submit clicked');
    fetch(postURL, myPostHeader).then(function (res) {
        
        if (res.ok) {
            res.json().then(function (response) {
                console.log(response);
            });
        }
    });
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    get(); // run get function 
});
