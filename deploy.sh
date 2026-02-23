#!/bin/bash
# Exit on error
set -e

LOG_FILE="deploy.log"
# Correct binary paths for Node 20
NODE_BIN_DIR="/opt/alt/alt-nodejs20/root/usr/bin"
NPM_PATH="/opt/alt/alt-nodejs20/root/usr/lib/node_modules/corepack/shims/npm"

# Add node to the path
export PATH="$NODE_BIN_DIR:$PATH"

# cPanel environments can have low virtual-memory limits; this avoids
# WebAssembly trap-handler 10GB virtual cage allocation failures.
export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--disable-wasm-trap-handler --max-old-space-size=1024"

echo "--- API Deployment Started: $(date) ---" > $LOG_FILE
echo "Node version: $(node -v)" >> $LOG_FILE
echo "Current Directory: $PWD" >> $LOG_FILE
echo "NODE_OPTIONS: $NODE_OPTIONS" >> $LOG_FILE

# Install dependencies (limit processes to avoid EAGAIN)
echo "Starting npm install..." >> $LOG_FILE
$NPM_PATH install --jobs=1 --no-audit --no-fund >> $LOG_FILE 2>&1

# Build the project
echo "Starting npm build..." >> $LOG_FILE
$NPM_PATH run build >> $LOG_FILE 2>&1

# Restart the app
mkdir -p tmp
touch tmp/restart.txt
echo "App restart triggered." >> $LOG_FILE

echo "--- API Deployment Finished Successfully ---" >> $LOG_FILE
