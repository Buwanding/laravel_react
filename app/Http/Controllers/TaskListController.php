<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\TaskList;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskListController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Assign the authenticated user (fallback to user_id = 1 for testing)
        $validated['user_id'] = auth()->id() ?? 1;

        // Create a new task list
        $taskList = TaskList::create($validated);

        // Return JSON if you want to handle this with Inertia (preferred)
        return to_route('dashboard')->with('success', 'Task list created successfully!');
    }
 public function index()
{
    $taskLists = TaskList::where('user_id', auth()->id())->get();

    return Inertia::render('List', [
        'taskLists' => $taskLists,
    ]);
}
public function update(Request $request, $id)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
    ]);

    $list = TaskList::where('user_id', auth()->id())->findOrFail($id);
    $list->update($validated);

    return redirect()->back()->with('success', 'List updated.');
}

public function destroy($id)
{
    $list = TaskList::where('user_id', auth()->id())->findOrFail($id);
    $list->delete();

    return redirect()->back()->with('success', 'List deleted.');
}

}