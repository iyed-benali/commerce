<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cart & Orders</title>
</head>
<body>
    <h1>Add Items to Cart</h1>
    <label for="addToCartBuyerId">Buyer ID:</label>
    <input type="number" id="addToCartBuyerId">
    <label for="addToCartProductId">Product ID:</label>
    <input type="number" id="addToCartProductId">
    <label for="addToCartQuantity">Quantity:</label>
    <input type="number" id="addToCartQuantity">
    <button onclick="addToCart()">Add to Cart</button>

    <h1>Place an Order</h1>
    <label for="placeOrderBuyerId">Buyer ID:</label>
    <input type="number" id="placeOrderBuyerId">
    <label for="paymentMethod">Payment Method:</label>
    <input type="text" id="paymentMethod">
    <button onclick="placeOrder()">Place Order</button>

    <h1>Get All Cart Items</h1>
    <button onclick="fetchAllCartItems()">Fetch All Cart Items</button>

    <h1>Get Cart Item by ID</h1>
    <label for="cartItemId">Cart Item ID:</label>
    <input type="number" id="cartItemId">
    <button onclick="fetchCartItemById()">Fetch Cart Item by ID</button>

    <h1>Get All Orders</h1>
    <button onclick="fetchAllOrders()">Fetch All Orders</button>

    <h1>Get Order by ID</h1>
    <label for="orderId">Order ID:</label>
    <input type="number" id="orderId">
    <button onclick="fetchOrderById()">Fetch Order by ID</button>

    <h1>Get Order Items by Order ID</h1>
    <label for="orderItemsOrderId">Order ID:</label>
    <input type="number" id="orderItemsOrderId">
    <button onclick="fetchOrderItems()">Fetch Order Items</button>

    <h1>Update Order Status</h1>
    <label for="updateOrderId">Order ID:</label>
    <input type="number" id="updateOrderId">
    <label for="updateStatus">Status:</label>
    <input type="text" id="updateStatus">
    <button onclick="updateOrderStatus()">Update Order Status</button>

    <div id="output"></div>
    <script>
        function addToCart() {
            const buyerId = document.getElementById('addToCartBuyerId').value;
            const productId = document.getElementById('addToCartProductId').value;
            const quantity = document.getElementById('addToCartQuantity').value;

            fetch('http://localhost:8000/api/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    buyer_id: buyerId,
                    product_id: productId,
                    quantity: quantity
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function placeOrder() {
            const buyerId = document.getElementById('placeOrderBuyerId').value;
            const paymentMethod = document.getElementById('paymentMethod').value;

            fetch('http://localhost:8000/api/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    buyer_id: buyerId,
                    payment_method: paymentMethod
                })
            })
            .then(response => response.json())
            .then(data => displayResponse(data))
            .catch(handleErrors);
        }

        function fetchAllCartItems() {
            fetch('http://localhost:8000/api/carts')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function fetchCartItemById() {
            const cartItemId = document.getElementById('cartItemId').value;

            fetch(`http://localhost:8000/api/carts/${cartItemId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function fetchAllOrders() {
            fetch('http://localhost:8000/api/orders')
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function fetchOrderById() {
            const orderId = document.getElementById('orderId').value;

            fetch(`http://localhost:8000/api/orders/${orderId}`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function fetchOrderItems() {
            const orderItemsOrderId = document.getElementById('orderItemsOrderId').value;

            fetch(`http://localhost:8000/api/orders/${orderItemsOrderId}/items`)
                .then(response => response.json())
                .then(data => displayResponse(data))
                .catch(handleErrors);
        }

        function updateOrderStatus() {
            const updateOrderId = document.getElementById('updateOrderId').value;
            const updateStatus = document.getElementById('updateStatus').value;

            fetch(`http://localhost:8000/api/orders/${updateOrderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: updateStatus
                })
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