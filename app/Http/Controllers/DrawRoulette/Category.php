<?php

namespace App\Http\Controllers\DrawRoulette;

use App\Http\Controllers\Controller;
use App\Models\DrawRoulette;
use App\Services\GoogleDriveService;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Category extends Controller
{

    public function index()
    {
        $category = DrawRoulette::all()->toArray();
        return $category;
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $drive_id = $request->input('drive_id');

        $post = DrawRoulette::create([
            'name'=> $name,
            'drive_id' => $drive_id
        ]);
        return [
            'msg' => 'New Category Added'
        ];
    }

    public function update(Request $request, string $id, Response $response)
    {
        $form = $request->all();
        $category = DrawRoulette::find($id);
        if(!$category){
            return  response()->json(['message' => 'Category not found'], 404);
        }
        $category->update($form);
        return  response()->json(['message' => 'Category updated'], 200);
    }
    public function get_photos(Request $request, Response $response){
        $photos = GoogleDriveService::get_photos($request->id);
        return $photos;
    }
    public function destroy(string $id)
    {
        //
        $category = DrawRoulette::find($id);

        if($category){
            $category->delete();
            return  response()->json(['message' => 'Category Deleted'], 200);
        }else {
            return  response()->json(['message' => 'Category not found'], 404);
        }

    }
}
