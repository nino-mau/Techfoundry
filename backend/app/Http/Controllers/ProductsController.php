<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;


class ProductsController extends Controller
{
    protected $productService;

    // get services methods
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    // GET /api/products?cat_id=value&brand_id=value&search_value=value&instock=bool
    public function index(Request $request)
    {
        $products = $this->productService->filterProducts($request->all());

        if (! $products) {
            return response()->json(['message' => 'Product not found.'], 404);
        }
        return response()->json($products, 200);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = Product::find($id);

        if (! $product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }
        return response()->json($product[0]);
    }
}
