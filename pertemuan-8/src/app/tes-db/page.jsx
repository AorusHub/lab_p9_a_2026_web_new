
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

// CREATE: Menambahkan produk
async function tambahProduk(formData) {
    "use server";

    const nama = formData.get("nama");
    const harga = Number(formData.get("harga"));

    await pool.query(
        "INSERT INTO produk (nama, harga) VALUES ($1, $2)",
        [nama, harga]
    );

    revalidatePath("/tes-db");
}

// DELETE: Menghapus produk
async function hapusProduk(formData) {
    "use server";

    const id = Number(formData.get("id"));

    await pool.query(
        "DELETE FROM produk WHERE id = $1",
        [id]
    );

    revalidatePath("/tes-db");
}

async function editProduk(formData) {
    "use server";

    const id = Number(formData.get("id"));
    const nama = formData.get("nama");
    const harga = Number(formData.get("harga"));

    await pool.query(
        "UPDATE produk SET nama = $1, harga = $2 WHERE id = $3",
        [nama, harga, id]
    );

    revalidatePath("/tes-db");
}

export const dynamic = "force-dynamic";

export default async function TesDbPage() {

    // READ: Mengambil data produk
    const { rows } = await pool.query(
        "SELECT * FROM produk ORDER BY id ASC"
    );

    return (
        <div className="p-10 max-w-2xl mx-auto">

            <h1 className="text-2xl font-bold mb-5">
                Data Produk
            </h1>

            {/* FORM CREATE */}
            <form
                action={tambahProduk}
                className="border p-5 rounded-lg mb-8 space-y-4"
            >
                <h2 className="font-bold text-lg">
                    Tambah Produk
                </h2>

                <input
                    type="text"
                    name="nama"
                    placeholder="Nama Produk"
                    required
                    className="w-full border p-2 rounded-lg"
                />

                <input
                    type="number"
                    name="harga"
                    placeholder="Harga Produk"
                    required
                    min="1"
                    className="w-full border p-2 rounded-lg"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    Tambah Produk
                </button>
            </form>

            {/* READ DATA */}
            <p className="mb-4">
                Jumlah produk di database: {rows.length}
            </p>

            {rows.map((produk) => (
                <div
                    key={produk.id}
                    className="border p-4 mb-3 rounded-lg flex justify-between items-center"
                >

                    <div>
                        <h2 className="font-bold">
                            {produk.nama}
                        </h2>

                        <p>
                            Harga: Rp {produk.harga.toLocaleString("id-ID")}
                        </p>
                    </div>

                    <form action={editProduk} className="flex flex-col gap-2">

                        <input
                            type="hidden"
                            name="id"
                            value={produk.id}
                        />

                        <input
                            type="text"
                            name="nama"
                            defaultValue={produk.nama}
                            className="border p-2 rounded"
                            required
                        />

                        <input
                            type="number"
                            name="harga"
                            defaultValue={produk.harga}
                            className="border p-2 rounded"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white p-2 rounded"
                        >
                            Simpan Perubahan
                        </button>

                    </form>

                    {/* DELETE BUTTON */}
                    <form
                        action={hapusProduk}
                        onSubmit={undefined}
                    >
                        <input
                            type="hidden"
                            name="id"
                            value={produk.id}
                        />

                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Hapus
                        </button>
                    </form>

                </div>
            ))}

        </div>
    );
}
