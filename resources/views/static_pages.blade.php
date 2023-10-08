<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Static Pages</title>
</head>
<body>
    <h1>Static Pages</h1>
    <button onclick="fetchAllStaticPages()">Fetch All Static Pages</button>

   
    <h2>Create Static Page</h2>
    <label for="createTitle">Title:</label>
    <input type="text" id="createTitle">
    <label for="createContent">Content:</label>
    <textarea id="createContent"></textarea>
    <button onclick="createStaticPage()">Create Static Page</button>

   
    <h2>Fetch Static Page by ID</h2>
    <label for="staticPageId">Static Page ID:</label>
    <input type="number" id="staticPageId">
    <button onclick="fetchStaticPageById()">Fetch Static Page by ID</button>

    
    <h2>Update Static Page by ID</h2>
    <label for="updateId">Static Page ID:</label>
    <input type="number" id="updateId">
    <label for="updateTitle">Title:</label>
    <input type="text" id="updateTitle">
    <label for="updateContent">Content:</label>
    <textarea id="updateContent"></textarea>
    <button onclick="updateStaticPage()">Update Static Page</button>

    
    <h2>Delete Static Page by ID</h2>
    <label for="deleteId">Static Page ID:</label>
    <input type="number" id="deleteId">
    <button onclick="deleteStaticPage()">Delete Static Page</button>

    <div id="output"></div>

    <script>
        function fetchAllStaticPages() {
            fetch('http://localhost:8000/api/static-pages')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function createStaticPage() {
            const title = document.getElementById('createTitle').value;
            const content = document.getElementById('createContent').value;

            fetch('http://localhost:8000/api/static-pages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: title,
                    content: content
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function fetchStaticPageById() {
            const staticPageId = document.getElementById('staticPageId').value;
            fetch(`http://localhost:8000/api/static-pages/${staticPageId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function updateStaticPage() {
            const staticPageId = document.getElementById('updateId').value;
            const title = document.getElementById('updateTitle').value;
            const content = document.getElementById('updateContent').value;

            fetch(`http://localhost:8000/api/static-pages/${staticPageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: title,
                    content: content
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function deleteStaticPage() {
            const staticPageId = document.getElementById('deleteId').value;
            fetch(`http://localhost:8000/api/static-pages/${staticPageId}`, {
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
