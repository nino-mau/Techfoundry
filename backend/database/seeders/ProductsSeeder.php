<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;


class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // get data to insert from json files
        $json = File::get(database_path('data/products.json'));
        $productsData = json_decode($json, true);

        $timestamp = now(); // create timestamp to current data

        // add time stamp to each item
        $productsWithTimestamps = array_map(function ($product) use ($timestamp) {
            $product['created_at'] = $timestamp;
            $product['updated_at'] = $timestamp;
            return $product;
        }, $productsData);

        DB::table('products')->insert($productsWithTimestamps);
    }
}
