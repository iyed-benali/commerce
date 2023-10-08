<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ShippingInformationController;
use App\Http\Controllers\StaticPageController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::apiResource('admins', AdminController::class);
Route::apiResource('buyers', BuyerController::class);
Route::apiResource('sellers', SellerController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('carts', CartController::class);
Route::apiResource('notifications', NotificationController::class);
Route::apiResource('order-items', OrderItemController::class);
Route::apiResource('payments', PaymentController::class);
Route::apiResource('ratings', RatingController::class);
Route::apiResource('shipping-information', ShippingInformationController::class);
Route::apiResource('static-pages', StaticPageController::class);
Route::get('products/{product_id}/ratings', [RatingController::class, 'getRatingsForProduct']);
Route::post('add-to-cart', [CartController::class, 'addToCart']);
Route::post('orders', [OrderController::class, 'store']);
Route::get('orders/{order_id}/items', [OrderItemController::class, 'getOrderItems']);
Route::get('sellers/{id}/orders', [SellerController::class, 'getSellerOrders']);
Route::patch('/orders/{order_id}/status', [OrderController::class, 'updateStatus']);
Route::get('/sellers/{id}/products', [SellerController::class, 'getSellerProducts']);
Route::get('/products/{product_id}/ratings', [RatingController::class, 'getRatingsForProduct']);








