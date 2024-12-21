"use client";

import CryptoJS from "crypto-js";

const ADMIN_CREDENTIALS = {
  username: "adminNewBareeze",
  hashedPassword:
    "6e482ce303306fd02422ddc521a03c375b48ec5d47b61993f97fd41f8f291c27",
};

export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const validateCredentials = (username, password) => {
  const hashedAttempt = hashPassword(password);
  return (
    username === ADMIN_CREDENTIALS.username &&
    hashedAttempt === ADMIN_CREDENTIALS.hashedPassword
  );
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("adminAuth") === "true";
};

export const setAuthenticated = (status) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("adminAuth", status);
};

export const clearAuthentication = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("adminAuth");
};
