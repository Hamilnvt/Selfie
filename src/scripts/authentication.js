//import axios from "axios";
//import dayjs from "dayjs"
//
//const AUTH_API_URL = "http://localhost:5000/auth";
//
//export const storeToken = (new_token) => {
//  localStorage.setItem("token", new_token);
//  localStorage.setItem("token_expiration", dayjs().valueOf());
//};
//
//export const getAuthToken = () => {
//  return localStorage.getItem("token");
//};
//
//export const isAuthenticated = () => {
//  const token = getAuthToken();
//  const expiry = localStorage.getItem("token_expiration")
//  const expired = (dayjs().valueOf() - expiry) > 60*60*1000
//  return !!token && !expired
//}
//
//export const clearToken = () => {
//  localStorage.removeItem("token");
//  localStorage.removeItem("token_expiration");
//};
//
//export const login = async ({ email, password }) => {
//  try {
//    const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });
//    const token = response.data.token;
//    storeToken(token);
//    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//    return response.data;
//  } catch (error) {
//    throw new Error(error.response.data.message || "Login failed");
//  }
//};
//
//export const register = async ({ email, password, username, fullName }) => {
//  try {
//    const response = await axios.post(`${AUTH_API_URL}/register`, { email, password, username, fullName });
//    const token = response.data.token;
//    storeToken(token);
//    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//    return response.data;
//  } catch (error) {
//    throw new Error(error.response.data.message || "Registrazione fallita" );
//  }
//};
//
//export const logout = async () => {
//  try {
//    const token = getAuthToken();
//    if (token) {
//      await axios.post(`${AUTH_API_URL}/logout`, {}, {
//        headers: {
//          Authorization: `Bearer ${token}`
//        }
//      });
//      clearToken();
//    }
//    delete axios.defaults.headers.common["Authorization"];
//  } catch (error) {
//    throw new Error(error.response.data.message || "Logout failed");
//  }
//};
