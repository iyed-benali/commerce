<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StaticPage;
use Illuminate\Support\Facades\Log;

class StaticPageController extends Controller
{
    public function index()
    {
        $pages = StaticPage::all();
        return response()->json($pages);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|max:50',
                'content' => 'required',
            ]);

            $page = new StaticPage();
            $page->name = $request->input('name');
            $page->content = $request->input('content');
            $page->save();

            return response()->json(['message' => 'Static page created successfully'], 201);
        } catch (\Exception $e) {
            // Log the exception for debugging purposes
            Log::error('Error saving static page: ' . $e->getMessage());

            // Return an error response with appropriate status code
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function show(int $id)
    {
        $page = StaticPage::find($id);

        if (!$page) {
            return response()->json(['message' => 'Static page not found'], 404);
        }

        return response()->json($page);
    }

    public function update(Request $request, int $id)
    {
        $page = StaticPage::find($id);

        if (!$page) {
            return response()->json(['message' => 'Static page not found'], 404);
        }

        $request->validate([
            'name' => 'required|max:50',
            'content' => 'required',
        ]);

        $page->name = $request->input('name');
        $page->content = $request->input('content');
        $page->save();

        return response()->json(['message' => 'Static page updated successfully']);
    }

    public function destroy(int $id)
    {
        $page = StaticPage::find($id);

        if (!$page) {
            return response()->json(['message' => 'Static page not found'], 404);
        }

        $page->delete();

        return response()->json(['message' => 'Static page deleted successfully']);
    }
}