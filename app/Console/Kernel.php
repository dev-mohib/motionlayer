<?php

namespace App\Console;

use App\Models\VideoPost;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Storage;

class Kernel extends ConsoleKernel
{

    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            // Delete VideoPosts older than 1 year
            $videos = VideoPost::where('created_at', '<', now()->subYear())->get();
            foreach($videos as $video){
                Storage::delete('public/videos'.$video->source);
                Storage::delete('public/thumbnails'.$video->thumbnails);
                $video->delete();
            }
        })->weeklyOn(0, '0'); // 0 represents Sunday, and '0' represents midnight (12:00 AM)
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
