import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { addAlbum } from '@/lib/action';
// 1. Params'ı bir Promise olarak tanımlıyoruz
interface PageProps {
  params: Promise<{ id: string }>;
}


export default async function ArtistDetailPage({ params }: PageProps) {
  // 2. SİHİRLİ DOKUNUŞ: Params'ın içindeki id'yi await ile "paketinden çıkarıyoruz"
  const { id } = await params;

  const { data: artist, error } = await supabase
    .from('artists')
    .select(`
      *,
      albums (
        id,
        title,
        release_date,
        songs (
          id,
          title,
          spotify_url,
          youtube_url
        )
      )
    `)
    .eq('id', id) // Artık tertemiz 'id' değişkenini kullanabiliriz
    .single();

  if (error || !artist) {
    return notFound();
  }

  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      {/* Geri kalan her şey aynı kalabilir */}
      <h1 className="text-5xl font-extrabold text-purple-400 mb-4">{artist.name}</h1>
      <p className="text-gray-400 mb-10 max-w-2xl">{artist.bio}</p>

      <h2 className="text-3xl font-bold mb-6">Diskografi</h2>
      
      <div className="grid gap-8">
        {artist.albums?.map((album: any) => (
          <div key={album.id} className="p-6 bg-gray-900 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-semibold text-yellow-500 mb-4">{album.title}</h3>
            
            <ul className="space-y-2">
              {album.songs?.map((song: any) => (
                <li key={song.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                  <span>{song.title}</span>
                  <div className="flex gap-4 text-sm">
                    {song.spotify_url && <a href={song.spotify_url} target="_blank" className="text-green-500 hover:underline">Spotify</a>}
                    {song.youtube_url && <a href={song.youtube_url} target="_blank" className="text-red-500 hover:underline">YouTube</a>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-dashed border-gray-700">
        <h3 className="text-xl font-bold mb-4">Bu Sanatçıya Yeni Albüm Ekle</h3>
        <form action={addAlbum} className="flex gap-4">
          <input type="hidden" name="artistId" value={artist.id} />
          <input 
            name="title" 
            placeholder="Albüm Adı" 
            className="flex-1 p-2 bg-gray-800 rounded border border-gray-700 outline-none"
            required 
          />
          <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-bold">
            Ekle
          </button>
        </form>
      </div>
    </main>
  );
}