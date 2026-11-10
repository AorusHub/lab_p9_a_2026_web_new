"use client";

import { hapusProject } from "./actions";

export default function HapusProjectButton({ id }) {

    return (
        <form
            action={hapusProject}
            onSubmit={(e) => {
                const yakin = window.confirm(
                    "Apakah kamu yakin ingin menghapus project ini?"
                );

                if (!yakin) {
                    e.preventDefault();
                }
            }}
        >
            <input
                type="hidden"
                name="id"
                value={id}
            />

            <button
                type="submit"
                className="w-full h-10 rounded-lg !bg-red-600 text-white text-sm font-medium hover:!bg-red-700 transition flex items-center justify-center"
            >
                Hapus
            </button>
        </form>
    );
}
