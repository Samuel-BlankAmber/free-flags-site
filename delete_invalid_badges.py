import os
from PIL import Image

def remove_non_standard_gifs(directory):
    for filename in os.listdir(directory):
        if not filename.lower().endswith('.gif'):
            continue
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            try:
                with Image.open(filepath) as img:
                    if img.size != (88, 31):
                        os.remove(filepath)
                        print(f"Deleted {filename}: size {img.size} != (88, 31)")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    remove_non_standard_gifs("frontend/badges")
