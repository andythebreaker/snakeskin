import webbrowser
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
    
    # Convert the file path to a URL with 'file://' scheme
    url = 'file://' + file_path.replace('\\', '/')  # Use forward slashes for URLs
    
    # Open the URL in the web browser
    webbrowser.open(url)

if __name__ == "__main__":
    main()
