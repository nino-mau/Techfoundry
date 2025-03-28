<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class BrandsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // get data to insert from json files
        $json = File::get(database_path('data/brands.json'));
        $brands = json_decode($json, true);

        foreach ($brands as $brand) {
            DB::table('brands')->insert([
                'name' => $brand['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
