#!/usr/bin/env bash
# Serve the portfolio locally (default port 8080).
# Desktop:  http://localhost:8080
# Phone:    http://<your-mac-ip>:8080  (same Wi‑Fi as this Mac)
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8080}"
LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
echo "Portfolio folder: $(pwd)"
echo "Desktop:  http://localhost:${PORT}"
if [[ -n "${LAN_IP}" ]]; then
  echo "Phone:    http://${LAN_IP}:${PORT}"
else
  echo "Phone:    connect to Wi‑Fi, then use your Mac's IP with port ${PORT}"
fi
echo "Press Ctrl+C to stop."
exec python3 -m http.server "${PORT}"
