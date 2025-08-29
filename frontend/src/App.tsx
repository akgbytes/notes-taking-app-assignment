import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import NoteViewPage from "./pages/NoteViewPage";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/note/:id" element={<NoteViewPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
