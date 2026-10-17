/**
 * Seed Curriculum and Question Bank Data for ABAP Mastery
 *
 * Sources:
 * - SAP S4D400 (Basic ABAP Programming Participant Handbook, course version 24)
 * - SAP Clean ABAP Guidelines
 * - SAP BTP RAP (RESTful Application Programming Model) Documentation
 */

export const SEED_PATHS = [
  {
    id: 'path-foundations',
    title: 'Path 1 — ABAP Foundations',
    description: 'Master core syntax, data typing, control structures, internal tables, and debugging fundamentals aligned with S4D400 Units 1 & 2.',
    order_index: 1,
    icon: 'Layers',
    badge: 'Core Handbook'
  },
  {
    id: 'path-oop',
    title: 'Path 2 — Object-Oriented ABAP',
    description: 'Transition from procedural paradigms to local classes, encapsulation, inheritance, interfaces, and clean design patterns (S4D400 Unit 3).',
    order_index: 2,
    icon: 'Boxes',
    badge: 'Core Handbook'
  },
  {
    id: 'path-data-access',
    title: 'Path 3 — Data Access and Modern ABAP',
    description: 'Master modern Open SQL, expressions, constructor operators, and Core Data Services (CDS) view entities (S4D400 Units 4–6).',
    order_index: 3,
    icon: 'Database',
    badge: 'Core Handbook'
  },
  {
    id: 'path-rap',
    title: 'Path 4 — SAP Business Objects and RAP',
    description: 'Build enterprise-grade transactional applications using ABAP RESTful Application Programming Model, EML, and Fiori Elements (S4D400 Units 7 & 8).',
    order_index: 4,
    icon: 'Cpu',
    badge: 'Modern Enterprise'
  },
  {
    id: 'path-advanced',
    title: 'Path 5 — Advanced Practice & Capstones',
    description: 'Refine production skills with ABAP Unit testing, performance analysis (SAT/ST05), clean code architecture, and end-to-end capstones.',
    order_index: 5,
    icon: 'Award',
    badge: 'Mastery Extension'
  }
];

export const SEED_MODULES = [
  // Path 1 Modules
  {
    id: 'mod-fnd-1',
    path_id: 'path-foundations',
    title: 'Runtime, Tooling & Program Structure',
    description: 'Understanding the SAP Application Server, ADT on Eclipse, packages, software components, and report structure.',
    order_index: 1,
    estimated_mins: 90,
    is_core: 1,
    course_reference: 'S4D400 Unit 1: Getting Started'
  },
  {
    id: 'mod-fnd-2',
    path_id: 'path-foundations',
    title: 'Data Objects, Types & Operations',
    description: 'Complete grounding in elementary types, structures, operators, calculations, and string templates.',
    order_index: 2,
    estimated_mins: 120,
    is_core: 1,
    course_reference: 'S4D400 Unit 2: Basic Techniques'
  },
  {
    id: 'mod-fnd-3',
    path_id: 'path-foundations',
    title: 'Control Flow & Logic',
    description: 'Conditional execution with IF/ELSEIF/CASE and iterations with DO, WHILE, and system fields.',
    order_index: 3,
    estimated_mins: 90,
    is_core: 1,
    course_reference: 'S4D400 Unit 2: Basic Techniques'
  },
  {
    id: 'mod-fnd-4',
    path_id: 'path-foundations',
    title: 'Internal Tables Mastery',
    description: 'Standard, sorted, and hashed tables. Reading, appending, sorting, deleting, and key operations.',
    order_index: 4,
    estimated_mins: 150,
    is_core: 1,
    course_reference: 'S4D400 Unit 2: Basic Techniques'
  },
  {
    id: 'mod-fnd-5',
    path_id: 'path-foundations',
    title: 'System Fields, Exceptions & Debugging',
    description: 'SY-SUBRC evaluation, classical vs class-based exceptions, and debugging with ADT breakpoint tools.',
    order_index: 5,
    estimated_mins: 90,
    is_core: 1,
    course_reference: 'S4D400 Unit 2: Basic Techniques'
  },

  // Path 2 Modules
  {
    id: 'mod-oop-1',
    path_id: 'path-oop',
    title: 'Classes, Objects & Visibility',
    description: 'Defining local classes, attributes, methods, constructors, and managing public, protected, private sections.',
    order_index: 1,
    estimated_mins: 110,
    is_core: 1,
    course_reference: 'S4D400 Unit 3: Local Classes'
  },
  {
    id: 'mod-oop-2',
    path_id: 'path-oop',
    title: 'Inheritance, Interfaces & Polymorphism',
    description: 'Building class hierarchies, method redefinition, interface contracts, and polymorphism in ABAP.',
    order_index: 2,
    estimated_mins: 120,
    is_core: 1,
    course_reference: 'S4D400 Unit 3: Local Classes'
  },
  {
    id: 'mod-oop-3',
    path_id: 'path-oop',
    title: 'Clean ABAP & OO Error Handling',
    description: 'Raising and catching CX_ROOT descendants, RAISING clauses, and applying SAP Clean Code principles.',
    order_index: 3,
    estimated_mins: 90,
    is_core: 1,
    course_reference: 'S4D400 Unit 3 & Clean ABAP'
  },

  // Path 3 Modules
  {
    id: 'mod-data-1',
    path_id: 'path-data-access',
    title: 'Open SQL & Modern Database Queries',
    description: 'SELECT, WHERE filtering, host variables with @, inline declarations, joins, and aggregations.',
    order_index: 1,
    estimated_mins: 130,
    is_core: 1,
    course_reference: 'S4D400 Unit 4: Data Access'
  },
  {
    id: 'mod-data-2',
    path_id: 'path-data-access',
    title: 'Modern ABAP Expressions & Constructor Operators',
    description: 'VALUE, CORRESPONDING, COND, SWITCH, and table expressions (lt_tab[ ... ]).',
    order_index: 2,
    estimated_mins: 120,
    is_core: 1,
    course_reference: 'S4D400 Unit 5: Complex Internal Tables'
  },
  {
    id: 'mod-data-3',
    path_id: 'path-data-access',
    title: 'Core Data Services (CDS) View Entities',
    description: 'Defining CDS view entities, associations, projections, and authorization modeling on SAP HANA.',
    order_index: 3,
    estimated_mins: 140,
    is_core: 1,
    course_reference: 'S4D400 Unit 6: CDS Views'
  },

  // Path 4 Modules
  {
    id: 'mod-rap-1',
    path_id: 'path-rap',
    title: 'RAP Architecture & Data Modeling',
    description: 'Business Object concepts, root entities, child entities, composition, and database persistence mapping.',
    order_index: 1,
    estimated_mins: 140,
    is_core: 1,
    course_reference: 'S4D400 Unit 7 & 8: RAP'
  },
  {
    id: 'mod-rap-2',
    path_id: 'path-rap',
    title: 'Behavior Definitions & EML',
    description: 'Managed behavior definitions (BDEF), Entity Manipulation Language (READ/MODIFY ENTITIES), save sequence.',
    order_index: 2,
    estimated_mins: 150,
    is_core: 1,
    course_reference: 'S4D400 Unit 8: RAP Behavior'
  },
  {
    id: 'mod-rap-3',
    path_id: 'path-rap',
    title: 'Validations, Determinations, Actions & Services',
    description: 'Writing business logic, custom actions, service definitions, OData V4 bindings, and Fiori UI annotations.',
    order_index: 3,
    estimated_mins: 160,
    is_core: 1,
    course_reference: 'S4D400 Unit 8: RAP Services'
  },

  // Path 5 Modules
  {
    id: 'mod-adv-1',
    path_id: 'path-advanced',
    title: 'ABAP Unit Testing & Quality Assurance',
    description: 'Writing test classes with FOR TESTING, test doubles, mocking database dependencies, and code coverage.',
    order_index: 1,
    estimated_mins: 110,
    is_core: 0,
    course_reference: 'Supplementary Mastery'
  },
  {
    id: 'mod-adv-2',
    path_id: 'path-advanced',
    title: 'Performance Optimization & Troubleshooting',
    description: 'Analyzing performance with SAT, ST05 SQL trace, preventing buffer invalidations, and HANA pushdown.',
    order_index: 2,
    estimated_mins: 100,
    is_core: 0,
    course_reference: 'Supplementary Mastery'
  }
];

