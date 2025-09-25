#!/usr/bin/env python3
# rename_pngs.py
# Rename/move certificate image files from a source folder to a destination folder.
# No PDF work—just renaming based on a mapping. Uses your given source/destination.

from pathlib import Path
from datetime import datetime
import json, shutil, sys

# --- YOUR PATHS (hardcoded) ---
SRC_DIR = Path(r"G:/Web_Development/astral-intro-hub/pdf").resolve()
DST_DIR = (SRC_DIR / "certs").resolve()   # certs inside the same folder
DST_DIR.mkdir(parents=True, exist_ok=True)

# --- MAPPING: current filename -> new filename (PNG names) ---
RENAME_MAP = {
    # typing.com
    "1min.png": "typing_37wpm_2024.png",
    "1page-type.png": "typing_38wpm_2024.png",

    # Simplilearn
    "Agile Scrum Foundation.png": "agile_scrum_foundation_2025.png",
    "ai-agent.png": "ai_agent_beginners.png",
    "chatGTP -customer.png": "chatgpt_customer_support_2025.png",
    "GTP for customer support.png": "chatgpt_customer_support_2025.png",  # duplicate -> will be suffixed

    # Google/MIT RAISE
    "genAI.png": "gen_ai_educators_google.png",

    # ICT Olympiad
    "ictOlympiad.png": "ict_olympiad_participant.png",

    # Kaggle
    "Md Abu Sufyan - Intro to Machine Learning.png": "kaggle_intro_ml_2024-06-30.png",
    "Md Abu Sufyan - Intro to Machine Learning-2nd Time.png": "kaggle_intro_ml_2024-07-09.png",

    # Semiconductor
    "Md Abu Sufyan Semicondutor.jpg": "semiconductor_2025.png",

    # EDGE Laravel
    "php-laravel.png": "edge_php_laravel_2025.png",

    # Courses
    "Prompt Engineering.png": "prompt_engineering_2025.png",
    "Python Crash Course.png": "python_crash_course.png",

    # SDG Primer
    "sdgPrimet.png": "sdg_primer_2025.png",

    # IELTS Speaking participant
    "spoken.png": "ielts_speaking_module_2025.png",

    # Workplace communication
    "workplace.png": "workplace_communication_essentials_2024.png",
}

def unique_path(p: Path) -> Path:
    """Add _2, _3, ... if the target exists to avoid overwriting."""
    if not p.exists():
        return p
    i = 2
    while True:
        q = p.with_name(f"{p.stem}_{i}{p.suffix}")
        if not q.exists():
            return q
        i += 1

def move_file(src: Path, dst: Path):
    """
    Try atomic rename; if cross-device or other issue, fallback to shutil.move.
    """
    try:
        src.replace(dst)   # fast when same volume
    except OSError:
        shutil.move(str(src), str(dst))  # robust fallback

def main():
    # Guard: source must exist
    if not SRC_DIR.exists():
        print(f"[ERROR] Source directory not found: {SRC_DIR}")
        sys.exit(1)

    actions, missing = [], []

    for src_name, dst_name in RENAME_MAP.items():
        src = SRC_DIR / src_name
        if not src.exists():
            missing.append(src_name)
            continue

        # Always write PNG in destination folder (just renaming, no conversion)
        dst = unique_path(DST_DIR / Path(dst_name).with_suffix(".png").name)
        move_file(src, dst)
        actions.append({"from": src.name, "to": dst.name})

    # Report
    print("Renamed/moved files:")
    for a in actions:
        print(f"- {a['from']}  ->  {a['to']}")

    if missing:
        print("\nMissing files (not found in source folder):")
        for m in missing:
            print(f"- {m}")

    # Log
    log = {
        "src_dir": str(SRC_DIR),
        "dst_dir": str(DST_DIR),
        "renamed": actions,
        "missing": missing,
        "timestamp": datetime.now().isoformat(timespec="seconds"),
    }
    with open(DST_DIR / "rename_png_log.json", "w", encoding="utf-8") as f:
        json.dump(log, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
