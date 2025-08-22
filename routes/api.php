<?php

use App\Http\Controllers\Api\PostController;
use App\Models\Todo;
use App\Http\Controllers\Api\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


// Route::get('/sanctum/csrf-cookie', function () {
//     return response()->noContent();
// });


// Get logged-in user
Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

// Post routes
Route::middleware('auth:sanctum')->apiResource('posts', PostController::class);

// // Auth routes
// Route::middleware([
//     EnsureFrontendRequestsAreStateful::class,
//     'web',
// ])->post('/login', function (Request $request) {


//     $credentials = $request->only('email', 'password');

//     if (!Auth::attempt($credentials)) {
//         return response()->json(['message' => 'Invalid login'], 401);
//     }

//     $request->session()->regenerate();
//     return response()->json(['message' => 'Logged in']);

//     ///////////////////

//     $request->validate([
//             'email' => 'required|email',
//             'password' => 'required',
//         ]);
    
//         $user = User::where('email', $request->email)->first();
    
//         if (! $user || ! Hash::check($request->password, $user->password)) {
//             throw ValidationException::withMessages([
//                 'email' => ['The provided credentials are incorrect.'],
//             ]);
//         }
    
//         return response()->json([
//             'token' => $user->createToken('vue-spa')->plainTextToken,
//             'user' => $user
//         ]);
// });

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {

     Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    
    if ($request->user()) {
        $request->user()->currentAccessToken()->delete();
    }
    
    // Clear client-side token
    return response()->json(['message' => 'Logged out']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('todos', \App\Http\Controllers\Api\TodoController::class);
});