export const SEED_LESSONS = [
  {
    id: 'les-fnd-01',
    module_id: 'mod-fnd-1',
    title: 'SAP ABAP Runtime & ADT Ecosystem',
    order_index: 1,
    estimated_mins: 25,
    prerequisites: 'Basic programming concept familiarity',
    objectives: 'Understand the SAP NetWeaver / S/4HANA application server architecture, work process execution, and using Eclipse ADT as the modern development workbench.',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 1: Getting Started with ABAP',
    summary: 'The ABAP runtime operates on an application server layer decoupled from the underlying database. ABAP Development Tools (ADT) in Eclipse has superseded SAP GUI SE38/SE80 for modern development.',
    key_takeaways: '- The ABAP kernel executes byte-code in work processes (Dialog, Background, Update).\n- Modern development is conducted exclusively in ABAP Development Tools (ADT) on Eclipse.\n- Programs, classes, and dictionary objects belong to Transportable Packages (e.g. Z... or Y...) or local package $TMP.\n- Database independence is maintained via Open SQL / ABAP SQL.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'The ABAP Runtime Environment Architecture',
          content: 'The SAP system architecture follows a three-tier model: Presentation Layer (SAP GUI, Fiori Web browser), Application Layer (ABAP Application Server), and Database Layer (SAP HANA, AnyDB). In this runtime, programs do not execute machine code directly; instead, the ABAP compiler generates byte-code interpreted by the ABAP Virtual Machine inside dialog work processes (DIA).',
          callout: {
            type: 'info',
            text: 'Handbook Note: In S4D400 Unit 1, learners explore how ADT connects via RFC/REST to the SAP backend. No local compilation happens on your PC; ADT sends source code to the server, which compiles and activates it.'
          }
        },
        {
          title: 'ABAP Development Tools (ADT) vs Classic SE38/SE80',
          content: 'While historical ABAP development utilized the transaction SE38 (ABAP Editor) or SE80 (Object Navigator) inside the SAP GUI, modern ABAP in S/4HANA and BTP requires ADT. ADT features fast code-completion, syntax checking as you type, refactoring tools, quick fixes (Ctrl+1), and direct support for Core Data Services (CDS) and RAP behavior definitions.',
          codeSnippet: {
            language: 'abap',
            title: 'Modern ABAP Console Class Structure',
            code: `CLASS zcl_demo_hello DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_demo_hello IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
    out->write( 'Hello, ABAP Mastery!' ).
  ENDMETHOD.
ENDCLASS.`,
            expectedOutput: 'Hello, ABAP Mastery!'
          }
        },
        {
          title: 'Common Mistakes & Fixes',
          mistakes: [
            {
              mistake: 'Trying to create CDS Views or RAP Behavior definitions inside SAP GUI SE80/SE38.',
              correction: 'CDS views and RAP objects are only supported in ADT (Eclipse). Always use ADT for modern artifacts.'
            },
            {
              mistake: 'Saving development objects in $TMP when they need to be transported to QA/Production.',
              correction: 'Objects in package $TMP are local and cannot be attached to a Transport Request (TR). Create a custom package (e.g. Z_MASTER) and assign a valid transport layer.'
            }
          ]
        }
      ],
      knowledgeCheck: {
        question: 'Which interface allows an ABAP class to be executed directly in ADT via F9 (Run as ABAP Application)?',
        options: [
          'if_serializable_object',
          'if_oo_adt_classrun',
          'if_amdp_marker_hdb',
          'if_t100_message'
        ],
        correctAnswer: 'if_oo_adt_classrun',
        explanation: 'Implementing if_oo_adt_classrun provides the main( ) method with the out parameter for console execution in ADT.'
      }
    })
  },
  {
    id: 'les-fnd-02',
    module_id: 'mod-fnd-2',
    title: 'Data Objects, Elementary Types & String Templates',
    order_index: 2,
    estimated_mins: 35,
    prerequisites: 'les-fnd-01',
    objectives: 'Master elementary ABAP data types (I, STRING, P, D, T, C), classical DATA statements versus modern inline declarations DATA(lv_var), and string interpolation templates |...{ var }...|.',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 2: Basic ABAP Language Elements',
    summary: 'ABAP provides both fixed-length and variable-length elementary types. Modern ABAP allows inline declaration DATA(var) = expr and string templates |...{ expr }...| to write clean, expressive code.',
    key_takeaways: '- Fixed-length types: I (Integer 4-byte), C (Character), N (Numeric text), D (Date YYYYMMDD), T (Time HHMMSS), P (Packed decimal).\n- Variable-length types: STRING (dynamic text) and XSTRING (byte sequence).\n- Modern inline declarations: DATA(lv_total) = lv_price * lv_qty avoids pre-declaring variables at the top of routines.\n- String templates |Hello { lv_name }| replace cumbersome CONCATENATE statements.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'Elementary Data Types in ABAP',
          content: 'ABAP data types are split into predefined elementary types with fixed length (such as I for 4-byte integers, D for dates in YYYYMMDD format, T for times in HHMMSS, P for packed decimals with decimals specified, and C for text) and predefined types with variable length (STRING for text of dynamic size).',
          codeSnippet: {
            language: 'abap',
            title: 'Predefined Types Declaration',
            code: `DATA lv_count TYPE i VALUE 10.
DATA lv_price TYPE p DECIMALS 2 VALUE '149.99'.
DATA lv_date  TYPE d VALUE '20261017'.
DATA lv_name  TYPE string VALUE 'ABAP Developer'.

WRITE: / 'Count:', lv_count.
WRITE: / 'Price:', lv_price.
WRITE: / 'Date:', lv_date.`,
            expectedOutput: `Count: 10\nPrice: 149.99\nDate: 20261017`
          }
        },
        {
          title: 'Modern Inline Declarations and String Templates',
          content: 'Starting with ABAP 7.40, you no longer need to declare all variables at the beginning of a method. You can declare them inline at the exact position where they receive their first value using DATA(...). Furthermore, string templates enclosed in pipes (|...|) allow direct variable interpolation inside curly braces { } with formatting options.',
          codeSnippet: {
            language: 'abap',
            title: 'Modern Inline Declarations and String Interpolation',
            code: `DATA(lv_item)  = 'SAP S/4HANA'.
DATA(lv_qty)   = 3.
DATA(lv_unit)  = '450.00'.
DATA(lv_total) = lv_qty * lv_unit.

DATA(lv_msg) = |Purchased { lv_qty } licenses of { lv_item } for a total of { lv_total } USD|.
WRITE: / lv_msg.`,
            expectedOutput: 'Purchased 3 licenses of SAP S/4HANA for a total of 1350.00 USD'
          }
        },
        {
          title: 'Common Mistakes & Fixes',
          mistakes: [
            {
              mistake: 'Using CONCATENATE str1 str2 INTO result SEPARATED BY space in modern ABAP.',
              correction: 'Use string templates: DATA(result) = |{ str1 } { str2 }|. This is more readable and automatically handles conversions.'
            },
            {
              mistake: 'Forgetting space inside string template expressions: |{lv_var}|.',
              correction: 'ABAP requires at least one space after the opening curly brace and before the closing curly brace: |{ lv_var }|.'
            }
          ]
        }
      ],
      knowledgeCheck: {
        question: 'Which of the following syntax lines correctly uses an ABAP string template with a variable lv_user?',
        options: [
          'DATA(msg) = "Welcome " & lv_user.',
          'DATA(msg) = |Welcome {lv_user}|.',
          'DATA(msg) = |Welcome { lv_user }|.',
          'DATA(msg) = `Welcome ${lv_user}`.'
        ],
        correctAnswer: 'DATA(msg) = |Welcome { lv_user }|.',
        explanation: 'In ABAP string templates (|...|), embedded expressions must have spaces between the curly braces and the enclosed expression: { lv_user }.'
      }
    })
  },
  {
    id: 'les-fnd-03',
    module_id: 'mod-fnd-3',
    title: 'Conditional Logic and Iteration Structures',
    order_index: 3,
    estimated_mins: 30,
    prerequisites: 'les-fnd-02',
    objectives: 'Implement branching with IF / ELSEIF / ELSE and CASE / WHEN, loop iterations with DO and WHILE, and understand the COND and SWITCH constructor expressions.',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 2: Basic Techniques',
    summary: 'ABAP provides both statement-based control flow (IF, CASE, DO, WHILE) and modern expression-based control flow (COND #( ... ), SWITCH #( ... )).',
    key_takeaways: '- Statement-based: IF condition. ... ELSEIF ... ELSE. ... ENDIF.\n- Case evaluation: CASE variable. WHEN val1. ... WHEN OTHERS. ... ENDCASE.\n- Loops: DO n TIMES increments sy-index each iteration.\n- Modern expressions: COND #( WHEN ... THEN ... ELSE ... ) and SWITCH #( ... ) produce values directly inside assignments.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'Conditional Branching: IF vs CASE',
          content: 'ABAP uses IF ... ENDIF for multi-condition boolean checks. When comparing a single variable against multiple exact values, CASE ... WHEN ... ENDCASE is cleaner and preferred for performance.',
          codeSnippet: {
            language: 'abap',
            title: 'IF and CASE Logic',
            code: `DATA lv_score TYPE i VALUE 88.
DATA lv_grade TYPE c LENGTH 2.

IF lv_score >= 90.
  lv_grade = 'A'.
ELSEIF lv_score >= 80.
  lv_grade = 'B'.
ELSEIF lv_score >= 70.
  lv_grade = 'C'.
ELSE.
  lv_grade = 'F'.
ENDIF.

WRITE: / |Score: { lv_score }, Grade: { lv_grade }|.`,
            expectedOutput: 'Score: 88, Grade: B'
          }
        },
        {
          title: 'Modern Constructor Expression: COND #',
          content: 'Modern ABAP allows conditional logic to be written as an inline expression using COND. This eliminates boilerplate IF statements when assigning a variable.',
          codeSnippet: {
            language: 'abap',
            title: 'Inline COND # Constructor',
            code: `DATA lv_status_code TYPE c LENGTH 1 VALUE 'A'.

DATA(lv_status_text) = COND string(
  WHEN lv_status_code = 'A' THEN 'Active'
  WHEN lv_status_code = 'P' THEN 'Pending'
  WHEN lv_status_code = 'C' THEN 'Cancelled'
  ELSE 'Unknown'
).

WRITE: / |Status: { lv_status_text }|.`,
            expectedOutput: 'Status: Active'
          }
        }
      ],
      knowledgeCheck: {
        question: 'Inside a DO ... ENDDO loop, which system field contains the current iteration counter (1, 2, 3...)?',
        options: [
          'sy-tabix',
          'sy-index',
          'sy-subrc',
          'sy-loopc'
        ],
        correctAnswer: 'sy-index',
        explanation: 'sy-index holds the current loop pass in DO and WHILE loops. sy-tabix holds the current table index in LOOP AT internal tables.'
      }
    })
  },
  {
    id: 'les-fnd-04',
    module_id: 'mod-fnd-4',
    title: 'Internal Tables: Standard, Sorted & Hashed Tables',
    order_index: 4,
    estimated_mins: 45,
    prerequisites: 'les-fnd-03',
    objectives: 'Differentiate the three internal table types (Standard, Sorted, Hashed), choose appropriate key definitions, and perform table operations (APPEND, INSERT, READ, MODIFY, DELETE, SORT).',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 2: Internal Tables',
    summary: 'Internal tables are dynamic in-memory arrays in ABAP. Choosing between Standard (linear index), Sorted (binary search index), and Hashed (O(1) hash algorithm) is critical for system performance.',
    key_takeaways: '- Standard Table: Cost of linear search is O(N). Fast APPEND at end. Uses BINARY SEARCH only after explicit SORT.\n- Sorted Table: Automatically maintained in sorted key order. Binary search O(log N) on key reads.\n- Hashed Table: Constant time O(1) key access via hash algorithm. Must have UNIQUE key; no index access allowed.\n- Table expressions: lt_table[ id = 100 ] replaces READ TABLE statements.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'Table Categories Comparison',
          content: 'Understanding table categories is one of the most heavily tested topics in SAP certifications and technical interviews. Standard tables allow duplicate keys and index access. Sorted tables maintain order continuously upon INSERT. Hashed tables calculate memory addresses using a hashing algorithm, enabling instantaneous access regardless of table size.',
          codeSnippet: {
            language: 'abap',
            title: 'Modern VALUE Operator with Internal Tables',
            code: `TYPES: BEGIN OF ty_employee,
         id   TYPE i,
         name TYPE string,
         role TYPE string,
       END OF ty_employee.

TYPES tt_employees TYPE STANDARD TABLE OF ty_employee WITH EMPTY KEY.

DATA(lt_team) = VALUE tt_employees(
  ( id = 101 name = 'Alice' role = 'Architect' )
  ( id = 102 name = 'Bob'   role = 'Developer' )
  ( id = 103 name = 'Carol' role = 'QA Lead' )
).

LOOP AT lt_team INTO DATA(ls_member).
  WRITE: / |[{ ls_member-id }] { ls_member-name } - { ls_member-role }|.
ENDLOOP.`,
            expectedOutput: `[101] Alice - Architect\n[102] Bob - Developer\n[103] Carol - QA Lead`
          }
        },
        {
          title: 'Reading Tables: Classic READ vs Table Expressions',
          content: 'In classic ABAP, READ TABLE was used with sy-subrc checks. In ABAP 7.40+, table expressions provide concise bracket syntax lt_table[ ... ] with optional VALUE #( ... OPTIONAL ) to avoid CX_SY_ITAB_LINE_NOT_FOUND exceptions.',
          codeSnippet: {
            language: 'abap',
            title: 'Table Expression with Key Search',
            code: `DATA(lt_codes) = VALUE string_table(
  ( 'INITIAL' )
  ( 'IN_PROGRESS' )
  ( 'COMPLETED' )
).

" Read index 2
DATA(lv_second) = lt_codes[ 2 ].
WRITE: / |Second state: { lv_second }|.`,
            expectedOutput: 'Second state: IN_PROGRESS'
          }
        }
      ],
      knowledgeCheck: {
        question: 'Which table category does NOT permit access by index (e.g. READ TABLE ... INDEX 1)?',
        options: [
          'Standard Table',
          'Sorted Table',
          'Hashed Table',
          'Index Table'
        ],
        correctAnswer: 'Hashed Table',
        explanation: 'Hashed tables do not have an index. Rows are stored according to a hash algorithm and can only be accessed using their UNIQUE key.'
      }
    })
  },
  {
    id: 'les-fnd-05',
    module_id: 'mod-fnd-5',
    title: 'System Fields, SY-SUBRC & Debugging Techniques',
    order_index: 5,
    estimated_mins: 30,
    prerequisites: 'les-fnd-04',
    objectives: 'Master essential ABAP system fields (SY-SUBRC, SY-TABIX, SY-INDEX, SY-UNAME, SY-DATUM, SY-UZEIT) and program tracing in ADT.',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 2: System Fields and Debugging',
    summary: 'The system structure SY contains runtime status values updated automatically by the ABAP kernel. Checking SY-SUBRC immediately after database, table, or authority operations is mandatory in robust code.',
    key_takeaways: '- SY-SUBRC = 0 indicates successful execution.\n- SY-SUBRC = 4 typically indicates entry not found, end of file, or authorization failure.\n- Never perform other statements before checking SY-SUBRC, as subsequent statements may overwrite it.\n- ADT provides line breakpoints, conditional breakpoints, and watchpoints for dynamic debugging.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'Crucial System Fields Overview',
          content: 'The ABAP runtime environment maintains the global structure SY (or SYST). Key fields include:\n- SY-SUBRC: Return code of statements (0 = success, 4 = not found/failed, 8 = general error).\n- SY-TABIX: Current line index in internal tables.\n- SY-INDEX: Current iteration count in DO or WHILE loops.\n- SY-UNAME: Logged-in user ID.\n- SY-DATUM: Current server date (YYYYMMDD).\n- SY-UZEIT: Current server time (HHMMSS).',
          codeSnippet: {
            language: 'abap',
            title: 'SY-SUBRC Evaluation Pattern',
            code: `DATA lt_numbers TYPE TABLE OF i.
APPEND 10 TO lt_numbers.
APPEND 20 TO lt_numbers.

READ TABLE lt_numbers INDEX 5 INTO DATA(lv_val).
IF sy-subrc = 0.
  WRITE: / |Found value: { lv_val }|.
ELSE.
  WRITE: / |Entry at index 5 does not exist. SY-SUBRC: { sy-subrc }|.
ENDIF.`,
            expectedOutput: 'Entry at index 5 does not exist. SY-SUBRC: 4'
          }
        }
      ],
      knowledgeCheck: {
        question: 'What is the value of SY-SUBRC when a READ TABLE operation fails to find a matching entry?',
        options: [
          '0',
          '4',
          '8',
          '-1'
        ],
        correctAnswer: '4',
        explanation: 'SY-SUBRC is set to 4 when a table lookup fails to find an entry satisfying the specified key or index.'
      }
    })
  },

  // Path 2: OOP Lessons
  {
    id: 'les-oop-01',
    module_id: 'mod-oop-1',
    title: 'Object-Oriented ABAP: Classes, Objects & Visibility',
    order_index: 1,
    estimated_mins: 40,
    prerequisites: 'les-fnd-05',
    objectives: 'Understand classes as templates for objects, define PUBLIC, PROTECTED, and PRIVATE sections, implement instance attributes/methods, and use constructors.',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 3: Local Classes',
    summary: 'ABAP Objects encapsulates data (attributes) and operations (methods) in classes. Clear separation of visibility sections guarantees information hiding and architectural integrity.',
    key_takeaways: '- PUBLIC SECTION: Accessible by any external caller.\n- PROTECTED SECTION: Accessible only within the class and its subclasses.\n- PRIVATE SECTION: Accessible strictly within the defining class.\n- Constructor METHODS constructor is invoked automatically upon NEW or CREATE OBJECT.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'Class Definition and Implementation Structure',
          content: 'An ABAP class is composed of two distinct parts: the DEFINITION section (specifying visibility, attributes, method signatures, events) and the IMPLEMENTATION section (containing the actual procedural code for each method).',
          codeSnippet: {
            language: 'abap',
            title: 'Complete Local Class with Constructor',
            code: `CLASS lcl_account DEFINITION.
  PUBLIC SECTION.
    METHODS constructor
      IMPORTING iv_owner   TYPE string
                iv_initial TYPE p.
    METHODS deposit
      IMPORTING iv_amount TYPE p.
    METHODS get_balance
      RETURNING VALUE(rv_balance) TYPE p.
    METHODS get_owner
      RETURNING VALUE(rv_owner) TYPE string.

  PRIVATE SECTION.
    DATA mv_owner   TYPE string.
    DATA mv_balance TYPE p DECIMALS 2.
ENDCLASS.

CLASS lcl_account IMPLEMENTATION.
  METHOD constructor.
    mv_owner   = iv_owner.
    mv_balance = iv_initial.
  ENDMETHOD.

  METHOD deposit.
    mv_balance = mv_balance + iv_amount.
  ENDMETHOD.

  METHOD get_balance.
    rv_balance = mv_balance.
  ENDMETHOD.

  METHOD get_owner.
    rv_owner = mv_owner.
  ENDMETHOD.
ENDCLASS.

DATA(lo_acc) = NEW lcl_account( iv_owner = 'Generic Enterprise' iv_initial = '1000.00' ).
lo_acc->deposit( '250.00' ).
WRITE: / |Account: { lo_acc->get_owner() } Balance: { lo_acc->get_balance() }|.`,
            expectedOutput: 'Account: Generic Enterprise Balance: 1250.00'
          }
        }
      ],
      knowledgeCheck: {
        question: 'Which operator is used to instantiate an object inline in modern ABAP (ABAP 7.40+)?',
        options: [
          'CREATE OBJECT lo_obj.',
          'NEW lcl_class( ... )',
          'INSTANTIATE lcl_class.',
          'ALLOCATE lcl_class.'
        ],
        correctAnswer: 'NEW lcl_class( ... )',
        explanation: 'The NEW constructor operator instantiates objects inline, e.g. DATA(lo_inst) = NEW lcl_my_class( param = val ).'
      }
    })
  },

  // Path 3: Modern Data Access Lesson
  {
    id: 'les-data-01',
    module_id: 'mod-data-1',
    title: 'Modern Open SQL & The @ Escape Character',
    order_index: 1,
    estimated_mins: 35,
    prerequisites: 'les-oop-01',
    objectives: 'Write modern ABAP SQL with comma-separated field lists, escaping host variables with @, inline table population INTO TABLE @DATA(lt_result), and joins.',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 4: Data Access with Open SQL',
    summary: 'Modern ABAP SQL aligns with SQL-92 standards: field lists are separated by commas, host variables are prefixed with @, and results can be selected directly into inline internal tables.',
    key_takeaways: '- Comma-separated fields: SELECT carrid, connid, price FROM sflight.\n- Host variables MUST be escaped with @: WHERE carrid = @lv_carrier.\n- Inline target: INTO TABLE @DATA(lt_flights) avoids declaring structures in advance.\n- Strict SQL syntax checking enforces modern semantics.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'Classic SQL vs Modern ABAP SQL',
          content: 'In classic ABAP, SELECT fields were separated by spaces without commas, and host variables lacked prefixes. In modern ABAP SQL (introduced in 7.40 SP05 and enriched in 7.50+), commas are mandatory between columns, host variables MUST be escaped with @ to prevent column-variable ambiguities, and target tables can be declared inline.',
          codeSnippet: {
            language: 'abap',
            title: 'Modern ABAP SQL Query',
            code: `* Modern ABAP SQL Syntax
DATA lv_airline TYPE c LENGTH 3 VALUE 'LH'.

* Querying database table with host variable @ and inline target
SELECT carrid,
       connid,
       countryfr,
       cityfrom,
       cityto
  FROM spfli
  WHERE carrid = @lv_airline
  ORDER BY connid
  INTO TABLE @DATA(lt_routes).

IF sy-subrc = 0.
  WRITE: / |Retrieved { lines( lt_routes ) } flight connections for airline { lv_airline }.|.
ENDIF.`,
            expectedOutput: 'Retrieved flight connections for airline LH.'
          }
        }
      ],
      knowledgeCheck: {
        question: 'Why must ABAP host variables be prefixed with @ in modern Open SQL statements?',
        options: [
          'To indicate pointer dereferencing.',
          'To distinguish ABAP program variables from database column names in strict syntax.',
          'To force asynchronous database execution.',
          'Because @ is the memory address symbol in ABAP.'
        ],
        correctAnswer: 'To distinguish ABAP program variables from database column names in strict syntax.',
        explanation: 'The @ prefix escapes ABAP host variables so the SQL parser unambiguously differentiates ABAP variables from database fields.'
      }
    })
  },

  // Path 4: RAP Lesson
  {
    id: 'les-rap-01',
    module_id: 'mod-rap-1',
    title: 'RAP Architecture, Business Objects & EML',
    order_index: 1,
    estimated_mins: 45,
    prerequisites: 'les-data-01',
    objectives: 'Understand the ABAP RESTful Application Programming Model (RAP) layers, Behavior Definitions (BDEF), and Entity Manipulation Language (EML).',
    is_core: 1,
    handbook_unit: 'S4D400 Unit 8: ABAP RESTful Application Programming Model',
    summary: 'RAP is the standard architecture for building cloud-ready and S/4HANA enterprise applications. It combines CDS view entities for data modeling, Behavior Definitions for transactional capabilities, and EML for programmatically consuming business objects.',
    key_takeaways: '- RAP replaces legacy BOPF and classic BAPIs with a clean CDS-centric architecture.\n- Managed Scenario: RAP framework handles create, update, delete automatically.\n- Unmanaged Scenario: Developer implements legacy update function modules or BAPIs.\n- EML (Entity Manipulation Language): MODIFY ENTITIES OF and READ ENTITIES OF provide type-safe transactional operations.',
    content_json: JSON.stringify({
      sections: [
        {
          title: 'RAP The 3-Tier Layered Architecture',
          content: 'The RAP stack consists of:\n1. Data Modeling & Behavior: CDS View Entities define the relational model; Behavior Definition (.bdef) declares operations (create, update, delete, actions, validations).\n2. Business Services: Service Definition exposes CDS projections; Service Binding binds them to protocols (OData V4 Web API, OData V2 UI).\n3. Consumption: SAP Fiori Elements UI or external API consumers.',
          codeSnippet: {
            language: 'abap',
            title: 'Behavior Definition (BDEF) Excerpt',
            code: `managed implementation in class zbp_i_travel unique;
strict ( 2 );

define behavior for ZI_Travel alias Travel
persistent table ztravel_table
lock master
authorization master ( instance )
{
  create;
  update;
  delete;

  field ( readonly ) TravelId, CreatedAt;
  field ( mandatory ) CustomerId, BeginDate, EndDate;

  action ( features : instance ) acceptTravel result [1] $self;
  validation validateDates on save { create; update; }
}`,
            expectedOutput: 'BDEF Syntax verified'
          }
        },
        {
          title: 'Entity Manipulation Language (EML)',
          content: 'EML is an extension of ABAP syntax that enables developers to invoke RAP business objects directly from ABAP code without HTTP requests. It is used in unit tests, batch jobs, and integration routines.',
          codeSnippet: {
            language: 'abap',
            title: 'EML MODIFY ENTITIES Example',
            code: `* Programmatic Creation using EML
MODIFY ENTITIES OF ZI_Travel
  ENTITY Travel
    CREATE FIELDS ( AgencyId CustomerId BookingFee CurrencyCode )
      WITH VALUE #( ( %cid        = 'MY_CID_01'
                      AgencyId    = '070001'
                      CustomerId  = '000012'
                      BookingFee  = '25.00'
                      CurrencyCode = 'USD' ) )
  MAPPED   DATA(lt_mapped)
  FAILED   DATA(lt_failed)
  REPORTED DATA(lt_reported).

COMMIT ENTITIES.`,
            expectedOutput: 'EML Statement Executed'
          }
        }
      ],
      knowledgeCheck: {
        question: 'Which language extension in ABAP allows direct, type-safe transactional consumption of RAP Business Objects?',
        options: [
          'BAPI Call Interface',
          'Entity Manipulation Language (EML)',
          'Core Data Services (CDS)',
          'SAP Gateway Client'
        ],
        correctAnswer: 'Entity Manipulation Language (EML)',
        explanation: 'EML (MODIFY ENTITIES, READ ENTITIES) is the native ABAP language extension for interacting with RAP Business Objects.'
      }
    })
  }
];

