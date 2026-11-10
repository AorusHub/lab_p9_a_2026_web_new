"use client";

import { useState } from "react";
import Link from "next/link";

export default function FotoCard({ id, judul, gambar }) {
  const [likes, setLikes] = useState(0);

  return (
    <article className="foto-card">
      <img src={gambar} alt={judul} />

      <div className="foto-info">
        <h3>{judul}</h3>

        <button onClick={() => setLikes(likes + 1)}>
          ❤️ Like ({likes})
        </button>

        <Link href={`/gallery/${id}`}>
          Lihat Detail →
        </Link>
      </div>
    </article>
  );
}