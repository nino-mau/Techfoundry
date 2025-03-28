<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserAuthController extends Controller
{
   public function register(Request $request)
   {
      $request->validate([
         'username' => 'required|string|max:255',
         'email' => 'required|string|email|max:255|unique:users',
         'password' => 'required|string|min:5|confirmed',
      ]);

      try {
         $user = User::create([
            'username' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
         ]);

         $token = $user->createToken('auth_token')->plainTextToken;

         return response()->json([
            'user' => $user,
            'token' => $token,
         ]);
         // Duplicate error
      } catch (QueryException $e) {

         if ($e->errorInfo[1] === 1062) {
            return response()->json([
               'message' => 'Email already in use',
               'errors' => ['email' => ['This email is already registered.']],
               'errorType' => 'duplicate'
            ], 409);
         }

         return response()->json([
            'message' => 'Unexpected error',
            'error' => $e->getMessage(),
            'errorType' => 'unexpected'
         ], 500);

         // Syntax Validation error
      } catch (ValidationException $e) {
         return response()->json([
            'message' => 'Syntax Error',
            'errors' => $e->errors(),
            'errorType' => 'validation'
         ], 422);

         // Unexpected error
      } catch (\Exception $e) {
         return response()->json([
            'message' => 'Unexpected error',
            'error' => $e->getMessage(),
            'errorType' => 'unexpected'
         ], 500);
      }
   }

   public function login(Request $request)
   {
      $request->validate([
         'email' => 'required|email',
         'password' => 'required',
      ]);

      if (!Auth::attempt($request->only('email', 'password'))) {
         throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
         ]);
      }

      $user = User::where('email', $request->email)->firstOrFail();
      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
         'user' => $user,
         'token' => $token,
      ]);
   }

   public function logout(Request $request)
   {
      $request->user()->currentAccessToken()->delete();

      return response()->json(['message' => 'Logged out successfully']);
   }
}