export const SEED_CHALLENGES = [
  {
    id: 'chal-01',
    title: 'Student Marks & Grade Evaluator',
    category: 'Conditions & Calculations',
    difficulty: 'easy',
    order_index: 1,
    problem_statement: 'Given three student marks (lv_mark1, lv_mark2, lv_mark3), calculate the total and average score. If the average is 80 or above, output grade "Distinction". If 60 to 79, output "First Class". Otherwise, output "Pass". Write out the summary.',
    input_assumptions: 'Marks are non-negative integers between 0 and 100.',
    expected_output: 'Total: 255 Average: 85 Grade: Distinction',
    test_cases_json: JSON.stringify([
      { id: 'tc-1', description: 'Average 85 Distinction', expectedOutput: 'Total: 255 Average: 85 Grade: Distinction' }
    ]),
    constraints: 'Use integer or packed arithmetic. Format output using string template or WRITE.',
    hints_json: JSON.stringify([
      'Calculate total = lv_mark1 + lv_mark2 + lv_mark3.',
      'Divide total by 3 to find average.',
      'Use IF / ELSEIF / ELSE structure to determine the grade text.'
    ]),
    starter_code: `DATA lv_mark1 TYPE i VALUE 80.
DATA lv_mark2 TYPE i VALUE 90.
DATA lv_mark3 TYPE i VALUE 85.

* Calculate total and average
DATA(lv_total) = lv_mark1 + lv_mark2 + lv_mark3.
DATA(lv_avg)   = lv_total / 3.
DATA lv_grade TYPE string.

* Determine grade
IF lv_avg >= 80.
  lv_grade = 'Distinction'.
ELSEIF lv_avg >= 60.
  lv_grade = 'First Class'.
ELSE.
  lv_grade = 'Pass'.
ENDIF.

WRITE: / |Total: { lv_total } Average: { lv_avg } Grade: { lv_grade }|.`,
    reference_solution: `DATA lv_mark1 TYPE i VALUE 80.
DATA lv_mark2 TYPE i VALUE 90.
DATA lv_mark3 TYPE i VALUE 85.

DATA(lv_total) = lv_mark1 + lv_mark2 + lv_mark3.
DATA(lv_avg)   = lv_total / 3.

DATA(lv_grade) = COND string(
  WHEN lv_avg >= 80 THEN 'Distinction'
  WHEN lv_avg >= 60 THEN 'First Class'
  ELSE 'Pass'
).

WRITE: / |Total: { lv_total } Average: { lv_avg } Grade: { lv_grade }|.`,
    solution_explanation: 'The solution sums the three inputs, divides by 3 to obtain the integer mean, and uses conditional branching or COND to map the score range to the appropriate label.',
    related_concepts_json: JSON.stringify(['Arithmetic Operators', 'COND #', 'String Templates', 'IF-ELSE'])
  },
  {
    id: 'chal-02',
    title: 'Internal Table Search & Filtering',
    category: 'Internal Tables',
    difficulty: 'easy',
    order_index: 2,
    problem_statement: 'Populate an internal table lt_numbers with values 15, 42, 8, 99, 23. Sort the table, and find the highest number and lowest number. Output them in the format: Lowest: 8 Highest: 99.',
    input_assumptions: 'Internal table contains distinct integers.',
    expected_output: 'Lowest: 8 Highest: 99',
    test_cases_json: JSON.stringify([
      { id: 'tc-1', description: 'Find min and max after sort', expectedOutput: 'Lowest: 8 Highest: 99' }
    ]),
    constraints: 'Sort the table ascending. Read index 1 for lowest, and lines( lt_numbers ) for highest.',
    hints_json: JSON.stringify([
      'Use APPEND or VALUE #( ... ) to populate lt_numbers.',
      'Use SORT lt_numbers.',
      'Use READ TABLE lt_numbers INDEX 1 INTO DATA(lv_low).',
      'Use lines( lt_numbers ) to find the last index.'
    ]),
    starter_code: `DATA lt_numbers TYPE TABLE OF i.
APPEND 15 TO lt_numbers.
APPEND 42 TO lt_numbers.
APPEND 8 TO lt_numbers.
APPEND 99 TO lt_numbers.
APPEND 23 TO lt_numbers.

* Sort the table
SORT lt_numbers.

* Read lowest (index 1) and highest (last index)
READ TABLE lt_numbers INDEX 1 INTO DATA(lv_low).
READ TABLE lt_numbers INDEX 5 INTO DATA(lv_high).

WRITE: / |Lowest: { lv_low } Highest: { lv_high }|.`,
    reference_solution: `DATA lt_numbers TYPE TABLE OF i.
APPEND 15 TO lt_numbers.
APPEND 42 TO lt_numbers.
APPEND 8 TO lt_numbers.
APPEND 99 TO lt_numbers.
APPEND 23 TO lt_numbers.

SORT lt_numbers.

READ TABLE lt_numbers INDEX 1 INTO DATA(lv_low).
DATA(lv_last_idx) = lines( lt_numbers ).
READ TABLE lt_numbers INDEX lv_last_idx INTO DATA(lv_high).

WRITE: / |Lowest: { lv_low } Highest: { lv_high }|.`,
    solution_explanation: 'After sorting an internal table ascending, the first row always contains the minimum value and the last row (at lines(lt_numbers)) contains the maximum value.',
    related_concepts_json: JSON.stringify(['SORT', 'READ TABLE', 'lines()', 'Index Access'])
  },
  {
    id: 'chal-03',
    title: 'Object-Oriented Employee Tax Calculator',
    category: 'Classes & Methods',
    difficulty: 'medium',
    order_index: 3,
    problem_statement: 'Define a local class lcl_employee with private attributes mv_id, mv_name, mv_salary. Add public methods constructor, get_net_salary( iv_tax_rate ). If salary is 10000 and tax rate is 10, net salary is 9000. Output: Employee 101 Net Salary: 9000.',
    input_assumptions: 'Tax rate is a percentage between 0 and 50.',
    expected_output: 'Employee 101 Net Salary: 9000',
    test_cases_json: JSON.stringify([
      { id: 'tc-1', description: 'Calculate net after 10% tax', expectedOutput: 'Employee 101 Net Salary: 9000' }
    ]),
    constraints: 'Encapsulate salary in PRIVATE section. Compute net salary inside the method.',
    hints_json: JSON.stringify([
      'Class definition has PUBLIC and PRIVATE sections.',
      'Deduct (mv_salary * iv_tax_rate) / 100 from mv_salary.',
      'Instantiate using NEW lcl_employee( ... ).'
    ]),
    starter_code: `CLASS lcl_employee DEFINITION.
  PUBLIC SECTION.
    METHODS constructor
      IMPORTING iv_id     TYPE i
                iv_name   TYPE string
                iv_salary TYPE i.
    METHODS get_net_salary
      IMPORTING iv_tax_rate TYPE i
      RETURNING VALUE(rv_net) TYPE i.
    METHODS get_id
      RETURNING VALUE(rv_id) TYPE i.
  PRIVATE SECTION.
    DATA mv_id     TYPE i.
    DATA mv_name   TYPE string.
    DATA mv_salary TYPE i.
ENDCLASS.

CLASS lcl_employee IMPLEMENTATION.
  METHOD constructor.
    mv_id     = iv_id.
    mv_name   = iv_name.
    mv_salary = iv_salary.
  ENDMETHOD.

  METHOD get_id.
    rv_id = mv_id.
  ENDMETHOD.

  METHOD get_net_salary.
    DATA(lv_tax) = ( mv_salary * iv_tax_rate ) / 100.
    rv_net = mv_salary - lv_tax.
  ENDMETHOD.
ENDCLASS.

DATA(lo_emp) = NEW lcl_employee( iv_id = 101 iv_name = 'Learner' iv_salary = 10000 ).
DATA(lv_net) = lo_emp->get_net_salary( 10 ).

WRITE: / |Employee { lo_emp->get_id( ) } Net Salary: { lv_net }|.`,
    reference_solution: `CLASS lcl_employee DEFINITION.
  PUBLIC SECTION.
    METHODS constructor
      IMPORTING iv_id     TYPE i
                iv_name   TYPE string
                iv_salary TYPE i.
    METHODS get_net_salary
      IMPORTING iv_tax_rate TYPE i
      RETURNING VALUE(rv_net) TYPE i.
    METHODS get_id
      RETURNING VALUE(rv_id) TYPE i.
  PRIVATE SECTION.
    DATA mv_id     TYPE i.
    DATA mv_name   TYPE string.
    DATA mv_salary TYPE i.
ENDCLASS.

CLASS lcl_employee IMPLEMENTATION.
  METHOD constructor.
    mv_id     = iv_id.
    mv_name   = iv_name.
    mv_salary = iv_salary.
  ENDMETHOD.

  METHOD get_id.
    rv_id = mv_id.
  ENDMETHOD.

  METHOD get_net_salary.
    rv_net = mv_salary - ( ( mv_salary * iv_tax_rate ) / 100 ).
  ENDMETHOD.
ENDCLASS.

DATA(lo_emp) = NEW lcl_employee( iv_id = 101 iv_name = 'Learner' iv_salary = 10000 ).
WRITE: / |Employee { lo_emp->get_id( ) } Net Salary: { lo_emp->get_net_salary( 10 ) }|.`,
    solution_explanation: 'Demonstrates encapsulation: state attributes are stored safely in the PRIVATE section and accessed via well-defined public interface methods.',
    related_concepts_json: JSON.stringify(['Local Classes', 'Encapsulation', 'Constructors', 'RETURNING Parameters'])
  }
];

