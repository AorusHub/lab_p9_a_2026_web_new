"use client";

import { useState, useActionState, useEffect } from "react";
import { ubahProject } from "./actions";

const initialState = {
    success: false,
    message: ""
};

export default function EditProjectModal({ project }) {

    const [open, setOpen] = useState(false);

    const [state, formAction, pending] = useActionState(
        ubahProject,
        initialState
    );

    useEffect(() => {
        if (state.success) {
            setOpen(false);
        }
    }, [state]);

    return (
        <>
            {/* Tombol Edit */}
            <div className="flex flex-col h-full">

                {/* Konten lainnya */}

                <div className="mt-auto pt-4">
                    <button
                        onClick={() => setOpen(true)}
                        className="w-full h-10 rounded-lg bg-yellow-600 text-white text-sm text-center font-medium hover:bg-yellow-700 transition"
                    >
                        Edit
                    </button>
                </div>

            </div>

            {/* Popup Edit */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-bold">
                                Edit Project
                            </h2>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="text-gray-500 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <form action={formAction} className="space-y-4">

                            {/* ID Project */}
                            <input
                                type="hidden"
                                name="id"
                                value={project.id}
                            />

                            {/* Nama */}
                            <input
                                type="text"
                                name="nama"
                                defaultValue={project.nama}
                                placeholder="Nama Project"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {/* Deskripsi */}
                            <textarea
                                name="deskripsi"
                                defaultValue={project.deskripsi}
                                placeholder="Deskripsi Project"
                                required
                                rows="3"
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {/* Teknologi */}
                            <input
                                type="text"
                                name="teknologi"
                                defaultValue={project.teknologi}
                                placeholder="Teknologi"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {/* Kategori */}
                            <select
                                name="kategori"
                                defaultValue={project.kategori}
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="Web Development">
                                    Web Development
                                </option>
                                <option value="Web Application">
                                    Web Application
                                </option>
                                <option value="Frontend Development">
                                    Frontend Development
                                </option>
                                <option value="API Integration">
                                    API Integration
                                </option>
                            </select>

                            {/* Gambar */}
                            <input
                                type="url"
                                name="gambar"
                                defaultValue={project.gambar}
                                placeholder="URL Gambar"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {/* Pesan */}
                            {state.message && (
                                <p className={
                                    state.success
                                        ? "text-green-600 text-sm"
                                        : "text-red-600 text-sm"
                                }>
                                    {state.message}
                                </p>
                            )}

                            {/* Tombol */}
                            <div className="flex justify-end gap-2 pt-2">

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="border px-4 py-2 rounded-lg"
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    disabled={pending}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                                >
                                    {pending
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}
        </>
    );
}
