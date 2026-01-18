import { useEffect, useState } from "react";

type Contract = {
  id: number;
  name: string;
  blueprintName: string;
  status: string;
  createdAt: string;
};

const nextStatusMap: Record<string, string> = {
  Created: "Approved",
  Approved: "Sent",
  Sent: "Signed",
  Signed: "Locked",
};

export default function DashboardPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = () => {
    const data = JSON.parse(localStorage.getItem("contracts") || "[]");
    setContracts(data);
  };

  const advanceStatus = (id: number) => {
    const updated = contracts.map((c) => {
      if (c.id === id && c.status !== "Locked") {
        return { ...c, status: nextStatusMap[c.status] };
      }
      return c;
    });

    // Save to localStorage
    localStorage.setItem("contracts", JSON.stringify(updated));

    // Update UI immediately
    setContracts(updated);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Contracts Dashboard</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Contract Name</th>
            <th>Blueprint Name</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.blueprintName}</td>
              <td>{c.status}</td>
              <td>{c.createdAt}</td>
              <td>
                <button
                  disabled={c.status === "Locked"}
                  onClick={() => advanceStatus(c.id)}
                >
                  {c.status === "Locked"
                    ? "Completed"
                    : `Move to ${nextStatusMap[c.status]}`}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}