export const SEED_QUIZZES = [
  {
    id: 'quiz-fnd-1',
    lesson_id: 'les-fnd-01',
    module_id: 'mod-fnd-1',
    title: 'ABAP Architecture & Tooling Assessment',
    description: 'Test your understanding of the ABAP runtime, ADT vs SAP GUI, packages, and work processes.',
    mode: 'practice',
    passing_score: 75,
    questions: [
      {
        id: 'q1',
        question_type: 'multiple_choice',
        question: 'Which tool is the mandatory standard IDE for modern ABAP development on SAP S/4HANA and BTP?',
        options_json: JSON.stringify([
          'SAP GUI transaction SE38',
          'ABAP Development Tools (ADT) in Eclipse',
          'Visual Studio Code with Python plugin',
          'SAP GUI transaction SE80'
        ]),
        correct_answer_json: JSON.stringify('ABAP Development Tools (ADT) in Eclipse'),
        explanation: 'ADT on Eclipse is the official and required development environment for Core Data Services (CDS), RAP, and modern ABAP syntax.',
        difficulty: 'easy',
        topic: 'Tooling'
      },
      {
        id: 'q2',
        question_type: 'true_false',
        question: 'Development objects stored in package $TMP can be easily added to a transport request and sent to the Quality Assurance system.',
        options_json: JSON.stringify(['True', 'False']),
        correct_answer_json: JSON.stringify('False'),
        explanation: 'Package $TMP is for local, temporary objects only. They cannot be attached to a Transport Request (TR) or transported across systems.',
        difficulty: 'easy',
        topic: 'Packages'
      },
      {
        id: 'q3',
        question_type: 'output_prediction',
        question: 'What is the output of the following ABAP statement:\nDATA(lv_val) = 5 + 3 * 2.\nWRITE lv_val.',
        options_json: JSON.stringify(['16', '11', '10', 'Syntax Error']),
        correct_answer_json: JSON.stringify('11'),
        explanation: 'In ABAP expressions, standard operator precedence applies (* has higher priority than +), resulting in 3 * 2 = 6, plus 5 = 11.',
        difficulty: 'medium',
        topic: 'Expressions'
      },
      {
        id: 'q4',
        question_type: 'find_error',
        question: 'Identify the error in this string template:\nDATA(msg) = |Customer ID: {lv_cust_id}|.',
        options_json: JSON.stringify([
          'The pipe symbol | cannot be used in inline declarations.',
          'Missing spaces between the curly braces and the variable name: { lv_cust_id }.',
          'Double quotes must be used instead of pipes.',
          'No error exists.'
        ]),
        correct_answer_json: JSON.stringify('Missing spaces between the curly braces and the variable name: { lv_cust_id }.'),
        explanation: 'ABAP string templates strictly enforce whitespace formatting around curly brace expressions: |...{ expr }...|.',
        difficulty: 'medium',
        topic: 'Syntax'
      }
    ]
  },
  {
    id: 'quiz-fnd-2',
    lesson_id: 'les-fnd-04',
    module_id: 'mod-fnd-4',
    title: 'Internal Tables Mastery Quiz',
    description: 'Comprehensive assessment on Standard, Sorted, and Hashed table properties, performance, and key expressions.',
    mode: 'assessment',
    passing_score: 80,
    questions: [
      {
        id: 'q5',
        question_type: 'multiple_choice',
        question: 'Which internal table type guarantees O(1) constant time access when reading by unique key?',
        options_json: JSON.stringify([
          'Standard Table',
          'Sorted Table with NON-UNIQUE key',
          'Hashed Table with UNIQUE key',
          'Index Table'
        ]),
        correct_answer_json: JSON.stringify('Hashed Table with UNIQUE key'),
        explanation: 'Hashed tables compute memory addresses using a hash function, resulting in O(1) performance independent of record count.',
        difficulty: 'medium',
        topic: 'Internal Tables'
      },
      {
        id: 'q6',
        question_type: 'multiple_select',
        question: 'Which of the following operations are valid on a Sorted Table? (Select all that apply)',
        options_json: JSON.stringify([
          'INSERT ... INTO TABLE ...',
          'APPEND ... TO ... without checking sort order',
          'READ TABLE ... WITH KEY ...',
          'READ TABLE ... INDEX ...'
        ]),
        correct_answer_json: JSON.stringify([
          'INSERT ... INTO TABLE ...',
          'READ TABLE ... WITH KEY ...',
          'READ TABLE ... INDEX ...'
        ]),
        explanation: 'Sorted tables support index access and key reads, and INSERT automatically places the row in sorted order. APPEND is only allowed if the new entry preserves the existing sort order, otherwise it raises an exception.',
        difficulty: 'hard',
        topic: 'Internal Tables'
      },
      {
        id: 'q7',
        question_type: 'scenario_based',
        question: 'You need to buffer a lookup table of 500,000 currency rates in memory, queried millions of times by currency code. Which table type should you choose?',
        options_json: JSON.stringify([
          'STANDARD TABLE with linear scan',
          'HASHED TABLE with UNIQUE KEY currency_code',
          'SORTED TABLE with NON-UNIQUE key',
          'STANDARD TABLE sorted after every insert'
        ]),
        correct_answer_json: JSON.stringify('HASHED TABLE with UNIQUE KEY currency_code'),
        explanation: 'For high-frequency key-based lookups with large record counts, HASHED TABLE provides the highest throughput with constant O(1) access time.',
        difficulty: 'hard',
        topic: 'Performance'
      }
    ]
  }
];

