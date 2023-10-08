<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:50',
            'email' => 'required|email|unique:admins',
            'password' => 'required',
            'level' => 'required|in:boss,assistant,intern',
        ]);
    
        $admin = new Admin();
        $admin->name = $request->input('name');
        $admin->email = $request->input('email');
        $admin->password = bcrypt($request->input('password'));
        $admin->level = $request->input('level');
        $admin->save();
    
        return response()->json(['message' => 'Admin created successfully'], 201);
    }

    public function show(int $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        return response()->json($admin);
    }

    public function update(Request $request, int $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        $request->validate([
            'name' => 'required|max:50',
            'email' => 'required|email|unique:admins,email,' . $id,
            'password' => 'required',
            'level' => 'required|in:boss,assistant,intern',
        ]);

        $admin->name = $request->input('name');
        $admin->email = $request->input('email');
        $admin->password =$request->input('password');
        $admin->level = $request->input('level');
        $admin->save();
        

        return response()->json(['message' => 'Admin updated successfully']);
    }

    public function destroy(int $id)
    {
        $admin = Admin::find($id);
    
        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }
    
        $admin->delete();
    
        return response()->json(['message' => 'Admin deleted successfully']);
    }
}
