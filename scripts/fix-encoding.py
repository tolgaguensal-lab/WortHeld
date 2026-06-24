#!/usr/bin/env python3
"""
🔧 Auto-Fix Encoding Issues
============================
Behebt automatisch:
  1. Korrupte UTF-8 Zeichen
  2. HTML-Entities → echte Umlaute
  3. BOM-Marker entfernen

Usage: python3 scripts/fix-encoding.py [--dry-run]
"""
import os
import sys

SRC_DIRS = ["src", "prisma", "scripts"]
EXTS = {".ts", ".tsx", ".js", ".jsx", ".mjs"}
EXCLUDE_DIRS = {"node_modules", ".next", ".git", "test-results"}

# Korrupt → Korrekt
FIXES = {
    b'\xc2\xa0': b' ',          # NBSP
    b'\xc2\xb7': b'\xc2\xb7',   # middle dot (already correct in UTF-8, but sometimes double-encoded)
    b'\xe2\x80\x93': b'\xe2\x80\x93',  # en dash
    b'\xe2\x80\x94': b'\xe2\x80\x94',  # em dash
    b'\xc3\x83\xc2': None,      # Special: double-encoded UTF-8 prefix → flag for manual review
}

# HTML-Entities → echte Zeichen
ENTITY_FIXES = [
    (b'&uuml;', '\xfc'.encode('latin-1')),    # ü
    (b'&auml;', '\xe4'.encode('latin-1')),    # ä
    (b'&ouml;', '\xf6'.encode('latin-1')),    # ö
    (b'&szlig;', '\xdf'.encode('latin-1')),   # ß
    (b'&Uuml;', '\xdc'.encode('latin-1')),    # Ü
    (b'&Auml;', '\xc4'.encode('latin-1')),    # Ä
    (b'&Ouml;', '\xd6'.encode('latin-1')),    # Ö
    (b'&nbsp;', b' '),
    (b'&ndash;', b'\xe2\x80\x93'),            # –
    (b'&mdash;', b'\xe2\x80\x94'),            # —
]

DRY_RUN = '--dry-run' in sys.argv

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

def fix_file(filepath):
    with open(filepath, 'rb') as f:
        raw = f.read()

    original = raw
    changes = 0

    # Remove BOM
    if raw.startswith(b'\xef\xbb\xbf'):
        raw = raw[3:]
        changes += 1

    # Fix HTML entities
    for entity, replacement in ENTITY_FIXES:
        count = raw.count(entity)
        if count > 0:
            raw = raw.replace(entity, replacement)
            changes += count

    if changes > 0 and raw != original:
        rel = os.path.relpath(filepath)
        print(f"  🔧 {rel}: {changes} fixes")
        if not DRY_RUN:
            with open(filepath, 'wb') as f:
                f.write(raw)
        return changes
    return 0

def main():
    print("═" * 50)
    mode = "DRY RUN" if DRY_RUN else "FIXING"
    print(f"🔧 ENCODING AUTO-FIX ({mode})")
    print("═" * 50)

    files = find_files()
    total = 0
    for f in sorted(files):
        total += fix_file(f)

    print(f"\n📊 {total} fixes applied to {len(files)} files")
    if DRY_RUN:
        print("   Run without --dry-run to apply fixes")

if __name__ == "__main__":
    main()
