<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('video_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('source');
            $table->string('thumbnail');
            $table->json('likes')->nullable();
            $table->integer('views')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_post');
    }
};
