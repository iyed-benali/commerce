<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admins</title>
</head>
<body>
    <h1>Admins</h1>
    <button onclick="fetchAllAdmins()">Fetch All Admins</button>

    <!-- Create Admin -->
    <h2>Create Admin</h2>
<label for="createName">Name:</label>
<input type="text" id="createName">
<label for="createEmail">Email:</label>
<input type="email" id="createEmail">
<label for="createPassword">Password:</label>
<input type="password" id="createPassword">
<label for="createLevel">Level:</label>
<select id="createLevel">
    <option value="boss">boss</option>
    <option value="intern">intern</option>
    <option value="assistant">assistant</option>
</select>
<button onclick="createAdmin()">Create Admin</button>



    
    <h2>Fetch Admin by ID</h2>
    <label for="adminId">Admin ID:</label>
    <input type="number" id="adminId">
    <button onclick="fetchAdminById()">Fetch Admin by ID</button>

   
    <h2>Update Admin by ID</h2>
    <label for="updateId">Admin ID:</label>
    <input type="number" id="updateId">
    <label for="updateName">Name:</label>
    <input type="text" id="updateName">
    <label for="updateEmail">Email:</label>
    <input type="email" id="updateEmail">
    <button onclick="updateAdmin()">Update Admin</button>

    
    <h2>Delete Admin by ID</h2>
    <label for="deleteId">Admin ID:</label>
    <input type="number" id="deleteId">
    <button onclick="deleteAdmin()">Delete Admin</button>

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

        
        function fetchAllAdmins() {
            fetch('http://localhost:8000/api/admins')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

      
        function createAdmin() {
    const name = document.getElementById('createName').value;
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;
    const level = document.getElementById('createLevel').value;

    fetch('http://localhost:8000/api/admins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            level: level
        })
    })
    .then(response => response.json())
    .then(data => displayResponse(data))
    .catch(handleErrors);
}

      
        function fetchAdminById() {
            const adminId = document.getElementById('adminId').value;
            fetch(`http://localhost:8000/api/admins/${adminId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        
        function updateAdmin() {
            const adminId = document.getElementById('updateId').value;
            const name = document.getElementById('updateName').value;
            const email = document.getElementById('updateEmail').value;

            fetch(`http://localhost:8000/api/admins/${adminId}`, {
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

       
        function deleteAdmin() {
            const adminId = document.getElementById('deleteId').value;
            fetch(`http://localhost:8000/api/admins/${adminId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }
    </script>
</body>
</html>
<?php /**PATH C:\xampp\htdocs\E-commerce\resources\views/admins.blade.php ENDPATH**/ ?>