<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'seller_id' => 'required|exists:sellers,id',
            'name' => 'required|max:100',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category' => 'required|max:50',
            'discount' => 'nullable|integer',
        ]);

        $product = new Product();
        $product->seller_id = $request->input('seller_id');
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->quantity = $request->input('quantity');
        $product->category = $request->input('category');
        $product->discount = $request->input('discount');
        $product->save();

        return response()->json(['message' => 'Product created successfully'], 201);
    }

    public function show(int $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function update(Request $request, int $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            'seller_id' => 'required|exists:sellers,id',
            'name' => 'required|max:100',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category' => 'required|max:50',
            'discount' => 'nullable|integer',
        ]);

        $product->seller_id = $request->input('seller_id');
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->quantity = $request->input('quantity');
        $product->category = $request->input('category');
        $product->discount = $request->input('discount');
        $product->save();

        return response()->json(['message' => 'Product updated successfully']);
    }

    public function destroy(int $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
