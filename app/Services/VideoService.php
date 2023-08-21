<?php

namespace App\Services;

use FFMpeg\FFMpeg;
use FFMpeg\Coordinate\TimeCode;
use FFMpeg\Format\Video\X264;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class VideoService
{
    public static function generateThumbnail($videoPath, $outputPath, $time = 1)
    {
        try {
            $ffmpeg = FFMpeg::create();
            $video = $ffmpeg->open($videoPath);
            
            $frame = $video->frame(TimeCode::fromSeconds($time));
            
            $frame->save($outputPath);
            
            return true; // Thumbnail generation successful
        } catch (RuntimeException $e) {
            Log::error($e->getMessage());
            
            return false; // Thumbnail generation failed
        }
    }
}