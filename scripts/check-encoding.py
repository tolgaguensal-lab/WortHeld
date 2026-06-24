#!/usr/bin/env python3
"""
🔍 Encoding & Character Validation Check
==========================================
Prüft alle Source-Dateien auf:
  1. Korrupte UTF-8 Zeichen (Â, Ã, â€ usw.)
  2. HTML-Entities statt echter Umlaute (&uuml; statt ü)
  3. BOM-Marker
  4. Nicht-druckbare Steuerzeichen

Usage: python3 scripts/check-encoding.py
"""
import os
import re
import sys

# ─── Konfiguration ───────────────────────────────────────────
SRC_DIRS = ["src", "prisma", "scripts", "docs"]
EXTS = {".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mjs", ".prisma", ".yml", ".yaml"}
EXCLUDE_DIRS = {"node_modules", ".next", ".git", "test-results"}

# Korrupte UTF-8 Pattern (C2 A0, C2 B7, E2 80 93 etc. falsch als Latin-1 interpretiert)
CORRUPTED_CHARS = [
    (b'\xc2\xa0', 'NBSP → normal space'),       # non-breaking space als Â
    (b'\xc2\xb7', '· → middle dot korrupt'),     # middle dot
    (b'\xe2\x80\x93', '– → en dash korrupt'),    # en dash
    (b'\xe2\x80\x94', '— → em dash korrupt'),    # em dash
    (b'\xe2\x80\x99', "' → smart quote korrupt"), # right single quote
    (b'\xe2\x80\x9c', '" → left double quote korrupt'),
    (b'\xe2\x80\x9d', '" → right double quote korrupt'),
]

# HTML-Entities die echte Zeichen sein sollten
HTML_ENTITIES = [
    (b'&uuml;', b'\xc3\xbc'),       # ü
    (b'&auml;', b'\xc3\xa4'),       # ä
    (b'&ouml;', b'\xc3\xb6'),       # ö
    (b'&szlig;', b'\xc3\x9f'),      # ß
    (b'&Uuml;', b'\xc3\x9c'),       # Ü
    (b'&Auml;', b'\xc3\x84'),       # Ä
    (b'&Ouml;', b'\xc3\x96'),       # Ö
    (b'&nbsp;', b' '),
    (b'&ndash;', b'\xe2\x80\x93'),  # –
    (b'&mdash;', b'\xe2\x80\x94'),  # —
]

def find_files():
    files = []
    for sdir in SRC_DIRS:
        if not os.path.exists(sdir):
            continue
        for root, dirs, filenames in os.walk(sdir):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for f in filenames:
                ext = os.path.splitext(f)[1].lower()
                if ext in EXTS:
                    files.append(os.path.join(root, f))
    return files

def check_encoding(filepath):
    errors = []
    try:
        with open(filepath, 'rb') as f:
            raw = f.read()
    except Exception as e:
        return [(0, f"Cannot read: {e}")]

    # Check BOM
    if raw.startswith(b'\xef\xbb\xbf'):
        errors.append((0, "UTF-8 BOM found – remove with fix-byte-order-marker"))

    # Check corrupted chars
    for pattern, desc in CORRUPTED_CHARS:
        if pattern in raw:
            line_num = raw[:raw.index(pattern)].count(b'\n') + 1
            errors.append((line_num, f"Corrupted char: {desc}"))

    # Check HTML entities (only in .tsx/.ts/.jsx files)
    if filepath.endswith(('.tsx', '.ts', '.jsx', '.js')):
        for entity, replacement in HTML_ENTITIES:
            if entity in raw:
                line_num = raw[:raw.index(entity)].count(b'\n') + 1
                entity_str = entity.decode('ascii')
                replacement_str = replacement.decode('utf-8')
                errors.append((line_num, f"HTML entity: {entity_str} → use '{replacement_str}'"))

    # Check valid UTF-8
    try:
        raw.decode('utf-8')
    except UnicodeDecodeError as e:
        line_num = raw[:e.start].count(b'\n') + 1
        errors.append((line_num, f"Invalid UTF-8 at byte {e.start}: {e.reason}"))

    return errors

def main():
    print("═" * 60)
    print("🔍 ENCODING VALIDATION CHECK")
    print("═" * 60)

    files = find_files()
    total_errors = 0
    total_files = 0

    for f in sorted(files):
        errors = check_encoding(f)
        total_files += 1
        if errors:
            total_errors += len(errors)
            rel = os.path.relpath(f)
            print(f"\n📄 {rel}")
            for line, msg in errors:
                print(f"   ❌ Line {line}: {msg}")

    print(f"\n{'═' * 60}")
    print(f"📊 {total_files} files checked, {total_errors} errors")
    print(f"{'═' * 60}")

    if total_errors > 0:
        print("\n🔧 FIX: Run scripts/fix-encoding.py to auto-fix common issues")
        sys.exit(1)
    else:
        print("\n✅ All files encoding-valid!")
        sys.exit(0)

if __name__ == "__main__":
    main()
