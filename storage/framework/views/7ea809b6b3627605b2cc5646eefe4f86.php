<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buyers</title>
</head>
<body>
    <h1>Buyers</h1>
    <button onclick="fetchAllBuyers()">Fetch All Buyers</button>

   
    <h2>Create Buyer</h2>
    <label for="createName">Name:</label>
    <input type="text" id="createName">
    <label for="createEmail">Email:</label>
    <input type="email" id="createEmail">
    <label for="createPassword">Password:</label>
    <input type="password" id="createPassword">
    <label for="createPhone">Phone:</label>
    <input type="text" id="createPhone">
    <label for="createAddress">Address:</label>
    <input type="text" id="createAddress">
    <button onclick="createBuyer()">Create Buyer</button>

    
    <h2>Fetch Buyer by ID</h2>
    <label for="buyerId">Buyer ID:</label>
    <input type="number" id="buyerId">
    <button onclick="fetchBuyerById()">Fetch Buyer by ID</button>

   
    <h2>Update Buyer by ID</h2>
    <label for="updateId">Buyer ID:</label>
    <input type="number" id="updateId">
    <label for="updateName">Name:</label>
    <input type="text" id="updateName">
    <label for="updateEmail">Email:</label>
    <input type="email" id="updateEmail">
    <button onclick="updateBuyer()">Update Buyer</button>

   
    <h2>Delete Buyer by ID</h2>
    <label for="deleteId">Buyer ID:</label>
    <input type="number" id="deleteId">
    <button onclick="deleteBuyer()">Delete Buyer</button>

    <div id="output"></div>

    <script>
        function fetchAllBuyers() {
            fetch('http://localhost:8000/api/buyers')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function createBuyer() {
    const name = document.getElementById('createName').value;
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;
    const phone = document.getElementById('createPhone').value;
    const address = document.getElementById('createAddress').value;

    fetch('http://localhost:8000/api/buyers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address
        })
    })
    .then(response => response.json())
    .then(data => displayResponse(data))
    .catch(handleErrors);
}


        function fetchBuyerById() {
            const buyerId = document.getElementById('buyerId').value;
            fetch(`http://localhost:8000/api/buyers/${buyerId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function updateBuyer() {
            const buyerId = document.getElementById('updateId').value;
            const name = document.getElementById('updateName').value;
            const email = document.getElementById('updateEmail').value;

            fetch(`http://localhost:8000/api/buyers/${buyerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function deleteBuyer() {
            const buyerId = document.getElementById('deleteId').value;
            fetch(`http://localhost:8000/api/buyers/${buyerId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

       
        function displayResponse(response) {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = JSON.stringify(response, null, 2);
        }

        function handleErrors(error) {
            console.error('Error:', error);
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = 'An error occurred. Please check the console for details.';
        }
    </script>
</body>
</html>
<?php /**PATH C:\xampp\htdocs\E-commerce\resources\views/buyers.blade.php ENDPATH**/ ?>