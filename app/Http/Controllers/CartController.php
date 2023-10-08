<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'buyer_id' => 'required|exists:buyers,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $buyerId = $request->input('buyer_id');
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');

        // Check if the buyer already has the same product in the cart
        $existingCartItem = Cart::where('buyer_id', $buyerId)
            ->where('product_id', $productId)
            ->first();

        if ($existingCartItem) {
            // If the product already exists in the cart, update the quantity
            $existingCartItem->quantity += $quantity;
            $existingCartItem->save();
        } else {
            // If the product does not exist in the cart, create a new cart item
            $cartItem = new Cart();
            $cartItem->buyer_id = $buyerId;
            $cartItem->product_id = $productId;
            $cartItem->quantity = $quantity;
            $cartItem->save();
        }

        return response()->json(['message' => 'Item added to the cart']);
    }

public function destroy(int $id)
{
    $cart = Cart::find($id);

    if (!$cart) {
        return response()->json(['message' => 'Cart item not found'], 404);
    }

    $cart->delete();

    return response()->json(['message' => 'Cart item deleted successfully']);
}

public function show(int $id)
{
    $cart = Cart::find($id);

    if (!$cart) {
        return response()->json(['message' => 'Cart item not found'], 404);
    }

    return response()->json($cart);
}
public function index()
{
    $carts = Cart::all();
    return response()->json($carts);
}


}