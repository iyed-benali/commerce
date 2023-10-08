<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'buyer_id' => 'required|exists:buyers,id',
            'payment_method' => 'required',
        ]);
    
        // Calculate the total amount for the order based on the items in the cart.
        $total = $this->calculateTotalOrderAmount($request->input('buyer_id')); // Pass the buyer_id to the function.
    
        // Create the new order in the orders table.
        $order = new Order();
        $order->buyer_id = $request->input('buyer_id');
        $order->quantity = $this->calculateTotalQuantity($request->input('buyer_id')); // Pass the buyer_id to the function.
        $order->payment_method = $request->input('payment_method');
        $order->total = $total;
        $order->status = 'pending'; // Set the status to "pending" initially.
        $order->save();
    
        return response()->json(['message' => 'Order created successfully'], 201);
    }
    
    private function calculateTotalOrderAmount($buyerId)
    {
        // Retrieve the cart items for the buyer.
        $cartItems = Cart::where('buyer_id', $buyerId)->get();
    
        $total = 0;
    
        foreach ($cartItems as $cartItem) {
            // Check if the product exists and has a price before adding to the total.
            if ($cartItem->product && $cartItem->product->price) {
                $total += $cartItem->quantity * $cartItem->product->price;
            }
        }
    
        return $total;
    }
    
    private function calculateTotalQuantity($buyerId)
    {
        // Retrieve the cart items for the buyer.
        $cartItems = Cart::where('buyer_id', $buyerId)->get();
    
        $totalQuantity = 0;
    
        foreach ($cartItems as $cartItem) {
            $totalQuantity += $cartItem->quantity;
        }
    
        return $totalQuantity;
    }
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }


    public function show(int $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }
    public function updateStatus(Request $request, int $order_id)
{
    $request->validate([
        'status' => 'required|in:shipped,delivered',
    ]);

    $order = Order::find($order_id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    // Update the status based on the provided value in the request body.
    $order->status = $request->input('status');
    $order->save();

    return response()->json(['message' => 'Order status updated successfully'], 200);
}
}

