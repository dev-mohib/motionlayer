<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DrawRoulette extends Model
{
    use HasFactory;
    protected $table = 'category';
    protected $fillable = [
        'id',
        'name',
        'drive_id'
    ];
}
