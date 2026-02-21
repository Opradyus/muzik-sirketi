import { supabase } from "@/utils/supabase";
async function getArtists() {

  const { data: artists, error } = await supabase.from('artists').select('*');
  
  if (error) {
    console.error("Hata oluştu:", error.message);
    return [];
  }
  
  return artists;
}

export default async function Home() {
  const artists = await getArtists();

  return (
    <main className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-purple-500">Müzik Şirketi Paneli</h1>
      
      <h2 className="text-2xl mb-4">Sanatçılarımız:</h2>
      <div className="flex flex-col gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="p-4 bg-gray-800 rounded border border-gray-700">
            <h3 className="text-xl font-bold">{artist.name}</h3>
            <p className="text-gray-400">{artist.bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
}