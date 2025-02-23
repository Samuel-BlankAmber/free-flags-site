import os
import base64

def process_badges(directory):
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            with open(filepath, 'r') as f:
                content = f.read().strip()
            if content.startswith("base64,"):
                b64_data = content[len("base64,"):]
                binary_data = base64.b64decode(b64_data)
                with open(filepath, 'wb') as f:
                    f.write(binary_data)
                print(f"Processed {filename}")
            else:
                print(f"Skipped {filename} (no base64 prefix)")

if __name__ == "__main__":
    process_badges("frontend/badges")
