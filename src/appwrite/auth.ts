import appwriteConfi from "../envConfi";
import { Client, Account, ID } from "appwrite";
// import sdk from "appwrite";

type createAccountProps = {
  email: string;
  password: string;
  name?: string;
  profile?: string;
};

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appwriteConfi.appwriteUrl)
      .setProject(appwriteConfi.projectId);
    this.account = new Account(this.client);
  }

  //get the current login user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null;
  }

  // create a new user account
  async createAccount({ email, password, name }: createAccountProps) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // login with email and password
  async login({ email, password }: { email: string; password: string }) {
    try {
      const acc = await this.account.createEmailSession(email, password);
      return acc;
    } catch (error) {
      throw error;
    }
  }

  // logout the current user
  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}
const authService = new AuthService();
export default authService;
