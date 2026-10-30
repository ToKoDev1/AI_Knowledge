#!/usr/bin/env bash
# Erzeugt docs/index.html für GitHub Pages aus index.html.
# index.html bleibt die Quelle (ohne <head>, für die Claude-Artifact-Version).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p docs
{
  printf '%s\n' '<!doctype html>' '<html lang="de">' '<head>' \
    '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' \
    '<meta name="robots" content="noindex">' \
    '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}</style>' \
    '</head>' '<body>'
  cat index.html
  printf '%s\n' '</body>' '</html>'
} > docs/index.html
touch docs/.nojekyll
echo "docs/index.html aktualisiert"