export const SEED_FLASHCARDS = [
  {
    id: 'fc-01',
    category: 'System Fields',
    front: 'What does SY-SUBRC = 4 mean in ABAP?',
    back: 'It indicates that the statement failed or that the requested record/condition was not found.',
    code_snippet: `READ TABLE lt_tab WITH KEY id = 999 INTO DATA(ls_row).
IF sy-subrc = 4.
  " Row not found!
ENDIF.`,
    explanation: '0 indicates success, 4 indicates entry not found or authority check failed, 8 indicates general system error.',
    mnemonic: '4 = "Four" -> "Forfeit" (record not found)',
    difficulty: 'easy'
  },
  {
    id: 'fc-02',
    category: 'Syntax',
    front: 'What is the purpose of the @ symbol in modern ABAP SQL statements?',
    back: 'The @ character escapes ABAP host variables, distinguishing them from database column names in strict SQL mode.',
    code_snippet: `SELECT * FROM sflight
  WHERE carrid = @lv_carrid
  INTO TABLE @DATA(lt_flights).`,
    explanation: 'Starting with ABAP 7.40 SP05, @ is mandatory for host variables when modern SQL features (commas, inline declarations) are used.',
    mnemonic: '@ indicates "At application variable"',
    difficulty: 'easy'
  },
  {
    id: 'fc-03',
    category: 'Internal Tables',
    front: 'Compare the time complexity of reading a row by key in Standard vs Sorted vs Hashed tables.',
    back: 'Standard: O(N) linear search\nSorted: O(log N) binary search\nHashed: O(1) constant hash lookup',
    code_snippet: `DATA lt_std  TYPE STANDARD TABLE OF ...
DATA lt_sort TYPE SORTED TABLE OF ... WITH UNIQUE KEY id
DATA lt_hash TYPE HASHED TABLE OF ... WITH UNIQUE KEY id`,
    explanation: 'Always choose Hashed tables for large read-heavy datasets queried by a unique key.',
    mnemonic: 'S-S-H: Scan (N) -> Split (log N) -> Hash (1)',
    difficulty: 'medium'
  },
  {
    id: 'fc-04',
    category: 'OOP Terminology',
    front: 'What is the difference between PROTECTED and PRIVATE visibility sections?',
    back: 'PRIVATE components can only be accessed within the defining class itself. PROTECTED components are additionally accessible by subclasses (inheritance).',
    code_snippet: `CLASS lcl_parent DEFINITION.
  PROTECTED SECTION.
    DATA mv_family_secret TYPE string.
  PRIVATE SECTION.
    DATA mv_personal_key  TYPE string.
ENDCLASS.`,
    explanation: 'Information hiding principles recommend keeping data PRIVATE unless subclasses specifically need direct access.',
    mnemonic: 'Protect the family (subclasses); Private is strictly me',
    difficulty: 'medium'
  },
  {
    id: 'fc-05',
    category: 'CDS & RAP',
    front: 'What is EML and when is it used?',
    back: 'Entity Manipulation Language (EML) is the ABAP syntax extension used to consume RAP Business Objects (MODIFY ENTITIES, READ ENTITIES).',
    code_snippet: `MODIFY ENTITIES OF zi_travel
  ENTITY Travel
  UPDATE FIELDS ( BookingFee )
  WITH VALUE #( ( %key-TravelId = '001' BookingFee = '50' ) ).`,
    explanation: 'EML provides a type-safe transactional bridge into RAP without needing OData network calls.',
    mnemonic: 'EML = Entity Manipulation Language',
    difficulty: 'hard'
  },
  {
    id: 'fc-06',
    category: 'Interview Prep',
    front: 'What is the difference between a CDS View Entity and a classic CDS DDIC-based View?',
    back: 'CDS View Entities (define view entity) do not generate an underlying SQL view in the ABAP Dictionary (SE11). They have cleaner lifecycle handling, faster activation, and do not suffer from client handling limitations.',
    code_snippet: `@AccessControl.authorizationCheck: #NOT_REQUIRED
define view entity ZI_CustomerEntity as select from zcustomer {
  key customer_id,
      company_name
}`,
    explanation: 'SAP recommends view entities exclusively for all new development starting in ABAP 7.55 / S/4HANA 2020.',
    mnemonic: 'View Entity = No SE11 SQL View Overhead',
    difficulty: 'hard'
  }
];

