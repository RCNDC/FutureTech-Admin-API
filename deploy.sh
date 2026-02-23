#!/bin/bash
# Exit on error
set -e

LOG_FILE="deploy.log"
# Correct binary paths for Node 20
NODE_BIN_DIR="/opt/alt/alt-nodejs20/root/usr/bin"
NPM_SHIM_PATH="/opt/alt/alt-nodejs20/root/usr/lib/node_modules/corepack/shims/npm"

# Add node to the path
export PATH="$NODE_BIN_DIR:$PATH"

# cPanel environments can have low virtual-memory limits; this avoids
# WebAssembly trap-handler 10GB virtual cage allocation failures.
export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--disable-wasm-trap-handler --max-old-space-size=1024"

# Prefer the packaged npm binary to avoid Corepack bootstrap overhead.
if [ -x "$NODE_BIN_DIR/npm" ]; then
  NPM_CMD="$NODE_BIN_DIR/npm"
else
  NPM_CMD="$NPM_SHIM_PATH"
fi

echo "--- API Deployment Started: $(date) ---" > $LOG_FILE
echo "Node version: $(node -v)" >> $LOG_FILE
echo "npm version: $($NPM_CMD -v)" >> $LOG_FILE
echo "Current Directory: $PWD" >> $LOG_FILE
echo "NODE_OPTIONS: $NODE_OPTIONS" >> $LOG_FILE

# Install dependencies
if [ -f package-lock.json ]; then
  echo "Starting npm ci..." >> $LOG_FILE
  $NPM_CMD ci --no-audit --no-fund >> $LOG_FILE 2>&1
else
  echo "Starting npm install..." >> $LOG_FILE
  $NPM_CMD install --no-audit --no-fund >> $LOG_FILE 2>&1
fi

# Build the project
echo "Starting npm build..." >> $LOG_FILE
$NPM_CMD run build >> $LOG_FILE 2>&1

# Restart the app
mkdir -p tmp
touch tmp/restart.txt
echo "App restart triggered." >> $LOG_FILE

echo "--- API Deployment Finished Successfully ---" >> $LOG_FILE
