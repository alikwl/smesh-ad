import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import path from 'path';

export const POST: APIRoute = async () => {
  // Only execute when running locally in dev mode
  if (!import.meta.env.DEV) {
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Local sync is only available in development mode (locally).' 
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Promise((resolve) => {
    // Resolve relative path to sibling repo: d:\websites\smesh-dev
    const siblingRepoPath = path.resolve(process.cwd(), '../smesh-dev');
    
    // Command to execute: node scripts/fetch-resources.js
    exec('node scripts/fetch-resources.js', { cwd: siblingRepoPath }, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing local sync:', error);
        console.error('Stderr:', stderr);
        resolve(new Response(JSON.stringify({ 
          success: false, 
          message: error.message || 'Failed to sync local data.',
          details: stderr
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }));
        return;
      }

      console.log('Local sync output:', stdout);
      resolve(new Response(JSON.stringify({ 
        success: true, 
        message: 'Local data synced successfully!',
        output: stdout
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    });
  });
};
