"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";

export async function tambahProject(_prevState, formData) {
    const nama = formData.get("nama");
    const deskripsi = formData.get("deskripsi");
    const teknologi = formData.get("teknologi");
    const kategori = formData.get("kategori");
    const gambar = formData.get("gambar");

    // Validasi input
    if (!nama || !deskripsi || !teknologi || !kategori || !gambar) {
        return {
            success: false,
            message: "Semua field wajib diisi!"
        };
    }

    // Menyimpan data ke database
    await pool.query(
        `INSERT INTO projects
        (nama, deskripsi, teknologi, kategori, gambar)
        VALUES ($1, $2, $3, $4, $5)`,
        [nama, deskripsi, teknologi, kategori, gambar]
    );

    // Memperbarui halaman projects
    revalidatePath("/projects");

    return {
        success: true,
        message: "Project berhasil ditambahkan!"
    };
}



export async function hapusProject(formData) {
    const id = Number(formData.get("id"));

    // Validasi ID
    if (!Number.isInteger(id) || id <= 0) {
        return;
    }

    // Menghapus data dari database
    await pool.query(
        "DELETE FROM projects WHERE id = $1",
        [id]
    );

    // Memperbarui halaman projects
    revalidatePath("/projects");
}



export async function ubahProject(_prevState, formData) {
    const id = Number(formData.get("id"));
    const nama = formData.get("nama");
    const deskripsi = formData.get("deskripsi");
    const teknologi = formData.get("teknologi");
    const kategori = formData.get("kategori");
    const gambar = formData.get("gambar");

    // Validasi input
    if (
        !Number.isInteger(id) || id <= 0 ||
        !nama || !deskripsi || !teknologi ||
        !kategori || !gambar
    ) {
        return {
            success: false,
            message: "Semua data wajib diisi!"
        };
    }

    // Mengubah data di database
    const result = await pool.query(
        `UPDATE projects
         SET nama = $1,
             deskripsi = $2,
             teknologi = $3,
             kategori = $4,
             gambar = $5
         WHERE id = $6`,
        [nama, deskripsi, teknologi, kategori, gambar, id]
    );

    if (result.rowCount === 0) {
        return {
            success: false,
            message: "Project tidak ditemukan!"
        };
    }

    // Memperbarui halaman
    revalidatePath("/projects");

    return {
        success: true,
        message: "Project berhasil diperbarui!"
    };
}