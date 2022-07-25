import axios, { AxiosInstance, AxiosResponse } from "axios";
import { BookmarkType } from "../types/Bookmarks";
import { UserLoginValues, UserDataType } from "../types/User";

const DEV_URL: string = "http://localhost:3333";

export const server: AxiosInstance = axios.create({
  baseURL: DEV_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const signup = (data: UserDataType): Promise<AxiosResponse> =>
  server.post("/auth/signup", data);

export const login = (data: UserLoginValues): Promise<AxiosResponse> =>
  server.post("/auth/signin", data);

export const addBookmark = (data: BookmarkType): Promise<AxiosResponse> =>
  server.post("/bookmarks/create", data);

export const getBookmarks = (): Promise<AxiosResponse> =>
  server.get("/bookmarks");

export const updateBookmark = (data: {
  bookmarkId: number;
  data: BookmarkType;
}): Promise<AxiosResponse> =>
  server.put(`/bookmarks/update/${data.bookmarkId}`, data.data);

export const deleteBookmark = (bookmarkId: number): Promise<AxiosResponse> =>
  server.delete(`/bookmarks/delete/${bookmarkId}`);
