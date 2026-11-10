"use client";

import { useState, useActionState, useEffect } from "react";
import { tambahProject } from "./actions";

const initialState = {
    success: false,
    message: ""
};

export default function ProjectModal() {
    const [open, setOpen] = useState(false);

    const [state, formAction, pending] = useActionState(
        tambahProject,
        initialState
    );

    useEffect(() => {
        if (state.success) {
            setOpen(false);
        }
    }, [state]);

    return (
        <>
            {/* Tombol Tambah Project */}
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
                + Tambah Project
            </button>

            {/* Popup Form */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-bold">
                                Tambah Project Baru
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <form action={formAction} className="space-y-4">

                            <input
                                type="text"
                                name="nama"
                                placeholder="Nama Project"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            <textarea
                                name="deskripsi"
                                placeholder="Deskripsi Project"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            <input
                                type="text"
                                name="teknologi"
                                placeholder="Teknologi (Contoh: Next.js, Tailwind)"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            <select
                                name="kategori"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">Pilih Kategori</option>
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

                            <input
                                type="url"
                                name="gambar"
                                placeholder="URL Gambar Project"
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />

                            {state.message && (
                                <p className="text-sm text-red-600">
                                    {state.message}
                                </p>
                            )}

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
                                    {pending ? "Menyimpan..." : "Simpan Project"}
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
}
