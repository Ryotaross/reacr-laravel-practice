<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post2;

class Post2Controller extends Controller
{
    //
    public function index()
    {
        $posts = Post2::all();
        return response()->json($posts, 200);
    }
}
