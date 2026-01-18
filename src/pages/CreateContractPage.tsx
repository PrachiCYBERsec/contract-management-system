import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Field = {
  id: number;
  type: "text" | "date" | "signature" | "checkbox";
  label: string;
};

type Blueprint = {
  id: number;
  name: string;
  fields: Field[];
};

export default function CreateContractPage() {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [contractFields, setContractFields] = useState<Field[]>([]);
  const [values, setValues] = useState<Record<number, any>>({});

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("blueprints") || "[]");
    setBlueprints(data);
  }, []);

  const generateContract = () => {
    const bp = blueprints.find((b) => b.id.toString() === selectedId);
    if (!bp) {
      alert("Please select a blueprint");
      return;
    }

    const contract = {
      id: Date.now(),
      name: bp.name + " Contract",
      blueprintName: bp.name,
      fields: bp.fields,
      values: {},
      status: "Created",
      createdAt: new Date().toDateString(),
    };

    const stored = JSON.parse(localStorage.getItem("contracts") || "[]");
    localStorage.setItem("contracts", JSON.stringify([...stored, contract]));

    // Show fields for filling (DO NOT navigate here)
    setContractFields(bp.fields);
    setValues({});
  };

  const updateValue = (id: number, value: any) => {
    setValues({ ...values, [id]: value });
  };

  const saveValues = () => {
    const contracts = JSON.parse(localStorage.getItem("contracts") || "[]");

    const updated = contracts.map((c: any) => {
      if (c.status === "Created" && c.fields.length === contractFields.length) {
        return { ...c, values };
      }
      return c;
    });

    localStorage.setItem("contracts", JSON.stringify(updated));
    alert("Contract data saved!");

    // NOW move to dashboard (correct step)
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Contract</h2>

      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">Select Blueprint</option>
        {blueprints.map((bp) => (
          <option key={bp.id} value={bp.id}>
            {bp.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={generateContract}>Generate Contract</button>

      <br />
      <br />

      {contractFields.map((f) => (
        <div key={f.id} style={{ marginBottom: 12 }}>
          <strong>{f.label}:</strong>{" "}
          {f.type === "text" && (
            <input
              value={values[f.id] || ""}
              onChange={(e) => updateValue(f.id, e.target.value)}
            />
          )}

          {f.type === "date" && (
            <input
              type="date"
              value={values[f.id] || ""}
              onChange={(e) => updateValue(f.id, e.target.value)}
            />
          )}

          {f.type === "checkbox" && (
            <input
              type="checkbox"
              checked={values[f.id] || false}
              onChange={(e) => updateValue(f.id, e.target.checked)}
            />
          )}

          {f.type === "signature" && (
            <input
              placeholder="Signed by user"
              value={values[f.id] || ""}
              onChange={(e) => updateValue(f.id, e.target.value)}
            />
          )}
        </div>
      ))}

      {contractFields.length > 0 && (
        <button onClick={saveValues}>Save Contract Data</button>
      )}
    </div>
  );
}
