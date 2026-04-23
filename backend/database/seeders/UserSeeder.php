<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Avoid duplicate seeding on re-runs
        if (User::where('email', 'admin@resto.dev')->exists()) {
            $this->command->info('Admin user already exists — skipping.');

            return;
        }

        User::create([
            'username' => 'admin',
            'name' => 'admin',
            'email' => 'admin@resto.dev',
            'password' => 'admin@resto.dev', // auto-hashed by model cast
        ]);
    }
}
