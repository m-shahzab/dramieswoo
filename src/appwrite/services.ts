import appwriteConfi from "../envConfi";
import {
  Client,
  Account,
  Databases,
  Storage,
  Permission,
  Role,
  Query,
  ID,
} from "appwrite";
export type DocumentTypes = {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  [key: string]: any;
};

export interface FavListResult {
  message: string;
  data: DocumentTypes;
}

export class appwriteService {
  client = new Client();
  account;
  message: string = "";
  Databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(appwriteConfi.appwriteUrl)
      .setProject(appwriteConfi.projectId);
    this.account = new Account(this.client);
    this.Databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getFavList({
    user_id,
    lastId,
    preId,
  }: {
    user_id: string;
    lastId?: string;
    preId?: string;
  }) {
    try {
      const userFavList = await this.Databases.listDocuments(
        appwriteConfi.databaseId,
        appwriteConfi.collectionId,
        [
          Query.equal("user_id", user_id),
          Query.limit(20),
          lastId ? Query.cursorAfter(lastId) : Query.offset(0),
          preId ? Query.cursorBefore(preId) : Query.offset(0),
          Query.orderDesc("$createdAt"),
        ]
      );
      return userFavList;
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      return [];
    }
  }

  async createFavList({
    movie_id,
    movie_title,
    movie_poster_path,
    user,
    docId,
  }: {
    movie_id: string;
    movie_title: string;
    movie_poster_path: string;
    docId: string;
    user: User;
  }): Promise<FavListResult | undefined> {
    try {
      const userFavList = await this.Databases.createDocument(
        appwriteConfi.databaseId,
        appwriteConfi.collectionId,
        docId + user.id,
        {
          movie_id: movie_id,
          user_id: user?.id,
          user_name: user?.name,
          movie_poster_path: movie_poster_path,
          movie_title: movie_title,
        },
        [
          Permission.read(Role.user(user.id)),
          Permission.write(Role.user(user.id)),
        ]
      );
      const msg = (this.message = "Added successfully");
      if (userFavList) return { message: msg, data: userFavList };
    } catch (error: any) {
      const errMsg = (this.message = error.message.split(".")[0]);
      const msg =
        errMsg === "Document with the requested ID already exists"
          ? "Movie Already Added"
          : errMsg;
      return { message: msg, data: undefined as any as DocumentTypes };
    }
  }

  async deleteFavList(docId: string) {
    try {
      const userFavList = await this.Databases.deleteDocument(
        appwriteConfi.databaseId,
        appwriteConfi.collectionId,
        docId
      );
      const msg = (this.message = "Deleted successfully");
      if (userFavList) return msg;
    } catch (error) {
      console.error("Error deleting favorite list:", error);
      return "Error deleting favorite list";
    }
  }

  async getPref() {
    return await this.account.getPrefs();
  }
  async updatePrefs(prefs: { profileUrl: string }) {
    try {
      return await this.account.updatePrefs(prefs);
    } catch (error) {
      console.log(error);
    }
  }

  //file upload
  async profileUpload(file: File) {
    try {
      return await this.bucket.createFile(
        appwriteConfi.bucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  getProfileUrl(fileId: string) {
    try {
      return this.bucket.getFilePreview(appwriteConfi.bucketId, fileId);
    } catch (error) {
      console.log("Appwrite serive :: getProfileUrl :: error", error);
      return false;
    }
  }
}
const appwriteservice = new appwriteService();
export default appwriteservice;
