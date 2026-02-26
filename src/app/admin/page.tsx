import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addArtist } from '@/lib/action';
export default function AdminPage() {
  

  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">Yönetim Paneli</h1>
        
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
          <h2 className="text-xl mb-6 font-semibold">Yeni Sanatçı Ekle</h2>
          
          <form action={addArtist} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sanatçı Adı</label>
              <input 
                name="name"
                type="text" 
                required 
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="Örn: Sezen Aksu"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Biyografi Ft. ALLAHIN OĞLU KEREM VE MÜTHİŞ RAPÇİ METZRHYME</label>
              <textarea 
                name="bio"
                rows={4}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="Sanatçı hakkında kısa bilgi..."
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-purple-900/20"
            >
              Kaydet +
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}