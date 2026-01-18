import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Field = {
  id: number;
  type: "text" | "date" | "signature" | "checkbox";
  label: string;
  x: number;
  y: number;
};

export default function BlueprintPage() {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [drawingFieldId, setDrawingFieldId] = useState<number | null>(null);
  const navigate = useNavigate();

  const addField = (type: Field["type"]) => {
    const offset = fields . length * 40 ;

    const newField: Field = {
      id: Date.now(),
      type,
      label: type.toUpperCase(),
      x: 20,
      y: 20 + offset ,
    };
    setFields([...fields, newField]);
  };

  const saveBlueprint = () => {
    if (!name) {
      alert("Enter blueprint name");
      return;
    }

    const blueprint = {
      id: Date.now(),
      name,
      fields,
    };

    const stored = JSON.parse(localStorage.getItem("blueprints") || "[]");
    localStorage.setItem("blueprints", JSON.stringify([...stored, blueprint]));

    alert("Blueprint Saved!");
    setName("");
    setFields([]);
    navigate("/create - contract");
  };

const startDraw = (e: React.MouseEvent<HTMLCanvasElement>, id: number) => {
  setDrawingFieldId(id);
  const canvas = e.currentTarget;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
};

const draw = (e: React.MouseEvent<HTMLCanvasElement>, id: number) => {
  if (drawingFieldId !== id) return;

  const canvas = e.currentTarget;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx.stroke();
};

const stopDraw = (id: number) => {
  if (drawingFieldId === id) {
    setDrawingFieldId(null);
  }
};



  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return <input placeholder={field.label} />;
      case "date":
        return <input type="date" />;
      case "signature":
        return (
          <canvas
      width={150}
      height={60}
      style={{
        border: "1px solid black",
        cursor: "crosshair",
        background: "white"
      }}
      onMouseDown={(e) => startDraw(e, field.id)}
      onMouseMove={(e) => draw(e, field.id)}
      onMouseUp={() => stopDraw(field.id)}
    />
        );
      case "checkbox":
        return (
          <label style={{ color: "black" }}>
            <input type="checkbox" /> {field.label}
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Blueprint</h2>

      <input
        placeholder="Blueprint Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <div style={{ display: "flex", gap: 20 }}>
        {/* Left Panel */}
        <div style={{ width: 200 }}>
          <h3>Fields</h3>
          <button onClick={() => addField("text")}>Add Text</button>
          <br />
          <button onClick={() => addField("date")}>Add Date</button>
          <br />
          <button onClick={() => addField("signature")}>Add Signature</button>
          <br />
          <button onClick={() => addField("checkbox")}>Add Checkbox</button>
        </div>

        {/* Right Canvas */}
        <div
          style={{
            width: 600,
            height: 400,
            border: "1px solid white",
            position: "relative",
            background: "#fff",
          }}
        >
          {fields.map((field) => (
            <div
              key={field.id}
              style={{
                position: "absolute",
                top: field.y,
                left: field.x,
              }}
            >
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>

      <br />

      <button onClick={saveBlueprint}>Save Blueprint</button>
    </div>
  );
}