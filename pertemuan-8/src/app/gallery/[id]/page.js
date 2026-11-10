const galeriFoto = [
  {
    id: 1,
    judul: "Pegunungan",
    gambar:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
    deskripsi: "Pemandangan pegunungan yang indah.",
  },
  {
    id: 2,
    judul: "Pantai",
    gambar:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    deskripsi: "Pemandangan pantai dengan air laut yang jernih.",
  },
  {
    id: 3,
    judul: "Hutan",
    gambar:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
    deskripsi: "Suasana hutan yang hijau dan menenangkan.",
  },
];

export default async function DetailFotoPage({ params }) {
  const { id } = await params;

  const foto = galeriFoto.find(
    (item) => item.id === Number(id)
  );

  if (!foto) {
    return (
      <section>
        <h1>Foto Tidak Ditemukan</h1>
        <p>Maaf, foto yang kamu cari tidak tersedia.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>{foto.judul}</h1>

      <img
        src={foto.gambar}
        alt={foto.judul}
        style={{
          width: "100%",
          maxWidth: "700px",
          height: "auto",
          borderRadius: "12px",
        }}
      />

      <p>{foto.deskripsi}</p>
    </section>
  );
}