<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ratings</title>
</head>
<body>
    <h1>Ratings</h1>
    <button onclick="fetchAllRatings()">Fetch All Ratings</button>

  
    <h2>Create Rating</h2>
    <label for="createProductId">Product ID:</label>
    <input type="number" id="createProductId">
    <label for="createBuyerId">Buyer ID:</label>
    <input type="number" id="createBuyerId">
    <label for="createValue">Rating Value:</label>
    <input type="number" id="createValue" min="1" max="5">
    <label for="createComment">Comment:</label>
    <textarea id="createComment"></textarea>
    <button onclick="createRating()">Create Rating</button>

    
    <h2>Fetch Rating by ID</h2>
    <label for="ratingId">Rating ID:</label>
    <input type="number" id="ratingId">
    <button onclick="fetchRatingById()">Fetch Rating by ID</button>

    
    <h2>Update Rating by ID</h2>
    <label for="updateId">Rating ID:</label>
    <input type="number" id="updateId">
    <label for="updateValue">Rating Value:</label>
    <input type="number" id="updateValue" min="1" max="5">
    <label for="updateComment">Comment:</label>
    <textarea id="updateComment"></textarea>
    <button onclick="updateRating()">Update Rating</button>

    
    <h2>Delete Rating by ID</h2>
    <label for="deleteId">Rating ID:</label>
    <input type="number" id="deleteId">
    <button onclick="deleteRating()">Delete Rating</button>

    
    <h2>Fetch Ratings for a Specific Product</h2>
    <label for="productRatingsId">Product ID:</label>
    <input type="number" id="productRatingsId">
    <button onclick="fetchRatingsForProduct()">Fetch Ratings for Product</button>

    <div id="output"></div>

    <script>
        function fetchAllRatings() {
            fetch('http://localhost:8000/api/ratings')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function createRating() {
            const productId = document.getElementById('createProductId').value;
            const buyerId = document.getElementById('createBuyerId').value;
            const value = document.getElementById('createValue').value;
            const comment = document.getElementById('createComment').value;

            fetch('http://localhost:8000/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    buyer_id: buyerId,
                    value: value,
                    comment: comment
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function fetchRatingById() {
            const ratingId = document.getElementById('ratingId').value;
            fetch(`http://localhost:8000/api/ratings/${ratingId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function updateRating() {
            const ratingId = document.getElementById('updateId').value;
            const value = document.getElementById('updateValue').value;
            const comment = document.getElementById('updateComment').value;

            fetch(`http://localhost:8000/api/ratings/${ratingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: value,
                    comment: comment
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function deleteRating() {
            const ratingId = document.getElementById('deleteId').value;
            fetch(`http://localhost:8000/api/ratings/${ratingId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function fetchRatingsForProduct() {
            const productId = document.getElementById('productRatingsId').value;
            fetch(`http://localhost:8000/api/products/${productId}/ratings`)
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
<?php /**PATH C:\xampp\htdocs\E-commerce\resources\views/ratings.blade.php ENDPATH**/ ?>