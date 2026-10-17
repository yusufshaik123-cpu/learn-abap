import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isProd = process.env.NODE_ENV === 'production';

console.log(`[ABAP Mastery Runner] Starting in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode...`);

// First ensure database is seeded if not exists
const dbPath = path.join(rootDir, 'data/abap_mastery.db');
if (!fs.existsSync(dbPath)) {
  console.log('[ABAP Mastery Runner] Database not found. Seeding initial curriculum...');
  const seedProcess = spawn('node', ['--experimental-strip-types', 'server/seed.ts'], {
    cwd: rootDir,
    stdio: 'inherit'
  });
  seedProcess.on('close', (code) => {
    if (code === 0) {
      startServers();
    } else {
      console.error('[ABAP Mastery Runner] Seed failed with code:', code);
    }
  });
} else {
  startServers();
}

function startServers() {
  // Start backend API server
  console.log('[ABAP Mastery Runner] Launching API server...');
  const server = spawn('node', ['--experimental-strip-types', 'server/index.ts'], {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, PORT: process.env.PORT || '3001' }
  });

  if (!isProd) {
    // Start Vite dev server
    console.log('[ABAP Mastery Runner] Launching Vite development server...');
    const client = spawn('./node_modules/.bin/vite', ['--port', '5173', '--host'], {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true
    });

    client.on('error', (err) => {
      console.error('[ABAP Mastery Runner] Client error:', err);
    });
  }

  server.on('error', (err) => {
    console.error('[ABAP Mastery Runner] Server error:', err);
  });
}
