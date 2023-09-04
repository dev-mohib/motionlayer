<?php

namespace App\Http\Controllers;

use App\Models\VideoPost;
use App\Services\VideoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VideoController extends Controller
{
    
    public function index() {
        $videos = VideoPost::latest()->paginate(10);
        return Inertia::render('Home/index', [  
            'videos' => $videos,
        ]);
    }
    public function show($id) {
        $video = VideoPost::find($id);
        return Inertia::render('Home/view/index', [  
            'video' => $video,
        ]);
    }
    public function store(Request $request) {
        $title = $request->title??'video_canvas';
        $file = $request->file('video');
        // Log::info('loading file list');
        // foreach ($request->allFiles() as $index => $file) {
        //     // You can access the uploaded file using the $file object
        //     Log::info(['file_index'=> $index, 'file'=> $file]);
        //     $path = $file->store('public/uploaded_files'); // Store the file using the storage system
        // }

        $file->storeAs(path: 'public/videos/'.$request->fileName.'.mp4');
        $videoPath = $file->path();
        $outputPath = storage_path('app/public/thumbnails/') .$request->fileName.'.jpg';
        VideoService::generateThumbnail($videoPath, $outputPath);
        Log::info(['videoPath' =>  $videoPath, 'outputPath' => $outputPath]);
        $post = VideoPost::create([
            'title' => $title,
            'source' => $request->fileName.'.mp4',
            'thumbnail'=>$request->fileName.'.jpg'
        ]);
        // return redirect('/');
    }

    public function destroy() {}
    public function clean(){
        $videos = VideoPost::where('created_at', '<', now()->subYear())->get();
        foreach($videos as $video){
            Storage::delete('public/videos'.$video->source);
            Storage::delete('public/thumbnails'.$video->thumbnails);
            $video->delete();
        }
        return Inertia::render('Clean/index');
    }
}
