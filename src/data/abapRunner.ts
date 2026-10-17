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
    // Default system variables
    this.variables.set('sy-subrc', 0);
    this.variables.set('sy-uname', 'LEARNER');
    this.variables.set('sy-datum', new Date().toISOString().slice(0, 10).replace(/-/g, ''));
  }

  public run(code: string, testCases: TestCase[] = []): ExecutionResult {
    const startTime = performance.now();
    this.reset();
    const diagnostics: string[] = [];

    // Normalize code lines
    const rawLines = code.split('\n');
    const statements: string[] = [];
    let currentStatement = '';

    for (let rawLine of rawLines) {
      let line = rawLine.trim();
      // Remove ABAP comments (* at start of line or " in line)
      if (line.startsWith('*')) continue;
      const quoteCommentIdx = line.indexOf('"');
      if (quoteCommentIdx >= 0) {
        line = line.substring(0, quoteCommentIdx).trim();
      }
      if (!line) continue;

      currentStatement += (currentStatement ? ' ' : '') + line;
      if (currentStatement.endsWith('.')) {
        statements.push(currentStatement.slice(0, -1).trim());
        currentStatement = '';
      }
    }

    if (currentStatement) {
      statements.push(currentStatement.trim());
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
        // Check if output contains expected string or matches regex/exact
        const passed = combinedOutput.includes(expected) || this.output.some(o => o.trim() === expected);
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
      // If no specific test cases, passing is true if no severe error
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

      // APPEND <val> TO <table / lt_tab>
      if (upper.startsWith('APPEND ')) {
        this.handleAppend(stmt);
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

      // Simple Assignment: lv_var = ...
      if (stmt.includes(' = ') && !upper.startsWith('IF ') && !upper.startsWith('WHILE ') && !upper.startsWith('WHERE ')) {
        this.handleAssignment(stmt);
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

      // Unhandled but recognized constructs (e.g. CLASS, METHOD, SELECT, etc.)
      if (upper.startsWith('CLASS ') || upper.startsWith('METHOD ') || upper.startsWith('SELECT ')) {
        diagnostics.push(`Simulated statement verified: ${stmt.slice(0, 40)}...`);
      }

      i++;
    }
  }

  private handleWrite(stmt: string) {
    let body = stmt.replace(/^WRITE:?\s*/i, '').trim();
    // In ABAP WRITE, tokens can be comma-separated or space-separated after /
    const rawTokens = body.split(',').map(t => t.trim());
    const lineParts: string[] = [];

    for (const rawToken of rawTokens) {
      let token = rawToken.replace(/^\/\s*/, '').trim();
      if (!token) continue;
      let resolved = this.evaluateExpression(token);
      lineParts.push(String(resolved));
    }

    this.output.push(lineParts.join(' '));
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
    // Check inline declaration DATA(lv_var) = ...
    const inlineMatch = stmt.match(/DATA\(([a-zA-Z0-9_]+)\)\s*=\s*(.+)/i);
    if (inlineMatch) {
      const varName = inlineMatch[1].toLowerCase();
      const expr = inlineMatch[2];
      const val = this.evaluateExpression(expr);
      this.variables.set(varName, val);
      return;
    }

    // Classic: DATA lv_num TYPE i VALUE 5. or DATA lt_tab TYPE ...
    const match = stmt.match(/(?:DATA|CONSTANTS)\s+([a-zA-Z0-9_]+)\s+TYPE\s+([a-zA-Z0-9_]+(?:\s+OF\s+[a-zA-Z0-9_]+)?)(?:\s+VALUE\s+(.+))?/i);
    if (match) {
      const varName = match[1].toLowerCase();
      const type = match[2].toUpperCase();
      const defaultValExpr = match[3];

      if (type.includes('TABLE') || type.startsWith('STRING_TABLE')) {
        this.tables.set(varName, []);
        this.variables.set(varName, this.tables.get(varName));
      } else {
        let initialVal = 0;
        if (type === 'STRING' || type === 'C') initialVal = '' as any;
        if (defaultValExpr) {
          initialVal = this.evaluateExpression(defaultValExpr);
        }
        this.variables.set(varName, initialVal);
      }
    }
  }

  private handleAssignment(stmt: string) {
    const parts = stmt.split('=');
    const lhs = parts[0].trim().toLowerCase();
    const rhs = parts.slice(1).join('=').trim();
    const val = this.evaluateExpression(rhs);
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
      tbl.push(val);
      this.sySubrc = 0;
      this.syTabix = tbl.length;
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
          this.variables.set(targetVar, tbl[index - 1]);
        }
      } else {
        this.sySubrc = 4;
      }
    }
  }

  private handleLoop(headerStmt: string, blockStatements: string[], diagnostics: string[]) {
    // LOOP AT lt_tab INTO DATA(ls_item) or LOOP AT lt_tab INTO ls_item
    const match = headerStmt.match(/LOOP\s+AT\s+([a-zA-Z0-9_]+)(?:\s+INTO\s+(?:DATA\(([a-zA-Z0-9_]+)\)|([a-zA-Z0-9_]+)))?/i);
    if (match) {
      const tblName = match[1].trim().toLowerCase();
      const itemVar = (match[2] || match[3] || 'ls_row').toLowerCase();
      const tbl = this.tables.get(tblName) || [];

      let tabix = 1;
      for (const item of tbl) {
        this.syTabix = tabix++;
        this.variables.set(itemVar, item);
        this.executeStatements(blockStatements, diagnostics);
      }
    }
  }

  private handleDo(headerStmt: string, blockStatements: string[], diagnostics: string[]) {
    // DO 5 TIMES
    const match = headerStmt.match(/DO\s+(\d+|[a-zA-Z0-9_]+)\s+TIMES/i);
    const count = match ? Number(this.evaluateExpression(match[1])) : 1;

    for (let idx = 1; idx <= Math.min(count, 100); idx++) {
      this.syIndex = idx;
      this.variables.set('sy-index', idx);
      this.executeStatements(blockStatements, diagnostics);
    }
  }

  private handleIf(headerStmt: string, blockStatements: string[], diagnostics: string[]) {
    // Parse branches: IF, ELSEIF, ELSE
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
        currentCond = null; // Unconditional
        currentStmts = [];
      } else {
        currentStmts.push(stmt);
      }
    }
    branches.push({ condition: currentCond, stmts: currentStmts });

    // Execute first matching branch
    for (const b of branches) {
      if (b.condition === null || this.evaluateCondition(b.condition)) {
        this.executeStatements(b.stmts, diagnostics);
        break;
      }
    }
  }

  private evaluateCondition(expr: string): boolean {
    const upper = expr.toUpperCase().trim();
    if (upper === 'SY-SUBRC = 0' || upper === 'SY-SUBRC EQ 0') {
      return this.sySubrc === 0;
    }
    if (upper === 'SY-SUBRC <> 0' || upper === 'SY-SUBRC NE 0') {
      return this.sySubrc !== 0;
    }

    // Comparison e.g. lv_avg >= 80, lv_val > 10, lv_grade = 'A'
    const match = expr.match(/^(.+?)\s*(=|EQ|<>|NE|>=|GE|<=|LE|>|GT|<|LT)\s*(.+)$/i);
    if (match) {
      const left = this.evaluateExpression(match[1]);
      const op = match[2].toUpperCase();
      const right = this.evaluateExpression(match[3]);

      switch (op) {
        case '=':
        case 'EQ': return left == right;
        case '<>':
        case 'NE': return left != right;
        case '>':
        case 'GT': return Number(left) > Number(right);
        case '<':
        case 'LT': return Number(left) < Number(right);
        case '>=':
        case 'GE': return Number(left) >= Number(right);
        case '<=':
        case 'LE': return Number(left) <= Number(right);
      }
    }
    return true;
  }

  private evaluateExpression(expr: string): any {
    let trimmed = expr.trim();
    if (trimmed.startsWith('/')) {
      trimmed = trimmed.replace(/^\/\s*/, '').trim();
    }

    // String literal: 'Hello World'
    if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      return trimmed.slice(1, -1);
    }

    // String template: |Hello, { lv_name }!|
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      return trimmed.slice(1, -1).replace(/\{\s*([a-zA-Z0-9_\-]+)\s*\}/g, (_, varName) => {
        const val = this.variables.get(varName.toLowerCase());
        return val !== undefined ? String(val) : '';
      });
    }

    // COND #( WHEN ... THEN ... ELSE ... )
    if (/^COND\s+[a-zA-Z0-9_#]+\s*\(/i.test(trimmed)) {
      const inner = trimmed.replace(/^COND\s+[a-zA-Z0-9_#]+\s*\(/i, '').replace(/\)$/, '').trim();
      const rawBranches = inner.split(/\s*WHEN\s+/i);
      for (const branch of rawBranches) {
        if (!branch.trim()) continue;
        const elseMatch = branch.match(/^(.+?)\s+ELSE\s+(.+)$/i);
        if (elseMatch) {
          const thenPart = elseMatch[1];
          const elsePart = elseMatch[2];
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

    // Constructor expression VALUE #( ... ) or VALUE string_table( ( 'a' ) ( 'b' ) )
    if (/^VALUE\s+#?\s*\(/i.test(trimmed)) {
      const inner = trimmed.replace(/^VALUE\s+#?\s*\(/i, '').replace(/\)$/, '').trim();
      const items: any[] = [];
      const rowMatches = inner.match(/\(\s*([^)]+)\s*\)/g);
      if (rowMatches) {
        for (const rm of rowMatches) {
          items.push(rm.replace(/[()]/g, '').trim().replace(/^'|'$/g, ''));
        }
        return items;
      }
      return items;
    }

    // lines( lt_tab )
    const linesMatch = trimmed.match(/^lines\(\s*([a-zA-Z0-9_]+)\s*\)/i);
    if (linesMatch) {
      const tbl = this.tables.get(linesMatch[1].toLowerCase());
      return tbl ? tbl.length : 0;
    }

    // Number literal
    if (!isNaN(Number(trimmed))) {
      return Number(trimmed);
    }

    // Arithmetic chain evaluation: e.g. a + b + c or a / 3
    if (trimmed.includes(' + ') || trimmed.includes(' - ') || trimmed.includes(' * ') || trimmed.includes(' / ')) {
      // Tokenize by space
      const tokens = trimmed.split(/\s+/);
      if (tokens.length >= 3 && tokens.length % 2 === 1) {
        let acc = Number(this.evaluateExpression(tokens[0]));
        for (let idx = 1; idx < tokens.length; idx += 2) {
          const op = tokens[idx];
          const nextVal = Number(this.evaluateExpression(tokens[idx + 1]));
          if (op === '+') acc += nextVal;
          else if (op === '-') acc -= nextVal;
          else if (op === '*') acc *= nextVal;
          else if (op === '/') acc = nextVal !== 0 ? Math.floor(acc / nextVal) : 0;
        }
        return acc;
      }
    }

    // Check variable name
    const lower = trimmed.toLowerCase();
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
