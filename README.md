# ABAP Mastery — Technical Learning Platform

> **Tagline:** Learn. Practice. Build. Master.

**ABAP Mastery** is a full-stack, local-first technical learning platform designed to take a learner from ABAP fundamentals to modern object-oriented programming, modern Open SQL, Core Data Services (CDS), and enterprise SAP RESTful Application Programming Model (RAP) application development.

---

## 1. Product Vision & Architecture

The application combines a structured technical learning roadmap, an interactive coding academy with an educational simulated ABAP runtime sandbox, and a personal learning dashboard.

### Technology Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite 6.
- **Backend API:** Node.js 24 (using native TypeScript execution with `--experimental-strip-types`) and Express.
- **Database:** Node 24 Built-in Native SQLite (`DatabaseSync` from `node:sqlite`). Zero external C++ native addon compilation required.
- **State & Persistence:** SQLite database stored in `data/abap_mastery.db` with WAL mode and foreign key integrity. Full state persistence across restarts.
- **Execution Sandbox:** An educational ABAP simulator supporting variables, expressions, string templates, internal tables, `SY-SUBRC`, and assertion test evaluations.

---

## 2. Core Functional Modules

### A. Dashboard (`/`)
- **Continue Learning Hero:** Automatically suggests the next incomplete lesson.
- **Calculated Metrics:** Real metrics computed directly from database records (Lessons Completed, Average Quiz Accuracy, Coding Challenges Solved, and Calculated Mastery Score).
- **Curriculum Paths Progress:** Visual progress bars for each of the 5 learning paths.
- **5-Day Sprint Shortcut:** Instant launchpad for the intensive fundamentals sprint.

### B. Learning Roadmap (`/roadmap`)
Navigable prerequisite hierarchy covering 5 structured paths:
1. **Path 1 — ABAP Foundations:** Runtime environment, ADT on Eclipse, packages, basic program structure, variables/constants, assignments/operators, strings/templates, structures/work areas, conditions, loops, internal tables (Standard, Sorted, Hashed), table operations, system fields (`SY-SUBRC`), exceptions, and debugging (aligned with *SAP S4D400 Units 1 & 2*).
2. **Path 2 — Object-Oriented ABAP:** Classes and objects, attributes and methods, public/protected/private visibility, constructors, encapsulation, inheritance/polymorphism, interfaces, abstract classes, and clean design (*SAP S4D400 Unit 3*).
3. **Path 3 — Data Access and Modern ABAP:** Modern Open SQL, host variables with `@`, inline declarations `@DATA(...)`, constructor expressions (`VALUE #`, `CORRESPONDING #`, `COND #`, `SWITCH #`), table expressions `[ ]`, and Core Data Services (CDS) view entities (*SAP S4D400 Units 4–6*).
4. **Path 4 — SAP Business Objects and RAP:** Enterprise RAP architecture, CDS data modeling, Behavior Definitions (`BDEF`), Entity Manipulation Language (`EML`), transactional behavior, validations, determinations, actions, service definitions/bindings, and Fiori Elements (*SAP S4D400 Units 7 & 8*).
5. **Path 5 — Advanced Practice:** Complex internal tables, advanced SQL, ABAP Unit test classes (`FOR TESTING`), performance tracing (SAT/ST05), clean architecture, and capstone implementations.

### C. Lesson Reader (`/lessons/:id`)
- Clear title, objectives, prerequisites, and estimated completion times.
- Deep explanations distinguishing core handbook units from supplementary extensions.
- Syntax and annotated code examples with copy and "Test in Sandbox" actions.
- Common mistakes and corrective patterns.
- Interactive Knowledge Check (mini-quiz) with immediate technical rationale.
- Persisted personal notes drawer and bookmark toggle.
- Mark as Complete button updating database progress.

### D. Quiz Center (`/quizzes`)
- Practice Mode (instant explanation on selection) vs Assessment Mode (delayed review with scoring).
- Multiple question types: Multiple-Choice, Multiple-Select, True/False, Output Prediction, Find-the-Error, and Scenario-Based questions.
- Answer review highlighting correct options and technical rationale.
- Retry incorrect questions.

### E. Coding Practice Sandbox (`/practice`)
- Challenges grouped by category and difficulty (Variables, Conditions, Strings, Internal Tables, OOP, RAP).
- Problem statement, input assumptions, expected outputs, constraints, and hints.
- Code editor with template reset and line numbering.
- **Run Sandbox** button evaluating code against test cases with stdout and `SY-SUBRC` tracking.
- Clear educational disclaimer that execution is simulated and does not require a live SAP Gateway.

### F. Flashcards & Spaced Repetition (`/flashcards`)
- Categories: Syntax, Definitions, Internal Tables, System Fields, OOP, CDS & RAP, Common Errors, and Interview Questions.
- Interactive 3D flip card with memory mnemonics and code snippets.
- SuperMemo-2 (SM-2) Spaced Repetition Rating:
  - **Again:** Resets repetitions, schedules review in < 12 hours.
  - **Difficult:** Expands interval conservatively (1–2 days).
  - **Good:** Normal progression (3–4 days).
  - **Easy:** Multiplied interval expansion (5+ days).

