<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{

    // Return products based on query params
    public function filterProducts(array $params)
    {
        $query = Product::query();

        // check if request contains any param
        $hasFilters = isset($params['cat_id']) ||
                      isset($params['brand_id']) ||
                      isset($params['instock']) ||
                      !empty($params['search_value']);

        if ($hasFilters) {
            // Return products of specified cat
            if (isset($params['cat_id'])) {
                $query->where('category_id', $params['cat_id']);
            }

            // Return products of specified brand
            if (isset($params['brand_id'])) {
                $query->where('brand_id', $params['brand_id']);
            }

            // Return products where name contains search_value (partial match)
            if (!empty($params['search_value'])) {
                $query->where('name', 'like', '%' . $params['search_value'] . '%');
            }

            // Return products that are in stock
            if (isset($params['instock'])) {
                $query->where('quantity', '>', 0);
            }
        }
        return $query->get();
    }
}
