<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'test from Laravel API!']);
});


//***===== Auth Routes =====***//

Route::post('user/register', [UserAuthController::class, 'register']);
Route::post('user/login', [UserAuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('user/logout', [UserAuthController::class, 'logout']);


//***===== Products Routes =====***//

Route::get('products', [ProductsController::class, 'index']);
Route::get('products/{id}', [ProductsController::class, 'show']);

