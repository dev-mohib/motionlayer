<?php

namespace App\Http\Controllers;

use App\Models\VideoPost;
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
        $screenshot = $request->file('screenshot');

        if($screenshot){
            $screenshot->storeAs(path: 'public/image-'.$request->fileName.'.jpeg');
        }
        $file->storeAs(path: 'public/video-'.$request->fileName.'.mp4');
      
        $post = VideoPost::create([
            'title' => $title,
            'source' => 'video-'.$request->fileName.'.mp4',
            'thumbnail'=>'image-'.$request->fileName.'.jpeg'
        ]);
        return redirect('/');
    }

    public function destroy($id) {
        $video = VideoPost::find($id);
        Log::info($video);
        if($video){
            Storage::delete('public/'.$video->source);
            Storage::delete('public/'.$video->thumbnail);
            $video->delete();
        }
        return redirect('/');
    }
    public function clean(){
        $videos = VideoPost::where('created_at', '<', now()->subYear())->get();
        foreach($videos as $video){
            Storage::delete('public/'.$video->source);
            Storage::delete('public/'.$video->thumbnail);
            $video->delete();
        }
        return Inertia::render('Clean/index');
    }
}
