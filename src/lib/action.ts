'use server';

import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';

// 1. Sanatçı Ekleme
export async function addArtist(formData: FormData) {
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;

  const { data, error } = await supabase
    .from('artists')
    .insert([{ name, bio }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/'); // Ana sayfayı güncelle
  return data;
}

// 2. Albüm Ekleme
export async function addAlbum(formData: FormData) {
  const title = formData.get('title') as string;
  const artistId = formData.get('artistId') as string;

  const { error } = await supabase
    .from('albums')
    .insert([{ title, artist_id: artistId }]);

  if (error) throw new Error(error.message);

  revalidatePath(`/artists/${artistId}`); // Sanatçı detay sayfasını güncelle
}

// 3. Resim URL Güncelleme (Birazdan kullanacağız)
export async function updateArtistImage(artistId: string, imageUrl: string) {
  const { error } = await supabase
    .from('artists')
    .update({ image_url: imageUrl })
    .eq('id', artistId);

  if (error) throw new Error(error.message);
  revalidatePath(`/artists/${artistId}`);
}

// 4. Artistleri Getir

export async function getArtists(){
    const  {data : artists, error } = await supabase.from('artists').select('*');
    if(error){
        console.error('Müzisyenleri getirirken hata oluştu:', error.message);
        return [];
    }
    return artists;
}

