<?php

use App\Http\Controllers\DrawRoulette\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/category', [Category::class, 'index']);
Route::post('/category', [Category::class, 'store']);
Route::put('/category/{id}', [Category::class, 'update']);
Route::delete('/category/{id}', [Category::class, 'destroy']);
Route::get('/photos', [Category::class, 'get_photos']);



Route::get('/storage-link', function(){
    $storagePath = storage_path('app/public');
    $publicPath = public_path('storage');

    if (file_exists($publicPath)) {        
        return ['message' => 'The symlink already exists.'];
    }
    if (symlink($storagePath, $publicPath)) {
        return ['message' => 'Symlink created successfully.'];
    } else {
        echo "Failed to create the symlink.";
        return ['message' => 'Failed to create the symlink.'];
    }
});

Route::get('/storage-unlink', function(){
    $privatePath = storage_path('app/public');
    $publicPath = $_SERVER['DOCUMENT_ROOT'].'/storage';

    if (File::exists($publicPath)) {
        unlink($publicPath);
        return [ 'message' => 'Symlink unlinked successfully.'];
    } else {
        return [ 'message' => 'Storage Symlink does not exist.'];
    }
});