import argparse
import subprocess

# Define argument parser
parser = argparse.ArgumentParser(description='Generate Sankey diagram using R')
parser.add_argument('-nodes', required=True, help='Comma-separated list of node labels')
parser.add_argument('-linkss', required=True, help='Comma-separated list of source indices')
parser.add_argument('-linkst', required=True, help='Comma-separated list of target indices')
parser.add_argument('-linksv', required=True, help='Comma-separated list of link values')

# Parse arguments
args = parser.parse_args()

# Convert comma-separated strings to lists
nodes = args.nodes.split(',')
linkss = args.linkss.split(',')
linkst = args.linkst.split(',')
linksv = args.linksv.split(',')

# Save the arguments to a file (optional)
with open('arguments.txt', 'w') as f:
    f.write(f'nodes={nodes}\n')
    f.write(f'linkss={linkss}\n')
    f.write(f'linkst={linkst}\n')
    f.write(f'linksv={linksv}\n')

# Call the R script with arguments
subprocess.run(['Rscript', 'generate_sankey.R', args.nodes, args.linkss, args.linkst, args.linksv])
