#!/bin/bash

# Enable strict mode as required
set -euo pipefail

# Logging function with clear format
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] [DOCKER-CLEANUP] $1"
}

# Main execution
log "Starting Docker cleanup as per requirements..."

# 1. Remove dangling Docker images
log "Removing dangling images..."
dangling_images=$(docker images -f "dangling=true" -q)
if [ -n "$dangling_images" ]; then
    docker rmi $dangling_images || log "Warning: Some dangling images could not be removed"
    log "Removed $(echo "$dangling_images" | wc -w) dangling images"
else
    log "No dangling images found"
fi

# 2. Prune stopped containers
log "Pruning stopped containers..."
container_prune_output=$(docker container prune -f)
log "$container_prune_output"

# 3. Prune unused networks
log "Pruning unused networks..."
network_prune_output=$(docker network prune -f)
log "$network_prune_output"

log "Cleanup completed successfully"
exit 0
