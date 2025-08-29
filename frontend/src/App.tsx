import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <main className="container mx-auto px-4 md:px-6 lg:px-8">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
