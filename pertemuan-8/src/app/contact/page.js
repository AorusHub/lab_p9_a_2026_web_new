"use client";

import { useState } from "react";

export default function ContactPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setStatus(
      `Terima kasih, ${nama}! Pesan kamu berhasil diproses.`
    );
  }

  return (
    <section>
      <h1>Contact Me</h1>
      <p>Silakan isi formulir berikut untuk menghubungi saya.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(event) => setNama(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pesan">Pesan</label>
          <textarea
            id="pesan"
            value={pesan}
            onChange={(event) => setPesan(event.target.value)}
            required
          />
        </div>

        <button type="submit">Kirim Pesan</button>
      </form>

      {status && <p className="form-status">{status}</p>}
    </section>
  );
}