import re

def add_debug_logs(file_name):
    with open(file_name, 'r') as file:
        code = file.read()

    # Regular expression to match function definitions
    function_pattern = re.compile(r'(function\s+(\w+)\s*\([^)]*\)\s*\{)|(const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{)|(let\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{)|(var\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{)')
    
    def replacer(match):
        if match.group(2):
            function_name = match.group(2)
        elif match.group(4):
            function_name = match.group(4)
        elif match.group(6):
            function_name = match.group(6)
        elif match.group(8):
            function_name = match.group(8)
        else:
            function_name = 'anonymous'
        debug_log = f"console.log('debug{function_name}');\n"
        return match.group(0) + debug_log
    
    modified_code = function_pattern.sub(replacer, code)

    with open(file_name, 'w') as file:
        file.write(modified_code)

# Specify your JavaScript file name
file_name = 'plotly-2.33.0_m1.js'
add_debug_logs(file_name)
