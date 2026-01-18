
# Contract Management System

A React + TypeScript based contract management system that allows users to create reusable contract blueprints, generate contracts from templates, and manage the full contract lifecycle.

This project was built as part of a frontend engineering assignment to demonstrate state management, component architecture, and workflow-driven UI design.

##  Features

### 1. Blueprint Creation
- Create reusable contract templates (Blueprints)
- Supported field types:
  - Text
  - Date
  - Signature
  - Checkbox
- Store field metadata:
  - Type
  - Label
  - Position
- Blueprints are stored using localStorage (mock persistence)

### 2. Contract Creation from Blueprint
- Select an existing blueprint
- Generate a contract that inherits all blueprint fields
- Dynamically render fields
- Allow users to fill contract values

### 3. Contract Lifecycle Management
Each contract follows a controlled lifecycle:
Created → Approved → Sent → Signed → Locked

- State transitions are enforced (no skipping steps)
- Current status and available actions are clearly displayed
- Locked contracts cannot be edited
- Revoked contracts cannot proceed further

### 4. Contract Listing Dashboard
- View all contracts in a table
- Display:
  - Contract name
  - Blueprint name
  - Status
  - Created date
  - Action buttons
- Supports filtering by status:
  - Active
  - Pending
  - Signed

---

##  Tech Stack

- React
- TypeScript
- Vite
- LocalStorage (mock backend)
- Git & GitHub for version control

---

##  Project Structure
src/
├── pages/
│ ├── BlueprintPage.tsx
│ ├── CreateContractPage.tsx
│ └── DashboardPage.tsx
├── data/
│ └── storage.ts
└── App.tsx
---

##  Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/PrachiCYBERsec/contract-management-system.git
   Install dependencies

2. Install dependencies
  npm install


3.Run the project
  npm run dev




>>>>>>> dd6755c7bf00ba9f9a57827377d77c623a5e21ee
