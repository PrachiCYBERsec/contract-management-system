export const saveBlueprint = (blueprint: any) => {
  const data = JSON.parse(localStorage.getItem("blueprints") || "[]");
  data.push(blueprint);
  localStorage.setItem("blueprints", JSON.stringify(data));
};

export const getBlueprints = () => {
  return JSON.parse(localStorage.getItem("blueprints") || "[]");
};

export const saveContract = (contract: any) => {
  const data = JSON.parse(localStorage.getItem("contracts") || "[]");
  data.push(contract);
  localStorage.setItem("contracts", JSON.stringify(data));
};

export const getContracts = () => {
  return JSON.parse(localStorage.getItem("contracts") || "[]");
};

export const updateContractStatus = (id: number, status: string) => {
  const data = getContracts().map((c: any) =>
    c.id === id ? { ...c, status } : c
  );
  localStorage.setItem("contracts", JSON.stringify(data));
};