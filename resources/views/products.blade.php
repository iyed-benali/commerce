<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products</title>
</head>
<body>
    <h1>Products</h1>
    <button onclick="fetchAllProducts()">Fetch All Products</button>

    <!-- Create Product -->
<h2>Create Product</h2>
<label for="createSellerId">Seller ID:</label>
<input type="number" id="createSellerId">
<label for="createName">Name:</label>
<input type="text" id="createName">
<label for="createDescription">Description:</label>
<textarea id="createDescription"></textarea>
<label for="createPrice">Price:</label>
<input type="number" id="createPrice">
<label for="createQuantity">Quantity:</label>
<input type="number" id="createQuantity">
<label for="createImage">Image URL:</label>
<input type="text" id="createImage">
<label for="createCategory">Category:</label>
<input type="text" id="createCategory">
<label for="createDiscount">Discount:</label>
<input type="number" id="createDiscount">
<button onclick="createProduct()">Create Product</button>


    <!-- Fetch Product by ID -->
    <h2>Fetch Product by ID</h2>
    <label for="productId">Product ID:</label>
    <input type="number" id="productId">
    <button onclick="fetchProductById()">Fetch Product by ID</button>

    <!-- Update Product by ID -->
    <h2>Update Product by ID</h2>
    <label for="updateProductId">Product ID:</label>
    <input type="number" id="updateProductId">
    <label for="updateName">Name:</label>
    <input type="text" id="updateName">
    <label for="updateDescription">Description:</label>
    <textarea id="updateDescription"></textarea>
    <label for="updatePrice">Price:</label>
    <input type="number" id="updatePrice">
    <label for="updateQuantity">Quantity:</label>
    <input type="number" id="updateQuantity">
    <label for="updateImage">Image URL:</label>
    <input type="text" id="updateImage">
    <label for="updateCategory">Category:</label>
    <input type="text" id="updateCategory">
    <label for="updateDiscount">Discount:</label>
    <input type="number" id="updateDiscount">
    <button onclick="updateProduct()">Update Product</button>

    <!-- Delete Product by ID -->
    <h2>Delete Product by ID</h2>
    <label for="deleteProductId">Product ID:</label>
    <input type="number" id="deleteProductId">
    <button onclick="deleteProduct()">Delete Product</button>

    <div id="output"></div>

    <script>
        function fetchAllProducts() {
            fetch('http://localhost:8000/api/products')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function createProduct() {
    const sellerId = document.getElementById('createSellerId').value;
    const name = document.getElementById('createName').value;
    const description = document.getElementById('createDescription').value;
    const price = document.getElementById('createPrice').value;
    const quantity = document.getElementById('createQuantity').value;
    const image = document.getElementById('createImage').value;
    const category = document.getElementById('createCategory').value;
    const discount = document.getElementById('createDiscount').value;

    fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            seller_id: sellerId,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            image: image,
            category: category,
            discount: discount
        })
    })
    .then(response => response.json())
    .then(data => displayResponse(data))
    .catch(handleErrors);
}


        function fetchProductById() {
            const productId = document.getElementById('productId').value;
            fetch(`http://localhost:8000/api/products/${productId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function updateProduct() {
            const productId = document.getElementById('updateProductId').value;
            const name = document.getElementById('updateName').value;
            const description = document.getElementById('updateDescription').value;
            const price = document.getElementById('updatePrice').value;
            const quantity = document.getElementById('updateQuantity').value;
            const image = document.getElementById('updateImage').value;
            const category = document.getElementById('updateCategory').value;
            const discount = document.getElementById('updateDiscount').value;

            fetch(`http://localhost:8000/api/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price,
                    quantity: quantity,
                    image: image,
                    category: category,
                    discount: discount
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function deleteProduct() {
            const productId = document.getElementById('deleteProductId').value;
            fetch(`http://localhost:8000/api/products/${productId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        // Helper functions
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
