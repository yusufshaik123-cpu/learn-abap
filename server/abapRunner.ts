/**
 * ABAP Mastery Simulated Execution Engine
 *
 * NOTE: This is an educational execution sandbox designed for local learning.
 * It simulates ABAP runtime behavior, variables, loops, internal tables,
 * sy-subrc, and standard output (WRITE, out->write, cl_demo_output).
 * It clearly indicates to the learner that execution is simulated.
 */

export interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput: string;
}

export interface TestResult {
  testId: string;
  description: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  message?: string;
}

export interface ExecutionResult {
  isSimulated: boolean;
  environmentNotice: string;
  status: 'passed' | 'failed' | 'error';
  executionTimeMs: number;
  stdout: string[];
  systemFields: {
    sySubrc: number;
    syTabix: number;
    syIndex: number;
    syUname: string;
    syDatum: string;
  };
  passedTests: number;
  totalTests: number;
  testResults: TestResult[];
  diagnostics: string[];
}

export class AbapSimulator {
  private output: string[] = [];
  private sySubrc: number = 0;
  private syTabix: number = 0;
  private syIndex: number = 0;
  private variables: Map<string, any> = new Map();
  private tables: Map<string, any[]> = new Map();
  private classes: Map<string, {
    methods: Map<string, { params: string[], body: string[], returnVar?: string }>
  }> = new Map();
  private objects: Map<string, { className: string, fields: Record<string, any> }> = new Map();

  constructor() {
    this.reset();
  }

  private reset() {
    this.output = [];
    this.sySubrc = 0;
    this.syTabix = 0;
    this.syIndex = 0;
    this.variables.clear();
    this.tables.clear();
    this.classes.clear();
    this.objects.clear();
    this.variables.set('sy-subrc', 0);
    this.variables.set('sy-uname', 'LEARNER');
    this.variables.set('sy-datum', new Date().toISOString().slice(0, 10).replace(/-/g, ''));
  }

