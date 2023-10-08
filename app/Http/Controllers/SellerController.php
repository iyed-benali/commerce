<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Seller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


    class SellerController extends Controller
    {
        public function index()
        {
            $sellers = Seller::all();
            return response()->json($sellers);
        }

        public function store(Request $request)
        {
            $request->validate([
                'name' => 'required|max:50',
                'email' => 'required|email|unique:sellers',
                'password' => 'required',
                'proof_document' => 'nullable|string|max:255',
            ]);
        
            $seller = new Seller();
            $seller->name = $request->input('name');
            $seller->email = $request->input('email');
            $seller->password = bcrypt($request->input('password')); 
            $seller->proof_document = $request->input('proof_document');
            $seller->save();
        
            return response()->json(['message' => 'Seller created successfully'], 201);
        }
        

        public function show(int $id)
        {
            $seller = Seller::find($id);

            if (!$seller) {
                return response()->json(['message' => 'Seller not found'], 404);
            }

            return response()->json($seller);
        }

        public function update(Request $request, int $id)
        {
            $seller = Seller::find($id);
        
            if (!$seller) {
                return response()->json(['message' => 'Seller not found'], 404);
            }
        
            $request->validate([
                'accepted' => 'required|boolean',
            ]);
        
            $seller->accepted = $request->input('accepted');
            $seller->save();
        
            return response()->json(['message' => 'Seller updated successfully']);
        }
        


        public function destroy(int $id)
        {
            $seller = Seller::find($id);
        
            if (!$seller) {
                return response()->json(['message' => 'Seller not found'], 404);
            }
        
            $seller->delete();
        
            return response()->json(['message' => 'Seller deleted successfully']);
        }
        public function getSellerOrders(int $id)
        {
            // Retrieve product IDs for the seller
            $productIds = DB::table('products')->where('seller_id', $id)->pluck('id');

            //  Fetch orders or order items associated with those products
            $orderItems = OrderItem::whereIn('product_id', $productIds)->get();

            $orderIds = $orderItems->pluck('order_id')->unique()->toArray();

        // Fetch the orders associated with the order IDs
            $orders = Order::whereIn('id', $orderIds)->get();

            return response()->json($orders);
        }
        public function getSellerProducts(int $id)
        {
            $products = DB::table('products')->where('seller_id', $id)->get();
        
            return response()->json($products);
        }
        
        
    }
