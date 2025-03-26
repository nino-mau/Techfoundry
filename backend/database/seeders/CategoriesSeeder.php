<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // get data to insert from json files
        $json = File::get(database_path('data/categories.json'));
        $categories = json_decode($json, true);

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'desc' => $category['desc'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
