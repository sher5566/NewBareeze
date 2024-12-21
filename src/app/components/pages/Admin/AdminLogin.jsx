"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  validateCredentials,
  setAuthenticated,
  isAuthenticated,
} from "../../../utils/Auth/auth";
import LoadingSpinner from "../Loading/LoadingSpinner";

/**
 * AdminLoginForm Component
 *
 * Handles the login form rendering and submission logic
 *
 * @param {Object} props Component properties
 * @param {boolean} props.isLoading Loading state
 * @param {Function} props.handleSubmit Form submission handler
 * @param {Function} props.handleChange Input change handler
 * @param {Object} props.formData Form data state
 * @param {string} props.error Error message
 * @returns {JSX.Element} The login form
 */
const AdminLoginForm = ({
  isLoading,
  handleSubmit,
  handleChange,
  formData,
  error,
}) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    {error && (
      <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
        {error}
      </div>
    )}

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Username
      </label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={isLoading}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={isLoading}
      />
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {isLoading ? "Logging in..." : "Login"}
    </button>
  </form>
);

/**
 * AdminLoginContent Component
 *
 * Handles the authentication logic and login content rendering
 *
 * @returns {JSX.Element} The login content
 */
const AdminLoginContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated();
      if (auth) {
        router.push("/admin");
      }
      setIsPageLoading(false);
    };

    checkAuth();
  }, [pathname]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { username, password } = formData;

      if (validateCredentials(username, password)) {
        setAuthenticated(true);
        router.push("/admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-600 mt-2">
            Enter your credentials to continue
          </p>
        </div>

        <AdminLoginForm
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          error={error}
        />
      </div>
    </div>
  );
};

/**
 * Parent Component with Suspense Boundary
 *
 * @returns {JSX.Element} The Admin Login with Suspense
 */
const AdminLogin = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <LoadingSpinner />
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
};

export default AdminLogin;
