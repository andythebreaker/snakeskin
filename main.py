import csv

def read_csv(file_path, x_, y_):
    # swap xy
    x = y_
    y = x_
    with open(file_path, 'r', encoding='utf-8') as csvfile:
        csvreader = csv.reader(csvfile)
        rows = list(csvreader)
        
        if x >= len(rows):
            raise IndexError("Row index out of range")
        
        if y >= len(rows[x]):
            raise IndexError("Column index out of range")
        
        value = rows[x][y]
        
        try:
            return abs(int(value))
        except ValueError:
            return value
        
def find_max_x_y(file_path):
    with open(file_path, 'r', encoding='utf-8') as csvfile:
        csvreader = csv.reader(csvfile)
        rows = list(csvreader)
        
        max_x = len(rows) - 1
        max_y = max(len(row) for row in rows) - 1
        # swap xy
        x = max_y
        y = max_x
        return x, y

op = ''
cn = 'b.csv'
x, y = find_max_x_y(cn)
print("this is how large the csv is: ", x, "*", y)
for i in range(x + 1):
    for j in range(y + 1):
        if i == 0 or j == 0:
            print('.', end='')
        else:
            op += f"{read_csv(cn, 0, j)} [{read_csv(cn, i, j)}] {read_csv(cn, i, 0)}\n"

# save file as op.txt
with open('op.txt', 'w', encoding='utf-8') as f:
    f.write(op)
