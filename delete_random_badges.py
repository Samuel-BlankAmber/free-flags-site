import os
import random

def trim_gifs(directory, target_count=100):
    # Get a list of all gif files in the directory
    gif_files = [f for f in os.listdir(directory) if f.lower().endswith('.gif')]
    
    # Continue deleting random gifs until only target_count remain
    while len(gif_files) > target_count:
        file_to_delete = random.choice(gif_files)
        file_path = os.path.join(directory, file_to_delete)
        os.remove(file_path)
        gif_files.remove(file_to_delete)
        print(f"Deleted {file_to_delete}. {len(gif_files)} gifs remaining.")

if __name__ == "__main__":
    trim_gifs("frontend/badges")
