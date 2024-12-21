"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { clearAuthentication, isAuthenticated } from "../../../utils/Auth/auth";
import LoadingSpinner from "../Loading/LoadingSpinner";

/**
 * AdminHeaderContent Component
 *
 * This component handles the authentication logic and header rendering.
 *
 * @returns {JSX.Element} The Admin Header content
 */
const AdminHeaderContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated();
      setIsAuth(auth);

      if (!auth && pathname !== "/admin/login") {
        router.push("/admin/login");
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname]);

  const handleLogout = () => {
    clearAuthentication();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4 px-6 bg-white shadow-sm">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900">
        Discount Management
      </h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Logout
      </button>
    </div>
  );
};

/**
 * Parent Component with Suspense Boundary
 *
 * @returns {JSX.Element} The Admin Header with Suspense
 */
const AdminHeader = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-4 px-6 bg-white shadow-sm">
          <LoadingSpinner />
        </div>
      }
    >
      <AdminHeaderContent />
    </Suspense>
  );
};

export default AdminHeader;