export const SEED_SPRINT_DAYS = [
  {
    day_number: 1,
    title: 'Day 1 — ABAP Fundamentals Sprint',
    subtitle: 'Runtime, Data Types, Control Logic & Internal Tables',
    focus_area: 'Core Syntax & Memory Basics',
    objectives_json: JSON.stringify([
      'Understand ABAP execution architecture and data typing (I, P, STRING, C, D).',
      'Use modern string templates |...{ var }...| and inline declarations DATA(...).',
      'Master conditional branching and iteration loops (IF, CASE, DO, WHILE).',
      'Understand Standard vs Sorted vs Hashed internal tables and evaluate SY-SUBRC.'
    ]),
    theory_md: `### Day 1 Intensive Theory

Welcome to Day 1 of the 5-Day ABAP Sprint. Today establishes the foundational mechanics of the ABAP language:
1. **The Architecture**: ABAP programs run within the application server's dialog work processes.
2. **Elementary Data Objects**: Variables are defined with \`DATA\` or inline via \`DATA(var) = ...\`.
3. **Internal Tables**: Unlike arrays in C or Java with fixed boundaries, ABAP internal tables dynamically expand.
4. **Return Codes**: Always check \`sy-subrc = 0\` after table lookups to ensure safe code.`,
    code_examples_json: JSON.stringify([
      {
        title: 'Basic Program Logic & Table Operations',
        code: `DATA(lv_greeting) = 'Welcome to Day 1 Sprint'.
DATA lt_scores TYPE STANDARD TABLE OF i WITH EMPTY KEY.

APPEND 85 TO lt_scores.
APPEND 92 TO lt_scores.
APPEND 78 TO lt_scores.

SORT lt_scores.

LOOP AT lt_scores INTO DATA(lv_score).
  WRITE: / |Score: { lv_score }|.
ENDLOOP.`,
        output: 'Score: 78\nScore: 85\nScore: 92'
      }
    ]),
    practice_tasks_json: JSON.stringify([
      { id: 'task-1-1', title: 'Grade Calculator', description: 'Write an ABAP snippet that takes a variable score and outputs Grade A (>=90), B (>=80), C (>=70), or Fail (<70).' },
      { id: 'task-1-2', title: 'Sum of First 10 Numbers', description: 'Use a DO 10 TIMES loop with sy-index to sum numbers 1 through 10.' },
      { id: 'task-1-3', title: 'Internal Table Min/Max', description: 'Populate a table of 5 integers, sort it, and output the lowest and highest values.' }
    ]),
    quiz_questions_json: JSON.stringify([
      {
        question: 'What is the default initial value of an integer (TYPE i) in ABAP?',
        options: ['null', '0', '-1', 'undefined'],
        correctAnswer: '0',
        explanation: 'ABAP initializes numeric types to 0 automatically.'
      },
      {
        question: 'Which statement correctly inserts a line into a sorted internal table?',
        options: [
          'INSERT ... INTO TABLE ...',
          'PUSH ... TO ...',
          'ENQUEUE ... INTO ...',
          'ADD ... TO ...'
        ],
        correctAnswer: 'INSERT ... INTO TABLE ...',
        explanation: 'INSERT INTO TABLE automatically inserts the entry at the correct position preserving sorted order.'
      }
    ]),
    revision_points_json: JSON.stringify([
      'sy-subrc = 0 indicates success; 4 indicates row/record not found.',
      'Always include whitespace inside string template brackets: |{ var }|.',
      'Hashed tables cannot be accessed via index; only by unique key.'
    ]),
    completion_criteria_json: JSON.stringify([
      'Reviewed elementary data types and string templates.',
      'Implemented conditional grade evaluator exercise.',
      'Achieved >= 80% on Day 1 mini quiz.'
    ])
  },
  {
    day_number: 2,
    title: 'Day 2 — Object-Oriented ABAP',
    subtitle: 'Classes, Objects, Encapsulation & Inheritance',
    focus_area: 'Object-Oriented Programming Patterns',
    objectives_json: JSON.stringify([
      'Define local classes with DEFINITION and IMPLEMENTATION sections.',
      'Apply PUBLIC, PROTECTED, and PRIVATE visibility sections.',
      'Use constructors and instantiate objects with the NEW operator.',
      'Implement inheritance, method redefinitions, and interface contracts.'
    ]),
    theory_md: `### Day 2 Intensive Theory

Today shifts paradigms from procedural routines to Object-Oriented ABAP (ABAP Objects):
- **Classes**: Blueprint defining attributes (state) and methods (behavior).
- **Constructors**: Instance constructor method \`constructor\` is invoked upon instantiation.
- **Encapsulation**: Guard internal state in \`PRIVATE SECTION\` and expose accessors.
- **Interfaces**: Provide polymorphic contracts (\`INTERFACES if_contract\`).`,
    code_examples_json: JSON.stringify([
      {
        title: 'Local Class with Public Interface',
        code: `CLASS lcl_vehicle DEFINITION.
  PUBLIC SECTION.
    METHODS constructor IMPORTING iv_model TYPE string.
    METHODS get_model RETURNING VALUE(rv_model) TYPE string.
  PRIVATE SECTION.
    DATA mv_model TYPE string.
ENDCLASS.

CLASS lcl_vehicle IMPLEMENTATION.
  METHOD constructor.
    mv_model = iv_model.
  ENDMETHOD.
  METHOD get_model.
    rv_model = mv_model.
  ENDMETHOD.
ENDCLASS.

DATA(lo_car) = NEW lcl_vehicle( 'Electric Sedan' ).
WRITE: / |Model: { lo_car->get_model() }|.`,
        output: 'Model: Electric Sedan'
      }
    ]),
    practice_tasks_json: JSON.stringify([
      { id: 'task-2-1', title: 'Employee Manager Class', description: 'Create a class lcl_employee with salary and calculate bonus method.' },
      { id: 'task-2-2', title: 'Inheritance Hierarchy', description: 'Create lcl_manager inheriting from lcl_employee and redefine bonus computation.' }
    ]),
    quiz_questions_json: JSON.stringify([
      {
        question: 'Which visibility section allows attributes to be accessed only within the defining class and its subclasses?',
        options: ['PUBLIC SECTION', 'PROTECTED SECTION', 'PRIVATE SECTION', 'PACKAGE SECTION'],
        correctAnswer: 'PROTECTED SECTION',
        explanation: 'PROTECTED components are accessible to the class and any classes that inherit from it.'
      }
    ]),
    revision_points_json: JSON.stringify([
      'Constructors in ABAP are always named constructor and can have only IMPORTING and EXCEPTION parameters.',
      'Static methods are declared with CLASS-METHODS and called with =>.'
    ]),
    completion_criteria_json: JSON.stringify([
      'Implemented local class with private state and public accessors.',
      'Completed Day 2 OOP assessment.'
    ])
  },
  {
    day_number: 3,
    title: 'Day 3 — Data Access & Modern Expressions',
    subtitle: 'Modern Open SQL, VALUE #, COND # & CDS Views',
    focus_area: 'Database & In-Memory Expressions',
    objectives_json: JSON.stringify([
      'Write strict modern Open SQL queries with comma-separated field lists.',
      'Escape host variables with @ and use inline target declarations @DATA(lt_tab).',
      'Apply constructor operators VALUE #, CORRESPONDING #, and COND #.',
      'Understand Core Data Services (CDS) view entities and associations.'
    ]),
    theory_md: `### Day 3 Intensive Theory

Modern ABAP is characterized by rich expressions and code-to-data pushdown:
- **Strict SQL**: Field lists with commas, mandatory \`@\` on host variables.
- **Constructor Operators**: \`VALUE #( ... )\` constructs complex structures and tables in one line.
- **CDS View Entities**: Defined in ADT DDL files, shifting business logic directly into the SAP HANA database layer.`,
    code_examples_json: JSON.stringify([
      {
        title: 'Modern ABAP SQL & Constructor Operators',
        code: `DATA(lv_carrier) = 'AA'.

* Modern SELECT into inline internal table
SELECT carrid, connid, cityfrom, cityto
  FROM spfli
  WHERE carrid = @lv_carrier
  INTO TABLE @DATA(lt_flights).

DATA(lt_cities) = VALUE string_table(
  ( 'New York' )
  ( 'Frankfurt' )
  ( 'Tokyo' )
).`,
        output: 'Modern SQL syntax verified'
      }
    ]),
    practice_tasks_json: JSON.stringify([
      { id: 'task-3-1', title: 'Inline Table Constructor', description: 'Build an internal table of 3 product structures using VALUE # in a single statement.' },
      { id: 'task-3-2', title: 'CDS View Entity Design', description: 'Draft the DDL definition for a flight connections view entity with association.' }
    ]),
    quiz_questions_json: JSON.stringify([
      {
        question: 'Which constructor expression is used to copy identically named components between two structures or tables?',
        options: ['VALUE #', 'CORRESPONDING #', 'EXACT #', 'CONV #'],
        correctAnswer: 'CORRESPONDING #',
        explanation: 'CORRESPONDING #( ... ) maps matching components between source and target structures or tables.'
      }
    ]),
    revision_points_json: JSON.stringify([
      'CDS View Entities do not generate classic SE11 SQL views.',
      'Host variables in ABAP SQL require the @ escape prefix.'
    ]),
    completion_criteria_json: JSON.stringify([
      'Wrote modern Open SQL queries with host variable escaping.',
      'Practiced VALUE # and CORRESPONDING # operators.'
    ])
  },
  {
    day_number: 4,
    title: 'Day 4 — Business Objects & RAP',
    subtitle: 'BDEF, EML, Validations, Determinations & Services',
    focus_area: 'Enterprise RESTful Programming Model',
    objectives_json: JSON.stringify([
      'Understand the ABAP RESTful Application Programming Model (RAP).',
      'Create Behavior Definitions (BDEF) for managed scenarios.',
      'Write validations and determinations to enforce business rules.',
      'Execute Entity Manipulation Language (EML) statements.'
    ]),
    theory_md: `### Day 4 Intensive Theory

SAP RAP is the modern standard for transactional cloud and on-premise application building:
- **Behavior Definition**: Defines transactional capabilities (create, update, delete, actions).
- **Validations**: Check invariants before save and populate \`FAILED\` and \`REPORTED\`.
- **Determinations**: Calculate values automatically upon field change (e.g. calculating total price).
- **EML**: Allows consuming the business object via ABAP statements (\`MODIFY ENTITIES\`).`,
    code_examples_json: JSON.stringify([
      {
        title: 'EML Programmatic Consumption',
        code: `MODIFY ENTITIES OF ZI_Booking
  ENTITY Booking
  CREATE FIELDS ( CustomerId FlightDate FlightPrice )
  WITH VALUE #( ( %cid = 'NEW_01' CustomerId = '1001' FlightDate = '20261101' FlightPrice = '300' ) )
  MAPPED DATA(lt_mapped)
  FAILED DATA(lt_failed).

COMMIT ENTITIES.`,
        output: 'EML executed'
      }
    ]),
    practice_tasks_json: JSON.stringify([
      { id: 'task-4-1', title: 'Draft a Behavior Definition', description: 'Define a BDEF for a task management business object with validation on due date.' },
      { id: 'task-4-2', title: 'EML Read Entities', description: 'Write an EML READ ENTITIES statement to retrieve bookings for a specific customer.' }
    ]),
    quiz_questions_json: JSON.stringify([
      {
        question: 'In a RAP Behavior Definition, which keyword is used to trigger business rule calculations automatically when a field value changes?',
        options: ['determination', 'validation', 'action', 'projection'],
        correctAnswer: 'determination',
        explanation: 'Determinations automatically calculate values (such as order totals or status codes) when trigger events occur.'
      }
    ]),
    revision_points_json: JSON.stringify([
      'Validations check data integrity on save and report errors.',
      'Determinations calculate or derive fields on modify or save.',
      'EML operates directly on business objects with full transactional control.'
    ]),
    completion_criteria_json: JSON.stringify([
      'Reviewed RAP architecture and behavior definition syntax.',
      'Understood validations vs determinations lifecycle.'
    ])
  },
  {
    day_number: 5,
    title: 'Day 5 — Integration, Testing & Capstone',
    subtitle: 'ABAP Unit, Architecture & Capstone Project Execution',
    focus_area: 'End-to-End Production Readiness',
    objectives_json: JSON.stringify([
      'Design test classes with FOR TESTING and cl_abap_unit_assert.',
      'Integrate data modeling, business logic, and presentation layers.',
      'Review common pitfalls, performance traces, and clean code principles.',
      'Formulate a post-sprint long-term mastery learning roadmap.'
    ]),
    theory_md: `### Day 5 Intensive Theory

The final day of the sprint consolidates your knowledge into an integrated, production-grade mindset:
- **ABAP Unit**: Embedded testing framework running in ADT (Ctrl+Shift+F10). Test classes are declared \`FOR TESTING RISK LEVEL HARMLESS DURATION SHORT\`.
- **Clean ABAP**: Keep methods small, express intent clearly, avoid obsolete statements (\`MOVE\`, \`TABLES\`, \`OCCURS\`).
- **Capstone Planning**: Assemble the pieces into an end-to-end maintainable solution.`,
    code_examples_json: JSON.stringify([
      {
        title: 'ABAP Unit Test Class Pattern',
        code: `CLASS ltcl_calculator_test DEFINITION FINAL FOR TESTING
  DURATION SHORT
  RISK LEVEL HARMLESS.

  PRIVATE SECTION.
    DATA mo_cut TYPE REF TO lcl_calculator.
    METHODS setup.
    METHODS test_addition FOR TESTING.
ENDCLASS.

CLASS ltcl_calculator_test IMPLEMENTATION.
  METHOD setup.
    mo_cut = NEW lcl_calculator( ).
  ENDMETHOD.

  METHOD test_addition.
    DATA(lv_res) = mo_cut->add( iv_a = 5 iv_b = 3 ).
    cl_abap_unit_assert=>assert_equals(
      exp = 8
      act = lv_res
      msg = 'Addition calculation failed'
    ).
  ENDMETHOD.
ENDCLASS.`,
        output: 'Test Class Verified'
      }
    ]),
    practice_tasks_json: JSON.stringify([
      { id: 'task-5-1', title: 'Capstone Implementation', description: 'Build the Employee Record Manager Capstone Project using local classes and internal tables.' },
      { id: 'task-5-2', title: 'Write ABAP Unit Test', description: 'Write a unit test verifying that tax calculation throws error on negative salary.' }
    ]),
    quiz_questions_json: JSON.stringify([
      {
        question: 'Which method of cl_abap_unit_assert is used to verify that an actual result matches an expected value?',
        options: ['assert_equals', 'verify_same', 'check_match', 'assert_identical'],
        correctAnswer: 'assert_equals',
        explanation: 'cl_abap_unit_assert=>assert_equals compares the expected value (exp) against actual value (act).'
      }
    ]),
    revision_points_json: JSON.stringify([
      'Unit tests prevent regressions and document expected behavior.',
      'Never claim full mastery in 5 days; continuous practice on enterprise scenarios is required.'
    ]),
    completion_criteria_json: JSON.stringify([
      'Constructed ABAP Unit test class.',
      'Reviewed capstone project requirements and formulated next steps.'
    ])
  }
];

