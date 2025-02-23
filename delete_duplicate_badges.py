import os

def remove_duplicate_prefix_files(directory):
    seen_prefixes = set()
    for filename in sorted(os.listdir(directory)):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            prefix = filename[:6]
            if prefix in seen_prefixes:
                os.remove(filepath)
                print(f"Deleted {filename} (duplicate prefix: {prefix})")
            else:
                seen_prefixes.add(prefix)
                print(f"Kept {filename} (prefix: {prefix})")

if __name__ == "__main__":
    remove_duplicate_prefix_files("frontend/badges")
