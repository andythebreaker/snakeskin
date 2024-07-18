import os
import glob

# Get the current working directory
directory = os.getcwd()

# Use glob to find all .csv files in the current directory
csv_files = glob.glob(directory + '/*.csv')

# Iterate over the list of .csv files and remove them
for file in csv_files:
    os.remove(file)

print(f"All .csv files in {directory} have been removed.")
