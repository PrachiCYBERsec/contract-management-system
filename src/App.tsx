import { Routes, Route, Link } from "react-router-dom";
import BlueprintPage from "./pages/BlueprintPage";
import CreateContractPage from "./pages/CreateContractPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <div>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/">Blueprint</Link> |{" "}
        <Link to="/create">Create Contract</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BlueprintPage />} />
        <Route path="/create" element={<CreateContractPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}