import { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function List({ taskLists }) {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    const handleEdit = (list) => {
        setEditingId(list.id);
        setFormData({ title: list.title, description: list.description });
    };

    const handleUpdate = (id) => {
        router.put(route("list.update", id), formData, {
            onSuccess: () => {
                setEditingId(null);
                setFormData({ title: "", description: "" });
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this list?")) {
            router.delete(route("list.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className="p-6 ">
                <h1 className="text-xl font-bold mb-4 text-center">
                    My Task Lists
                </h1>
                <ul className="text-center">  
                    {taskLists.map((list) => (
                        <li
                            key={list.id}
                            className="mb-4 p-4 border rounded shadow-sm"
                        >
                            {editingId === list.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                title: e.target.value,
                                            })
                                        }
                                        className="block mb-2 p-1 border rounded w-full"
                                    />
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="block mb-2 p-1 border rounded w-full"
                                    />
                                    <button
                                        onClick={() => handleUpdate(list.id)}
                                        className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-400 text-white px-3 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-lg font-semibold">
                                        {list.title}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {list.description}
                                    </p>
                                    <button
                                        onClick={() => handleEdit(list)}
                                        className="mr-2 mt-2 bg-yellow-400 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(list.id)}
                                        className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
