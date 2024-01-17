const envConfi = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  apikey: String(import.meta.env.VITE_APPWRITE_API_KEY),
  collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tmdbToken: String(import.meta.env.VITE_TMDB_TOKEN),
};

export default envConfi;
