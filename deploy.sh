#!/bin/bash
# Exit on error
set -e

LOG_FILE="deploy.log"
# Correct binary paths
NODE_PATH="/opt/alt/alt-nodejs20/root/usr/bin/node"
NPM_CLI="/opt/alt/alt-nodejs20/root/usr/lib/node_modules/npm/bin/npm-cli.js"

# Add node to the path
export PATH="/opt/alt/alt-nodejs20/root/usr/bin:$PATH"

# SUPER LIGHTWEIGHT MODE: Disable all heavy features
export NODE_OPTIONS="--max-old-space-size=512 --disable-wasm-trap-handler"

echo "--- API Deployment Started: $(date) ---" > $LOG_FILE
echo "Node version: $($NODE_PATH -v)" >> $LOG_FILE

# Install dependencies (Single process, no audit, no fund)
echo "Starting npm install (Single Process Mode)..." >> $LOG_FILE
$NODE_PATH $NPM_CLI install --jobs=1 --no-audit --no-fund --no-package-lock >> $LOG_FILE 2>&1

# Build the project
echo "Starting npm build..." >> $LOG_FILE
$NODE_PATH $NPM_CLI run build >> $LOG_FILE 2>&1

# Restart the app
mkdir -p tmp
touch tmp/restart.txt
echo "--- API Deployment Finished Successfully ---" >> $LOG_FILE
