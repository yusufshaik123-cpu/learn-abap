/**
 * Seed Curriculum and Question Bank Data for ABAP Mastery
 *
 * Sources:
 * - SAP S4D400 (Basic ABAP Programming Participant Handbook)
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
    "id": "les-fnd-01",
    "module_id": "mod-fnd-1",
    "title": "SAP ABAP Runtime & ADT Ecosystem",
    "order_index": 1,
    "estimated_mins": 35,
    "prerequisites": "Basic understanding of client-server software architecture.",
    "objectives": "Understand the ABAP application server execution flow, dialog work processes, active vs inactive object states, and how ADT communicates with the SAP backend.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 1: Introduction to ABAP Development",
    "summary": "The ABAP runtime environment executes compiled byte-code inside virtual machine work processes. ADT on Eclipse serves as the primary modern development environment, communicating via RFC/REST.",
    "key_takeaways": "1. ABAP compiles to byte-code executed by the ABAP Virtual Machine.\n2. Eclipse ADT connects to the server; local compilation does not occur.\n3. Activating an object creates a new runtime version without breaking currently running user sessions.",
    "content_json": "{\"sections\":[{\"title\":\"The ABAP Runtime Environment Architecture\",\"content\":\"The SAP system architecture follows a three-tier model: Presentation Layer (SAP GUI, Fiori Web browser), Application Layer (ABAP Application Server), and Database Layer (SAP HANA, AnyDB). In this runtime, programs do not execute machine code directly; instead, the ABAP compiler generates byte-code interpreted by the ABAP Virtual Machine inside dialog work processes (DIA).\",\"callout\":{\"type\":\"info\",\"text\":\"Handbook Note: In S4D400 Unit 1, learners explore how ADT connects via RFC/REST to the SAP backend. No local compilation happens on your PC; ADT sends source code to the server, which compiles and activates it.\"}},{\"title\":\"ABAP Development Tools (ADT) vs Classic SE38/SE80\",\"content\":\"Modern ABAP development has transitioned from classic SAP GUI transactions (SE38, SE80) to ABAP Development Tools (ADT) on Eclipse. ADT provides advanced static code checks (ATC), refactoring tools, outline navigation, and seamless integration with Core Data Services (CDS) and the RESTful Application Programming Model (RAP).\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Hello World with if_oo_adt_classrun\",\"code\":\"CLASS zcl_demo_hello DEFINITION\\n  PUBLIC\\n  FINAL\\n  CREATE PUBLIC.\\n\\n  PUBLIC SECTION.\\n    INTERFACES if_oo_adt_classrun.\\nENDCLASS.\\n\\nCLASS zcl_demo_hello IMPLEMENTATION.\\n  METHOD if_oo_adt_classrun~main.\\n    out->write( 'Hello ABAP Mastery Learner!' ).\\n    out->write( |Executed by { sy-uname } on { sy-datum }| ).\\n  ENDMETHOD.\\nENDCLASS.\",\"expectedOutput\":\"Hello ABAP Mastery Learner!\\nExecuted by LEARNER on 20261017\"}},{\"title\":\"Common Mistakes & Fixes\",\"mistakes\":[{\"mistake\":\"Editing code and running it without activating first (Ctrl+F3).\",\"correction\":\"Always activate with Ctrl+F3. Inactive objects are only drafts visible to your user; background jobs and other callers execute the last active version.\"},{\"mistake\":\"Expecting local Git commits or offline builds in Eclipse without an active SAP connection.\",\"correction\":\"ADT requires a continuous connection to an active SAP Application Server backend system project.\"}]}],\"knowledgeCheck\":{\"question\":\"Which interface allows an ABAP class to be executed directly in ADT via F9 (Run as ABAP Application)?\",\"options\":[\"if_serializable_object\",\"if_oo_adt_classrun\",\"if_amdp_marker_hdb\",\"if_t100_message\"],\"correctAnswer\":\"if_oo_adt_classrun\",\"explanation\":\"Implementing if_oo_adt_classrun provides the main( ) method with the out parameter for console execution in ADT.\"}}"
  },
  {
    "id": "les-fnd-01b",
    "module_id": "mod-fnd-1",
    "title": "ABAP Packages, Software Components & Transport Requests",
    "order_index": 2,
    "estimated_mins": 30,
    "prerequisites": "les-fnd-01",
    "objectives": "Understand transport organizers, workbench vs customizing transport requests, package hierarchies, and the significance of $TMP local objects.",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 1: Organizing Development Objects",
    "summary": "All ABAP development artifacts are cataloged in packages. Transportable packages record changes in Workbench Transport Requests for lifecycle promotion to Quality and Production systems.",
    "key_takeaways": "1. Packages beginning with $ (such as $TMP) are local and non-transportable.\n2. Workbench requests move repository objects across system landscape tiers.\n3. Software components define the top-level delivery units in SAP.",
    "content_json": "{\"sections\":[{\"title\":\"Software Components, Packages, and Namespaces\",\"content\":\"Every development object in SAP belongs to an ABAP Package (formerly Development Class). Packages define organizational ownership, transport behavior, and software component affiliation. Standard customer objects use the Z or Y customer namespace.\",\"callout\":{\"type\":\"tip\",\"text\":\"When experimenting in learning environments, assign objects to package $TMP so no transport request prompt is required.\"}},{\"title\":\"Transport Request Mechanics\",\"content\":\"A Transport Request consists of a header and one or more tasks assigned to developers. When a developer finishes an object and activates it, the changes are captured in their task. Once all tasks are released and the request itself is released, the SAP Transport Management System (TMS) exports the objects to the file system for import into target systems (QAS, PRD).\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Verifying Package Assignment at Runtime\",\"code\":\"DATA lv_package TYPE string VALUE '$TMP'.\\nIF lv_package CP '$*'.\\n  WRITE: / 'Object is LOCAL and non-transportable.'.\\nELSE.\\n  WRITE: / 'Object is TRANSPORTABLE.'.\\nENDIF.\",\"expectedOutput\":\"Object is LOCAL and non-transportable.\"}},{\"title\":\"Common Mistakes & Fixes\",\"mistakes\":[{\"mistake\":\"Accidentally placing a production-bound class into $TMP.\",\"correction\":\"Right-click the object in ADT, choose Change Package Assignment, and assign it to a transportable package (e.g. Z_CORE).\"}]}],\"knowledgeCheck\":{\"question\":\"Which package prefix ensures an object cannot be transported to another SAP system?\",\"options\":[\"Z_LOCAL\",\"Y_DEV\",\"$TMP\",\"LOCAL_PKG\"],\"correctAnswer\":\"$TMP\",\"explanation\":\"Any package starting with $ is treated by SAP as temporary and local, preventing export via transport requests.\"}}"
  },
  {
    "id": "les-fnd-02",
    "module_id": "mod-fnd-2",
    "title": "Data Objects, Elementary Types & String Templates",
    "order_index": 1,
    "estimated_mins": 40,
    "prerequisites": "les-fnd-01",
    "objectives": "Distinguish elementary types (I, P, D, T, C, STRING), use modern inline declarations DATA(...), and master string templates enclosed in pipes |...|.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 2: Basic ABAP Language Elements",
    "summary": "ABAP features fixed-length types (I, P, D, T, C) and dynamic types (STRING). Modern ABAP emphasizes inline declarations and string interpolation.",
    "key_takeaways": "1. Use TYPE P DECIMALS n for monetary values to avoid rounding errors.\n2. Inline declarations DATA(...) declare variables right at their first assignment.\n3. String templates |...| enable clean variable interpolation with { } formatting.",
    "content_json": "{\"sections\":[{\"title\":\"Elementary Data Types in ABAP\",\"content\":\"ABAP data types are split into predefined elementary types with fixed length (such as I for 4-byte integers, D for dates in YYYYMMDD format, T for times in HHMMSS, P for packed decimals with decimals specified, and C for text) and predefined types with variable length (STRING for text of dynamic size).\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Predefined Types Declaration\",\"code\":\"DATA lv_count TYPE i VALUE 10.\\nDATA lv_price TYPE p DECIMALS 2 VALUE '149.99'.\\nDATA lv_date  TYPE d VALUE '20261017'.\\nDATA lv_name  TYPE string VALUE 'ABAP Developer'.\\n\\nWRITE: / 'Count:', lv_count.\\nWRITE: / 'Price:', lv_price.\\nWRITE: / 'Date:', lv_date.\",\"expectedOutput\":\"Count: 10\\nPrice: 149.99\\nDate: 20261017\"}},{\"title\":\"Modern Inline Declarations and String Templates\",\"content\":\"Starting with ABAP 7.40, you no longer need to declare all variables at the beginning of a method. You can declare them inline at the exact position where they receive their first value using DATA(...). Furthermore, string templates enclosed in pipes (|...|) allow direct variable interpolation inside curly braces { } with formatting options.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Modern Inline Declarations and String Interpolation\",\"code\":\"DATA(lv_item)  = 'SAP S/4HANA'.\\nDATA(lv_qty)   = 3.\\nDATA(lv_unit)  = '450.00'.\\nDATA(lv_total) = lv_qty * lv_unit.\\n\\nDATA(lv_msg) = |Purchased { lv_qty } licenses of { lv_item } for a total of { lv_total } USD|.\\nWRITE: / lv_msg.\",\"expectedOutput\":\"Purchased 3 licenses of SAP S/4HANA for a total of 1350.00 USD\"}},{\"title\":\"Common Mistakes & Fixes\",\"mistakes\":[{\"mistake\":\"Using Type F (floating point) for currencies.\",\"correction\":\"Never use float for finance. Floats cannot represent decimal fractions like 0.1 exactly. Always use TYPE P DECIMALS 2.\"},{\"mistake\":\"Forgetting spaces around operators or inside string templates.\",\"correction\":\"ABAP tokenizers require whitespace around symbols: |{ lv_var }| not |{lv_var}|, and a + b not a+b.\"}]}],\"knowledgeCheck\":{\"question\":\"Which elementary data type is mandatory for currency and monetary calculations in ABAP?\",\"options\":[\"Type F (Float)\",\"Type P (Packed Decimal)\",\"Type I (Integer)\",\"Type C (Character)\"],\"correctAnswer\":\"Type P (Packed Decimal)\",\"explanation\":\"Type P uses binary coded decimals to avoid precision loss and rounding inaccuracies in monetary calculations.\"}}"
  },
  {
    "id": "les-fnd-02b",
    "module_id": "mod-fnd-2",
    "title": "Structures, Work Areas & Nested Complex Types",
    "order_index": 2,
    "estimated_mins": 35,
    "prerequisites": "les-fnd-02",
    "objectives": "Define local structure types with TYPES: BEGIN OF ... END OF, access structure components using hyphens (-), and compare flat vs deep structures.",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 2: Complex Data Objects",
    "summary": "Structures bundle multiple related fields together. Component access uses the hyphen operator. Structures containing strings or internal tables are considered deep structures.",
    "key_takeaways": "1. Access structure fields with ls_struct-fieldname.\n2. Flat structures contain only elementary fixed-length types.\n3. Deep structures contain dynamic strings or nested tables, which store references.",
    "content_json": "{\"sections\":[{\"title\":\"Defining and Populating Structures\",\"content\":\"A structure is a composite data object consisting of named components. In ABAP, structures are created using TYPES BEGIN OF ... END OF or by referencing Data Dictionary structures.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Structure Definition and Component Access\",\"code\":\"TYPES: BEGIN OF ty_flight,\\n         carrier_id TYPE c LENGTH 3,\\n         conn_id    TYPE n LENGTH 4,\\n         city_from  TYPE string,\\n         city_to    TYPE string,\\n         price      TYPE p DECIMALS 2,\\n       END OF ty_flight.\\n\\nDATA ls_flight TYPE ty_flight.\\nls_flight-carrier_id = 'LH'.\\nls_flight-conn_id    = '0400'.\\nls_flight-city_from  = 'Frankfurt'.\\nls_flight-city_to    = 'New York'.\\nls_flight-price      = '550.00'.\\n\\nWRITE: / |Flight { ls_flight-carrier_id }-{ ls_flight-conn_id }: { ls_flight-city_from } to { ls_flight-city_to } ({ ls_flight-price } EUR)|.\",\"expectedOutput\":\"Flight LH -0400: Frankfurt to New York (550.00 EUR)\"}},{\"title\":\"Flat vs Deep Structures\",\"content\":\"A flat structure contains only fields with fixed length (e.g. C, N, D, T, I, P). When assigned or cleared, the entire memory block can be processed contiguously. A deep structure contains variable-length components like STRING or internal tables, meaning it holds pointers to heap memory.\",\"callout\":{\"type\":\"warning\",\"text\":\"You cannot use binary operations like TCP or legacy file transfers directly on deep structures without serialization.\"}}],\"knowledgeCheck\":{\"question\":\"Which operator is used in ABAP to access a component of a structure?\",\"options\":[\".\",\"->\",\"-\",\"::\"],\"correctAnswer\":\"-\",\"explanation\":\"ABAP syntax reserves the hyphen (-) for structure component access (ls_order-gross_amount).\"}}"
  },
  {
    "id": "les-fnd-03",
    "module_id": "mod-fnd-3",
    "title": "Conditional Logic and Iteration Structures",
    "order_index": 1,
    "estimated_mins": 40,
    "prerequisites": "les-fnd-02",
    "objectives": "Master conditional branching (IF, ELSEIF, ELSE, CASE), loops (DO, WHILE), loop controls (CONTINUE, CHECK, EXIT), and system fields sy-index.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 2: Control Structures",
    "summary": "Control structures guide program flow. sy-index tracks DO/WHILE iteration counts, and EXIT/CONTINUE control execution jumps.",
    "key_takeaways": "1. Every IF must conclude with ENDIF, and every DO/WHILE with ENDDO/ENDWHILE.\n2. sy-index holds the current 1-based loop counter.\n3. Clean ABAP prefers guard clauses and early exits over deep nested IF conditions.",
    "content_json": "{\"sections\":[{\"title\":\"Branching: IF-ELSE vs CASE\",\"content\":\"ABAP supports standard conditional branching using IF-ELSEIF-ELSE-ENDIF and CASE-WHEN-OTHERS-ENDCASE. When evaluating a single variable against multiple discrete constant values, CASE is significantly clearer and preferred by Clean ABAP guidelines.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"CASE and IF Statements\",\"code\":\"DATA(lv_code) = 'EUR'.\\nDATA lv_name TYPE string.\\n\\nCASE lv_code.\\n  WHEN 'USD'. lv_name = 'US Dollar'.\\n  WHEN 'EUR'. lv_name = 'Euro'.\\n  WHEN 'GBP'. lv_name = 'British Pound'.\\n  WHEN OTHERS. lv_name = 'Unknown Currency'.\\nENDCASE.\\n\\nWRITE: / |Currency { lv_code } is { lv_name }|.\",\"expectedOutput\":\"Currency EUR is Euro\"}},{\"title\":\"Iteration: DO and WHILE Loops\",\"content\":\"DO loops execute a specified number of times (DO n TIMES). If no count is specified, it loops indefinitely until an EXIT is reached. WHILE loops iterate as long as a Boolean condition remains true. During each iteration, the system field sy-index holds the 1-based loop counter.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"DO Loop with sy-index Accumulator\",\"code\":\"DATA lv_sum TYPE i VALUE 0.\\nDO 5 TIMES.\\n  lv_sum = lv_sum + sy-index.\\nENDDO.\\nWRITE: / |Sum of 1 to 5 is { lv_sum }|.\",\"expectedOutput\":\"Sum of 1 to 5 is 15\"}}],\"knowledgeCheck\":{\"question\":\"Which system field tracks the current iteration index in a DO or WHILE loop?\",\"options\":[\"sy-tabix\",\"sy-subrc\",\"sy-index\",\"sy-dbcnt\"],\"correctAnswer\":\"sy-index\",\"explanation\":\"sy-index holds the current iteration number in DO and WHILE loops. sy-tabix is reserved for internal table loops.\"}}"
  },
  {
    "id": "les-fnd-04",
    "module_id": "mod-fnd-4",
    "title": "Internal Tables: Standard, Sorted & Hashed Tables",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-fnd-03",
    "objectives": "Distinguish the three internal table types, analyze their performance characteristics, use APPEND and LOOP AT, and evaluate sy-tabix.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 2: Internal Tables",
    "summary": "Internal tables are dynamic arrays. Standard tables offer fast append but linear search O(N); Sorted tables provide O(log N) binary search; Hashed tables offer O(1) constant time lookups.",
    "key_takeaways": "1. Standard tables: append fast, linear search O(N).\n2. Sorted tables: automatically maintained in sorted order, binary search O(log N).\n3. Hashed tables: unique primary key, constant time O(1) lookup.",
    "content_json": "{\"sections\":[{\"title\":\"The Three Internal Table Categories\",\"content\":\"Internal tables allow ABAP programs to hold, manipulate, and process tabular data in memory. SAP provides three distinct categories optimized for different use cases: Standard Tables, Sorted Tables, and Hashed Tables.\",\"callout\":{\"type\":\"info\",\"text\":\"Choosing the right table type is the #1 performance factor in ABAP. Using a Standard table where a Hashed table is needed causes severe quadratic O(N^2) bottlenecks.\"}},{\"title\":\"Table Iteration and Row Append\",\"content\":\"You populate internal tables using APPEND (for standard tables) or INSERT (for sorted/hashed tables). Iterating rows is performed with LOOP AT ... INTO or LOOP AT ... ASSIGNING FIELD-SYMBOL.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Internal Table Population and Loop\",\"code\":\"TYPES: BEGIN OF ty_user,\\n         id   TYPE i,\\n         role TYPE string,\\n       END OF ty_user.\\n\\nDATA lt_users TYPE STANDARD TABLE OF ty_user.\\nDATA ls_user TYPE ty_user.\\n\\nls_user-id = 1. ls_user-role = 'Admin'.\\nAPPEND ls_user TO lt_users.\\n\\nls_user-id = 2. ls_user-role = 'Developer'.\\nAPPEND ls_user TO lt_users.\\n\\nLOOP AT lt_users INTO ls_user.\\n  WRITE: / |User { ls_user-id } has role { ls_user-role } (Tabix: { sy-tabix })|.\\nENDLOOP.\",\"expectedOutput\":\"User 1 has role Admin (Tabix: 1)\\nUser 2 has role Developer (Tabix: 2)\"}}],\"knowledgeCheck\":{\"question\":\"Which internal table category provides constant-time O(1) key lookups?\",\"options\":[\"Standard Table\",\"Sorted Table\",\"Hashed Table\",\"Index Table\"],\"correctAnswer\":\"Hashed Table\",\"explanation\":\"Hashed tables use an internal hash algorithm to achieve O(1) single-record read performance regardless of table size.\"}}"
  },
  {
    "id": "les-fnd-04b",
    "module_id": "mod-fnd-4",
    "title": "Internal Table Operations, Keys & Table Expressions",
    "order_index": 2,
    "estimated_mins": 40,
    "prerequisites": "les-fnd-04",
    "objectives": "Use READ TABLE, binary search, table expressions lt_tab[ key = val ], line_exists, and secondary keys.",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 2: Advanced Table Operations",
    "summary": "Table expressions replace legacy READ TABLE with concise bracket syntax. Secondary keys allow multiple sorted or hashed indexes on a single internal table.",
    "key_takeaways": "1. Use lt_tab[ key = val ] with OPTIONAL to prevent CX_SY_ITAB_LINE_NOT_FOUND.\n2. line_exists( lt_tab[ key = val ] ) provides clean Boolean presence checks.\n3. Secondary keys allow secondary fast lookups without duplicating table memory.",
    "content_json": "{\"sections\":[{\"title\":\"Modern Table Expressions vs Legacy READ TABLE\",\"content\":\"In ABAP 7.40+, table expressions provide bracket notation: lt_tab[ id = 100 ]. However, if the row is missing, a table expression throws the exception CX_SY_ITAB_LINE_NOT_FOUND. Wrap expressions in VALUE #( ... OPTIONAL ) to avoid exceptions.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Table Expressions and line_exists\",\"code\":\"TYPES: BEGIN OF ty_item,\\n         code TYPE string,\\n         name TYPE string,\\n       END OF ty_item.\\n\\nDATA lt_items TYPE HASHED TABLE OF ty_item WITH UNIQUE KEY code.\\nDATA ls_item TYPE ty_item.\\n\\nls_item-code = 'MAT-01'. ls_item-name = 'Pencil'. INSERT ls_item INTO TABLE lt_items.\\nls_item-code = 'MAT-02'. ls_item-name = 'Notebook'. INSERT ls_item INTO TABLE lt_items.\\n\\nIF line_exists( lt_items[ code = 'MAT-02' ] ).\\n  DATA(ls_found) = lt_items[ code = 'MAT-02' ].\\n  WRITE: / |Found: { ls_found-name }|.\\nENDIF.\",\"expectedOutput\":\"Found: Notebook\"}}],\"knowledgeCheck\":{\"question\":\"Which exception is raised when a table expression fails to locate a row?\",\"options\":[\"CX_SY_MOVE_CAST_ERROR\",\"CX_SY_ITAB_LINE_NOT_FOUND\",\"CX_SY_ZERODIVIDE\",\"CX_SY_REF_IS_INITIAL\"],\"correctAnswer\":\"CX_SY_ITAB_LINE_NOT_FOUND\",\"explanation\":\"Table expressions raise CX_SY_ITAB_LINE_NOT_FOUND when the specified index or key does not match any entry.\"}}"
  },
  {
    "id": "les-fnd-05",
    "module_id": "mod-fnd-5",
    "title": "System Fields, SY-SUBRC & Debugging Techniques",
    "order_index": 1,
    "estimated_mins": 40,
    "prerequisites": "les-fnd-04",
    "objectives": "Master key system fields (SY-SUBRC, SY-TABIX, SY-DBCNT, SY-UNAME, SY-DATUM), set breakpoints in ADT, step through code, and inspect call stacks.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 2: Debugging and System Variables",
    "summary": "System fields provide runtime metadata. SY-SUBRC = 0 confirms success, while non-zero values signal missing rows, authorization rejections, or errors.",
    "key_takeaways": "1. SY-SUBRC = 0 means success; 4 means not found or check failed.\n2. SY-DBCNT holds the row count affected by the last database query.\n3. The ADT ABAP Debugger supports F5 (Step into), F6 (Step over), and F8 (Continue).",
    "content_json": "{\"sections\":[{\"title\":\"Critical System Fields in Daily Development\",\"content\":\"The ABAP runtime maintains a global structure SY (or SYST) containing system status fields. Checking these fields immediately after statements like SELECT, READ TABLE, or AUTHORITY-CHECK is fundamental.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Verifying System Fields\",\"code\":\"DATA(lv_date) = sy-datum.\\nDATA(lv_user) = sy-uname.\\nWRITE: / |User { lv_user } active on system date { lv_date }|.\\nWRITE: / |Current sy-subrc is { sy-subrc }|.\",\"expectedOutput\":\"User LEARNER active on system date 20261017\\nCurrent sy-subrc is 0\"}},{\"title\":\"The ADT ABAP Debugger Workflow\",\"content\":\"In ADT on Eclipse, double-clicking the line number margin sets an ABAP Breakpoint. When execution hits the breakpoint, Eclipse prompts to switch to the ABAP Debug perspective, allowing inspection of variables, internal tables, call stacks, and system fields in real time.\",\"callout\":{\"type\":\"tip\",\"text\":\"Key shortcuts in ADT Debugger: F5 = Step Into (enter method), F6 = Step Over (execute line), F7 = Step Out (exit method), F8 = Resume.\"}}],\"knowledgeCheck\":{\"question\":\"What does SY-SUBRC = 4 signify after executing a READ TABLE statement?\",\"options\":[\"The table was deleted\",\"The record was not found\",\"A memory dump occurred\",\"Syntax error in query\"],\"correctAnswer\":\"The record was not found\",\"explanation\":\"SY-SUBRC = 4 indicates the key or index sought in the internal table does not exist.\"}}"
  },
  {
    "id": "les-oop-01",
    "module_id": "mod-oop-1",
    "title": "Object-Oriented ABAP: Classes, Objects & Visibility",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-fnd-05",
    "objectives": "Construct local ABAP classes, understand encapsulation with PUBLIC, PROTECTED, and PRIVATE sections, and instantiate objects with NEW.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 3: Introduction to Object-Oriented Programming",
    "summary": "OO ABAP transitions development from procedural form routines to encapsulated classes. Visibility sections protect internal state while exposing clean public APIs.",
    "key_takeaways": "1. CLASS DEFINITION declares components; CLASS IMPLEMENTATION codes method bodies.\n2. PRIVATE members are accessible only to the class; PROTECTED includes subclasses.\n3. Instantiation uses DATA(lo_obj) = NEW lcl_class( ) or legacy CREATE OBJECT.",
    "content_json": "{\"sections\":[{\"title\":\"Class Structure and Encapsulation\",\"content\":\"An ABAP class is divided into two distinct blocks: the DEFINITION section (declaring attributes, methods, types, and visibility) and the IMPLEMENTATION section (providing the executable code for all declared methods).\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Local Class Definition and Usage\",\"code\":\"CLASS lcl_vehicle DEFINITION.\\n  PUBLIC SECTION.\\n    METHODS: set_speed IMPORTING iv_speed TYPE i,\\n             get_speed RETURNING VALUE(rv_speed) TYPE i.\\n  PRIVATE SECTION.\\n    DATA mv_speed TYPE i.\\nENDCLASS.\\n\\nCLASS lcl_vehicle IMPLEMENTATION.\\n  METHOD set_speed.\\n    mv_speed = iv_speed.\\n  ENDMETHOD.\\n  METHOD get_speed.\\n    rv_speed = mv_speed.\\n  ENDMETHOD.\\nENDCLASS.\\n\\nSTART-OF-SELECTION.\\n  DATA lo_car TYPE REF TO lcl_vehicle.\\n  CREATE OBJECT lo_car.\\n  lo_car->set_speed( 120 ).\\n  WRITE: / |Current speed: { lo_car->get_speed( ) } km/h|.\",\"expectedOutput\":\"Current speed: 120 km/h\"}}],\"knowledgeCheck\":{\"question\":\"Which visibility section allows attributes to be accessed by subclasses but hides them from outside consumers?\",\"options\":[\"PUBLIC\",\"PROTECTED\",\"PRIVATE\",\"PACKAGE\"],\"correctAnswer\":\"PROTECTED\",\"explanation\":\"PROTECTED components are visible within the declaring class and all its subclasses, but hidden from external consumers.\"}}"
  },
  {
    "id": "les-oop-01b",
    "module_id": "mod-oop-1",
    "title": "Constructors, Instance vs Static Methods & Attributes",
    "order_index": 2,
    "estimated_mins": 35,
    "prerequisites": "les-oop-01",
    "objectives": "Master instance CONSTRUCTOR and static CLASS_CONSTRUCTOR, contrast instance components (->) with static components (=>).",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 3: Constructors and Static Members",
    "summary": "The instance CONSTRUCTOR runs upon object creation. The static CLASS_CONSTRUCTOR runs once per session. Static components belong to the class; instance components belong to an object.",
    "key_takeaways": "1. Access instance members via object->method(); access static members via class=>method().\n2. Instance constructors can accept IMPORTING parameters; static constructors accept no parameters.\n3. CLASS_CONSTRUCTOR executes once before any class access occurs.",
    "content_json": "{\"sections\":[{\"title\":\"Instance vs Static Components\",\"content\":\"Instance attributes (DATA) and methods (METHODS) exist per object instance. Static attributes (CLASS-DATA) and methods (CLASS-METHODS) exist once per class in memory, shared across all instances.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Static Counter and Instance Constructor\",\"code\":\"CLASS lcl_counter DEFINITION.\\n  PUBLIC SECTION.\\n    CLASS-DATA gv_total_instances TYPE i.\\n    CLASS-METHODS get_total RETURNING VALUE(rv_total) TYPE i.\\n    METHODS constructor.\\nENDCLASS.\\n\\nCLASS lcl_counter IMPLEMENTATION.\\n  METHOD constructor.\\n    gv_total_instances = gv_total_instances + 1.\\n  ENDMETHOD.\\n  METHOD get_total.\\n    rv_total = gv_total_instances.\\n  ENDMETHOD.\\nENDCLASS.\\n\\nSTART-OF-SELECTION.\\n  DATA lo_a TYPE REF TO lcl_counter.\\n  DATA lo_b TYPE REF TO lcl_counter.\\n  CREATE OBJECT lo_a.\\n  CREATE OBJECT lo_b.\\n  WRITE: / |Total instances created: { lcl_counter=>get_total( ) }|.\",\"expectedOutput\":\"Total instances created: 2\"}}],\"knowledgeCheck\":{\"question\":\"Which constructor can accept IMPORTING parameters?\",\"options\":[\"Static constructor (CLASS_CONSTRUCTOR)\",\"Instance constructor (CONSTRUCTOR)\",\"Both constructors\",\"Neither constructor\"],\"correctAnswer\":\"Instance constructor (CONSTRUCTOR)\",\"explanation\":\"Only instance constructors can receive importing parameters because static constructors are triggered implicitly by the runtime.\"}}"
  },
  {
    "id": "les-oop-02",
    "module_id": "mod-oop-2",
    "title": "Inheritance, Polymorphism & Casting (Narrowing/Widening)",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-oop-01b",
    "objectives": "Build class hierarchies using INHERITING FROM, override methods with REDEFINITION, call super->method, and apply upcasts (=) and downcasts (?=).",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 3: Inheritance and Polymorphism",
    "summary": "Inheritance enables code reuse and polymorphism. Upcasting (=) is safe and implicit. Downcasting (?=) checks instance compatibility at runtime, raising CX_SY_MOVE_CAST_ERROR if invalid.",
    "key_takeaways": "1. Subclasses inherit public and protected components via INHERITING FROM.\n2. Overridden methods must be declared with REDEFINITION in the subclass definition.\n3. Use ?= for downcasts to safely verify concrete instances at runtime.",
    "content_json": "{\"sections\":[{\"title\":\"Inheritance and Method Redefinition\",\"content\":\"Inheritance allows a subclass to extend a superclass. When re-implementing a superclass method, declare the method in the subclass with the REDEFINITION addition. Inside the implementation, invoke the superclass behavior via super->method_name( ).\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Inheritance and Polymorphic Dispatch\",\"code\":\"CLASS lcl_animal DEFINITION.\\n  PUBLIC SECTION.\\n    METHODS speak RETURNING VALUE(rv_sound) TYPE string.\\nENDCLASS.\\n\\nCLASS lcl_animal IMPLEMENTATION.\\n  METHOD speak.\\n    rv_sound = '...'.\\n  ENDMETHOD.\\nENDCLASS.\\n\\nCLASS lcl_dog DEFINITION INHERITING FROM lcl_animal.\\n  PUBLIC SECTION.\\n    METHODS speak REDEFINITION.\\nENDCLASS.\\n\\nCLASS lcl_dog IMPLEMENTATION.\\n  METHOD speak.\\n    rv_sound = 'Woof!'.\\n  ENDMETHOD.\\nENDCLASS.\\n\\nSTART-OF-SELECTION.\\n  DATA lo_pet TYPE REF TO lcl_animal.\\n  CREATE OBJECT lo_pet TYPE lcl_dog.\\n  WRITE: / |Animal speaks: { lo_pet->speak( ) }|.\",\"expectedOutput\":\"Animal speaks: Woof!\"}}],\"knowledgeCheck\":{\"question\":\"Which operator performs a runtime-checked downcast (widening cast) from a superclass reference to a subclass reference?\",\"options\":[\"=\",\"->\",\"?=\",\"::\"],\"correctAnswer\":\"?=\",\"explanation\":\"?= performs a dynamic downcast and throws CX_SY_MOVE_CAST_ERROR if the instance does not conform to the target subclass.\"}}"
  },
  {
    "id": "les-oop-02b",
    "module_id": "mod-oop-2",
    "title": "ABAP Interfaces & Decoupled Architecture",
    "order_index": 2,
    "estimated_mins": 40,
    "prerequisites": "les-oop-02",
    "objectives": "Declare interfaces with INTERFACE ... ENDINTERFACE, implement them in classes with INTERFACES intf, and understand dependency inversion.",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 3: Interfaces and Dependency Inversion",
    "summary": "Interfaces specify public contracts without implementation. Classes can implement multiple interfaces, accessed via the tilde (~) operator.",
    "key_takeaways": "1. Interfaces enable multiple inheritance of contracts in ABAP.\n2. Interface components are accessed using the compound name interface~method.\n3. Dependency injection relies on interfaces to decouple business logic from persistence.",
    "content_json": "{\"sections\":[{\"title\":\"Defining and Implementing Interfaces\",\"content\":\"An interface defines a public contract of methods and attributes. Unlike abstract classes, a class can implement any number of interfaces using INTERFACES <intf_name>.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Interface Implementation and Tilde Access\",\"code\":\"INTERFACE lif_notifiable.\\n  METHODS notify IMPORTING iv_msg TYPE string.\\nENDINTERFACE.\\n\\nCLASS lcl_sms_service DEFINITION.\\n  PUBLIC SECTION.\\n    INTERFACES lif_notifiable.\\nENDCLASS.\\n\\nCLASS lcl_sms_service IMPLEMENTATION.\\n  METHOD lif_notifiable~notify.\\n    WRITE: / |SMS Alert: { iv_msg }|.\\n  ENDMETHOD.\\nENDCLASS.\\n\\nSTART-OF-SELECTION.\\n  DATA lo_notifier TYPE REF TO lif_notifiable.\\n  CREATE OBJECT lo_notifier TYPE lcl_sms_service.\\n  lo_notifier->notify( 'Booking confirmed' ).\",\"expectedOutput\":\"SMS Alert: Booking confirmed\"}}],\"knowledgeCheck\":{\"question\":\"How are interface methods referenced on an implementing class instance?\",\"options\":[\"lo_obj->interface.method( )\",\"lo_obj->interface~method( )\",\"lo_obj::interface->method( )\",\"lo_obj->method@interface( )\"],\"correctAnswer\":\"lo_obj->interface~method( )\",\"explanation\":\"The tilde (~) connects the interface name to its method name within the implementing class namespace.\"}}"
  },
  {
    "id": "les-oop-03",
    "module_id": "mod-oop-3",
    "title": "Class-Based Exceptions & Error Propagation (CX_ROOT)",
    "order_index": 1,
    "estimated_mins": 40,
    "prerequisites": "les-oop-02b",
    "objectives": "Understand the exception hierarchy (CX_STATIC_CHECK, CX_DYNAMIC_CHECK, CX_NO_CHECK), use RAISE EXCEPTION TYPE, and handle errors with TRY ... CATCH.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 3: Exception Handling",
    "summary": "Class-based exceptions derived from CX_ROOT modernize error handling, replacing legacy sy-subrc return codes and functional exceptions with structured propagation.",
    "key_takeaways": "1. CX_STATIC_CHECK exceptions must be caught or declared in RAISING signatures.\n2. CX_DYNAMIC_CHECK exceptions are verified at runtime (e.g. CX_SY_ZERODIVIDE).\n3. Use TRY ... CATCH ... CLEANUP ... ENDTRY to handle exceptions gracefully.",
    "content_json": "{\"sections\":[{\"title\":\"The Exception Class Hierarchy\",\"content\":\"All class-based exceptions inherit from the abstract root class CX_ROOT. The hierarchy splits into three branches:\\n1. CX_STATIC_CHECK: Checked statically at compile-time. You MUST catch them or declare them in the method RAISING clause.\\n2. CX_DYNAMIC_CHECK: Not checked at compile-time. If uncaught, leads to a runtime error.\\n3. CX_NO_CHECK: System-critical exceptions (resource exhaustion) that can occur anywhere without declaration.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Custom Exception and TRY/CATCH\",\"code\":\"CLASS lcx_invalid_amount DEFINITION INHERITING FROM cx_static_check.\\nENDCLASS.\\n\\nCLASS lcl_payment DEFINITION.\\n  PUBLIC SECTION.\\n    METHODS pay IMPORTING iv_amount TYPE i RAISING lcx_invalid_amount.\\nENDCLASS.\\n\\nCLASS lcl_payment IMPLEMENTATION.\\n  METHOD pay.\\n    IF iv_amount <= 0.\\n      RAISE EXCEPTION TYPE lcx_invalid_amount.\\n    ENDIF.\\n    WRITE: / |Paid amount: { iv_amount }|.\\n  ENDMETHOD.\\nENDCLASS.\\n\\nSTART-OF-SELECTION.\\n  DATA lo_pay TYPE REF TO lcl_payment.\\n  CREATE OBJECT lo_pay.\\n  TRY.\\n    lo_pay->pay( -50 ).\\n  CATCH lcx_invalid_amount.\\n    WRITE: / 'Error: Invalid payment amount intercepted.'.\\n  ENDTRY.\",\"expectedOutput\":\"Error: Invalid payment amount intercepted.\"}}],\"knowledgeCheck\":{\"question\":\"Which base exception class enforces that callers must either CATCH the exception or declare it in RAISING?\",\"options\":[\"cx_no_check\",\"cx_dynamic_check\",\"cx_static_check\",\"cx_root_fatal\"],\"correctAnswer\":\"cx_static_check\",\"explanation\":\"cx_static_check is statically validated by the ABAP syntax checker, ensuring no unhandled exceptions compile without acknowledgment.\"}}"
  },
  {
    "id": "les-oop-03b",
    "module_id": "mod-oop-3",
    "title": "Clean ABAP Principles: Readable, Maintainable Code",
    "order_index": 2,
    "estimated_mins": 35,
    "prerequisites": "les-oop-03",
    "objectives": "Apply SAP official Clean ABAP guidelines: small methods, intention-revealing names, avoiding dead code, and keeping cyclomatic complexity low.",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 3: Clean ABAP Guidelines",
    "summary": "Clean ABAP is an open-source style guide developed by SAP engineering teams. It emphasizes readability, automated unit testing, small methods, and clear intent over clever micro-optimizations.",
    "key_takeaways": "1. Keep methods small (3 to 20 lines) focused on a single responsibility.\n2. Prefer functional methods with RETURNING values over multiple EXPORTING parameters.\n3. Delete commented-out code; rely on version control (Git / TMS) instead.",
    "content_json": "{\"sections\":[{\"title\":\"Core Clean ABAP Principles\",\"content\":\"Writing code for human readability is the primary objective of Clean ABAP. Code is read ten times more often than it is written. Key tenets include:\\n- Method naming should start with a clear verb (e.g. calculate_total_tax, not tax_calc).\\n- Return objects or structures instead of declaring 5+ EXPORTING parameters.\\n- Fail fast: use guard clauses at the top of a method instead of deep nested IF structures.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Clean Guard Clause vs Deep Nesting\",\"code\":\"\\\" Clean Guard Clause Pattern:\\nDATA lv_active TYPE abap_bool VALUE abap_false.\\nIF lv_active = abap_false.\\n  WRITE: / 'Guard triggered: User is inactive. Exiting.'.\\nENDIF.\",\"expectedOutput\":\"Guard triggered: User is inactive. Exiting.\"}}],\"knowledgeCheck\":{\"question\":\"According to Clean ABAP guidelines, what should you do with commented-out legacy code?\",\"options\":[\"Keep it with the developer name and date\",\"Move it to a special comment block at the end\",\"Delete it completely and rely on version control\",\"Wrap it in an IF 1 = 2 block\"],\"correctAnswer\":\"Delete it completely and rely on version control\",\"explanation\":\"Clean ABAP specifies that dead or commented-out code creates clutter and confusion; Git/TMS history preserves all past revisions.\"}}"
  },
  {
    "id": "les-data-01",
    "module_id": "mod-data-1",
    "title": "Modern Open SQL & The @ Escape Character",
    "order_index": 1,
    "estimated_mins": 40,
    "prerequisites": "les-oop-01",
    "objectives": "Write modern ABAP SQL with comma-separated field lists, host variables escaped with @, inline target declarations, and strict syntax enforcement.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 4: Open SQL Enhancements",
    "summary": "Modern ABAP SQL aligns with standard SQL-92/99. Comma-separated field lists and host variables prefixed with @ ensure clarity and activate strict compiler checks.",
    "key_takeaways": "1. Prefix ABAP host variables in SQL statements with @.\n2. Separate field lists with commas (SELECT carrier_id, connection_id).\n3. Use @DATA(lt_target) to declare receiving internal tables inline.",
    "content_json": "{\"sections\":[{\"title\":\"Modern ABAP SQL vs Legacy Open SQL\",\"content\":\"Modern ABAP SQL (introduced in 7.40 and refined in 7.50+) modernized database queries to resemble standard ANSI SQL. In this new syntax, selected fields are comma-separated, host variables must be escaped with the @ character, and the INTO clause is placed at the end.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Modern Open SQL Query with Host Variable Escaping\",\"code\":\"DATA lv_status TYPE string VALUE 'O'.\\n\\nTYPES: BEGIN OF ty_order,\\n         order_id TYPE string,\\n         status   TYPE string,\\n         amount   TYPE i,\\n       END OF ty_order.\\n\\nDATA lt_orders TYPE STANDARD TABLE OF ty_order.\\nDATA ls_order TYPE ty_order.\\n\\nls_order-order_id = 'SO-1'. ls_order-status = 'O'. ls_order-amount = 100. APPEND ls_order TO lt_orders.\\nls_order-order_id = 'SO-2'. ls_order-status = 'C'. ls_order-amount = 200. APPEND ls_order TO lt_orders.\\n\\nLOOP AT lt_orders INTO ls_order WHERE status = 'O'.\\n  WRITE: / |Open Order: { ls_order-order_id } Amount: { ls_order-amount }|.\\nENDLOOP.\",\"expectedOutput\":\"Open Order: SO-1 Amount: 100\"}}],\"knowledgeCheck\":{\"question\":\"Why must ABAP host variables be prefixed with @ in modern Open SQL statements?\",\"options\":[\"It instructs the database to use an index\",\"It distinguishes ABAP program variables from database column names\",\"It is a mandatory email symbol\",\"It performs an asynchronous fetch\"],\"correctAnswer\":\"It distinguishes ABAP program variables from database column names\",\"explanation\":\"The @ prefix tells the SQL parser that the token is an ABAP host variable residing in application server memory rather than a database table column.\"}}"
  },
  {
    "id": "les-data-01b",
    "module_id": "mod-data-1",
    "title": "Advanced Open SQL: Joins, Aggregations & Group By Queries",
    "order_index": 2,
    "estimated_mins": 40,
    "prerequisites": "les-data-01",
    "objectives": "Perform INNER and LEFT OUTER joins, use aggregate functions (SUM, AVG, COUNT, MAX), apply GROUP BY and HAVING filters directly in database queries.",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 4: SQL Joins and Aggregation",
    "summary": "Pushing down joins and aggregations into the database layer leverages SAP HANA in-memory performance, minimizing network roundtrips.",
    "key_takeaways": "1. Inner Joins return matching rows; Left Outer Joins preserve left-table rows with nulls for missing right entries.\n2. GROUP BY collapses matching rows when using aggregates like SUM or COUNT.\n3. Pushing aggregation to the database prevents pulling millions of rows into application memory.",
    "content_json": "{\"sections\":[{\"title\":\"Database Pushdown with Joins and Aggregations\",\"content\":\"In SAP HANA development, business logic calculations that process large volumes of records should be executed directly on the database engine. Aggregating data in SQL reduces application server RAM usage by 90% or more.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Aggregation and Table Loop Simulator\",\"code\":\"DATA lv_sum TYPE i VALUE 0.\\nDATA lv_count TYPE i VALUE 3.\\nDATA lv_avg TYPE i.\\n\\nlv_sum = 1200 + 800 + 2500.\\nlv_avg = lv_sum / lv_count.\\n\\nWRITE: / |Total Revenue: { lv_sum }|.\\nWRITE: / |Average Order Value: { lv_avg }|.\",\"expectedOutput\":\"Total Revenue: 4500\\nAverage Order Value: 1500\"}}],\"knowledgeCheck\":{\"question\":\"Which clause must accompany aggregate expressions (SUM, COUNT) when querying non-aggregated columns?\",\"options\":[\"ORDER BY\",\"GROUP BY\",\"DISTINCT\",\"FOR ALL ENTRIES\"],\"correctAnswer\":\"GROUP BY\",\"explanation\":\"Standard SQL requires that any non-aggregate columns appearing in the SELECT list be explicitly listed in the GROUP BY clause.\"}}"
  },
  {
    "id": "les-data-02",
    "module_id": "mod-data-2",
    "title": "Constructor Operators: VALUE, CORRESPONDING, COND, SWITCH",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-data-01",
    "objectives": "Master functional constructor operators: VALUE #( ... ) for construction, CORRESPONDING #( ... ) for mapping, and COND / SWITCH for inline conditions.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 5: Modern Constructor Expressions",
    "summary": "Constructor operators replace multiple procedural statements with concise, functional expressions that infer target types dynamically.",
    "key_takeaways": "1. VALUE #( ... ) instantiates structures and internal tables with values inline.\n2. CORRESPONDING #( ... ) maps matching field names between differing structures.\n3. COND #( ... ) and SWITCH #( ... ) assign conditional values without procedural IF blocks.",
    "content_json": "{\"sections\":[{\"title\":\"The Modern ABAP Expression Family\",\"content\":\"ABAP 7.40 introduced constructor expressions that revolutionize code readability. The hash (#) symbol instructs the compiler to infer the type from the receiving target variable.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"COND Expression and VALUE Operator\",\"code\":\"DATA(lv_score) = 85.\\nDATA(lv_grade) = COND string(\\n  WHEN lv_score >= 90 THEN 'A'\\n  WHEN lv_score >= 80 THEN 'B'\\n  ELSE 'C' ).\\n\\nWRITE: / |Score { lv_score } yields Grade { lv_grade }|.\",\"expectedOutput\":\"Score 85 yields Grade B\"}}],\"knowledgeCheck\":{\"question\":\"What does the hash (#) symbol signify in an expression like VALUE #( ... )?\",\"options\":[\"It denotes a private class attribute\",\"It instructs the compiler to infer the data type from the context target\",\"It enforces binary hashing\",\"It is a comment indicator\"],\"correctAnswer\":\"It instructs the compiler to infer the data type from the context target\",\"explanation\":\"VALUE #( ... ) uses the target variable type as the constructor type operand, removing redundant type name declarations.\"}}"
  },
  {
    "id": "les-data-02b",
    "module_id": "mod-data-2",
    "title": "Table Iteration Expressions, FILTER & REDUCE Operators",
    "order_index": 2,
    "estimated_mins": 40,
    "prerequisites": "les-data-02",
    "objectives": "Construct tables using FOR expressions, filter tables with the FILTER operator, and collapse tables into scalar summaries with REDUCE.",
    "is_core": 0,
    "handbook_unit": "S4D400 Unit 5: Advanced Functional Expressions",
    "summary": "Functional table expressions allow mapping, filtering, and reduction without explicit procedural LOOP AT loops or temporary variables.",
    "key_takeaways": "1. FOR ... IN ... iterates within VALUE #( ) constructor expressions.\n2. FILTER extracts subsets from sorted/hashed tables by key.\n3. REDUCE calculates aggregate summaries like sums or concatenated strings.",
    "content_json": "{\"sections\":[{\"title\":\"REDUCE and FOR Table Iteration\",\"content\":\"The REDUCE operator acts as a functional fold operation, accumulating values across an internal table. Paired with FOR expressions, it eliminates boilerplates of declaring loop counters and work areas.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Accumulation Simulation\",\"code\":\"DATA lv_sum TYPE i VALUE 0.\\nDO 4 TIMES.\\n  lv_sum = lv_sum + ( sy-index * 10 ).\\nENDDO.\\nWRITE: / |Total calculated: { lv_sum }|.\",\"expectedOutput\":\"Total calculated: 100\"}}],\"knowledgeCheck\":{\"question\":\"Which operator is used in modern ABAP to reduce an internal table to a single accumulated scalar value?\",\"options\":[\"COLLAPSE\",\"REDUCE\",\"SUMMARIZE\",\"COMPRESS\"],\"correctAnswer\":\"REDUCE\",\"explanation\":\"REDUCE iterates over table rows, executing an accumulator expression to compute a single scalar or structure output.\"}}"
  },
  {
    "id": "les-data-03",
    "module_id": "mod-data-3",
    "title": "Core Data Services (CDS) View Entities & Annotations",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-data-02",
    "objectives": "Define CDS View Entities in ADT, understand CDS annotations (@EndUserText, @Semantics, @AccessControl), model on-demand associations, and compare with classic views.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 6: Core Data Services Basics",
    "summary": "CDS View Entities are the cornerstone of the SAP S/4HANA data model. They compile without DDIC SQL views, providing rich semantic metadata and on-demand associations.",
    "key_takeaways": "1. CDS View Entities (define view entity) replace classic DDIC-based views.\n2. Annotations provide UI styling, semantic currencies, and security directives.\n3. Associations define semantic links that only join database tables on demand.",
    "content_json": "{\"sections\":[{\"title\":\"Core Data Services (CDS) View Entities\",\"content\":\"ABAP Core Data Services extends SQL to allow declarative data modeling on the database layer. In S/4HANA, CDS View Entities define semantically rich data models that serve as the foundation for analytical queries, transactional RAP applications, and Fiori Elements UIs.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Sample CDS View Entity Definition\",\"code\":\"@AccessControl.authorizationCheck: #NOT_REQUIRED\\n@EndUserText.label: 'Flight Connection Entity'\\ndefine view entity ZI_Connection as select from /dmo/connection {\\n  key carrier_id      as CarrierId,\\n  key connection_id   as ConnectionId,\\n      airport_from_id as AirportFromId,\\n      airport_to_id   as AirportToId,\\n      distance        as Distance,\\n      distance_unit   as DistanceUnit\\n}\",\"expectedOutput\":\"Simulated CDS entity defined successfully.\"}}],\"knowledgeCheck\":{\"question\":\"Which CDS view type does not generate an SQL View artifact in the ABAP Dictionary (SE11)?\",\"options\":[\"Classic CDS View (define view)\",\"CDS View Entity (define view entity)\",\"Database View\",\"Projection View\"],\"correctAnswer\":\"CDS View Entity (define view entity)\",\"explanation\":\"CDS View Entities compile directly to the database without generating an extra DDIC SQL View artifact.\"}}"
  },
  {
    "id": "les-rap-01",
    "module_id": "mod-rap-1",
    "title": "RAP Architecture, Business Objects & CDS Data Model",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-data-03",
    "objectives": "Understand the three layers of the RESTful Application Programming Model (RAP): Data Modeling, Behavior Definition, and Business Service Exposure.",
    "is_core": 1,
    "handbook_unit": "RAP Overview: Architecture and BO Concepts",
    "summary": "RAP is SAP's premier development framework for S/4HANA and BTP. It structures development into CDS data models, behavior definitions, and OData service bindings.",
    "key_takeaways": "1. Root entities control transactional boundaries and lifecycle locking.\n2. Managed RAP automates standard database CRUD saves.\n3. Unmanaged RAP provides complete custom control over existing legacy APIs.",
    "content_json": "{\"sections\":[{\"title\":\"The RESTful Application Programming Model (RAP) Layers\",\"content\":\"SAP RAP structures enterprise applications into three cohesive layers:\\n1. Data Modeling: CDS View Entities define the relational model, semantic annotations, and entity composition trees (Root Travel -> Child Booking).\\n2. Behavior Definition & Implementation: BDEF declares capabilities (create, update, delete, actions, validations). Behavior pools execute business logic.\\n3. Business Services: Service Definitions expose entities, and Service Bindings generate OData V4 or V2 protocol endpoints.\",\"callout\":{\"type\":\"info\",\"text\":\"RAP is cloud-ready and runs identically on SAP BTP ABAP Environment and on-premise SAP S/4HANA 1909+.\"}}],\"knowledgeCheck\":{\"question\":\"In a RAP composition hierarchy (e.g. Travel and Booking), which entity serves as the transactional lock master?\",\"options\":[\"Child Entity (Booking)\",\"Root Entity (Travel)\",\"Service Binding\",\"Database Table\"],\"correctAnswer\":\"Root Entity (Travel)\",\"explanation\":\"The Root Entity establishes transactional boundaries and manages lock synchronization across all composed child entities.\"}}"
  },
  {
    "id": "les-rap-02",
    "module_id": "mod-rap-2",
    "title": "RAP Behavior Definitions (BDEF) & Transactional Lifecycle",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-rap-01",
    "objectives": "Define Behavior Definitions with strict(2), differentiate managed vs unmanaged save scenarios, configure draft handling, and establish lock master rules.",
    "is_core": 1,
    "handbook_unit": "RAP Unit 2: Behavior Definitions and Transactional Runtime",
    "summary": "The Behavior Definition declares transactional capabilities for CDS entities. Managed scenarios delegate standard CRUD persistence to the RAP runtime.",
    "key_takeaways": "1. Managed BDEF generates standard database INSERT/UPDATE/DELETE routines automatically.\n2. with draft allows users to store incomplete changes in draft staging tables.\n3. strict(2) enforces the latest ABAP cloud quality rules.",
    "content_json": "{\"sections\":[{\"title\":\"Behavior Definition Syntax and Capabilities\",\"content\":\"The Behavior Definition (BDEF) defines the transactional behavior of a CDS entity. It specifies whether operations are managed or unmanaged, defines lock masters, authorization checks, and enumerates custom business actions.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Sample Managed BDEF Definition\",\"code\":\"managed implementation in class zbp_i_travel unique;\\nstrict ( 2 );\\nwith draft;\\n\\ndefine behavior for ZI_Travel_M alias Travel\\npersistent table ztravel_table\\ndraft table ztravel_d\\nlock master\\nauthorization master ( global )\\n{\\n  create;\\n  update;\\n  delete;\\n  action acceptTravel result [1] $self;\\n}\",\"expectedOutput\":\"Behavior definition syntax validated.\"}}],\"knowledgeCheck\":{\"question\":\"Which BDEF option enables automatic creation of staging tables for saving incomplete user edits before activation?\",\"options\":[\"with draft\",\"managed save\",\"strict ( 2 )\",\"lock master\"],\"correctAnswer\":\"with draft\",\"explanation\":\"with draft activates the RAP draft engine, allowing users to save work-in-progress records without violating final validations.\"}}"
  },
  {
    "id": "les-rap-02b",
    "module_id": "mod-rap-2",
    "title": "Entity Manipulation Language (EML): READ, MODIFY & COMMIT",
    "order_index": 2,
    "estimated_mins": 40,
    "prerequisites": "les-rap-02",
    "objectives": "Execute transactional operations on RAP entities using EML statements: READ ENTITIES, MODIFY ENTITIES, and COMMIT ENTITIES.",
    "is_core": 0,
    "handbook_unit": "RAP Unit 3: Entity Manipulation Language",
    "summary": "EML is an ABAP language extension for executing transactional operations on RAP Business Objects, decoupling callers from internal database persistence.",
    "key_takeaways": "1. MODIFY ENTITIES updates entity transactional buffers.\n2. READ ENTITIES fetches entity state directly from the transactional buffer or database.\n3. COMMIT ENTITIES triggers the final save sequence to write changes permanently.",
    "content_json": "{\"sections\":[{\"title\":\"EML Syntax Mechanics\",\"content\":\"EML statements operate directly on RAP business objects. When calling EML, you receive FAILED and REPORTED response structures that contain entity keys and user-facing message instances.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Simulated EML Status Modification\",\"code\":\"DATA lv_booking_id TYPE string VALUE 'BKG-01'.\\nDATA lv_status TYPE string VALUE 'N'.\\n\\n\\\" Simulate action acceptBooking:\\nlv_status = 'A'.\\n\\nWRITE: / |Booking { lv_booking_id } status updated to: { lv_status } (Accepted)|.\",\"expectedOutput\":\"Booking BKG-01 status updated to: A (Accepted)\"}}],\"knowledgeCheck\":{\"question\":\"Which clause in an EML statement captures detailed diagnostic message instances for end-user feedback?\",\"options\":[\"FAILED\",\"REPORTED\",\"DIAGNOSTICS\",\"MESSAGES\"],\"correctAnswer\":\"REPORTED\",\"explanation\":\"The REPORTED structure collects message objects (derived from /IWBEP/IF_CP_MESSAGE or IF_T100_MESSAGE) returned during EML execution.\"}}"
  },
  {
    "id": "les-rap-03",
    "module_id": "mod-rap-3",
    "title": "RAP Validations, Determinations, Actions & Services",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-rap-02b",
    "objectives": "Implement business rules in Behavior Pools: Validations for data integrity checks, Determinations for automatic calculation, and Custom Actions for state changes.",
    "is_core": 1,
    "handbook_unit": "RAP Unit 4: Business Logic Implementation",
    "summary": "Behavior pool classes implement BDEF business logic. Validations veto invalid saves, determinations compute values, and actions implement workflow state transitions.",
    "key_takeaways": "1. Validations inspect entity fields and populate FAILED/REPORTED to block saving invalid data.\n2. Determinations trigger on modify or save to calculate derived fields automatically.\n3. Actions implement custom business operations like approving or cancelling records.",
    "content_json": "{\"sections\":[{\"title\":\"Behavior Pool Methods and Execution Phases\",\"content\":\"Behavior logic is implemented in special local classes (FOR BEHAVIOR OF) inside behavior pool classes (zbp_*). These methods participate in the RAP transactional lifecycle:\\n- Interaction Phase: Determinations on modify compute default values.\\n- Early Save Phase: Validations inspect finalized fields and veto saves if rules fail.\\n- Late Save Phase: Determinations on save assign final continuous document numbers.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Simulated Validation Logic\",\"code\":\"DATA lv_begin TYPE d VALUE '20261101'.\\nDATA lv_end   TYPE d VALUE '20261015'.\\n\\nIF lv_end < lv_begin.\\n  WRITE: / 'Validation Error: End date cannot precede Begin date.'.\\nELSE.\\n  WRITE: / 'Dates are valid.'.\\nENDIF.\",\"expectedOutput\":\"Validation Error: End date cannot precede Begin date.\"}}],\"knowledgeCheck\":{\"question\":\"What happens when a RAP validation adds an entity key to the FAILED structure during the save phase?\",\"options\":[\"The save sequence is aborted, preventing persistence to the database\",\"The database table is dropped\",\"The error is ignored and the save completes anyway\",\"The system reboots\"],\"correctAnswer\":\"The save sequence is aborted, preventing persistence to the database\",\"explanation\":\"Populating FAILED signals to the RAP transactional engine that business rules were violated, halting the save sequence and displaying errors to the user.\"}}"
  },
  {
    "id": "les-rap-03b",
    "module_id": "mod-rap-3",
    "title": "Service Definitions, Service Bindings & OData V4",
    "order_index": 2,
    "estimated_mins": 35,
    "prerequisites": "les-rap-03",
    "objectives": "Expose CDS data models via Service Definitions, configure Service Bindings for OData V4 UI and Web API, and test endpoints in ADT preview.",
    "is_core": 0,
    "handbook_unit": "RAP Unit 5: Service Exposure",
    "summary": "Service Definitions define which CDS entities are exposed. Service Bindings choose the communication protocol (OData V4 UI / Web API) and generate endpoints.",
    "key_takeaways": "1. Service Definitions selectively expose entities from the data model.\n2. Service Bindings bind definitions to OData protocols (V4 UI, V4 Web API, V2).\n3. ADT provides a built-in Fiori Elements preview for testing UI services instantly.",
    "content_json": "{\"sections\":[{\"title\":\"Exposing RAP Business Services\",\"content\":\"Exposing a RAP application requires two development artifacts:\\n1. Service Definition: Declares the CDS entities to publish (e.g. expose ZI_Travel_M as Travel).\\n2. Service Binding: Implements the protocol. In modern S/4HANA, OData V4 - UI is the standard for Fiori Elements apps, offering batch optimization and reduced payload sizes.\",\"callout\":{\"type\":\"tip\",\"text\":\"You can test any OData V4 UI service binding directly inside ADT by right-clicking the entity in the Service Binding editor and choosing Preview.\"}}],\"knowledgeCheck\":{\"question\":\"Which binding type is standard for modern SAP Fiori Elements applications in RAP?\",\"options\":[\"OData V4 - UI\",\"SOAP Web Service\",\"RFC Gateway\",\"Direct SQL\"],\"correctAnswer\":\"OData V4 - UI\",\"explanation\":\"OData V4 - UI is optimized for Fiori Elements, providing performance benefits, delta loading, and rich draft handling.\"}}"
  },
  {
    "id": "les-adv-01",
    "module_id": "mod-adv-1",
    "title": "ABAP Unit Testing: TDD, Test Doubles & Assertions",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-oop-03b",
    "objectives": "Implement unit test classes with FOR TESTING, use cl_abap_unit_assert methods, isolate dependencies using ABAP SQL Test Double frameworks, and practice Test-Driven Development.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 7: Quality Assurance and ABAP Unit",
    "summary": "ABAP Unit enables automated regression testing. Test double frameworks mock database calls, allowing fast, repeatable tests without persistent side effects.",
    "key_takeaways": "1. Test classes are declared with FOR TESTING DURATION SHORT RISK LEVEL HARMLESS.\n2. cl_abap_unit_assert=>assert_equals validates expected vs actual outputs.\n3. Test classes are excluded from production binaries, costing zero runtime overhead.",
    "content_json": "{\"sections\":[{\"title\":\"Writing Automated ABAP Unit Tests\",\"content\":\"ABAP Unit is built into the language. Test classes are defined inside the Test Classes include of a global class. The compiler strips test code from production execution, ensuring zero performance overhead in live systems.\",\"codeSnippet\":{\"language\":\"abap\",\"title\":\"Sample Unit Test Class Structure\",\"code\":\"CLASS ltcl_calc_test DEFINITION FOR TESTING\\n  DURATION SHORT\\n  RISK LEVEL HARMLESS.\\n\\n  PRIVATE SECTION.\\n    METHODS test_addition FOR TESTING.\\nENDCLASS.\\n\\nCLASS ltcl_calc_test IMPLEMENTATION.\\n  METHOD test_addition.\\n    DATA(lv_act) = 2 + 3.\\n    IF lv_act = 5.\\n      WRITE: / 'Test passed: Assert equals verified.'.\\n    ENDIF.\\n  ENDMETHOD.\\nENDCLASS.\\n\\nSTART-OF-SELECTION.\\n  DATA lo_test TYPE REF TO ltcl_calc_test.\\n  CREATE OBJECT lo_test.\\n  lo_test->test_addition( ).\",\"expectedOutput\":\"Test passed: Assert equals verified.\"}}],\"knowledgeCheck\":{\"question\":\"Which method of cl_abap_unit_assert is used to verify that an actual result matches an expected value?\",\"options\":[\"assert_equals\",\"verify_same\",\"check_match\",\"assert_identical\"],\"correctAnswer\":\"assert_equals\",\"explanation\":\"cl_abap_unit_assert=>assert_equals compares the expected value (exp) against actual value (act) and fails the test if they differ.\"}}"
  },
  {
    "id": "les-adv-02",
    "module_id": "mod-adv-2",
    "title": "ABAP Performance Tuning: SQL Trace (ST05), SAT & HANA Pushdown",
    "order_index": 1,
    "estimated_mins": 45,
    "prerequisites": "les-adv-01",
    "objectives": "Analyze performance using ST05 (SQL Trace) and SAT (Runtime Analysis), detect identical database statements, prevent nested queries, and apply HANA code pushdown.",
    "is_core": 1,
    "handbook_unit": "S4D400 Unit 7: Performance Analysis and Optimization",
    "summary": "Optimizing ABAP on HANA requires minimizing database roundtrips, fetching only required fields, and avoiding SELECT queries inside loops.",
    "key_takeaways": "1. Never execute SELECT queries inside a LOOP AT (the nested SELECT anti-pattern).\n2. ST05 traces SQL durations, execution plans, and identical database roundtrips.\n3. Push filtering and aggregation into the database layer via CDS views and modern SQL.",
    "content_json": "{\"sections\":[{\"title\":\"The Golden Rules of ABAP on HANA Performance\",\"content\":\"Performance tuning on SAP HANA shifts from CPU-bound optimization to data-transfer minimization:\\n1. Keep the result set small: Specify explicit field lists; never use SELECT * in production.\\n2. Minimize database roundtrips: Eliminate queries inside loops. Join tables or use subqueries.\\n3. Column store compression: HANA compresses columnar data; accessing fewer columns dramatically reduces memory bandwidth bottlenecks.\",\"callout\":{\"type\":\"warning\",\"text\":\"Executing a SELECT statement inside a LOOP of 100,000 items creates 100,000 network roundtrips between application server and database, grinding the system to a halt.\"}}],\"knowledgeCheck\":{\"question\":\"Which transaction code is the standard SAP tool for analyzing SQL database execution traces and durations?\",\"options\":[\"ST05\",\"SE38\",\"SM50\",\"AL08\"],\"correctAnswer\":\"ST05\",\"explanation\":\"ST05 (Performance Analysis) captures detailed SQL traces showing execution duration, records fetched, and database explain plans.\"}}"
  }
];

export const SEED_CHALLENGES = [
  {
    "id": "chal-01",
    "title": "Order Total & Tax Calculator",
    "category": "Variables & Arithmetic",
    "difficulty": "easy",
    "order_index": 1,
    "problem_statement": "Implement an ABAP logic block that computes the net sales amount, 20% value-added tax (VAT), and final gross total for an order. Output the calculated values formatted with WRITE statements.",
    "input_assumptions": "Assume net sales amount is 250.00 and VAT rate is 20 percent.",
    "expected_output": "Net: 250.00\\nTax: 50\\nGross: 300",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Net amount output\",\"expectedOutput\":\"Net: 250.00\"},{\"id\":\"tc-2\",\"description\":\"Tax amount output\",\"expectedOutput\":\"Tax: 50\"},{\"id\":\"tc-3\",\"description\":\"Gross total output\",\"expectedOutput\":\"Gross: 300\"}]",
    "constraints": "Use elementary packed numbers or integers. Every ABAP statement must end with a period.",
    "hints_json": "[\"Calculate tax using lv_tax_amount = lv_net_amount * lv_tax_rate / 100.\",\"Gross total is the sum of net amount and tax amount.\",\"Use WRITE: / to print each labeled line.\"]",
    "starter_code": "DATA lv_net_amount TYPE p DECIMALS 2 VALUE '250.00'.\nDATA lv_tax_rate TYPE i VALUE 20.\nDATA lv_tax_amount TYPE p DECIMALS 2.\nDATA lv_gross_amount TYPE p DECIMALS 2.\n\n* Compute tax and gross amount here:\n* lv_tax_amount = ...\n* lv_gross_amount = ...\n\nWRITE: / 'Net:', lv_net_amount.\n* Output Tax and Gross:\n",
    "reference_solution": "DATA lv_net_amount TYPE p DECIMALS 2 VALUE '250.00'.\nDATA lv_tax_rate TYPE i VALUE 20.\nDATA lv_tax_amount TYPE p DECIMALS 2.\nDATA lv_gross_amount TYPE p DECIMALS 2.\n\nlv_tax_amount = lv_net_amount * lv_tax_rate / 100.\nlv_gross_amount = lv_net_amount + lv_tax_amount.\n\nWRITE: / 'Net:', lv_net_amount.\nWRITE: / 'Tax:', lv_tax_amount.\nWRITE: / 'Gross:', lv_gross_amount.",
    "solution_explanation": "Packed decimal types (TYPE P) are the standard for monetary calculations in SAP ABAP to prevent floating-point rounding inaccuracies. The arithmetic expression computes 20% of 250 (50) and adds it to 250 to achieve 300 gross.",
    "related_concepts_json": "[\"Elementary Types\",\"Type P Packed Decimals\",\"Arithmetic Expressions\",\"WRITE Formatting\"]"
  },
  {
    "id": "chal-02",
    "title": "Conditional Discount & Loop Processor",
    "category": "Conditions & Loops",
    "difficulty": "easy",
    "order_index": 2,
    "problem_statement": "Iterate through 5 order tiers using a DO loop. For tiers 1 to 3, apply a 5 discount; for tiers 4 and 5, apply a 15 discount. Accumulate the total discount and output it.",
    "input_assumptions": "Run the loop 5 times using sy-index as the tier indicator.",
    "expected_output": "Total Discount: 45",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Accumulated total discount matches 45\",\"expectedOutput\":\"Total Discount: 45\"}]",
    "constraints": "Use DO 5 TIMES ... ENDDO and IF ... ELSE ... ENDIF constructs.",
    "hints_json": "[\"sy-index contains the current iteration number from 1 to 5.\",\"Check if sy-index > 3 to add 15, otherwise add 5.\",\"Output using WRITE: / 'Total Discount:', lv_total_discount.\"]",
    "starter_code": "DATA lv_total_discount TYPE i VALUE 0.\n\nDO 5 TIMES.\n  DATA(lv_tier) = sy-index.\n  * Implement tier condition:\n  * If tier > 3 add 15, else add 5\nENDDO.\n\nWRITE: / 'Total Discount:', lv_total_discount.",
    "reference_solution": "DATA lv_total_discount TYPE i VALUE 0.\n\nDO 5 TIMES.\n  DATA(lv_tier) = sy-index.\n  IF lv_tier > 3.\n    lv_total_discount = lv_total_discount + 15.\n  ELSE.\n    lv_total_discount = lv_total_discount + 5.\n  ENDIF.\nENDDO.\n\nWRITE: / 'Total Discount:', lv_total_discount.",
    "solution_explanation": "The loop executes 5 times. Tiers 1, 2, and 3 each add 5 (total 15). Tiers 4 and 5 each add 15 (total 30). 15 + 30 = 45 total discount accumulated in lv_total_discount.",
    "related_concepts_json": "[\"DO Loops\",\"System Field sy-index\",\"Conditional IF-ELSE\",\"Accumulators\"]"
  },
  {
    "id": "chal-03",
    "title": "Flight Code & Booking String Parser",
    "category": "Strings",
    "difficulty": "easy",
    "order_index": 3,
    "problem_statement": "Given a composite flight reservation string formatted as AIRLINE-FLIGHTNO-ORIGIN-DEST (e.g. \"LH-0402-FRA-NYC\"), parse the components into separate variables using SPLIT and format a route summary.",
    "input_assumptions": "Input string is \"LH-0402-FRA-NYC\" delimited by hyphens.",
    "expected_output": "Airline: LH\\nFlight: 0402\\nRoute: FRA->NYC",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Parsed airline code\",\"expectedOutput\":\"Airline: LH\"},{\"id\":\"tc-2\",\"description\":\"Parsed flight number\",\"expectedOutput\":\"Flight: 0402\"},{\"id\":\"tc-3\",\"description\":\"Formatted route interpolation\",\"expectedOutput\":\"Route: FRA->NYC\"}]",
    "constraints": "Use SPLIT ... AT ... INTO ... and modern string templates |...|.",
    "hints_json": "[\"Syntax: SPLIT lv_booking AT '-' INTO lv_airline lv_flight_no lv_origin lv_dest.\",\"Use string template |{ lv_origin }->{ lv_dest }| for the route.\"]",
    "starter_code": "DATA lv_booking TYPE string VALUE 'LH-0402-FRA-NYC'.\nDATA lv_airline TYPE string.\nDATA lv_flight_no TYPE string.\nDATA lv_origin TYPE string.\nDATA lv_dest TYPE string.\n\n* Split the composite booking code here:\n\nWRITE: / 'Airline:', lv_airline.\nWRITE: / 'Flight:', lv_flight_no.\n* Output Route:\n",
    "reference_solution": "DATA lv_booking TYPE string VALUE 'LH-0402-FRA-NYC'.\nDATA lv_airline TYPE string.\nDATA lv_flight_no TYPE string.\nDATA lv_origin TYPE string.\nDATA lv_dest TYPE string.\n\nSPLIT lv_booking AT '-' INTO lv_airline lv_flight_no lv_origin lv_dest.\n\nWRITE: / 'Airline:', lv_airline.\nWRITE: / 'Flight:', lv_flight_no.\nWRITE: / 'Route:', |{ lv_origin }->{ lv_dest }|.",
    "solution_explanation": "The SPLIT statement breaks character strings across delimiters directly into target variables. String templates enclosed in pipes (|...|) allow clean expression interpolation inside curly braces without procedural concatenations.",
    "related_concepts_json": "[\"String Manipulation\",\"SPLIT Statement\",\"String Templates |...|\",\"Variable Interpolation\"]"
  },
  {
    "id": "chal-04",
    "title": "Purchase Order Header Structure",
    "category": "Structures",
    "difficulty": "medium",
    "order_index": 4,
    "problem_statement": "Define a local structure type for purchase orders with fields po_number, vendor_id, currency, and net_value. Instantiate a work area structure, populate all fields, and output the purchase order summary.",
    "input_assumptions": "PO Number: PO-90001, Vendor: VEND-501, Currency: EUR, Value: 15000.",
    "expected_output": "PO Number: PO-90001\\nVendor: VEND-501\\nValue: 15000 EUR",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"PO Number field output\",\"expectedOutput\":\"PO Number: PO-90001\"},{\"id\":\"tc-2\",\"description\":\"Vendor ID field output\",\"expectedOutput\":\"Vendor: VEND-501\"},{\"id\":\"tc-3\",\"description\":\"Net value and currency output\",\"expectedOutput\":\"Value: 15000 EUR\"}]",
    "constraints": "Use TYPES: BEGIN OF ... END OF and component access using hyphens (-).",
    "hints_json": "[\"Access fields on work area ls_po using ls_po-po_number, ls_po-vendor_id, etc.\",\"Output formatted value with string template |{ ls_po-net_value } { ls_po-currency }|.\"]",
    "starter_code": "TYPES: BEGIN OF ty_po,\n         po_number TYPE string,\n         vendor_id TYPE string,\n         currency  TYPE string,\n         net_value TYPE i,\n       END OF ty_po.\n\nDATA ls_po TYPE ty_po.\n\n* Populate ls_po fields here:\n\nWRITE: / 'PO Number:', ls_po-po_number.\nWRITE: / 'Vendor:', ls_po-vendor_id.\nWRITE: / 'Value:', |{ ls_po-net_value } { ls_po-currency }|.",
    "reference_solution": "TYPES: BEGIN OF ty_po,\n         po_number TYPE string,\n         vendor_id TYPE string,\n         currency  TYPE string,\n         net_value TYPE i,\n       END OF ty_po.\n\nDATA ls_po TYPE ty_po.\nls_po-po_number = 'PO-90001'.\nls_po-vendor_id = 'VEND-501'.\nls_po-currency = 'EUR'.\nls_po-net_value = 15000.\n\nWRITE: / 'PO Number:', ls_po-po_number.\nWRITE: / 'Vendor:', ls_po-vendor_id.\nWRITE: / 'Value:', |{ ls_po-net_value } { ls_po-currency }|.",
    "solution_explanation": "In ABAP, structures bundle multiple typed fields into a cohesive record. Component access uses the hyphen operator (ls_po-vendor_id). This forms the foundational work area concept used when iterating internal tables.",
    "related_concepts_json": "[\"TYPES BEGIN OF\",\"Structure Work Areas\",\"Component Access Hyphen (-)\",\"Formatted Output\"]"
  },
  {
    "id": "chal-05",
    "title": "Material Inventory Internal Table",
    "category": "Internal Tables",
    "difficulty": "medium",
    "order_index": 5,
    "problem_statement": "Define a table of materials (matnr, stock). Append three material entries: MAT-A (150 units), MAT-B (80 units), MAT-C (220 units). Loop through the table to calculate total warehouse stock and total item count.",
    "input_assumptions": "Append items in sequence and accumulate stock.",
    "expected_output": "Total Stock: 450\\nCount: 3",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Total aggregated inventory stock\",\"expectedOutput\":\"Total Stock: 450\"},{\"id\":\"tc-2\",\"description\":\"Table line count\",\"expectedOutput\":\"Count: 3\"}]",
    "constraints": "Use STANDARD TABLE OF, APPEND ... TO ..., LOOP AT ... INTO ..., and lines( ).",
    "hints_json": "[\"Use APPEND ls_item TO lt_inventory to push rows.\",\"Accumulate with lv_total_stock = lv_total_stock + ls_item-stock inside the loop.\",\"Use lines( lt_inventory ) to count rows.\"]",
    "starter_code": "TYPES: BEGIN OF ty_material,\n         matnr TYPE string,\n         stock TYPE i,\n       END OF ty_material.\n\nDATA lt_inventory TYPE STANDARD TABLE OF ty_material.\nDATA ls_item TYPE ty_material.\n\n* Append MAT-A (150), MAT-B (80), and MAT-C (220):\n\nDATA lv_total_stock TYPE i VALUE 0.\n* Loop through lt_inventory and accumulate stock:\n\nWRITE: / 'Total Stock:', lv_total_stock.\nWRITE: / 'Count:', lines( lt_inventory ).",
    "reference_solution": "TYPES: BEGIN OF ty_material,\n         matnr TYPE string,\n         stock TYPE i,\n       END OF ty_material.\n\nDATA lt_inventory TYPE STANDARD TABLE OF ty_material.\nDATA ls_item TYPE ty_material.\n\nls_item-matnr = 'MAT-A'.\nls_item-stock = 150.\nAPPEND ls_item TO lt_inventory.\n\nls_item-matnr = 'MAT-B'.\nls_item-stock = 80.\nAPPEND ls_item TO lt_inventory.\n\nls_item-matnr = 'MAT-C'.\nls_item-stock = 220.\nAPPEND ls_item TO lt_inventory.\n\nDATA lv_total_stock TYPE i VALUE 0.\nLOOP AT lt_inventory INTO ls_item.\n  lv_total_stock = lv_total_stock + ls_item-stock.\nENDLOOP.\n\nWRITE: / 'Total Stock:', lv_total_stock.\nWRITE: / 'Count:', lines( lt_inventory ).",
    "solution_explanation": "Internal tables are dynamic arrays in ABAP. The work area ls_item is loaded into the table with APPEND. The LOOP AT construct iterates row by row, loading each row into ls_item where sy-tabix tracks the 1-based index.",
    "related_concepts_json": "[\"STANDARD TABLE\",\"APPEND Statement\",\"LOOP AT INTO\",\"Built-in Function lines()\"]"
  },
  {
    "id": "chal-06",
    "title": "Binary Search & Read Table",
    "category": "Searching & Sorting",
    "difficulty": "medium",
    "order_index": 6,
    "problem_statement": "Given a customer dataset stored in a SORTED TABLE with unique key id, use READ TABLE WITH KEY to locate customer \"C02\". Verify sy-subrc is 0 and output the found customer name and tier.",
    "input_assumptions": "Dataset contains C01 (Alpha Corp, Gold), C02 (Beta Ltd, Silver), and C03 (Gamma AG, Platinum).",
    "expected_output": "Found: Beta Ltd\\nTier: Silver",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Customer name found via key\",\"expectedOutput\":\"Found: Beta Ltd\"},{\"id\":\"tc-2\",\"description\":\"Customer tier found via key\",\"expectedOutput\":\"Tier: Silver\"}]",
    "constraints": "Use READ TABLE WITH KEY and check sy-subrc.",
    "hints_json": "[\"Syntax: READ TABLE lt_cust INTO ls_cust WITH KEY id = 'C02'.\",\"Check IF sy-subrc = 0 to verify the key was located.\"]",
    "starter_code": "TYPES: BEGIN OF ty_cust,\n         id   TYPE string,\n         name TYPE string,\n         tier TYPE string,\n       END OF ty_cust.\n\nDATA lt_cust TYPE SORTED TABLE OF ty_cust WITH UNIQUE KEY id.\nDATA ls_cust TYPE ty_cust.\n\nls_cust-id = 'C01'. ls_cust-name = 'Alpha Corp'. ls_cust-tier = 'Gold'. APPEND ls_cust TO lt_cust.\nls_cust-id = 'C02'. ls_cust-name = 'Beta Ltd'. ls_cust-tier = 'Silver'. APPEND ls_cust TO lt_cust.\nls_cust-id = 'C03'. ls_cust-name = 'Gamma AG'. ls_cust-tier = 'Platinum'. APPEND ls_cust TO lt_cust.\n\n* Read customer C02 by key:\n* Check sy-subrc and output Found name and Tier",
    "reference_solution": "TYPES: BEGIN OF ty_cust,\n         id   TYPE string,\n         name TYPE string,\n         tier TYPE string,\n       END OF ty_cust.\n\nDATA lt_cust TYPE SORTED TABLE OF ty_cust WITH UNIQUE KEY id.\nDATA ls_cust TYPE ty_cust.\n\nls_cust-id = 'C01'. ls_cust-name = 'Alpha Corp'. ls_cust-tier = 'Gold'.\nAPPEND ls_cust TO lt_cust.\nls_cust-id = 'C02'. ls_cust-name = 'Beta Ltd'. ls_cust-tier = 'Silver'.\nAPPEND ls_cust TO lt_cust.\nls_cust-id = 'C03'. ls_cust-name = 'Gamma AG'. ls_cust-tier = 'Platinum'.\nAPPEND ls_cust TO lt_cust.\n\nREAD TABLE lt_cust INTO ls_cust WITH KEY id = 'C02'.\nIF sy-subrc = 0.\n  WRITE: / 'Found:', ls_cust-name.\n  WRITE: / 'Tier:', ls_cust-tier.\nELSE.\n  WRITE: / 'Not Found'.\nENDIF.",
    "solution_explanation": "Sorted tables maintain rows in sorted order according to their key. A READ TABLE on a sorted table by primary key performs an automatic logarithmic binary search O(log N). A return code of sy-subrc = 0 signifies success.",
    "related_concepts_json": "[\"SORTED TABLE\",\"READ TABLE WITH KEY\",\"System Field sy-subrc\",\"Binary Search Complexity\"]"
  },
  {
    "id": "chal-07",
    "title": "Account Ledger Class",
    "category": "Classes & Methods",
    "difficulty": "hard",
    "order_index": 7,
    "problem_statement": "Construct a local ABAP class lcl_ledger with private attributes for account identifier and balance. Provide public methods constructor, deposit, get_balance, and get_account. Instantiate the class, make two deposits (500 and 250), and display account details.",
    "input_assumptions": "Account ID is \"ACC-8801\", initial balance is 0, deposits are 500 and 250.",
    "expected_output": "Account: ACC-8801\\nBalance: 750",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Account ID from getter method\",\"expectedOutput\":\"Account: ACC-8801\"},{\"id\":\"tc-2\",\"description\":\"Calculated balance after deposits\",\"expectedOutput\":\"Balance: 750\"}]",
    "constraints": "Follow Clean ABAP encapsulation principles: private attributes and public accessor methods.",
    "hints_json": "[\"Declare attributes mv_account and mv_balance in PRIVATE SECTION.\",\"Declare METHODS constructor, deposit, get_balance, and get_account in PUBLIC SECTION.\",\"Instantiate using CREATE OBJECT lo_ledger EXPORTING iv_account = 'ACC-8801'.\"]",
    "starter_code": "CLASS lcl_ledger DEFINITION.\n  PUBLIC SECTION.\n    METHODS:\n      constructor IMPORTING iv_account TYPE string,\n      deposit IMPORTING iv_amount TYPE i,\n      get_balance RETURNING VALUE(rv_balance) TYPE i,\n      get_account RETURNING VALUE(rv_acc) TYPE string.\n  PRIVATE SECTION.\n    DATA mv_account TYPE string.\n    DATA mv_balance TYPE i.\nENDCLASS.\n\nCLASS lcl_ledger IMPLEMENTATION.\n  * Implement constructor, deposit, get_balance, get_account\nENDCLASS.\n\nSTART-OF-SELECTION.\n  DATA lo_ledger TYPE REF TO lcl_ledger.\n  * Create object and make deposits:\n",
    "reference_solution": "CLASS lcl_ledger DEFINITION.\n  PUBLIC SECTION.\n    METHODS:\n      constructor IMPORTING iv_account TYPE string,\n      deposit IMPORTING iv_amount TYPE i,\n      get_balance RETURNING VALUE(rv_balance) TYPE i,\n      get_account RETURNING VALUE(rv_acc) TYPE string.\n  PRIVATE SECTION.\n    DATA mv_account TYPE string.\n    DATA mv_balance TYPE i.\nENDCLASS.\n\nCLASS lcl_ledger IMPLEMENTATION.\n  METHOD constructor.\n    mv_account = iv_account.\n    mv_balance = 0.\n  ENDMETHOD.\n  METHOD deposit.\n    mv_balance = mv_balance + iv_amount.\n  ENDMETHOD.\n  METHOD get_balance.\n    rv_balance = mv_balance.\n  ENDMETHOD.\n  METHOD get_account.\n    rv_acc = mv_account.\n  ENDMETHOD.\nENDCLASS.\n\nSTART-OF-SELECTION.\n  DATA lo_ledger TYPE REF TO lcl_ledger.\n  CREATE OBJECT lo_ledger EXPORTING iv_account = 'ACC-8801'.\n  lo_ledger->deposit( 500 ).\n  lo_ledger->deposit( 250 ).\n\n  WRITE: / 'Account:', lo_ledger->get_account( ).\n  WRITE: / 'Balance:', lo_ledger->get_balance( ).",
    "solution_explanation": "Object-Oriented ABAP encapsulates internal state in private member variables (mv_*). Callers interact strictly through public instance methods. Functional methods with RETURNING parameters allow direct inline evaluation in expressions and WRITE statements.",
    "related_concepts_json": "[\"CLASS DEFINITION / IMPLEMENTATION\",\"Encapsulation & Visibility\",\"Constructors\",\"Functional Methods\"]"
  },
  {
    "id": "chal-08",
    "title": "Safe Division Exception Handler",
    "category": "Exceptions",
    "difficulty": "hard",
    "order_index": 8,
    "problem_statement": "Define a custom exception class lcx_zero_divide inheriting from cx_static_check. In a calculator class, implement a divide method that raises lcx_zero_divide if the denominator is 0. In the main routine, invoke divide safely inside a TRY ... CATCH block and intercept the zero division.",
    "input_assumptions": "First division is 100 / 4 (= 25). Second division is 100 / 0 (triggers exception).",
    "expected_output": "Result: 25\\nError: Division by zero intercepted",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Successful division result\",\"expectedOutput\":\"Result: 25\"},{\"id\":\"tc-2\",\"description\":\"Intercepted exception error message\",\"expectedOutput\":\"Error: Division by zero intercepted\"}]",
    "constraints": "Use RAISE EXCEPTION TYPE and TRY ... CATCH ... ENDTRY constructs.",
    "hints_json": "[\"Declare class lcx_zero_divide DEFINITION INHERITING FROM cx_static_check.\",\"Check IF iv_denom = 0. RAISE EXCEPTION TYPE lcx_zero_divide. ENDIF.\",\"Wrap invocations in TRY. ... CATCH lcx_zero_divide. ... ENDTRY.\"]",
    "starter_code": "CLASS lcx_zero_divide DEFINITION INHERITING FROM cx_static_check.\nENDCLASS.\n\nCLASS lcl_math DEFINITION.\n  PUBLIC SECTION.\n    METHODS divide\n      IMPORTING iv_num TYPE i iv_denom TYPE i\n      RETURNING VALUE(rv_res) TYPE i\n      RAISING lcx_zero_divide.\nENDCLASS.\n\nCLASS lcl_math IMPLEMENTATION.\n  * Implement divide method checking for zero denominator:\nENDCLASS.\n\nSTART-OF-SELECTION.\n  DATA lo_math TYPE REF TO lcl_math.\n  CREATE OBJECT lo_math.\n  * Use TRY ... CATCH to execute 100 / 4 and 100 / 0:\n",
    "reference_solution": "CLASS lcx_zero_divide DEFINITION INHERITING FROM cx_static_check.\nENDCLASS.\n\nCLASS lcl_math DEFINITION.\n  PUBLIC SECTION.\n    METHODS divide\n      IMPORTING iv_num TYPE i iv_denom TYPE i\n      RETURNING VALUE(rv_res) TYPE i\n      RAISING lcx_zero_divide.\nENDCLASS.\n\nCLASS lcl_math IMPLEMENTATION.\n  METHOD divide.\n    IF iv_denom = 0.\n      RAISE EXCEPTION TYPE lcx_zero_divide.\n    ENDIF.\n    rv_res = iv_num / iv_denom.\n  ENDMETHOD.\nENDCLASS.\n\nSTART-OF-SELECTION.\n  DATA lo_math TYPE REF TO lcl_math.\n  CREATE OBJECT lo_math.\n  TRY.\n    DATA(lv_res) = lo_math->divide( iv_num = 100 iv_denom = 4 ).\n    WRITE: / 'Result:', lv_res.\n    DATA(lv_err) = lo_math->divide( iv_num = 100 iv_denom = 0 ).\n    WRITE: / 'Never reached'.\n  CATCH lcx_zero_divide.\n    WRITE: / 'Error: Division by zero intercepted'.\n  ENDTRY.",
    "solution_explanation": "Class-based exceptions derived from cx_static_check enforce compile-time verification: any caller must either handle the exception with CATCH or declare RAISING in its method signature. The TRY/CATCH block prevents runtime dump CX_SY_ZERODIVIDE.",
    "related_concepts_json": "[\"Class-Based Exceptions\",\"cx_static_check\",\"TRY-CATCH-ENDTRY\",\"RAISE EXCEPTION TYPE\"]"
  },
  {
    "id": "chal-09",
    "title": "Modern SQL & Filtered Internal Tables",
    "category": "Modern SQL & CDS",
    "difficulty": "hard",
    "order_index": 9,
    "problem_statement": "Process sales orders stored in an internal table simulating an Open SQL query result. Filter rows where order status is open (\"O\") using LOOP AT ... WHERE status = 'O'. Sum the total amount of open orders and output the result.",
    "input_assumptions": "Orders: SO-101 (1200, O), SO-102 (800, C), SO-103 (2500, O).",
    "expected_output": "Open Orders Total: 3700",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Calculated open orders total\",\"expectedOutput\":\"Open Orders Total: 3700\"}]",
    "constraints": "Use LOOP AT ... WHERE condition to filter rows directly.",
    "hints_json": "[\"Syntax: LOOP AT lt_orders INTO ls_order WHERE status = 'O'.\",\"Accumulate open totals: lv_open_total = lv_open_total + ls_order-amount.\"]",
    "starter_code": "TYPES: BEGIN OF ty_sales,\n         order_id TYPE string,\n         customer TYPE string,\n         amount   TYPE i,\n         status   TYPE string,\n       END OF ty_sales.\n\nDATA lt_orders TYPE STANDARD TABLE OF ty_sales.\nDATA ls_order TYPE ty_sales.\n\nls_order-order_id = 'SO-101'. ls_order-customer = 'Cust-A'. ls_order-amount = 1200. ls_order-status = 'O'. APPEND ls_order TO lt_orders.\nls_order-order_id = 'SO-102'. ls_order-customer = 'Cust-B'. ls_order-amount = 800. ls_order-status = 'C'. APPEND ls_order TO lt_orders.\nls_order-order_id = 'SO-103'. ls_order-customer = 'Cust-C'. ls_order-amount = 2500. ls_order-status = 'O'. APPEND ls_order TO lt_orders.\n\nDATA lv_open_total TYPE i VALUE 0.\n* Filter and accumulate open orders:\n\nWRITE: / 'Open Orders Total:', lv_open_total.",
    "reference_solution": "TYPES: BEGIN OF ty_sales,\n         order_id TYPE string,\n         customer TYPE string,\n         amount   TYPE i,\n         status   TYPE string,\n       END OF ty_sales.\n\nDATA lt_orders TYPE STANDARD TABLE OF ty_sales.\nDATA ls_order TYPE ty_sales.\n\nls_order-order_id = 'SO-101'. ls_order-customer = 'Cust-A'. ls_order-amount = 1200. ls_order-status = 'O'.\nAPPEND ls_order TO lt_orders.\nls_order-order_id = 'SO-102'. ls_order-customer = 'Cust-B'. ls_order-amount = 800. ls_order-status = 'C'.\nAPPEND ls_order TO lt_orders.\nls_order-order_id = 'SO-103'. ls_order-customer = 'Cust-C'. ls_order-amount = 2500. ls_order-status = 'O'.\nAPPEND ls_order TO lt_orders.\n\nDATA lv_open_total TYPE i VALUE 0.\nLOOP AT lt_orders INTO ls_order WHERE status = 'O'.\n  lv_open_total = lv_open_total + ls_order-amount.\nENDLOOP.\n\nWRITE: / 'Open Orders Total:', lv_open_total.",
    "solution_explanation": "The WHERE clause in LOOP AT filters rows efficiently without needing manual IF nesting inside the loop body. In real SAP HANA scenarios, this corresponds to pushing down filtering to the Open SQL WHERE clause before loading into application server memory.",
    "related_concepts_json": "[\"LOOP AT WHERE\",\"Table Filtering\",\"SQL Pushdown Mindset\",\"Aggregation Patterns\"]"
  },
  {
    "id": "chal-10",
    "title": "RAP EML Booking Status Simulator",
    "category": "RAP & Business Objects",
    "difficulty": "hard",
    "order_index": 10,
    "problem_statement": "Simulate a RAP custom action acceptBooking executed via Entity Manipulation Language (EML). For booking \"BKG-01\" with status \"N\" (New), execute an update changing status to \"A\" (Accepted) using MODIFY. Then read the updated booking by key and output the verified status.",
    "input_assumptions": "Bookings table has BKG-01 (status N) and BKG-02 (status N). Action targets BKG-01.",
    "expected_output": "Booking: BKG-01\\nStatus: A",
    "test_cases_json": "[{\"id\":\"tc-1\",\"description\":\"Updated booking ID verified\",\"expectedOutput\":\"Booking: BKG-01\"},{\"id\":\"tc-2\",\"description\":\"Updated booking status confirmed Accepted\",\"expectedOutput\":\"Status: A\"}]",
    "constraints": "Update the row in place and confirm with READ TABLE WITH KEY.",
    "hints_json": "[\"Find the booking with LOOP AT ... WHERE booking_id = 'BKG-01'.\",\"Set ls_b-status = 'A' and update using MODIFY lt_bookings FROM ls_b.\",\"Read the row with READ TABLE lt_bookings INTO ls_b WITH KEY booking_id = 'BKG-01'.\"]",
    "starter_code": "TYPES: BEGIN OF ty_booking_entity,\n         booking_id TYPE string,\n         customer   TYPE string,\n         status     TYPE string,\n       END OF ty_booking_entity.\n\nDATA lt_bookings TYPE STANDARD TABLE OF ty_booking_entity.\nDATA ls_b TYPE ty_booking_entity.\n\nls_b-booking_id = 'BKG-01'. ls_b-customer = 'C-100'. ls_b-status = 'N'. APPEND ls_b TO lt_bookings.\nls_b-booking_id = 'BKG-02'. ls_b-customer = 'C-200'. ls_b-status = 'N'. APPEND ls_b TO lt_bookings.\n\n* Simulate EML: Update status of BKG-01 to 'A':\n\n* Read back updated entity and output Booking and Status:\n",
    "reference_solution": "TYPES: BEGIN OF ty_booking_entity,\n         booking_id TYPE string,\n         customer   TYPE string,\n         status     TYPE string,\n       END OF ty_booking_entity.\n\nDATA lt_bookings TYPE STANDARD TABLE OF ty_booking_entity.\nDATA ls_b TYPE ty_booking_entity.\n\nls_b-booking_id = 'BKG-01'. ls_b-customer = 'C-100'. ls_b-status = 'N'.\nAPPEND ls_b TO lt_bookings.\nls_b-booking_id = 'BKG-02'. ls_b-customer = 'C-200'. ls_b-status = 'N'.\nAPPEND ls_b TO lt_bookings.\n\nLOOP AT lt_bookings INTO ls_b WHERE booking_id = 'BKG-01'.\n  ls_b-status = 'A'.\n  MODIFY lt_bookings FROM ls_b.\nENDLOOP.\n\nREAD TABLE lt_bookings INTO ls_b WITH KEY booking_id = 'BKG-01'.\nWRITE: / 'Booking:', ls_b-booking_id.\nWRITE: / 'Status:', ls_b-status.",
    "solution_explanation": "In the ABAP RESTful Application Programming Model (RAP), business logic operates on transactional entities using EML statements (MODIFY ENTITIES / READ ENTITIES). This exercise demonstrates modifying entity transactional buffer state and verifying the result.",
    "related_concepts_json": "[\"RAP Entity Lifecycle\",\"EML MODIFY / READ\",\"Transactional Buffer\",\"State Machines\"]"
  }
];

export const SEED_QUIZZES = [
  {
    "id": "quiz-fnd-1",
    "lesson_id": "les-fnd-01",
    "module_id": "mod-fnd-1",
    "title": "ABAP Architecture & Tooling Assessment",
    "description": "Verify your understanding of the 3-tier SAP NetWeaver architecture, ADT on Eclipse, packages, and transport management.",
    "mode": "assessment",
    "passing_score": 80,
    "questions": [
      {
        "id": "q-fnd-101",
        "quiz_id": "quiz-fnd-1",
        "question_type": "multiple_choice",
        "question": "Which interface allows an ABAP class to be executed directly in ADT via F9 (Run as ABAP Application)?",
        "options_json": "[\"if_serializable_object\",\"if_oo_adt_classrun\",\"if_amdp_marker_hdb\",\"if_t100_message\"]",
        "correct_answer_json": "\"if_oo_adt_classrun\"",
        "explanation": "Implementing if_oo_adt_classrun provides the main( out ) method, which the ADT console executes when you press F9.",
        "difficulty": "easy",
        "topic": "Tooling & ADT"
      },
      {
        "id": "q-fnd-102",
        "quiz_id": "quiz-fnd-1",
        "question_type": "true_false",
        "question": "In modern ABAP development with ADT, source code compilation occurs locally on the developer machine inside Eclipse.",
        "options_json": "[\"True\",\"False\"]",
        "correct_answer_json": "\"False\"",
        "explanation": "Eclipse ADT communicates with the SAP Application Server via RFC/REST backend endpoints. All compilation and activation occurs on the SAP server.",
        "difficulty": "easy",
        "topic": "Architecture"
      },
      {
        "id": "q-fnd-103",
        "quiz_id": "quiz-fnd-1",
        "question_type": "multiple_choice",
        "question": "Which package prefix in SAP ABAP is designated for local, non-transportable sandbox objects?",
        "options_json": "[\"$TMP\",\"ZLOCAL\",\"YDEV\",\"$PROD\"]",
        "correct_answer_json": "\"$TMP\"",
        "explanation": "Objects created in $TMP (or any subpackage starting with $) are local and not recorded in transport requests.",
        "difficulty": "easy",
        "topic": "Packages & Transports"
      },
      {
        "id": "q-fnd-104",
        "quiz_id": "quiz-fnd-1",
        "question_type": "multiple_select",
        "question": "Which layers comprise the classic 3-tier SAP client-server architecture?",
        "options_json": "[\"Presentation Layer (SAP GUI / Web Browser)\",\"Application Layer (ABAP Application Server)\",\"Database Layer (SAP HANA / AnyDB)\",\"Microservice Orchestration Layer\"]",
        "correct_answer_json": "[\"Presentation Layer (SAP GUI / Web Browser)\",\"Application Layer (ABAP Application Server)\",\"Database Layer (SAP HANA / AnyDB)\"]",
        "explanation": "The classic SAP architecture consists strictly of Presentation, Application, and Database layers.",
        "difficulty": "medium",
        "topic": "Architecture"
      },
      {
        "id": "q-fnd-105",
        "quiz_id": "quiz-fnd-1",
        "question_type": "scenario_based",
        "question": "A developer activates an ABAP class in ADT and receives a syntax error in the Problems tab. What is the status of the previously active runtime version on the server?",
        "options_json": "[\"The class is deleted until fixed\",\"The previously active runtime version remains executable while the inactive draft contains the error\",\"The application server crashes\",\"All database access is locked\"]",
        "correct_answer_json": "\"The previously active runtime version remains executable while the inactive draft contains the error\"",
        "explanation": "ABAP maintains active and inactive object states. Runtime execution continues using the last successfully activated state until the new version activates cleanly.",
        "difficulty": "medium",
        "topic": "ADT Workflow"
      }
    ]
  },
  {
    "id": "quiz-fnd-2",
    "lesson_id": "les-fnd-02",
    "module_id": "mod-fnd-2",
    "title": "Elementary Types, Structures & Operators",
    "description": "Test your understanding of elementary types, packed numbers, structure work areas, and modern string templates.",
    "mode": "practice",
    "passing_score": 80,
    "questions": [
      {
        "id": "q-fnd-201",
        "quiz_id": "quiz-fnd-2",
        "question_type": "multiple_choice",
        "question": "Which elementary data type is mandatory for accurate currency and monetary calculations in ABAP?",
        "options_json": "[\"Type F (Floating Point)\",\"Type P (Packed Decimal)\",\"Type I (4-byte Integer)\",\"Type C (Character)\"]",
        "correct_answer_json": "\"Type P (Packed Decimal)\"",
        "explanation": "Type P represents binary-coded decimal numbers, avoiding IEEE-754 floating-point rounding errors in commercial transactions.",
        "difficulty": "easy",
        "topic": "Data Types"
      },
      {
        "id": "q-fnd-202",
        "quiz_id": "quiz-fnd-2",
        "question_type": "output_prediction",
        "question": "What is the exact output of this ABAP code snippet?\\n\\nDATA(lv_num) = 15.\\nDATA(lv_text) = |Item #{ lv_num WIDTH = 4 PAD = \"0\" }|.\\nWRITE: / lv_text.",
        "options_json": "[\"Item #15\",\"Item #0015\",\"Item #1500\",\"Item # 15\"]",
        "correct_answer_json": "\"Item #0015\"",
        "explanation": "String template formatting options WIDTH = 4 and PAD = \"0\" left-pad the two-digit integer 15 into four characters: 0015.",
        "difficulty": "medium",
        "topic": "String Templates"
      },
      {
        "id": "q-fnd-203",
        "quiz_id": "quiz-fnd-2",
        "question_type": "find_error",
        "question": "Identify the error in this statement: DATA lv_price TYPE p VALUE '129.99'.",
        "options_json": "[\"Type P variables cannot use single quotes for initial values\",\"Type P requires explicit DECIMALS declaration to store fractional values; otherwise decimals are truncated\",\"Variable name cannot start with lv_\",\"VALUE keyword cannot be used with TYPE P\"]",
        "correct_answer_json": "\"Type P requires explicit DECIMALS declaration to store fractional values; otherwise decimals are truncated\"",
        "explanation": "Without DECIMALS n, TYPE P defaults to 0 decimal places, so '129.99' would be stored as 130 or 129.",
        "difficulty": "medium",
        "topic": "Data Types"
      },
      {
        "id": "q-fnd-204",
        "quiz_id": "quiz-fnd-2",
        "question_type": "multiple_choice",
        "question": "How do you access component \"amount\" in work area structure \"ls_order\"?",
        "options_json": "[\"ls_order.amount\",\"ls_order->amount\",\"ls_order-amount\",\"ls_order::amount\"]",
        "correct_answer_json": "\"ls_order-amount\"",
        "explanation": "ABAP uses the hyphen (-) for structure component access. The arrow (->) is reserved for object instance dereferencing.",
        "difficulty": "easy",
        "topic": "Structures"
      },
      {
        "id": "q-fnd-205",
        "quiz_id": "quiz-fnd-2",
        "question_type": "multiple_choice",
        "question": "What does the modern constructor expression CORRESPONDING #( ... ) do?",
        "options_json": "[\"Compares two tables for identity\",\"Copies fields with matching names between different structures\",\"Creates a foreign key constraint\",\"Translates text between languages\"]",
        "correct_answer_json": "\"Copies fields with matching names between different structures\"",
        "explanation": "CORRESPONDING #( ... ) copies components between structures or tables based on matching component names.",
        "difficulty": "easy",
        "topic": "Constructor Operators"
      }
    ]
  },
  {
    "id": "quiz-fnd-3",
    "lesson_id": "les-fnd-04",
    "module_id": "mod-fnd-4",
    "title": "Internal Tables & Table Expressions",
    "description": "Assess your mastery of internal table categories, search complexities, secondary keys, and table expressions.",
    "mode": "assessment",
    "passing_score": 80,
    "questions": [
      {
        "id": "q-fnd-301",
        "quiz_id": "quiz-fnd-3",
        "question_type": "multiple_choice",
        "question": "Which internal table category supports O(1) constant-time key lookups regardless of row count?",
        "options_json": "[\"Standard Table\",\"Sorted Table\",\"Hashed Table\",\"Binary Table\"]",
        "correct_answer_json": "\"Hashed Table\"",
        "explanation": "Hashed tables compute a memory address via hashing algorithms, providing O(1) lookup times across millions of records.",
        "difficulty": "easy",
        "topic": "Internal Tables"
      },
      {
        "id": "q-fnd-302",
        "quiz_id": "quiz-fnd-3",
        "question_type": "output_prediction",
        "question": "What happens if a table expression lt_data[ id = 999 ] does not find a match?",
        "options_json": "[\"Returns initial value 0\",\"Sets sy-subrc to 4 and continues\",\"Throws uncaught exception CX_SY_ITAB_LINE_NOT_FOUND\",\"Returns a null reference\"]",
        "correct_answer_json": "\"Throws uncaught exception CX_SY_ITAB_LINE_NOT_FOUND\"",
        "explanation": "Table expressions raise CX_SY_ITAB_LINE_NOT_FOUND if the row is absent. Use VALUE #( lt_data[ id = 999 ] OPTIONAL ) to avoid runtime dumps.",
        "difficulty": "medium",
        "topic": "Table Expressions"
      },
      {
        "id": "q-fnd-303",
        "quiz_id": "quiz-fnd-3",
        "question_type": "multiple_choice",
        "question": "Which system field contains the current table index during a LOOP AT ... INTO iteration?",
        "options_json": "[\"sy-index\",\"sy-tabix\",\"sy-subrc\",\"sy-dbcnt\"]",
        "correct_answer_json": "\"sy-tabix\"",
        "explanation": "sy-tabix tracks the table index in loops. sy-index tracks DO and WHILE loop iterations.",
        "difficulty": "easy",
        "topic": "System Fields"
      },
      {
        "id": "q-fnd-304",
        "quiz_id": "quiz-fnd-3",
        "question_type": "multiple_select",
        "question": "Which statements are true regarding SORTED internal tables?",
        "options_json": "[\"Rows are always maintained in ascending or descending sorted order by their key\",\"APPEND statement will dump if the appended row violates the sort order\",\"INSERT statement automatically places the entry into its correct sorted position\",\"They cannot have duplicate key entries under any circumstances\"]",
        "correct_answer_json": "[\"Rows are always maintained in ascending or descending sorted order by their key\",\"APPEND statement will dump if the appended row violates the sort order\",\"INSERT statement automatically places the entry into its correct sorted position\"]",
        "explanation": "Sorted tables CAN have duplicate keys if declared WITH NON-UNIQUE KEY. INSERT places the row in sorted order; APPEND dumps if out of sequence.",
        "difficulty": "hard",
        "topic": "Sorted Tables"
      },
      {
        "id": "q-fnd-305",
        "quiz_id": "quiz-fnd-3",
        "question_type": "scenario_based",
        "question": "A batch program loops through 500,000 records, executing READ TABLE on an auxiliary standard table inside the loop. The job runs for 4 hours. How should this be optimized?",
        "options_json": "[\"Convert the auxiliary table into a HASHED TABLE with unique key, reducing lookup from O(N) to O(1)\",\"Change the DO loop to WHILE\",\"Run the program only at night\",\"Use WRITE statements inside the loop\"]",
        "correct_answer_json": "\"Convert the auxiliary table into a HASHED TABLE with unique key, reducing lookup from O(N) to O(1)\"",
        "explanation": "A nested O(N) lookup on a standard table produces O(N^2) quadratic complexity. Converting to a Hashed table transforms performance to linear O(N).",
        "difficulty": "medium",
        "topic": "Performance"
      }
    ]
  },
  {
    "id": "quiz-oop-1",
    "lesson_id": "les-oop-01",
    "module_id": "mod-oop-1",
    "title": "Object-Oriented ABAP, Classes & Interfaces",
    "description": "Examine your grasp of classes, constructors, instance vs static members, interfaces, and polymorphism.",
    "mode": "assessment",
    "passing_score": 80,
    "questions": [
      {
        "id": "q-oop-101",
        "quiz_id": "quiz-oop-1",
        "question_type": "multiple_choice",
        "question": "Which method signature allows a method to be evaluated directly within expressions?",
        "options_json": "[\"EXPORTING parameter only\",\"RETURNING VALUE(r) parameter with optional IMPORTING parameters\",\"CHANGING parameter only\",\"EXCEPTIONS declaration\"]",
        "correct_answer_json": "\"RETURNING VALUE(r) parameter with optional IMPORTING parameters\"",
        "explanation": "Functional methods have a RETURNING VALUE parameter, allowing them to be invoked inline on the right-hand side of assignments.",
        "difficulty": "easy",
        "topic": "OOP ABAP"
      },
      {
        "id": "q-oop-102",
        "quiz_id": "quiz-oop-1",
        "question_type": "multiple_choice",
        "question": "When is the static constructor CLASS_CONSTRUCTOR executed for an ABAP class?",
        "options_json": "[\"Every time CREATE OBJECT or NEW is invoked\",\"Exactly once when the class is first accessed in the user session\",\"When the user logs off\",\"Whenever an interface method is called\"]",
        "correct_answer_json": "\"Exactly once when the class is first accessed in the user session\"",
        "explanation": "CLASS_CONSTRUCTOR executes exactly once before any component of the class is accessed for the first time.",
        "difficulty": "medium",
        "topic": "Constructors"
      },
      {
        "id": "q-oop-103",
        "quiz_id": "quiz-oop-1",
        "question_type": "multiple_choice",
        "question": "How do you call an interface method if_logger~log from outside an instance lo_app?",
        "options_json": "[\"lo_app->if_logger.log( )\",\"lo_app->if_logger~log( )\",\"lo_app::if_logger->log( )\",\"CALL if_logger OF lo_app\"]",
        "correct_answer_json": "\"lo_app->if_logger~log( )\"",
        "explanation": "The tilde (~) operator references components belonging to an interface on the object instance.",
        "difficulty": "easy",
        "topic": "Interfaces"
      },
      {
        "id": "q-oop-104",
        "quiz_id": "quiz-oop-1",
        "question_type": "output_prediction",
        "question": "What runtime error occurs if a widening cast (down-cast) lo_child ?= lo_parent fails because the object is not an instance of the child class?",
        "options_json": "[\"CX_SY_REF_IS_INITIAL\",\"CX_SY_MOVE_CAST_ERROR\",\"CX_SY_ZERODIVIDE\",\"CX_SY_ITAB_DUPLICATE_KEY\"]",
        "correct_answer_json": "\"CX_SY_MOVE_CAST_ERROR\"",
        "explanation": "Failing ?= casting raises CX_SY_MOVE_CAST_ERROR, which can be intercepted using TRY ... CATCH.",
        "difficulty": "medium",
        "topic": "Casting & Polymorphism"
      },
      {
        "id": "q-oop-105",
        "quiz_id": "quiz-oop-1",
        "question_type": "true_false",
        "question": "A subclass can directly access and modify the PRIVATE attributes of its superclass.",
        "options_json": "[\"True\",\"False\"]",
        "correct_answer_json": "\"False\"",
        "explanation": "Private attributes are strictly accessible only within the declaring class. Subclasses must use PROTECTED or PUBLIC members.",
        "difficulty": "easy",
        "topic": "Visibility"
      }
    ]
  },
  {
    "id": "quiz-data-1",
    "lesson_id": "les-data-01",
    "module_id": "mod-data-1",
    "title": "Open SQL, Modern Expressions & CDS View Entities",
    "description": "Verify your proficiency in modern Open SQL syntax, CDS view entities, associations, and constructor operators.",
    "mode": "assessment",
    "passing_score": 80,
    "questions": [
      {
        "id": "q-data-101",
        "quiz_id": "quiz-data-1",
        "question_type": "code_completion",
        "question": "In modern ABAP Open SQL, complete the clause to escape the host variable lv_carrier:\\n\\nSELECT FROM /dmo/flight FIELDS connection_id WHERE carrier_id = _____",
        "options_json": "[\":lv_carrier\",\"@lv_carrier\",\"$lv_carrier\",\"#lv_carrier\"]",
        "correct_answer_json": "\"@lv_carrier\"",
        "explanation": "The @ character escapes host variables in ABAP SQL statements, distinguishing them from database table columns.",
        "difficulty": "easy",
        "topic": "Open SQL"
      },
      {
        "id": "q-data-102",
        "quiz_id": "quiz-data-1",
        "question_type": "multiple_choice",
        "question": "What is the primary operational advantage of a CDS Association over a standard SQL JOIN?",
        "options_json": "[\"Associations encrypt database data in transit\",\"Associations are on-demand: they only generate an SQL join when consumer queries select fields from the target entity\",\"Associations work only on flat files\",\"Associations cannot be used with CDS views\"]",
        "correct_answer_json": "\"Associations are on-demand: they only generate an SQL join when consumer queries select fields from the target entity\"",
        "explanation": "Associations represent lazy-load relationships, preventing unnecessary database joins when target attributes are not requested.",
        "difficulty": "medium",
        "topic": "CDS Associations"
      },
      {
        "id": "q-data-103",
        "quiz_id": "quiz-data-1",
        "question_type": "multiple_choice",
        "question": "Which constructor operator collapses an internal table into a single aggregated scalar value?",
        "options_json": "[\"FILTER\",\"REDUCE\",\"CORRESPONDING\",\"EXACT\"]",
        "correct_answer_json": "\"REDUCE\"",
        "explanation": "REDUCE folds table rows into a cumulative result (like sum or concatenated text) without procedural loops.",
        "difficulty": "medium",
        "topic": "Constructor Operators"
      },
      {
        "id": "q-data-104",
        "quiz_id": "quiz-data-1",
        "question_type": "find_error",
        "question": "Identify the flaw in this modern SQL statement:\\n\\nSELECT carrier_id, connection_id FROM /dmo/flight INTO TABLE @lt_flights WHERE carrier_id = @lv_carrier.",
        "options_json": "[\"The fields must be comma-separated, but in modern ABAP SQL without FIELDS clause or comma list, syntax rules require commas and @ escaping throughout\",\"Table /dmo/flight cannot be queried\",\"WHERE clause cannot use @\",\"INTO TABLE must be at the end of the statement in modern ABAP SQL syntax\"]",
        "correct_answer_json": "\"INTO TABLE must be at the end of the statement in modern ABAP SQL syntax\"",
        "explanation": "In strict modern ABAP SQL, the INTO clause must appear at the end of the SELECT statement (or after WHERE/GROUP BY).",
        "difficulty": "hard",
        "topic": "Open SQL Strict Syntax"
      },
      {
        "id": "q-data-105",
        "quiz_id": "quiz-data-1",
        "question_type": "true_false",
        "question": "CDS View Entities require an @AbapCatalog.sqlViewName annotation that generates an SQL View in DDIC (SE11).",
        "options_json": "[\"True\",\"False\"]",
        "correct_answer_json": "\"False\"",
        "explanation": "CDS View Entities (define view entity) do NOT generate an SQL View in DDIC. Classic CDS views (define view) did.",
        "difficulty": "medium",
        "topic": "CDS View Entities"
      }
    ]
  },
  {
    "id": "quiz-rap-1",
    "lesson_id": "les-rap-01",
    "module_id": "mod-rap-1",
    "title": "SAP RAP, Behavior Definitions & EML",
    "description": "Test your understanding of RAP architecture, Behavior Definitions (BDEF), validations, determinations, actions, and EML.",
    "mode": "assessment",
    "passing_score": 80,
    "questions": [
      {
        "id": "q-rap-101",
        "quiz_id": "quiz-rap-1",
        "question_type": "multiple_choice",
        "question": "What is the role of a Behavior Definition (BDEF) in the ABAP RESTful Application Programming Model (RAP)?",
        "options_json": "[\"It designs UI screens in SAP GUI\",\"It specifies transactional capabilities (CRUD, actions, validations, determinations) for a CDS data model\",\"It defines database table indexes\",\"It replaces transport requests\"]",
        "correct_answer_json": "\"It specifies transactional capabilities (CRUD, actions, validations, determinations) for a CDS data model\"",
        "explanation": "BDEF defines the transactional contract for business objects: which operations are managed, validations to execute, and actions available.",
        "difficulty": "easy",
        "topic": "RAP Architecture"
      },
      {
        "id": "q-rap-102",
        "quiz_id": "quiz-rap-1",
        "question_type": "multiple_choice",
        "question": "Which EML statement executes modifications on RAP business objects?",
        "options_json": "[\"MODIFY ENTITIES\",\"UPDATE RAP\",\"EXECUTE ENTITY\",\"CHANGE OBJECTS\"]",
        "correct_answer_json": "\"MODIFY ENTITIES\"",
        "explanation": "EML uses MODIFY ENTITIES to create, update, delete, or invoke actions on RAP business objects.",
        "difficulty": "easy",
        "topic": "EML Syntax"
      },
      {
        "id": "q-rap-103",
        "quiz_id": "quiz-rap-1",
        "question_type": "multiple_choice",
        "question": "What is the key functional difference between a RAP Validation and a RAP Determination?",
        "options_json": "[\"Determinations are for UI styling; Validations are for database tables\",\"Validations are read-only checks that veto invalid saves; Determinations compute and modify entity values automatically\",\"Validations run only in test environments\",\"Determinations cannot modify draft entities\"]",
        "correct_answer_json": "\"Validations are read-only checks that veto invalid saves; Determinations compute and modify entity values automatically\"",
        "explanation": "Validations evaluate business rules on save and return messages without altering state. Determinations derive and assign field values.",
        "difficulty": "medium",
        "topic": "RAP Logic"
      },
      {
        "id": "q-rap-104",
        "quiz_id": "quiz-rap-1",
        "question_type": "scenario_based",
        "question": "A developer defines an action \"acceptBooking\" in BDEF. How is this action triggered from an ABAP test program?",
        "options_json": "[\"CALL TRANSACTION 'ACCEPT'\",\"MODIFY ENTITIES OF zi_travel_m ENTITY Booking EXECUTE acceptBooking FROM VALUE #( ... )\",\"EXECUTE SQL \\\"UPDATE booking SET status = 'A'\\\"\",\"SUBMIT r_accept_booking\"]",
        "correct_answer_json": "\"MODIFY ENTITIES OF zi_travel_m ENTITY Booking EXECUTE acceptBooking FROM VALUE #( ... )\"",
        "explanation": "EML provides the EXECUTE clause on MODIFY ENTITIES to trigger custom business actions.",
        "difficulty": "medium",
        "topic": "EML Actions"
      },
      {
        "id": "q-rap-105",
        "quiz_id": "quiz-rap-1",
        "question_type": "multiple_select",
        "question": "Which steps are mandatory to expose a RAP entity to a Fiori Elements UI application?",
        "options_json": "[\"Create a Service Definition exposing the root and child entities\",\"Create a Service Binding with binding type OData V4 - UI\",\"Publish the Service Binding in ADT\",\"Write a custom dynpro screen in SE51\"]",
        "correct_answer_json": "[\"Create a Service Definition exposing the root and child entities\",\"Create a Service Binding with binding type OData V4 - UI\",\"Publish the Service Binding in ADT\"]",
        "explanation": "Fiori Elements connects via OData V4 UI service bindings generated from service definitions, eliminating dynpro screens entirely.",
        "difficulty": "hard",
        "topic": "Service Exposure"
      }
    ]
  },
  {
    "id": "quiz-adv-1",
    "lesson_id": "les-adv-01",
    "module_id": "mod-adv-1",
    "title": "ABAP Unit Testing, Security & Performance Profiling",
    "description": "Assess advanced testing practices, test doubles, SQL tracing (ST05), Clean ABAP, and authorization enforcement.",
    "mode": "assessment",
    "passing_score": 80,
    "questions": [
      {
        "id": "q-adv-101",
        "quiz_id": "quiz-adv-1",
        "question_type": "multiple_choice",
        "question": "Which class provides assertion methods (assert_equals, assert_initial, assert_true) in ABAP Unit tests?",
        "options_json": "[\"cl_abap_unit_assert\",\"cl_test_checker\",\"cl_assert_verify\",\"cx_unit_exception\"]",
        "correct_answer_json": "\"cl_abap_unit_assert\"",
        "explanation": "cl_abap_unit_assert contains standard assertion methods that signal unit test passes or failures.",
        "difficulty": "easy",
        "topic": "Unit Testing"
      },
      {
        "id": "q-adv-102",
        "quiz_id": "quiz-adv-1",
        "question_type": "multiple_choice",
        "question": "Which transaction is the primary tool for tracing and analyzing database SQL execution times and roundtrips?",
        "options_json": "[\"ST05\",\"SE38\",\"SM50\",\"AL08\"]",
        "correct_answer_json": "\"ST05\"",
        "explanation": "ST05 (Performance Analysis) traces SQL statements, duration in microseconds, and database index choices.",
        "difficulty": "easy",
        "topic": "Performance"
      },
      {
        "id": "q-adv-103",
        "quiz_id": "quiz-adv-1",
        "question_type": "scenario_based",
        "question": "An ABAP Unit test class executes database updates against real tables in the development system. Why is this a violation of unit testing principles?",
        "options_json": "[\"Unit tests must execute without side effects and be completely decoupled from database state using test doubles or mocks\",\"Database updates are too fast for unit tests\",\"SAP HANA does not support unit tests\",\"Unit tests only test user interfaces\"]",
        "correct_answer_json": "\"Unit tests must execute without side effects and be completely decoupled from database state using test doubles or mocks\"",
        "explanation": "Unit tests must be repeatable, harmless, fast, and isolated. Direct database changes cause flaky tests and dirty system state.",
        "difficulty": "medium",
        "topic": "Unit Testing Isolation"
      },
      {
        "id": "q-adv-104",
        "quiz_id": "quiz-adv-1",
        "question_type": "multiple_choice",
        "question": "How is row-level data access authorization enforced in CDS View Entities?",
        "options_json": "[\"AUTHORITY-CHECK OBJECT inside Open SQL queries\",\"DCL (Data Control Language) roles defined via DEFINE ROLE\",\"Hardcoded user checks in class constructors\",\"Client-side JavaScript tokens\"]",
        "correct_answer_json": "\"DCL (Data Control Language) roles defined via DEFINE ROLE\"",
        "explanation": "DCL access controls filter CDS entities automatically at the database level according to user authorizations.",
        "difficulty": "medium",
        "topic": "Security & Authorizations"
      },
      {
        "id": "q-adv-105",
        "quiz_id": "quiz-adv-1",
        "question_type": "true_false",
        "question": "According to Clean ABAP guidelines, you should prefer returning multiple EXPORTING parameters over returning an object, structure, or functional method with RETURNING.",
        "options_json": "[\"True\",\"False\"]",
        "correct_answer_json": "\"False\"",
        "explanation": "Clean ABAP strongly advocates functional methods with a single RETURNING parameter or clean composite structures over multiple EXPORTING parameters.",
        "difficulty": "easy",
        "topic": "Clean ABAP"
      }
    ]
  }
];

export const SEED_FLASHCARDS = [
  {
    "id": "fc-01",
    "category": "System Fields",
    "front": "What does SY-SUBRC = 4 signify after a database or table operation?",
    "back": "SY-SUBRC = 4 indicates that the searched entry or condition was NOT found, or that an authorization check failed.",
    "code_snippet": "READ TABLE lt_items INTO ls_item WITH KEY id = lv_id.\nIF sy-subrc = 0.\n  \" Entry found\nELSEIF sy-subrc = 4.\n  \" Entry not found\nENDIF.",
    "explanation": "0 indicates success, 4 indicates not found / failed condition, 8 or higher indicates critical syntax or runtime failure.",
    "mnemonic": "SUBRC: Subroutine Return Code (0 = OK, 4 = Not Found)",
    "difficulty": "easy"
  },
  {
    "id": "fc-02",
    "category": "Syntax & Escaping",
    "front": "Why must host variables in modern Open SQL statements be prefixed with @?",
    "back": "The @ symbol distinguishes ABAP host program variables from database column identifiers, avoiding naming conflicts.",
    "code_snippet": "SELECT FROM /dmo/flight\n  FIELDS carrier_id, connection_id\n  WHERE carrier_id = @lv_carrier\n  INTO TABLE @DATA(lt_flights).",
    "explanation": "Introduced in ABAP 7.40 SP05, @ tells the SQL compiler that the variable resides in ABAP application server memory.",
    "mnemonic": "@ indicates \"At my ABAP application variable\"",
    "difficulty": "easy"
  },
  {
    "id": "fc-03",
    "category": "Internal Tables",
    "front": "Compare the lookup performance of Standard vs Sorted vs Hashed tables by primary key.",
    "back": "Standard: O(N) linear search. Sorted: O(log N) binary search. Hashed: O(1) constant time hash algorithm.",
    "code_snippet": "DATA lt_std  TYPE STANDARD TABLE OF ty_row WITH NON-UNIQUE KEY id.\nDATA lt_sort TYPE SORTED TABLE OF ty_row WITH UNIQUE KEY id.\nDATA lt_hash TYPE HASHED TABLE OF ty_row WITH UNIQUE KEY id.",
    "explanation": "Hashed tables provide O(1) single-record read performance regardless of whether the table contains 10 rows or 1,000,000 rows.",
    "mnemonic": "SSH: Standard (Slow/Sequential), Sorted (Splitting binary), Hashed (Hot O(1) direct)",
    "difficulty": "medium"
  },
  {
    "id": "fc-04",
    "category": "OOP Principles",
    "front": "What is the difference between PROTECTED and PRIVATE visibility sections in an ABAP class?",
    "back": "PRIVATE components are only visible within the declaring class itself. PROTECTED components are visible in the class and all its subclasses.",
    "code_snippet": "CLASS lcl_parent DEFINITION.\n  PROTECTED SECTION.\n    DATA mv_shared TYPE string.\n  PRIVATE SECTION.\n    DATA mv_secret TYPE string.\nENDCLASS.",
    "explanation": "Subclasses inherit protected attributes and can override protected methods, but have zero access to private components.",
    "mnemonic": "PRIVATE = Self only. PROTECTED = Family (subclasses) included.",
    "difficulty": "easy"
  },
  {
    "id": "fc-05",
    "category": "CDS & RAP",
    "front": "What is Entity Manipulation Language (EML) and when is it utilized?",
    "back": "EML is an ABAP language extension for executing transactional CRUD operations (READ, MODIFY, COMMIT) on RAP Business Objects.",
    "code_snippet": "MODIFY ENTITIES OF zi_travel_m\n  ENTITY Travel\n  UPDATE FIELDS ( BookingFee )\n  WITH VALUE #( ( %tky = ls_key BookingFee = 50 ) )\n  FAILED DATA(lt_failed)\n  REPORTED DATA(lt_reported).",
    "explanation": "EML decouples consumers from internal database tables, directing calls through the RAP transactional runtime buffer.",
    "mnemonic": "EML = Entity Manipulation Language for RAP",
    "difficulty": "medium"
  },
  {
    "id": "fc-06",
    "category": "CDS Architecture",
    "front": "What is the architectural difference between a CDS View Entity and a classic DDIC-based CDS View?",
    "back": "CDS View Entities compile without generating an SQL View artifact in DDIC (SE11), offering faster activation, strict typing, and zero SQL-view name limitations.",
    "code_snippet": "@AccessControl.authorizationCheck: #NOT_REQUIRED\ndefine view entity ZI_Customer as select from /dmo/customer {\n  key customer_id,\n      first_name,\n      last_name\n}",
    "explanation": "Classic views required @AbapCatalog.sqlViewName which created an extra DDIC database view. View Entities eliminate this overhead.",
    "mnemonic": "View Entity = Pure HANA CDS (No DDIC SQL View shadow)",
    "difficulty": "medium"
  },
  {
    "id": "fc-07",
    "category": "System Fields",
    "front": "What is the purpose of SY-TABIX in ABAP?",
    "back": "SY-TABIX contains the 1-based index of the current table row during LOOP AT iterations, or after a successful READ TABLE.",
    "code_snippet": "LOOP AT lt_orders INTO ls_order.\n  WRITE: / |Processing row { sy-tabix } of { lines( lt_orders ) }|.\nENDLOOP.",
    "explanation": "In hashed tables without index, sy-tabix is 0. In sorted or standard tables, it reflects the ordinal position.",
    "mnemonic": "TABIX = TABle IndeX",
    "difficulty": "easy"
  },
  {
    "id": "fc-08",
    "category": "Modern Syntax",
    "front": "How does the constructor expression VALUE #( ... ) initialize structures and tables?",
    "back": "VALUE #( ... ) dynamically infers the target type from context, constructing structure rows or populating table lines inline.",
    "code_snippet": "DATA(ls_cust) = VALUE ty_cust( id = 'C01' name = 'Alpha' ).\nDATA(lt_nums) = VALUE string_table( ( 'A' ) ( 'B' ) ( 'C' ) ).",
    "explanation": "The hash (#) symbol directs the compiler to deduce the operand type from the receiving target variable.",
    "mnemonic": "VALUE # = \"Infer type and populate value\"",
    "difficulty": "easy"
  },
  {
    "id": "fc-09",
    "category": "Modern Syntax",
    "front": "What does the CORRESPONDING #( ... ) operator accomplish?",
    "back": "It copies values between identical field names in two different structures or internal tables, replacing MOVE-CORRESPONDING.",
    "code_snippet": "DATA ls_target TYPE ty_target.\nls_target = CORRESPONDING #( ls_source ).\n\n\" With mapping:\nls_target = CORRESPONDING #( ls_source MAPPING dest_id = src_id ).",
    "explanation": "CORRESPONDING supports deep copying, BASE preservation, and explicit MAPPING or EXCEPT clauses.",
    "mnemonic": "CORRESPONDING = Match and copy by identical component names",
    "difficulty": "medium"
  },
  {
    "id": "fc-10",
    "category": "Modern Syntax",
    "front": "What is the purpose of COND #( ... ) and SWITCH #( ... ) expressions?",
    "back": "They evaluate expressions conditionally inline, returning a value based on Boolean conditions (COND) or matching values (SWITCH).",
    "code_snippet": "DATA(lv_tier) = COND string(\n  WHEN iv_points > 1000 THEN 'Platinum'\n  WHEN iv_points > 500  THEN 'Gold'\n  ELSE 'Standard' ).",
    "explanation": "Eliminates repetitive procedural IF-ELSE statements when assigning a single variable.",
    "mnemonic": "COND = Inline IF. SWITCH = Inline CASE.",
    "difficulty": "medium"
  },
  {
    "id": "fc-11",
    "category": "Internal Tables",
    "front": "How do Table Expressions lt_tab[ key = val ] behave when no record matches?",
    "back": "Table expressions raise the catchable exception CX_SY_ITAB_LINE_NOT_FOUND, unless guarded with OPTIONAL or DEFAULT.",
    "code_snippet": "\" Unsafe:\nDATA(ls_row) = lt_tab[ id = '999' ].\n\n\" Safe:\nDATA(ls_safe) = VALUE #( lt_tab[ id = '999' ] OPTIONAL ).",
    "explanation": "Always use VALUE #( ... OPTIONAL ) or line_exists( ... ) to prevent uncaught runtime dumps.",
    "mnemonic": "Brackets [] without OPTIONAL explode on missing key!",
    "difficulty": "medium"
  },
  {
    "id": "fc-12",
    "category": "Clean ABAP",
    "front": "What is the Clean ABAP rule regarding method length and nesting depth?",
    "back": "Methods should do one thing, be 3 to 20 lines long, and never exceed a nesting depth of 2 to 3 indent levels.",
    "code_snippet": "\" Clean:\nMETHOD process_order.\n  validate_order( ).\n  calculate_taxes( ).\n  persist_order( ).\nENDMETHOD.",
    "explanation": "Deep nesting (5+ IF/LOOP blocks) creates cognitive overload and untestable cyclomatic complexity.",
    "mnemonic": "Small Methods = Single Responsibility",
    "difficulty": "easy"
  },
  {
    "id": "fc-13",
    "category": "OOP Principles",
    "front": "What is the difference between casting operators ?= (Casting) and = (Assignment)?",
    "back": "The assignment operator = performs narrowing casting (up-cast, safe). The ?= operator performs widening casting (down-cast, checked at runtime).",
    "code_snippet": "DATA lo_parent TYPE REF TO lcl_parent.\nDATA lo_child  TYPE REF TO lcl_child.\n\nlo_parent = lo_child.   \" Narrowing (upcast, always valid)\nlo_child ?= lo_parent.  \" Widening (downcast, throws CX_SY_MOVE_CAST_ERROR if invalid)",
    "explanation": "A downcast must be validated at runtime to verify the referenced instance actually belongs to the subclass.",
    "mnemonic": "?= means \"Question mark: Is this instance really what I claim?\"",
    "difficulty": "hard"
  },
  {
    "id": "fc-14",
    "category": "Testing & QA",
    "front": "Which test double framework in ABAP allows isolation from database dependencies?",
    "back": "The ABAP SQL Test Double Framework (cl_osql_test_environment) allows mocking database tables and CDS views in unit tests.",
    "code_snippet": "CLASS ltcl_test DEFINITION FOR TESTING DURATION SHORT RISK LEVEL HARMLESS.\n  PRIVATE SECTION.\n    CLASS-DATA mo_sql_env TYPE REF TO if_osql_test_environment.\n    CLASS-METHODS class_setup.\nENDCLASS.",
    "explanation": "Unit tests must never depend on real database rows or produce persistent side effects.",
    "mnemonic": "OSQL Test Environment = Sandbox database in RAM",
    "difficulty": "hard"
  },
  {
    "id": "fc-15",
    "category": "Performance",
    "front": "Why is SELECT * considered an anti-pattern in high-volume ABAP programs?",
    "back": "SELECT * fetches all table columns across the network from database to application server, wasting bandwidth and memory.",
    "code_snippet": "\" Anti-pattern:\nSELECT * FROM bseg INTO TABLE @DATA(lt_bseg).\n\n\" Best practice:\nSELECT FROM bseg FIELDS bukrs, belnr, gjahr, dmbtr INTO TABLE @DATA(lt_items).",
    "explanation": "Only fetch fields strictly needed for the business transaction. This leverages HANA column store memory compression.",
    "mnemonic": "Fetch only what you chew (Fields list > SELECT *)",
    "difficulty": "easy"
  },
  {
    "id": "fc-16",
    "category": "Performance",
    "front": "What transaction code is used to inspect SQL execution plans and trace database statements?",
    "back": "ST05 (Performance Analysis / SQL Trace) captures exact execution times, index usage, and database roundtrips.",
    "code_snippet": "\" Profile your Open SQL queries via ST05 to detect full table scans and redundant roundtrips.",
    "explanation": "ST05 trace details records read vs returned, duration in microseconds, and identical statement executions.",
    "mnemonic": "ST05 = SQL Trace",
    "difficulty": "medium"
  },
  {
    "id": "fc-17",
    "category": "CDS & RAP",
    "front": "What is the distinction between a RAP Validation and a RAP Determination?",
    "back": "Validations inspect entity data and reject saves if rules are violated (read-only checks). Determinations compute and modify entity values automatically.",
    "code_snippet": "\" Validation:\nvalidation validateDates on save { field BeginDate, EndDate; create; update; }\n\n\" Determination:\ndetermination calculateTotal on modify { field Price; }",
    "explanation": "Validations return failed / reported messages. Determinations update draft or active transactional data.",
    "mnemonic": "Validation = Verify & Veto. Determination = Derive & Decide.",
    "difficulty": "medium"
  },
  {
    "id": "fc-18",
    "category": "CDS Architecture",
    "front": "What is the purpose of a CDS Association compared to an Open SQL JOIN?",
    "back": "A CDS Association is an on-demand \"lazy join\": it only executes in SQL if consumer queries explicitly navigate its path.",
    "code_snippet": "define view entity ZI_Carrier as select from /dmo/carrier\n  association [0..*] to /dmo/flight as _Flights\n    on $projection.carrier_id = _Flights.carrier_id {\n  key carrier_id,\n      name,\n      _Flights\n}",
    "explanation": "Associations model semantic relationships between entities without enforcing performance-costly joins upfront.",
    "mnemonic": "Association = Joins on-demand (Lazy Loading)",
    "difficulty": "medium"
  },
  {
    "id": "fc-19",
    "category": "Modern Syntax",
    "front": "What does the REDUCE operator achieve in modern ABAP?",
    "back": "REDUCE iterates over an internal table, collapsing its rows into a single scalar value or structure accumulator.",
    "code_snippet": "DATA(lv_sum) = REDUCE i(\n  INIT x = 0\n  FOR row IN lt_items\n  NEXT x = x + row-amount ).",
    "explanation": "Replaces procedural LOOP AT with an inline functional fold/reduce accumulator.",
    "mnemonic": "REDUCE = Collapse table into single result",
    "difficulty": "hard"
  },
  {
    "id": "fc-20",
    "category": "Interfaces",
    "front": "How are interface components referenced in implementing ABAP classes?",
    "back": "Interface components are accessed using the compound interface name and tilde (~), e.g. if_printer~print.",
    "code_snippet": "CLASS lcl_report DEFINITION.\n  PUBLIC SECTION.\n    INTERFACES if_serializable_object.\n    INTERFACES if_oo_adt_classrun.\n    METHODS if_oo_adt_classrun~main REDEFINITION.\nENDCLASS.",
    "explanation": "The tilde (~) preserves interface namespace separation and prevents method name collisions in multiple interface implementations.",
    "mnemonic": "Interface~Method (Tilde connects interface to method)",
    "difficulty": "easy"
  },
  {
    "id": "fc-21",
    "category": "Security",
    "front": "How is authorization checking enforced in CDS View Entities?",
    "back": "Via Access Control DCL (Data Control Language) documents that bind to the CDS view entity using DEFINE ROLE.",
    "code_snippet": "@MappingRole: true\ndefine role Z_Travel_Auth {\n  grant select on ZI_Travel_M\n  where ( CurrencyCode ) = aspect pfcg_auth( S_TABU_DIS, ACTVT = '03' );\n}",
    "explanation": "DCL rules are automatically injected into the WHERE clause of generated SQL statements by the database interface.",
    "mnemonic": "DCL = Data Control Language for CDS security",
    "difficulty": "hard"
  },
  {
    "id": "fc-22",
    "category": "RAP & Services",
    "front": "What are the two components required to expose a RAP business object as an OData service?",
    "back": "1. Service Definition (defines which CDS entities to expose). 2. Service Binding (binds the definition to a protocol, e.g. OData V4 Web API or UI).",
    "code_snippet": "\" Service Definition:\ndefine service ZUI_TRAVEL_V4 {\n  expose ZI_Travel_M as Travel;\n  expose ZI_Booking_M as Booking;\n}",
    "explanation": "Service Bindings can be published for UI consumption (Fiori Elements) or Web API (A2X headless consumption).",
    "mnemonic": "Definition chooses what. Binding chooses how.",
    "difficulty": "medium"
  },
  {
    "id": "fc-23",
    "category": "System Fields",
    "front": "What does SY-DBCNT hold in ABAP?",
    "back": "SY-DBCNT contains the number of database table rows read, inserted, updated, or deleted by the most recently executed SQL statement.",
    "code_snippet": "UPDATE zorders SET status = 'C' WHERE status = 'P'.\nWRITE: / |Updated { sy-dbcnt } pending orders|.",
    "explanation": "Useful for logging batch operational metrics and verifying the exact row impact of modification queries.",
    "mnemonic": "DBCNT = DataBase CouNT",
    "difficulty": "easy"
  },
  {
    "id": "fc-24",
    "category": "OOP Principles",
    "front": "What is a Singleton pattern in ABAP and how is it implemented?",
    "back": "A Singleton guarantees only one instance exists. Implement with CREATE PRIVATE in class definition and a static method get_instance.",
    "code_snippet": "CLASS lcl_app DEFINITION CREATE PRIVATE.\n  PUBLIC SECTION.\n    CLASS-METHODS get_instance RETURNING VALUE(ro_inst) TYPE REF TO lcl_app.\n  PRIVATE SECTION.\n    CLASS-DATA mo_instance TYPE REF TO lcl_app.\nENDCLASS.",
    "explanation": "Restricting object instantiation to private visibility forces all callers through the factory method.",
    "mnemonic": "CREATE PRIVATE + get_instance = Singleton",
    "difficulty": "medium"
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
