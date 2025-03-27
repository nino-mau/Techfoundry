<?php

use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'test from Laravel API!']);
});


//***===== Products Routes =====***//

Route::get('products', [ProductsController::class, 'index']);
Route::get('products/{id}', [ProductsController::class, 'show']);

