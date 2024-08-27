import LandingHome from "@/components/Dashboardhome";
import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <LandingHome />
    </ProtectedRoute>
  );
};

export default DashboardPage;
