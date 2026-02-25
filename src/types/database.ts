export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Album {
  id: string;
  title: string;
  release_date: string | null;
  artist_id: string;
}

export interface Song {
  id: string;
  title: string;
  album_id: string;
  spotify_url: string | null;
  youtube_url: string | null;
}