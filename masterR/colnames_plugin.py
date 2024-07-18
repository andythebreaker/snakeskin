# import area
import base64
import os
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <filename>")
        return
    filename = sys.argv[1]
    current_dir = os.getcwd()  # Get the current working directory
    # Combine current directory path and filename
    file_path = os.path.join(current_dir, filename)
    # Open the file in read mode
    with open(file_path, 'r', encoding='utf-8') as file:
        # Read the first line
        first_line = file.readline()
        # remove first `,` and stuff before it
        first_line = first_line[first_line.index(',')+1:]
        # Split the line by commas and filter out empty strings
        items = [base64.b64encode(str(item.strip()).encode()).decode() for item in first_line.split(',') if item.strip()]
        # str(items) to base64 string
        print(base64.b64encode(str(items).encode()).decode())
        # print(items)

if __name__ == "__main__":
    main()