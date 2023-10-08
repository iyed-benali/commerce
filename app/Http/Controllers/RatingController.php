<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rating;
use App\Models\Product;

class RatingController extends Controller
{
    public function index()
    {
        $ratings = Rating::all();
        return response()->json($ratings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'buyer_id' => 'required|exists:buyers,id',
            'value' => 'required|integer|between:1,5',
            'comment' => 'nullable',
        ]);

        $rating = new Rating();
        $rating->product_id = $request->input('product_id');
        $rating->buyer_id = $request->input('buyer_id');
        $rating->value = $request->input('value');
        $rating->comment = $request->input('comment');
        $rating->save();

        return response()->json(['message' => 'Rating created successfully'], 201);
    }

    public function show(int $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        return response()->json($rating);
    }

    public function update(Request $request, int $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'buyer_id' => 'required|exists:buyers,id',
            'value' => 'required|integer|between:1,5',
            'comment' => 'nullable',
        ]);

        $rating->product_id = $request->input('product_id');
        $rating->buyer_id = $request->input('buyer_id');
        $rating->value = $request->input('value');
        $rating->comment = $request->input('comment');
        $rating->save();

        return response()->json(['message' => 'Rating updated successfully']);
    }

    public function destroy(int $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        $rating->delete();

        return response()->json(['message' => 'Rating deleted successfully']);
    }
    
    public function getRatingsForProduct(int $product_id)
    {
        $product = Product::find($product_id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $ratings = Rating::where('product_id', $product_id)->get();

        return response()->json(['ratings' => $ratings], 200);
    }
}
