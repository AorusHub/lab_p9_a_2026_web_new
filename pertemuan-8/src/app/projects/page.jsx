import pool from "@/lib/db";
import ProjectModal from "./projectModal";
import HapusProjectButton from "./HapusProjectButton";
import EditProjectModal from "./EditProjectModal";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {

    // READ: Mengambil data dari database
    const { rows } = await pool.query(
        "SELECT * FROM projects ORDER BY id ASC"
    );

    return (
        <main className="max-w-6xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="flex justify-between items-center mb-10">

                <div>
                    <h1 className="text-3xl font-bold">
                        My Projects
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Beberapa project yang pernah saya buat.
                    </p>
                </div>

                {/* Tombol Popup */}
                <ProjectModal />

            </div>

            {/* Daftar Project */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {rows.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                    >

                        <img
                            src={p.gambar}
                            alt={p.nama}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-5">

                            <span className="text-blue-600 text-sm font-semibold">
                                {p.kategori}
                            </span>

                            <h2 className="text-xl font-bold mt-2">
                                {p.nama}
                            </h2>

                            <p className="text-gray-600 text-sm mt-2">
                                {p.deskripsi}
                            </p>

                            <div className="border-t mt-4 pt-3">
                                <p className="text-sm text-gray-500">
                                    Teknologi:
                                </p>

                                <p className="text-sm font-medium">
                                    {p.teknologi}
                                </p>
                            </div>

                        <div className="mt-2 flex justify-center gap-2">

                            <div className="justify-center flex-1">
                                <EditProjectModal project={p} />
                            </div>

                            <div className="justify-center flex-1">
                                <HapusProjectButton id={p.id} />
                            </div>

                        </div>

                        </div>
                    </div>
                ))}

            </div>

        </main>
    );
}
