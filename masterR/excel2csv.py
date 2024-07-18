import os
import re
import pandas as pd
import base64

def process_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        content = file.read()

    lines = content.splitlines()

    if lines:
        lines[0] = re.sub(r'\d+\.', '', lines[0])

    content = '\n'.join(lines)

    content = re.sub(r'^\d+\.', '', content, 0, re.MULTILINE)
    content = re.sub(r' +', '', content)
    content = re.sub(r'、', '.', content)
    content = re.sub(r'\&', '.', content)
    content = re.sub(r'\(', '.', content)
    content = re.sub(r'\)', '.', content)
    content = re.sub(r',{2,}', '', content)

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(content)

excel_file = 'master-flow.xlsx'

xls = pd.ExcelFile(excel_file, engine='openpyxl')

names_ary=[]

for sheet_name in xls.sheet_names:
    df = pd.read_excel(excel_file, sheet_name=sheet_name, engine='openpyxl')
    df.to_csv(f'{sheet_name}_old.csv', index=False)

    input_file = f'{sheet_name}_old.csv'
    output_file = f'{sheet_name}.csv'
    process_file(input_file, output_file)
    #remove old file
    os.remove(input_file)
    names_ary.append(output_file)

base64_array = [base64.b64encode(s.encode()).decode() for s in names_ary]
print(base64_array)
