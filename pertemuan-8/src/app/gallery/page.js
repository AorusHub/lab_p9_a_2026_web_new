import FotoCard from "../../components/FotoCard";

const galeriFoto = [
  {
    id: 1,
    judul: "Pegunungan",
    gambar:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
  },
  {
    id: 2,
    judul: "Pantai",
    gambar:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  },
  {
    id: 3,
    judul: "Hutan",
    gambar:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
  },
];

export default function GalleryPage() {
  return (
    <section>
      <h1>My Gallery</h1>
      <p>Kumpulan foto favorit saya.</p>

      <div className="gallery-grid">
        {galeriFoto.map((foto) => (
          <FotoCard
            key={foto.id}
            id={foto.id}
            judul={foto.judul}
            gambar={foto.gambar}
          />
        ))}
      </div>
    </section>
  );
}