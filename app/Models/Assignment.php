<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;
    public $timestamps = false;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'subject_id',
        'task',
        'variables',
        'solution',
    ];
    public function hints()
    {
        return $this->belongsToMany(Hint::class,'assignment_hint');
    }
    public function themes()
    {

    }
}
