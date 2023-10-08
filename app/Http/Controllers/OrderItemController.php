<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderItem;


class OrderItemController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Create a new record in the order_items table.
        $orderItem = new OrderItem();
        $orderItem->order_id = $request->input('order_id');
        $orderItem->product_id = $request->input('product_id');
        $orderItem->quantity = $request->input('quantity');
        $orderItem->save();

        return response()->json(['message' => 'Item added to the order'], 201);
    }

    public function getOrderItems($orderId)
    {
        $orderItems = OrderItem::where('order_id', $orderId)->get();

        if ($orderItems->isEmpty()) {
            return response()->json(['message' => 'Order items not found'], 404);
        }

        return response()->json($orderItems);
    }
}
