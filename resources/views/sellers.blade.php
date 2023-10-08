<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sellers</title>
</head>
<body>
    <h1>Sellers</h1>
    <button onclick="fetchAllSellers()">Fetch All Sellers</button>

   
    <label for="createName">Name:</label>
<input type="text" id="createName">
<label for="createEmail">Email:</label>
<input type="email" id="createEmail">
<label for="createPassword">Password:</label>
<input type="password" id="createPassword">
<label for="createProofDocument">Proof Document:</label>
<input type="text" id="createProofDocument">
<label for="createAccepted">Accepted:</label>
<input type="number" id="createAccepted">
<button onclick="createSeller()">Create Seller</button>
    
    <h2>Fetch Seller by ID</h2>
    <label for="sellerId">Seller ID:</label>
    <input type="number" id="sellerId">
    <button onclick="fetchSellerById()">Fetch Seller by ID</button>

   
    <h2>Update Seller by ID</h2>
    <label for="updateId">Seller ID:</label>
    <input type="number" id="updateId">
    <label for="updateName">Name:</label>
    <input type="text" id="updateName">
    <label for="updateEmail">Email:</label>
    <input type="email" id="updateEmail">
    <button onclick="updateSeller()">Update Seller</button>

   
    <h2>Delete Seller by ID</h2>
    <label for="deleteId">Seller ID:</label>
    <input type="number" id="deleteId">
    <button onclick="deleteSeller()">Delete Seller</button>

    <div id="output"></div>

    <script>
        function displayResponse(response) {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = JSON.stringify(response, null, 2);
        }

        function handleErrors(error) {
            console.error('Error:', error);
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = 'An error occurred. Please check the console for details.';
        }

       
        function fetchAllSellers() {
            fetch('http://localhost:8000/api/sellers')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

       
        function createSeller() {
            const name = document.getElementById('createName').value;
            const email = document.getElementById('createEmail').value;
            const password = document.getElementById('createPassword').value;
           
            const proof = document.getElementById('createProofDocument').value;
            const accepted = document.getElementById('createAccepted').value;


            fetch('http://localhost:8000/api/sellers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    proof_document: proof,
                    accepted : accepted
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

      
        function fetchSellerById() {
            const sellerId = document.getElementById('sellerId').value;
            fetch(`http://localhost:8000/api/sellers/${sellerId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

       
        function updateSeller() {
            const sellerId = document.getElementById('updateId').value;
            const name = document.getElementById('updateName').value;
            const email = document.getElementById('updateEmail').value;

            fetch(`http://localhost:8000/api/sellers/${sellerId}`, {
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

       
        function deleteSeller() {
            const sellerId = document.getElementById('deleteId').value;
            fetch(`http://localhost:8000/api/sellers/${sellerId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }
    </script>
</body>
</html>
