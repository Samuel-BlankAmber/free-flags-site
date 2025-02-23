import os

def rename_badge_files(directory):
    files = sorted(os.listdir(directory))
    for idx, filename in enumerate(files):
        old_path = os.path.join(directory, filename)
        if os.path.isfile(old_path):
            new_filename = f"{idx}.gif"
            new_path = os.path.join(directory, new_filename)
            os.rename(old_path, new_path)
            print(f"Renamed {filename} to {new_filename}")

if __name__ == "__main__":
    rename_badge_files("frontend/badges")
