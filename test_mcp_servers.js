#!/usr/bin/env node

/**
 * Test script for MCP servers
 * Tests both figma-developer-mcp and figma-mcp-server
 */

const { spawn } = require('child_process');
const fs = require('fs');

const FIGMA_TOKEN = "figd_SEogBJcBXJKqR8978JJiV0MST6muNFD-6JeidCqS";

console.log("🧪 Testing MCP Servers\n");

// Test 1: figma-developer-mcp
console.log("1️⃣ Testing figma-developer-mcp...");
testServer("/opt/homebrew/lib/node_modules/figma-developer-mcp/dist/index.js", {
  FIGMA_API_KEY: FIGMA_TOKEN
});

// Test 2: figma-mcp-server  
console.log("\n2️⃣ Testing figma-mcp-server...");
testServer("/opt/homebrew/lib/node_modules/figma-mcp-server/index.js", {
  FIGMA_ACCESS_TOKEN: FIGMA_TOKEN
});

function testServer(serverPath, env) {
  const startTime = Date.now();
  
  if (!fs.existsSync(serverPath)) {
    console.log(`❌ Server not found at: ${serverPath}`);
    return;
  }

  console.log(`✅ Server found at: ${serverPath}`);
  
  const child = spawn('node', [serverPath, '--help'], {
    env: { ...process.env, ...env },
    stdio: 'pipe'
  });

  let output = '';
  let errorOutput = '';

  child.stdout.on('data', (data) => {
    output += data.toString();
  });

  child.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  child.on('close', (code) => {
    const duration = Date.now() - startTime;
    
    if (code === 0) {
      console.log(`✅ Server test passed (${duration}ms)`);
      console.log(`📋 Available options: ${output.includes('Options:') ? '✓' : '✗'}`);
    } else {
      console.log(`❌ Server test failed with code ${code} (${duration}ms)`);
      if (errorOutput) {
        console.log(`📄 Error output: ${errorOutput.trim()}`);
      }
    }
  });

  child.on('error', (error) => {
    console.log(`❌ Failed to start server: ${error.message}`);
  });
}

// Test 3: Check MCP config
console.log("\n3️⃣ Testing MCP Configuration...");
const configPath = '/Users/rushikeshpatil/Desktop/yupp_mobie/mcp_config_template.json';

try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log(`✅ MCP config loaded from: ${configPath}`);
  console.log(`📊 Configured servers: ${Object.keys(config.mcpServers).join(', ')}`);
  
  // Validate server paths
  for (const [name, server] of Object.entries(config.mcpServers)) {
    const serverPath = server.args[0];
    if (fs.existsSync(serverPath)) {
      console.log(`✅ ${name}: Server executable found`);
    } else {
      console.log(`❌ ${name}: Server executable NOT found at ${serverPath}`);
    }
  }
} catch (error) {
  console.log(`❌ Failed to load MCP config: ${error.message}`);
}

console.log("\n🎉 MCP Server testing complete!");
