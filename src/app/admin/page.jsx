import ProtectedRoute from "../components/pages/Auth/ProtectedRoute";
import AdminHeader from "../components/pages/Admin/AdminHeader";
import DiscountAdmin from "../components/pages/Admin/adminUI";

export default function AdminDiscountPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <DiscountAdmin />
        </div>
      </div>
    </ProtectedRoute>
  );
}