export const SEED_PROJECTS = [
  // Beginner Projects
  {
    id: 'proj-01',
    title: 'Student Marks & Grading Program',
    level: 'Beginner',
    order_index: 1,
    description: 'Design and implement a structured report that ingests student scores, calculates aggregates (highest, lowest, average), and classifies grades.',
    objectives_json: JSON.stringify([
      'Declare custom structures and internal tables.',
      'Perform iterations and arithmetic aggregations.',
      'Format output using modern string templates.'
    ]),
    prerequisites_json: JSON.stringify(['Variables and Types', 'Conditional Logic', 'Internal Tables']),
    functional_reqs_json: JSON.stringify([
      'Accept multiple student records (ID, Name, 3 Subject Marks).',
      'Compute Total, Percentage, and Letter Grade (A, B, C, F).',
      'Display ranked output sorted by percentage descending.'
    ]),
    data_model: `TYPES: BEGIN OF ty_student,
         id         TYPE i,
         name       TYPE string,
         score_math TYPE i,
         score_sci  TYPE i,
         score_eng  TYPE i,
         total      TYPE i,
         percentage TYPE p DECIMALS 2,
         grade      TYPE c LENGTH 2,
       END OF ty_student.
TYPES tt_students TYPE STANDARD TABLE OF ty_student WITH EMPTY KEY.`,
    milestones_json: JSON.stringify([
      'Milestone 1: Define structure and mock dataset using VALUE #.',
      'Milestone 2: Implement calculation loop computing total and grade.',
      'Milestone 3: Sort records and render tabular console output.'
    ]),
    test_scenarios_json: JSON.stringify([
      'Test 1: Student with marks 95, 90, 92 receives Grade A.',
      'Test 2: Student with marks 40, 50, 45 receives Grade F.',
      'Test 3: Ranking verifies that top student appears first.'
    ]),
    checklist_json: JSON.stringify([
      { id: 'c1', label: 'Types defined with appropriate fields', done: false },
      { id: 'c2', label: 'Internal table populated with sample test records', done: false },
      { id: 'c3', label: 'Grade logic handles boundary conditions (89.9 vs 90)', done: false },
      { id: 'c4', label: 'Output formatted clearly with string templates', done: false }
    ]),
    concepts_learned_json: JSON.stringify(['Structures', 'Standard Internal Tables', 'LOOP AT', 'COND #']),
    extensions_json: JSON.stringify([
      'Add class-based encapsulation.',
      'Output summary statistics (class average, highest scorer).'
    ]),
    is_sandbox_compatible: 1
  },
  {
    id: 'proj-02',
    title: 'Employee Record & Payroll Manager',
    level: 'Beginner',
    order_index: 2,
    description: 'Build an in-memory employee record manager supporting hire date calculations, department filtering, and payroll summaries.',
    objectives_json: JSON.stringify([
      'Work with Date data types (TYPE d).',
      'Filter internal tables using LOOP AT ... WHERE or FILTER operator.',
      'Calculate tax and deduction brackets.'
    ]),
    prerequisites_json: JSON.stringify(['Elementary Types', 'Internal Tables', 'Loops']),
    functional_reqs_json: JSON.stringify([
      'Store employee ID, Name, Department, Base Salary, Hire Date.',
      'Calculate tenure in years from sy-datum.',
      'Calculate net pay after progressive tax deductions.'
    ]),
    data_model: `TYPES: BEGIN OF ty_emp,
         emp_id     TYPE i,
         name       TYPE string,
         dept       TYPE string,
         salary     TYPE p DECIMALS 2,
         hire_date  TYPE d,
         net_pay    TYPE p DECIMALS 2,
       END OF ty_emp.`,
    milestones_json: JSON.stringify([
      'Milestone 1: Data model and test data setup.',
      'Milestone 2: Net pay calculation algorithm.',
      'Milestone 3: Department-level salary summation.'
    ]),
    test_scenarios_json: JSON.stringify([
      'Test 1: Correct tax rate applied based on salary bracket.',
      'Test 2: Filter by department "IT" excludes "Finance" employees.'
    ]),
    checklist_json: JSON.stringify([
      { id: 'c1', label: 'Date arithmetic calculates tenure correctly', done: false },
      { id: 'c2', label: 'Internal table correctly stores multiple employees', done: false },
      { id: 'c3', label: 'Department filter verified', done: false }
    ]),
    concepts_learned_json: JSON.stringify(['Packed Decimals', 'Date Arithmetic', 'Filtering', 'Aggregations']),
    extensions_json: JSON.stringify(['Export to CSV string format']),
    is_sandbox_compatible: 1
  },

  // Intermediate Projects
  {
    id: 'proj-03',
    title: 'Object-Oriented Employee Management System',
    level: 'Intermediate',
    order_index: 3,
    description: 'Refactor procedural employee logic into local classes with encapsulation, inheritance (Manager vs Developer), and custom exceptions.',
    objectives_json: JSON.stringify([
      'Define class hierarchy with abstract superclass.',
      'Implement method redefinition and polymorphism.',
      'Raise and catch custom class-based exceptions (CX_STATIC_CHECK).'
    ]),
    prerequisites_json: JSON.stringify(['Local Classes', 'Inheritance', 'Class-based Exceptions']),
    functional_reqs_json: JSON.stringify([
      'Abstract class lcl_staff with abstract method calc_compensation().',
      'Subclass lcl_developer (base + overtime).',
      'Subclass lcl_manager (base + bonus percentage).',
      'Throw cx_invalid_salary if input salary is zero or negative.'
    ]),
    data_model: `CLASS lcl_staff DEFINITION ABSTRACT.
  PUBLIC SECTION.
    METHODS constructor IMPORTING iv_id TYPE i iv_name TYPE string.
    METHODS calc_compensation ABSTRACT RETURNING VALUE(rv_comp) TYPE p.
  PROTECTED SECTION.
    DATA mv_id TYPE i.
    DATA mv_name TYPE string.
ENDCLASS.`,
    milestones_json: JSON.stringify([
      'Milestone 1: Define exception class and abstract superclass.',
      'Milestone 2: Implement developer and manager subclasses.',
      'Milestone 3: Polymorphic loop processing staff collection.'
    ]),
    test_scenarios_json: JSON.stringify([
      'Test 1: Manager compensation includes bonus.',
      'Test 2: Developer compensation includes overtime rate.',
      'Test 3: Zero salary throws caught exception.'
    ]),
    checklist_json: JSON.stringify([
      { id: 'c1', label: 'Abstract class and methods declared correctly', done: false },
      { id: 'c2', label: 'Inheritance and redefinition working', done: false },
      { id: 'c3', label: 'TRY-CATCH block catches custom exception', done: false }
    ]),
    concepts_learned_json: JSON.stringify(['Polymorphism', 'Abstract Classes', 'Exception Handling', 'Clean Code']),
    extensions_json: JSON.stringify(['Add interface for tax reporting']),
    is_sandbox_compatible: 1
  },

  // Advanced Projects
  {
    id: 'proj-04',
    title: 'RAP-Based Travel & Booking Management Application',
    level: 'Advanced',
    order_index: 4,
    description: 'Design and build an enterprise-grade RAP application featuring Root Entity Travel and Child Entity Booking, with Managed Save sequence, validations, and determinations.',
    objectives_json: JSON.stringify([
      'Create CDS View Entities with composition relationships.',
      'Define Behavior Definition with strict(2) managed implementation.',
      'Implement validations on flight dates and determinations for total price.',
      'Expose OData V4 service via Service Definition and Service Binding.'
    ]),
    prerequisites_json: JSON.stringify(['CDS View Entities', 'RAP Behavior Definitions', 'EML']),
    functional_reqs_json: JSON.stringify([
      'Root entity /DMO/I_Travel_M with fields TravelId, CustomerId, BeginDate, EndDate, TotalPrice.',
      'Composition of child /DMO/I_Booking_M.',
      'Validation validateDates: EndDate must be >= BeginDate.',
      'Determination calculateTotalPrice: updates Travel total whenever a booking is added/modified.',
      'Custom Action acceptTravel: changes overall status to Accepted.'
    ]),
    data_model: `define root view entity ZI_Travel_M
  as select from ztravel_table
  composition [0..*] of ZI_Booking_M as _Booking {
    key travel_id,
        agency_id,
        customer_id,
        begin_date,
        end_date,
        @Semantics.amount.currencyCode: 'currency_code'
        total_price,
        currency_code,
        overall_status,
        _Booking
  }`,
    milestones_json: JSON.stringify([
      'Milestone 1: Create database tables and CDS view entities with composition in ADT.',
      'Milestone 2: Define Behavior Definition (BDEF) with actions and validations.',
      'Milestone 3: Implement behavior pool class methods for validation and determination.',
      'Milestone 4: Create Service Definition and expose OData V4 endpoint.'
    ]),
    test_scenarios_json: JSON.stringify([
      'Test 1: Attempting to save EndDate before BeginDate returns validation error in UI.',
      'Test 2: Adding a $500 booking automatically triggers determination updating total price.',
      'Test 3: EML test program can create, update, and accept a travel entity.'
    ]),
    checklist_json: JSON.stringify([
      { id: 'c1', label: 'CDS view entities compiled and activated', done: false },
      { id: 'c2', label: 'BDEF defines lock master and authorization master', done: false },
      { id: 'c3', label: 'Validation validateDates populated in behavior pool', done: false },
      { id: 'c4', label: 'Service binding tested in Fiori Elements preview', done: false }
    ]),
    concepts_learned_json: JSON.stringify(['RAP Architecture', 'BDEF Managed', 'EML', 'Determinations', 'Validations', 'OData V4']),
    extensions_json: JSON.stringify([
      'Add draft capability (with draft;).',
      'Implement instance authorization check.'
    ]),
    is_sandbox_compatible: 0
  }
];
