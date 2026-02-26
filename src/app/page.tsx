import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { getArtists } from "@/lib/action";

export default async function Home() {
  const artists = await getArtists();

  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Müzik Şirketi Ft. ALLAHIN OĞLU KEREM VE MÜTHİŞ RAPÇİ METZRHYME
          </h1>
          {/* Admin sayfasına hızlı geçiş butonu */}
          <Link href="/admin" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all">
            Yönetim Paneli
          </Link>
        </div>
        
        <h2 className="text-xl text-gray-400 mb-6">Sanatçılarımız</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artists.map((artist) => (
            // 2. Her bir kartı Link ile sarıyoruz
            <Link 
              key={artist.id} 
              href={`/artists/${artist.id}`} 
              className="group p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-gray-500 mt-1 line-clamp-1 italic">
                    {artist.bio || "Biyografi eklenmemiş."}
                  </p>
                </div>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}