<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoPost extends Model
{
    use HasFactory;
    protected $table = 'video_posts';
    protected $casts = ['likes' => 'array'];
    protected $fillable = [
        'id',
        'title',
        'source',
        'likes',
        'views',
        'thumbnail'
    ];
}
