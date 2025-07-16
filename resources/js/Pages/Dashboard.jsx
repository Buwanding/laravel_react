import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from "@inertiajs/inertia-react";
export default function Dashboard() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/task-lists", {
            onSuccess: () => reset(),
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center font-bold text-lg">
                            Create Task List
                        </div>
                        <div className="p-6 text-center border rounded-md shadow-sm">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="mt-1 border rounded p-2 w-full"
                                        placeholder="Enter task list title"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 border rounded p-2 w-full"
                                        placeholder="Enter description (optional)"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
