<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Buyer;
use Illuminate\Support\Facades\Hash;

class BuyerController extends Controller
{
    public function index()
    {
        $buyers = Buyer::all();
        return response()->json($buyers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:50',
            'email' => 'required|email|unique:buyers',
            'password' => 'required',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:100',
        ]);
    
        $buyer = new Buyer();
        $buyer->name = $request->input('name');
        $buyer->email = $request->input('email');
        $buyer->password = bcrypt($request->input('password')); 
        $buyer->phone = $request->input('phone');
        $buyer->address = $request->input('address');
        $buyer->save();
    
        return response()->json(['message' => 'Buyer created successfully'], 201);
    }

    public function show(int $id)
    {
        $buyer = Buyer::find($id);

        if (!$buyer) {
            return response()->json(['message' => 'Buyer not found'], 404);
        }

        return response()->json($buyer);
    }

    public function update(Request $request, int $id)
    {
        $buyer = Buyer::find($id);

        if (!$buyer) {
            return response()->json(['message' => 'Buyer not found'], 404);
        }

        $request->validate([
            'name' => 'required|max:50',
            'email' => 'required|email|unique:buyers,email,' . $id,
            'password' => 'required',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:100',
        ]);

        $buyer->name = $request->input('name');
        $buyer->email = $request->input('email');
        $buyer->password = $request->input('password');
        $buyer->phone = $request->input('phone');
        $buyer->address = $request->input('address');
        $buyer->save();

        return response()->json(['message' => 'Buyer updated successfully']);
    }

    public function destroy(int $id)
    {
        $buyer = Buyer::find($id);
    
        if (!$buyer) {
            return response()->json(['message' => 'Buyer not found'], 404);
        }
    
        $buyer->delete();
    
        return response()->json(['message' => 'Buyer deleted successfully']);
    }
    
}