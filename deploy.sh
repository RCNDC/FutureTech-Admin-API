#!/bin/bash
# Exit on error
set -e

LOG_FILE="deploy.log"
# Correct binary paths for Node 18 (More stable on cPanel)
NODE_BIN_DIR="/opt/alt/alt-nodejs18/root/usr/bin"
NPM_PATH="/opt/alt/alt-nodejs18/root/usr/bin/npm"

# Add node to the path
export PATH="$NODE_BIN_DIR:$PATH"

# Limit RAM to avoid system kills
export NODE_OPTIONS="--max-old-space-size=512"

echo "--- API Deployment Started: $(date) ---" > $LOG_FILE
echo "Node version: $(node -v)" >> $LOG_FILE
echo "Current Directory: $PWD" >> $LOG_FILE

# Install dependencies (with memory-saving flags)
echo "Starting npm install..." >> $LOG_FILE
$NPM_PATH install --no-audit --no-fund --prefer-offline >> $LOG_FILE 2>&1

# Build the project
echo "Starting npm build..." >> $LOG_FILE
$NPM_PATH run build >> $LOG_FILE 2>&1

# Restart the app
mkdir -p tmp
touch tmp/restart.txt
echo "App restart triggered." >> $LOG_FILE

echo "--- API Deployment Finished Successfully ---" >> $LOG_FILE
