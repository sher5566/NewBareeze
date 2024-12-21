"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "../../../utils/Auth/auth";
import LoadingSpinner from "../Loading/LoadingSpinner";

/**
 * ProtectedRouteContent Component
 *
 * This component handles the authentication logic and protected route rendering.
 *
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components to render when authenticated
 * @returns {JSX.Element} The Protected Route content
 */
const ProtectedRouteContent = ({ children }) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return children;
};

/**
 * Parent Component with Suspense Boundary
 *
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components to render when authenticated
 * @returns {JSX.Element} The Protected Route with Suspense
 */
const ProtectedRoute = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <LoadingSpinner />
        </div>
      }
    >
      <ProtectedRouteContent children={children} />
    </Suspense>
  );
};

export default ProtectedRoute;
