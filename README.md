# 💊 Oxyera Medication Tracker – Async Challenge Submission

This is my complete solution to the Oxyera async full-stack technical challenge. The application helps manage patients, medications, and their treatment assignments.

---

## ✅ Features Implemented

### 🏥 Backend (NestJS + SQLite)

* Built with **NestJS**, **TypeORM**, and **SQLite**.
* CRUD APIs for:

  * **Patients**: name, date of birth.
  * **Medications**: name, dosage, frequency.
  * **Assignments**: link medications to patients with start date and treatment duration.
* Additional Features:

  * **Remaining Treatment Days**: Automatically calculated based on `(startDate + days - today)`.
  * **Seeder Script** to populate the database with sample data.
  * **Validation** with DTOs.
  * **Unit Test** for the remaining days calculation.
  * Proper **HTTP status codes** and clear **JSON responses**.

### 🎨 Frontend (Next.js + Tailwind + React Query + shadcn/ui)

* Built using **Next.js (App Router)**.
* Styled with **Tailwind CSS** and **shadcn/ui** components.
* API calls managed using **React Query (TanStack Query)**.
* Pages:

  * Patients (List/Create/Update/Delete/Search)
  * Medications (List/Create/Update/Delete/Search)
  * Assignments (List/Create/Update/Delete)
* Additional Features:

  * **Responsive Design** for desktop and mobile.
  * **Search Functionality** for filtering patients.
  * Reusable modal and form components.

---

## 🛠️ Tech Stack & Tools

* **Backend**: NestJS, TypeORM, SQLite, class-validator, Jest
* **Frontend**: Next.js, Tailwind CSS, shadcn/ui, React Query, TypeScript
* **Dev Tools**: ESLint, Prettier

---

## 📂 Project Structure

### Backend (`/backend`)

```
src/
├── assignment/
│   ├── dto/
│   ├── entities/
│   ├── types/
│   ├── assignment.controller.ts
│   ├── assignment.module.ts
│   ├── assignment.service.spec.ts
│   └── assignment.service.ts
├── medication/
│   ├── dto/
│   ├── entities/
│   ├── medication.controller.ts
│   ├── medication.module.ts
│   └── medication.service.ts
├── patient/
│   ├── dto/
│   │   ├── create-patient.dto.ts
│   │   └── update-patient.dto.ts
│   ├── entities/
│   │   └── patient.entity.ts
│   ├── patient.controller.ts
│   ├── patient.module.ts
│   └── patient.service.ts
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── seeder.ts

test/

```

### Frontend (`/frontend`)

```
app/
├── assignments/
│   ├── [patientId]/
│   │   └── page.tsx
│   └── page.tsx
├── medications/
│   └── page.tsx
├── patients/
│   └── page.tsx
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx
└── providers.tsx

components/
├── pages/
│   ├── assignments/
│   ├── medications/
│   └── patients/
├── sidebar/
└── ui/

lib/
├── api/
│   ├── assignments/
│   │   ├── useAssignment.ts
│   │   ├── useCreateAssignment.ts
│   │   ├── useDeleteAssignment.ts
│   │   └── useUpdateAssignment.ts
│   ├── medications/
│   │   ├── useCreateMedication.ts
│   │   ├── useDeleteMedication.ts
│   │   ├── useMedication.ts
│   │   └── useUpdateMedication.ts
│   ├── patients/
│   │   ├── useCreatePatient.ts
│   │   ├── useDeletePatient.ts
│   │   ├── usePatient.ts
│   │   └── useUpdatePatient.ts
│   └── fetcher.ts
├── utils.ts

types/
utils/
public/
.env
```


## ▶️ Running the Project

### Backend

```bash
cd backend
npm install
npm run seed
npm run start:dev
```

Visit: [http://localhost:8080](http://localhost:8080)

### Frontend

```bash
cd frontend
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:8080 > .env 
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🌱 Seeder Script

To populate the SQLite database with test data:

```bash
cd backend
npm run seed
```

---

## 🔍 Notes

* Fully mobile-friendly UI.
* Accessible components using `shadcn/ui` and Radix UI.
* Optimistic updates and loading indicators via React Query.

---

## 📧 Submission

This repository is my final submission for the async Oxyera challenge.
