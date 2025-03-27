<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    // GET /api/products
    public function index()
    {
        $products = DB::select('SELECT * FROM products');

        return response()->json($products, 200);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = DB::select('SELECT * FROM products WHERE id = ?', [$id]);

        if (empty($product)) {
            return response()->json(['message' => 'Product not found.'], 404);
        }

        return response()->json($product[0]);
    }
}
