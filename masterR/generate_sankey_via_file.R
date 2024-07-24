# Load necessary libraries
package_lst <- list("htmlwidgets", "openssl", "plotly")

for (package_name in package_lst) {
  if (!requireNamespace(package_name, quietly = TRUE)) {
    install.packages(package_name)
    cat(paste("Package", package_name, "was not installed. Installing now...\n"))
    library(package_name, character.only = TRUE)
  } else {
    library(package_name, character.only = TRUE)
    cat(paste("Package", package_name, "is already installed.\n"))
  }
}

# Read command line arguments
args <- commandArgs(trailingOnly = TRUE)

nodes <<- list()#<- strsplit(args[1], ",")[[1]]
linkss <<- list()#<- as.numeric(strsplit(args[2], ",")[[1]])
linkst <<- list()#<- as.numeric(strsplit(args[3], ",")[[1]])
linksv <<- list()#<- as.numeric(strsplit(args[4], ",")[[1]])

# Specify the path to your text file
file_path <- args[1]

# Read the file line by line
lines <- readLines(file_path)

# Print each line
var_idx <- 0
for (line in lines) {
  if (var_idx == 0) {
    nodes <- strsplit(line, ",")[[1]]
  }else if (var_idx == 1) {
    linkss <- strsplit(line, ",")[[1]]
  }else if (var_idx == 2) {
    linkst <- strsplit(line, ",")[[1]]
 } else if (var_idx == 3) {
    linksv <- strsplit(line, ",")[[1]]
  }else {
    #do nothing
  }
  var_idx <- var_idx + 1
}

# Plotly Sankey diagram
fig <- plot_ly(
  type = "sankey",
  orientation = "h",
  node = list(
    label = nodes,
    pad = 15,
    thickness = 20,
    line = list(
      color = "#ddb98b",
      width = 0.5
    )
  ),
  link = list(
    source = linkss,
    target = linkst,
    value = linksv
  )
)

fig <- fig %>% layout(
  title = "Sankey Diagram",
  font = list(size = 15)
)

fig

saveWidget(fig, file = "plotly_figure.html") # Save as HTML file and view in a browser
system2("python", args = c("open_default_web.py", "plotly_figure.html"), stdout = FALSE, stderr = FALSE)
system2("python", args = c("cleanCSV.py"), stdout = FALSE, stderr = FALSE)