### G. 5-Day Intensive Sprint (`/sprint`)
- Dedicated portal with independent progress tracking for Day 1 through Day 5:
  - **Day 1 — Fundamentals:** Data objects, types, string templates, structures, loops, table differences, `SY-SUBRC`, and debug theory.
  - **Day 2 — Object-Oriented ABAP:** Classes, visibility, encapsulation, constructors, and employee management class.
  - **Day 3 — Data Access:** Open SQL, host variables `@`, `VALUE #`, and CDS view entities.
  - **Day 4 — Business Objects & RAP:** Business objects, Behavior Definitions, validations, determinations, and EML.
  - **Day 5 — Integration & Capstone:** Architecture integration, ABAP Unit tests, and capstone roadmap.
- Includes mandatory realistic expectation disclosure: intensive foundation ≠ complete enterprise proficiency.

### H. Project Library & Capstones (`/projects`)
- Progressive projects across Beginner, Intermediate, and Advanced tiers:
  - Beginner: Student Marks & Grading, Employee Record & Payroll Manager.
  - Intermediate: Object-Oriented Staff Management System.
  - Advanced: RAP Travel & Booking Management System (with composition and managed save).
- Includes suggested ABAP data models, functional requirements, milestones, and interactive checklists.
- Distinguishes sandbox-compatible projects from those requiring an active SAP S/4HANA or BTP trial environment.

### I. Daily Learning Planner (`/planner`)
- Target completion date and daily study-time budget (e.g. 45 mins).
- Auto-generated daily checklist derived from incomplete lessons, due flashcards, and pending challenges.

### J. Progress & Analytics (`/analytics`)
- Transparent, documented mastery formula:
  $$\text{Mastery Score} = (40\% \times \text{Lessons Completed}) + (30\% \times \text{Quiz Accuracy}) + (30\% \times \text{Challenges Solved})$$
- Real-time aggregation of study sessions and path-by-path progress.
- Single-click **Export Learner Progress (JSON)** backup utility.

### K. Notes & Bookmarks (`/notes`)
- Saved notes organizer with tag filtering and full-text search.
- Quick navigation to bookmarked lessons.

---

## 3. Privacy & Anonymity Compliance

To guarantee learner privacy:
- Generic profile identity: Default learner is titled **"Learner"** / **"ABAP Developer"**.
- Fictional sample data throughout all examples (no real employee IDs, real emails, or student names).
- Zero external tracking, analytics trackers, or personal telemetry.
- No third-party LLM API keys or mandatory cloud accounts required for any theory, quizzes, practice, or progress tracking.

---

## 4. Setup & Running Instructions

### Prerequisites
- Node.js 24+ (Node.js 24.18.1 or higher)
- npm 10+

### Installation & Database Seeding
```bash
# Clone or navigate to the workspace
cd /home/john/learn-abap

# Install dependencies (or use pre-cached node_modules)
npm install

# Initialize and seed the SQLite database with curriculum & question banks
npm run seed
```

### Running the Application

#### Option A: Unified Production Mode (Recommended)
Builds the client and serves both API and frontend on port 3001:
```bash
# Build the production bundle
npm run build

# Start the unified server
npm run start
```
Open **`http://localhost:3001`** in your browser.

#### Option B: Development Mode
Runs the backend API on port 3001 and the Vite development server with hot-module reload on port 5173:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### Running Automated Tests
```bash
npm test
```
Executes the comprehensive automated test suite verifying database tables, seed integrity, simulator arithmetic, string templates, internal table operations, `SY-SUBRC` codes, SM-2 spaced repetition math, and privacy compliance.

---

## 5. Verification & Test Results

```
==============================================
   ABAP Mastery Automated Test Suite         
==============================================

Section 1: Database & Seed Verification
  ✓ [PASS] Database tables exist and can be queried
  ✓ [PASS] Curriculum seed contains 5 distinct paths
  ✓ [PASS] Curriculum contains required handbook modules
  ✓ [PASS] 5-Day sprint contains all 5 sequential days

Section 2: Simulated ABAP Runtime Sandbox
  ✓ [PASS] Simulates simple WRITE and arithmetic
  ✓ [PASS] Simulates string templates with variable interpolation
  ✓ [PASS] Simulates internal tables, APPEND, SORT and SY-SUBRC
  ✓ [PASS] Sets SY-SUBRC = 4 when reading non-existent index
  ✓ [PASS] Evaluates challenge test assertions against expected outputs

Section 3: Spaced Repetition (SM-2) Algorithm
  ✓ [PASS] SM-2 resets interval on "again" rating
  ✓ [PASS] SM-2 expands interval on "easy" rating

Section 4: Privacy & Anonymity Verification
  ✓ [PASS] Learner profile uses generic title and no real personal names
  ✓ [PASS] Database contains no personal emails, student usernames, or college names

Section 5: Analytics & Mastery Formula
  ✓ [PASS] Calculates mastery using documented 40/30/30 formula

==============================================
Test Execution Finished: 14 / 14 Passed
==============================================
```

---

## 6. Limitations & Future Integrations

- **Simulated Learning Sandbox:** The embedded execution sandbox simulates ABAP expressions, loops, control structures, internal tables, and `SY-SUBRC` for offline educational problem-solving. It does not replace a production SAP Kernel.
- **Enterprise SAP Backend Connection:** For advanced RAP development requiring real database activation (SE11/DDIC), OData V4 publishing, and Fiori Elements previews, users should connect their local ADT on Eclipse to an SAP S/4HANA Fully Activated Appliance or SAP BTP ABAP Environment Trial.
