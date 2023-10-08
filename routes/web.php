<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('/a', function () {
    return view('a');
});

Route::get('/admins', function(){
    return view ('admins');
});
Route::get('/buyers', function(){
    return view ('buyers');
});
Route::get('/sellers', function(){
    return view ('sellers');
});
Route::get('/static_pages',function(){
    return view('static_pages');
});
Route::get('/products',function(){
    return view('products');
});
Route::get('/ratings',function(){
    return view('ratings');
});
Route::get('/purchase',function(){
    return view('purchase');
});


use Illuminate\Support\Facades\DB;

Route::get('/test-database', function () {
    $admins = DB::table('admins')->get();
    return $admins;
});
