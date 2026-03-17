import { exec } from 'child_process';
import { promisify } from 'util';
import { NextResponse } from 'next/server';

const execPromise = promisify(exec);

export async function GET() {
  try {
    const { stdout: commit } = await execPromise('git rev-parse --short HEAD');
    const { stdout: commitFull } = await execPromise('git rev-parse HEAD');
    const { stdout: branch } = await execPromise('git rev-parse --abbrev-ref HEAD');
    const { stdout: message } = await execPromise('git log -1 --pretty=%B');
    const { stdout: author } = await execPromise('git log -1 --pretty=%an');
    const { stdout: date } = await execPromise('git log -1 --pretty=%ai');
    
    return NextResponse.json({
      commit: commit.trim(),
      commitFull: commitFull.trim(),
      branch: branch.trim(),
      message: message.trim(),
      author: author.trim(),
      date: date.trim(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'No se pudo obtener información del commit',
        details: error instanceof Error ? error.message : 'Error desconocido'
      }, 
      { status: 500 }
    );
  }
}