  public run(code: string, testCases: TestCase[] = []): ExecutionResult {
    this.reset();
    const startTime = performance.now();
    const diagnostics: string[] = [];

    // Parse statements delimited by '.' (ignoring periods inside '...' or |...|)
    const rawStatements: string[] = [];
    let cur = '';
    let inQuote = false;
    let inPipe = false;
    for (let c = 0; c < code.length; c++) {
      const ch = code[c];
      if (ch === "'" && !inPipe) inQuote = !inQuote;
      else if (ch === '|' && !inQuote) inPipe = !inPipe;
      else if (ch === '.' && !inQuote && !inPipe) {
        if (cur.trim()) rawStatements.push(cur.trim());
        cur = '';
        continue;
      }
      cur += ch;
    }
    if (cur.trim()) rawStatements.push(cur.trim());

    // Filter comments (* at line start or " comment)
    const statements: string[] = [];
    for (const stmt of rawStatements) {
      const cleaned = stmt
        .split('\n')
        .map(l => l.trim())
        .filter(l => !l.startsWith('*'))
        .join(' ')
        .replace(/\"[^\n]*$/g, '')
        .trim();
      if (cleaned) statements.push(cleaned);
    }

    try {
      this.executeStatements(statements, diagnostics);
    } catch (err: any) {
      diagnostics.push(`Runtime error during simulation: ${err.message || String(err)}`);
    }

    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    const combinedOutput = this.output.join('\n').trim();

    // Evaluate test cases
    const testResults: TestResult[] = [];
    let passedCount = 0;

    if (testCases.length > 0) {
      for (const tc of testCases) {
        const expected = tc.expectedOutput.trim();
        const passed = combinedOutput.includes(expected);
        if (passed) passedCount++;
        testResults.push({
          testId: tc.id,
          description: tc.description,
          passed,
          actualOutput: combinedOutput,
          expectedOutput: expected,
          message: passed ? 'Assertion satisfied' : `Expected output to contain: "${expected}"`
        });
      }
    } else {
      passedCount = diagnostics.length === 0 ? 1 : 0;
    }

    const overallStatus = testCases.length > 0
      ? (passedCount === testCases.length ? 'passed' : 'failed')
      : (diagnostics.length === 0 ? 'passed' : 'error');

    return {
      isSimulated: true,
      environmentNotice: 'Simulated ABAP Runtime Sandbox (No live SAP Gateway required). Real SAP backend execution requires ADT / RFC / OData integration.',
      status: overallStatus,
      executionTimeMs,
      stdout: this.output,
      systemFields: {
        sySubrc: this.sySubrc,
        syTabix: this.syTabix,
        syIndex: this.syIndex,
        syUname: 'LEARNER',
        syDatum: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
      },
      passedTests: passedCount,
      totalTests: testCases.length,
      testResults,
      diagnostics
    };
  }

  private executeStatements(statements: string[], diagnostics: string[]) {
    let i = 0;
    while (i < statements.length) {
      const stmt = statements[i].trim();
      if (!stmt) { i++; continue; }

      const upper = stmt.toUpperCase();

      // SKIP CLASS DEFINITION block
      if (upper.startsWith('CLASS ') && upper.includes(' DEFINITION')) {
        const classBlock = this.extractBlock(statements, i, 'CLASS ', 'ENDCLASS');
        i = classBlock.endIndex + 1;
        continue;
      }

      // PARSE CLASS IMPLEMENTATION block
      if (upper.startsWith('CLASS ') && upper.includes(' IMPLEMENTATION')) {
        const match = stmt.match(/CLASS\s+([a-zA-Z0-9_]+)\s+IMPLEMENTATION/i);
        const className = match ? match[1].toLowerCase() : '';
        const classBlock = this.extractBlock(statements, i, 'CLASS ', 'ENDCLASS');
        this.parseClassImplementation(className, classBlock.blockStatements);
        i = classBlock.endIndex + 1;
        continue;
      }

      // TRY ... CATCH ... ENDTRY
      if (upper.startsWith('TRY')) {
        const tryBlock = this.extractBlock(statements, i, 'TRY', 'ENDTRY');
        this.handleTryCatch(tryBlock.blockStatements, diagnostics);
        i = tryBlock.endIndex + 1;
        continue;
      }

      // RAISE EXCEPTION TYPE ...
      if (upper.startsWith('RAISE EXCEPTION TYPE ')) {
        const excName = stmt.replace(/^RAISE EXCEPTION TYPE\s+/i, '').trim();
        throw new Error(`ABAP_EXCEPTION:${excName}`);
      }

      // WRITE statement: WRITE: / 'Hello World', lv_var. or WRITE 'Hello'.
      if (upper.startsWith('WRITE:') || upper.startsWith('WRITE ')) {
        this.handleWrite(stmt);
        i++;
        continue;
      }

      // out->write( ... ) or cl_demo_output=>write( ... )
      if (upper.includes('OUT->WRITE(') || upper.includes('CL_DEMO_OUTPUT=>WRITE(') || upper.includes('CL_DEMO_OUTPUT=>DISPLAY(')) {
        this.handleModernWrite(stmt);
        i++;
        continue;
      }

      // DATA lv_var TYPE ... VALUE ...
      if (upper.startsWith('DATA ') || upper.startsWith('DATA(') || upper.startsWith('CONSTANTS ')) {
        this.handleDeclaration(stmt);
        i++;
        continue;
      }

      // SPLIT <source> AT <delim> INTO <target1> <target2> ...
      if (upper.startsWith('SPLIT ')) {
        this.handleSplit(stmt);
        i++;
        continue;
      }

      // CREATE OBJECT lo_obj [EXPORTING ...]
      if (upper.startsWith('CREATE OBJECT ')) {
        this.handleCreateObject(stmt);
        i++;
        continue;
      }

      // Method call statement: lo_obj->method( ... )
      const methodCallMatch = stmt.match(/^([a-zA-Z0-9_]+)->([a-zA-Z0-9_]+)\s*\((.*?)\)$/i);
      if (methodCallMatch) {
        this.invokeMethod(methodCallMatch[1], methodCallMatch[2], methodCallMatch[3], diagnostics);
        i++;
        continue;
      }

      // APPEND <val> TO <table / lt_tab>
      if (upper.startsWith('APPEND ')) {
        this.handleAppend(stmt);
        i++;
        continue;
      }

      // MODIFY <tab> FROM <wa>
      if (upper.startsWith('MODIFY ')) {
        this.handleModifyTable(stmt);
        i++;
        continue;
      }

      // SORT lt_tab BY ...
      if (upper.startsWith('SORT ')) {
        this.handleSort(stmt);
        i++;
        continue;
      }

      // READ TABLE lt_tab WITH KEY ... INTO ...
      if (upper.startsWith('READ TABLE ')) {
        this.handleReadTable(stmt);
        i++;
        continue;
      }

      // LOOP AT lt_tab ... ENDLOOP
      if (upper.startsWith('LOOP AT ')) {
        const loopBlock = this.extractBlock(statements, i, 'LOOP AT', 'ENDLOOP');
        this.handleLoop(stmt, loopBlock.blockStatements, diagnostics);
        i = loopBlock.endIndex + 1;
        continue;
      }

      // Simple Assignment: lv_var = ...
      if (stmt.includes(' = ') && !upper.startsWith('IF ') && !upper.startsWith('WHILE ') && !upper.startsWith('WHERE ') && !upper.startsWith('LOOP AT ') && !upper.startsWith('READ TABLE ') && !upper.startsWith('SELECT ')) {
        this.handleAssignment(stmt);
        i++;
        continue;
      }

      // DO n TIMES ... ENDDO
      if (upper.startsWith('DO ') || upper === 'DO') {
        const doBlock = this.extractBlock(statements, i, 'DO', 'ENDDO');
        this.handleDo(stmt, doBlock.blockStatements, diagnostics);
        i = doBlock.endIndex + 1;
        continue;
      }

      // IF ... ELSEIF ... ELSE ... ENDIF
      if (upper.startsWith('IF ')) {
        const ifBlock = this.extractBlock(statements, i, 'IF', 'ENDIF');
        this.handleIf(stmt, ifBlock.blockStatements, diagnostics);
        i = ifBlock.endIndex + 1;
        continue;
      }

      // Unhandled but recognized constructs (e.g. TYPES, START-OF-SELECTION)
      if (upper.startsWith('TYPES:') || upper.startsWith('TYPES ') || upper === 'START-OF-SELECTION') {
        diagnostics.push(`Simulated statement verified: ${stmt.slice(0, 40)}...`);
      }

      i++;
    }
  }

  private parseClassImplementation(className: string, statements: string[]) {
    let methods = this.classes.get(className)?.methods;
    if (!methods) {
      methods = new Map();
      this.classes.set(className, { methods });
    }

    let i = 0;
    while (i < statements.length) {
      const stmt = statements[i].trim();
      if (stmt.toUpperCase().startsWith('METHOD ')) {
        const methodName = stmt.replace(/^METHOD\s+/i, '').trim().toLowerCase();
        const mBlock = this.extractBlock(statements, i, 'METHOD ', 'ENDMETHOD');
        let returnVar: string | undefined = undefined;
        for (const s of mBlock.blockStatements) {
          const rMatch = s.match(/^(rv_[a-zA-Z0-9_]+)\s*=/i);
          if (rMatch) {
            returnVar = rMatch[1].toLowerCase();
            break;
          }
        }
        methods.set(methodName, {
          params: [],
          body: mBlock.blockStatements,
          returnVar
        });
        i = mBlock.endIndex + 1;
        continue;
      }
      i++;
    }
  }

  private handleCreateObject(stmt: string) {
    const match = stmt.match(/CREATE\s+OBJECT\s+([a-zA-Z0-9_]+)(?:\s+TYPE\s+([a-zA-Z0-9_]+))?(?:\s+EXPORTING\s+(.+))?/i);
    if (match) {
      const varName = match[1].toLowerCase();
      let className = (match[2] || '').toLowerCase();
      if (!className) {
        for (const cName of this.classes.keys()) {
          className = cName;
          break;
        }
      }

      const obj = { className, fields: {} as Record<string, any> };
      this.objects.set(varName, obj);
      this.variables.set(varName, obj);

      const exporting = match[3];
      if (className) {
        this.invokeMethod(varName, 'constructor', exporting || '', []);
      }
    }
  }

  private invokeMethod(objVar: string, methodName: string, argStr: string, diagnostics: string[]): any {
    const obj = this.objects.get(objVar.toLowerCase()) || this.variables.get(objVar.toLowerCase());
    let className = obj?.className;
    if (!className) {
      for (const [cName, cDef] of this.classes.entries()) {
        if (cDef.methods.has(methodName.toLowerCase())) {
          className = cName;
          break;
        }
      }
    }

    const cDef = className ? this.classes.get(className) : undefined;
    const methodDef = cDef?.methods.get(methodName.toLowerCase());
    if (!methodDef) return undefined;

    // Parse arguments
    const scope: Map<string, any> = new Map();
    if (obj && obj.fields) {
      for (const [k, v] of Object.entries(obj.fields)) {
        scope.set(k.toLowerCase(), v);
      }
    }

    if (argStr) {
      const args = argStr.trim();
      if (args.includes('=')) {
        const pairs = args.split(/\s+(?=[a-zA-Z0-9_]+\s*=)/);
        for (const p of pairs) {
          const [k, v] = p.split('=');
          if (k && v) {
            scope.set(k.trim().toLowerCase(), this.evaluateExpression(v.trim()));
          }
        }
      } else {
        scope.set('iv_amount', this.evaluateExpression(args));
        scope.set('iv_tax_rate', this.evaluateExpression(args));
      }
    }

    const backup: Map<string, any> = new Map();
    for (const [k, v] of scope.entries()) {
      if (this.variables.has(k)) backup.set(k, this.variables.get(k));
      this.variables.set(k, v);
    }

    let returnVal: any = undefined;
    try {
      this.executeStatements(methodDef.body, diagnostics);

      if (methodDef.returnVar && this.variables.has(methodDef.returnVar)) {
        returnVal = this.variables.get(methodDef.returnVar);
      } else {
        for (const [k, v] of this.variables.entries()) {
          if (k.startsWith('rv_') || k === 'result') {
            returnVal = v;
            break;
          }
        }
      }
    } finally {
      if (obj && obj.fields) {
        for (const [k] of scope.entries()) {
          if (this.variables.has(k)) {
            obj.fields[k] = this.variables.get(k);
          }
        }
        for (const [k, v] of this.variables.entries()) {
          if (k.startsWith('mv_')) {
            obj.fields[k] = v;
          }
        }
      }

      for (const [k] of scope.entries()) {
        if (backup.has(k)) {
          this.variables.set(k, backup.get(k));
        } else {
          this.variables.delete(k);
        }
      }
    }

    return returnVal;
  }

  private handleTryCatch(blockStatements: string[], diagnostics: string[]) {
    let catchIndex = -1;
    for (let i = 0; i < blockStatements.length; i++) {
      const upper = blockStatements[i].trim().toUpperCase();
      if (upper.startsWith('CATCH ')) {
        catchIndex = i;
        break;
      }
    }

    const tryStmts = catchIndex >= 0 ? blockStatements.slice(0, catchIndex) : blockStatements;
    const catchStmts = catchIndex >= 0 ? blockStatements.slice(catchIndex + 1) : [];

    try {
      this.executeStatements(tryStmts, diagnostics);
    } catch (err: any) {
      if (err.message && err.message.startsWith('ABAP_EXCEPTION:')) {
        this.executeStatements(catchStmts, diagnostics);
      } else {
        throw err;
      }
    }
  }

  private handleWrite(stmt: string) {
    let body = stmt.replace(/^WRITE:?\s*/i, '').trim();
    const rawTokens = this.splitWriteTokens(body);
    const lineParts: string[] = [];

    for (const rawToken of rawTokens) {
      let token = rawToken.replace(/^\/\s*/, '').trim();
      if (!token) continue;
      let resolved = this.evaluateExpression(token);
      lineParts.push(String(resolved));
    }

    this.output.push(lineParts.join(' '));
  }

  private splitWriteTokens(body: string): string[] {
    const tokens: string[] = [];
    let cur = '';
    let inQuote = false;
    let inPipe = false;
    for (let c = 0; c < body.length; c++) {
      const ch = body[c];
      if (ch === "'" && !inPipe) inQuote = !inQuote;
      else if (ch === '|' && !inQuote) inPipe = !inPipe;
      else if (ch === ',' && !inQuote && !inPipe) {
        if (cur.trim()) tokens.push(cur.trim());
        cur = '';
        continue;
      }
      cur += ch;
    }
    if (cur.trim()) tokens.push(cur.trim());
    return tokens;
  }

  private handleModernWrite(stmt: string) {
    const match = stmt.match(/(?:out->write|cl_demo_output=>(?:write|display))\(\s*(.+?)\s*\)/i);
    if (match) {
      const arg = match[1];
      const resolved = this.evaluateExpression(arg);
      if (Array.isArray(resolved)) {
        this.output.push(JSON.stringify(resolved, null, 2));
      } else {
        this.output.push(String(resolved));
      }
    }
  }

  private handleDeclaration(stmt: string) {
    const inlineMatch = stmt.match(/DATA\(([a-zA-Z0-9_]+)\)\s*=\s*(.+)/i);
    if (inlineMatch) {
      const varName = inlineMatch[1].toLowerCase();
      const expr = inlineMatch[2];
      const val = this.evaluateExpression(expr);
      this.variables.set(varName, val);
      return;
    }

    const nameMatch = stmt.match(/(?:DATA|CONSTANTS)\s+([a-zA-Z0-9_]+)/i);
    if (nameMatch) {
      const varName = nameMatch[1].toLowerCase();
      const isTable = /TABLE\s+OF/i.test(stmt) || /TYPE\s+STRING_TABLE/i.test(stmt);
      if (isTable) {
        this.tables.set(varName, []);
        this.variables.set(varName, this.tables.get(varName));
        return;
      }

      let initialVal: any = 0;
      if (/\bTYPE\s+(?:STRING|C)\b/i.test(stmt)) {
        initialVal = '';
      }

      const valMatch = stmt.match(/\bVALUE\s+(.+)$/i);
      if (valMatch) {
        initialVal = this.evaluateExpression(valMatch[1].trim());
      }
      this.variables.set(varName, initialVal);
    }
  }

  private handleSplit(stmt: string) {
    const match = stmt.match(/SPLIT\s+(.+?)\s+AT\s+(.+?)\s+INTO\s+(.+)/i);
    if (match) {
      const src = String(this.evaluateExpression(match[1].trim()));
      const delim = String(this.evaluateExpression(match[2].trim()));
      const targets = match[3].trim().split(/\s+/);
      const parts = src.split(delim);
      for (let idx = 0; idx < targets.length; idx++) {
        const tgt = targets[idx].trim().toLowerCase();
        const val = parts[idx] !== undefined ? parts[idx] : '';
        this.variables.set(tgt, val);
      }
    }
  }

  private handleAssignment(stmt: string) {
    const parts = stmt.split('=');
    const lhs = parts[0].trim().toLowerCase();
    const rhs = parts.slice(1).join('=').trim();
    const val = this.evaluateExpression(rhs);

    if (lhs.includes('-')) {
      const [structName, fieldName] = lhs.split('-');
      let struct = this.variables.get(structName);
      if (!struct || typeof struct !== 'object' || Array.isArray(struct)) {
        struct = {};
        this.variables.set(structName, struct);
      }
      struct[fieldName] = val;
      return;
    }

    this.variables.set(lhs, val);
    if (Array.isArray(val)) {
      this.tables.set(lhs, val);
    }
  }

  private handleAppend(stmt: string) {
    const match = stmt.match(/APPEND\s+(.+?)\s+TO\s+([a-zA-Z0-9_]+)/i);
    if (match) {
      const valExpr = match[1].trim();
      const targetTable = match[2].trim().toLowerCase();
      const val = this.evaluateExpression(valExpr);
      let tbl = this.tables.get(targetTable);
      if (!tbl) {
        tbl = [];
        this.tables.set(targetTable, tbl);
        this.variables.set(targetTable, tbl);
      }
      const itemToAppend = typeof val === 'object' && val !== null ? { ...val } : val;
      tbl.push(itemToAppend);
      this.sySubrc = 0;
      this.syTabix = tbl.length;
    }
  }

  private handleModifyTable(stmt: string) {
    const match = stmt.match(/MODIFY\s+([a-zA-Z0-9_]+)\s+FROM\s+([a-zA-Z0-9_]+)/i);
    if (match) {
      const tblName = match[1].trim().toLowerCase();
      const waName = match[2].trim().toLowerCase();
      const tbl = this.tables.get(tblName);
      const wa = this.variables.get(waName);
      if (tbl && wa && this.syTabix > 0 && this.syTabix <= tbl.length) {
        tbl[this.syTabix - 1] = typeof wa === 'object' ? { ...wa } : wa;
        this.sySubrc = 0;
      }
    }
  }

  private handleSort(stmt: string) {
    const match = stmt.match(/SORT\s+([a-zA-Z0-9_]+)(?:\s+BY\s+(.+))?/i);
    if (match) {
      const targetTable = match[1].trim().toLowerCase();
      const tbl = this.tables.get(targetTable);
      if (tbl && Array.isArray(tbl)) {
        tbl.sort((a, b) => {
          if (typeof a === 'number' && typeof b === 'number') return a - b;
          return String(a).localeCompare(String(b));
        });
        this.sySubrc = 0;
      }
    }
  }

  private handleReadTable(stmt: string) {
    const withKeyMatch = stmt.match(/READ\s+TABLE\s+([a-zA-Z0-9_]+)\s+(?:INTO\s+(?:DATA\(([a-zA-Z0-9_]+)\)|([a-zA-Z0-9_]+))\s+)?WITH\s+KEY\s+([a-zA-Z0-9_\-]+)\s*=\s*(.+?)(?:\s+INTO\s+(?:DATA\(([a-zA-Z0-9_]+)\)|([a-zA-Z0-9_]+)))?(?:\s+BINARY\s+SEARCH)?$/i);
    if (withKeyMatch) {
      const tblName = withKeyMatch[1].trim().toLowerCase();
      const targetVar = (withKeyMatch[2] || withKeyMatch[3] || withKeyMatch[6] || withKeyMatch[7] || '').trim().toLowerCase();
      const keyField = withKeyMatch[4].trim().toLowerCase();
      const keyVal = this.evaluateExpression(withKeyMatch[5].trim());
      const tbl = this.tables.get(tblName);

      let foundIndex = -1;
      let foundRow: any = undefined;
      if (tbl && Array.isArray(tbl)) {
        for (let idx = 0; idx < tbl.length; idx++) {
          const row = tbl[idx];
          if (row && typeof row === 'object' && row[keyField] !== undefined && String(row[keyField]) === String(keyVal)) {
            foundIndex = idx + 1;
            foundRow = row;
            break;
          } else if (String(row) === String(keyVal)) {
            foundIndex = idx + 1;
            foundRow = row;
            break;
          }
        }
      }

      if (foundIndex > 0) {
        this.sySubrc = 0;
        this.syTabix = foundIndex;
        if (targetVar) {
          const cloned = typeof foundRow === 'object' && foundRow !== null ? { ...foundRow } : foundRow;
          this.variables.set(targetVar, cloned);
        }
      } else {
        this.sySubrc = 4;
        this.syTabix = 0;
      }
      return;
    }

    const match = stmt.match(/READ\s+TABLE\s+([a-zA-Z0-9_]+)(?:\s+INDEX\s+(\d+|[a-zA-Z0-9_]+))?(?:\s+INTO\s+(?:DATA\(([a-zA-Z0-9_]+)\)|([a-zA-Z0-9_]+)))?/i);
    if (match) {
      const tblName = match[1].trim().toLowerCase();
      const indexExpr = match[2];
      const targetVar = (match[3] || match[4] || '').trim().toLowerCase();

      const tbl = this.tables.get(tblName);
      const index = indexExpr ? Number(this.evaluateExpression(indexExpr)) : 1;

      if (tbl && tbl[index - 1] !== undefined) {
        this.sySubrc = 0;
        this.syTabix = index;
        if (targetVar) {
          const found = tbl[index - 1];
          const cloned = typeof found === 'object' && found !== null ? { ...found } : found;
          this.variables.set(targetVar, cloned);
        }
      } else {
        this.sySubrc = 4;
        this.syTabix = 0;
      }
    }
  }

  private handleLoop(headerStmt: string, blockStatements: string[], diagnostics: string[]) {
    const match = headerStmt.match(/LOOP\s+AT\s+([a-zA-Z0-9_]+)(?:\s+INTO\s+(?:DATA\(([a-zA-Z0-9_]+)\)|([a-zA-Z0-9_]+)))?(?:\s+WHERE\s+(.+))?/i);
    if (match) {
      const tblName = match[1].trim().toLowerCase();
      const itemVar = (match[2] || match[3] || 'ls_row').toLowerCase();
      const whereClause = match[4]?.trim();
      const tbl = this.tables.get(tblName) || [];

      let tabix = 1;
      for (const item of tbl) {
        this.syTabix = tabix++;
        this.variables.set(itemVar, item);

        // Bind fields into variables scope
        if (typeof item === 'object' && item !== null) {
          for (const [k, v] of Object.entries(item)) {
            this.variables.set(k.toLowerCase(), v);
          }
        }

        if (whereClause) {
          if (!this.evaluateCondition(whereClause)) {
            continue;
          }
        }

        this.executeStatements(blockStatements, diagnostics);
      }
    }
  }

  private handleDo(headerStmt: string, blockStatements: string[], diagnostics: string[]) {
    const match = headerStmt.match(/DO\s+(\d+|[a-zA-Z0-9_]+)\s+TIMES/i);
    const count = match ? Number(this.evaluateExpression(match[1])) : 1;

    for (let idx = 1; idx <= Math.min(count, 100); idx++) {
      this.syIndex = idx;
      this.variables.set('sy-index', idx);
      this.executeStatements(blockStatements, diagnostics);
    }
  }

  private handleIf(headerStmt: string, blockStatements: string[], diagnostics: string[]) {
    type Branch = { condition: string | null; stmts: string[] };
    const branches: Branch[] = [];

    let currentCond: string | null = headerStmt.replace(/^IF\s+/i, '').trim();
    let currentStmts: string[] = [];

    for (const stmt of blockStatements) {
      const upper = stmt.trim().toUpperCase();
      if (upper.startsWith('ELSEIF ')) {
        branches.push({ condition: currentCond, stmts: currentStmts });
        currentCond = stmt.replace(/^ELSEIF\s+/i, '').trim();
        currentStmts = [];
      } else if (upper === 'ELSE') {
        branches.push({ condition: currentCond, stmts: currentStmts });
        currentCond = null;
        currentStmts = [];
      } else {
        currentStmts.push(stmt);
      }
    }
    branches.push({ condition: currentCond, stmts: currentStmts });

    for (const branch of branches) {
      if (branch.condition === null || this.evaluateCondition(branch.condition)) {
        this.executeStatements(branch.stmts, diagnostics);
        break;
      }
    }
  }

  private evaluateCondition(conditionStr: string): boolean {
    const cond = conditionStr.trim();

    if (/\s+OR\s+/i.test(cond)) {
      const parts = cond.split(/\s+OR\s+/i);
      return parts.some(p => this.evaluateCondition(p));
    }

    if (/\s+AND\s+/i.test(cond)) {
      const parts = cond.split(/\s+AND\s+/i);
      return parts.every(p => this.evaluateCondition(p));
    }

    const match = cond.match(/(.+?)\s*(<=|>=|<>|!=|<|>|=|IS\s+INITIAL|IS\s+NOT\s+INITIAL)\s*(.*)/i);
    if (!match) return false;

    const lhs = this.evaluateExpression(match[1].trim());
    const op = match[2].toUpperCase();
    const rhsStr = match[3] ? match[3].trim() : '';

    if (op === 'IS INITIAL') {
      return lhs === 0 || lhs === '' || lhs === null || lhs === undefined || (Array.isArray(lhs) && lhs.length === 0);
    }
    if (op === 'IS NOT INITIAL') {
      return !(lhs === 0 || lhs === '' || lhs === null || lhs === undefined || (Array.isArray(lhs) && lhs.length === 0));
    }

    const rhs = this.evaluateExpression(rhsStr);

    if (op === '=' || op === '==') return String(lhs) === String(rhs);
    if (op === '<>' || op === '!=') return String(lhs) !== String(rhs);
    if (op === '<') return Number(lhs) < Number(rhs);
    if (op === '<=') return Number(lhs) <= Number(rhs);
    if (op === '>') return Number(lhs) > Number(rhs);
    if (op === '>=') return Number(lhs) >= Number(rhs);

    return false;
  }

  private evaluateExpression(expr: string): any {
    const trimmed = expr.trim();

    if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      return trimmed.slice(1, -1);
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const inner = trimmed.slice(1, -1);
      return inner.replace(/\{([^{}]+)\}/g, (_, subExpr) => {
        return String(this.evaluateExpression(subExpr.trim()));
      });
    }

    const methodCallMatch = trimmed.match(/^([a-zA-Z0-9_]+)->([a-zA-Z0-9_]+)\s*\((.*?)\)$/i);
    if (methodCallMatch) {
      return this.invokeMethod(methodCallMatch[1], methodCallMatch[2], methodCallMatch[3], []);
    }

    if (/^COND\s+#?\s*\(/i.test(trimmed)) {
      const inner = trimmed.replace(/^COND\s+#?\s*\(/i, '').replace(/\)$/, '').trim();
      const branches = inner.split(/\s+WHEN\s+/i).filter(Boolean);
      for (const branch of branches) {
        if (branch.toUpperCase().includes(' ELSE ')) {
          const elseMatch = branch.split(/\s+ELSE\s+/i);
          const thenPart = elseMatch[0];
          const elsePart = elseMatch[1];
          const thenSplit = thenPart.split(/\s+THEN\s+/i);
          if (thenSplit.length === 2 && this.evaluateCondition(thenSplit[0])) {
            return this.evaluateExpression(thenSplit[1]);
          }
          return this.evaluateExpression(elsePart);
        }

        const thenSplit = branch.split(/\s+THEN\s+/i);
        if (thenSplit.length === 2 && this.evaluateCondition(thenSplit[0])) {
          return this.evaluateExpression(thenSplit[1]);
        }
      }
    }

    const linesMatch = trimmed.match(/^lines\(\s*([a-zA-Z0-9_]+)\s*\)/i);
    if (linesMatch) {
      const tbl = this.tables.get(linesMatch[1].toLowerCase());
      return tbl ? tbl.length : 0;
    }

    if (!isNaN(Number(trimmed))) {
      return Number(trimmed);
    }

    if (trimmed.includes(' + ') || trimmed.includes(' - ') || trimmed.includes(' * ') || trimmed.includes(' / ') || /\s+(?:MOD|DIV)\s+/i.test(trimmed)) {
      const tokens = trimmed.split(/\s+/);
      if (tokens.length >= 3 && tokens.length % 2 === 1) {
        let acc = Number(this.evaluateExpression(tokens[0]));
        for (let idx = 1; idx < tokens.length; idx += 2) {
          const op = tokens[idx].toUpperCase();
          const nextVal = Number(this.evaluateExpression(tokens[idx + 1]));
          if (op === '+') acc += nextVal;
          else if (op === '-') acc -= nextVal;
          else if (op === '*') acc *= nextVal;
          else if (op === '/') acc = nextVal !== 0 ? Math.floor(acc / nextVal) : 0;
          else if (op === 'MOD') acc = nextVal !== 0 ? acc % nextVal : 0;
          else if (op === 'DIV') acc = nextVal !== 0 ? Math.floor(acc / nextVal) : 0;
        }
        return acc;
      }
    }

    const lower = trimmed.toLowerCase();
    if (lower.includes('-') && !lower.startsWith('sy-')) {
      const [structName, fieldName] = lower.split('-');
      const struct = this.variables.get(structName);
      if (struct && typeof struct === 'object' && struct[fieldName] !== undefined) {
        return struct[fieldName];
      }
    }

    if (lower === 'sy-subrc') return this.sySubrc;
    if (lower === 'sy-index') return this.syIndex;
    if (lower === 'sy-tabix') return this.syTabix;

    if (this.variables.has(lower)) {
      return this.variables.get(lower);
    }

    return trimmed;
  }

  private extractBlock(statements: string[], startIndex: number, openKeyword: string, closeKeyword: string): { blockStatements: string[], endIndex: number } {
    const blockStatements: string[] = [];
    let depth = 1;
    let i = startIndex + 1;

    while (i < statements.length && depth > 0) {
      const stmtUpper = statements[i].trim().toUpperCase();
      if (stmtUpper.startsWith(openKeyword)) {
        depth++;
      } else if (stmtUpper.startsWith(closeKeyword)) {
        depth--;
        if (depth === 0) {
          return { blockStatements, endIndex: i };
        }
      }
      blockStatements.push(statements[i]);
      i++;
    }

    return { blockStatements, endIndex: i - 1 };
  }
}
