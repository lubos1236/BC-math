<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestTheme extends Model
{
    use HasFactory;
    public $timestamps = false;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'test_id',
        'theme',
        'w_count',
        'r_count',
    ];
    public function assignments()
    {
        return $this->belongsToMany(Assignment::class,'assignment_hint');
    }
    public function themeDetails()
    {
        return $this->belongsTo(Theme::class, 'theme');
    }
}
