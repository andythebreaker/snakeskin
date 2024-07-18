# Define the package name
package_lst <- list("htmlwidgets", "openssl", "plotly")

for (package_name in package_lst) {
  # Check if the package is not installed
  if (!requireNamespace(package_name, quietly = TRUE)) {
    # If not installed, install the package
    install.packages(package_name)
    cat(paste("Package", package_name, "was not installed. Installing now...\n"))
    # Load the package after installation
    library(package_name, character.only = TRUE)
  } else {
    # If already installed, just load the package
    library(package_name, character.only = TRUE)
    cat(paste("Package", package_name, "is already installed.\n"))
  }
}

# Define the global variables
linkss <<- list()
linkst <<- list()
linksv <<- list()
process_data <- function(inputs, outputs, data) {
  for (i in 1:length(inputs)) {
    for (j in 1:length(outputs)) {
      value <- data[i, j]
      if (value > 0) {
        linkss <<- append(linkss, which(nodes == inputs[i]) - 1)
        linkst <<- append(linkst, which(nodes == outputs[j]) - 1)
        linksv <<- append(linksv, value)
      }
    }
  }
}

output <- system2("python", args = c("excel2csv.py"), stdout = TRUE, stderr = TRUE)

clean_str <- gsub("\\[|\\]|'", "", output)
string_list <- strsplit(clean_str, ",")[[1]]
string_list <- trimws(string_list)


color_list <- list("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#FFC0CB")
colst <- list()
# colst <- c(colst, color_list[length(color_list)])
lglst <- list()

var_color_count <- 0
for (i in seq_along(string_list)) {
  elem <- string_list[i]
  decoded_raw <- base64_decode(elem)
  decoded_string <- rawToChar(decoded_raw)
  data <- read.csv(decoded_string, header = TRUE, stringsAsFactors = FALSE, row.names = 1)
  outputs <- colnames(data)[]
  # hot fix str.comp
  colnames_output <- c()
  hot_fix_str_comp <- system2("python", args = c("colnames_plugin.py", decoded_string), stdout = TRUE, stderr = TRUE)
  colnames_lst_b64 <- rawToChar(base64_decode(hot_fix_str_comp))
  colnames_lst_b64_clean_str <- gsub("\\[|\\]|'", "", colnames_lst_b64)
  colnames_lst <- strsplit(colnames_lst_b64_clean_str, ",")[[1]]
  colnames_lst <- trimws(colnames_lst)
  for (colnames_lst_idx in colnames_lst) {
    var_tmp <- rawToChar(base64_decode(colnames_lst_idx))
    colnames_output <- c(colnames_output, var_tmp)
  }
  outputs <- colnames_output

  inputs <- rownames(data)[]
  if (i == 1) {
    nodes <- c(inputs, outputs)
    lglst <- c(lglst, length(inputs), length(outputs))
    var_color_count <- var_color_count + 2
  } else {
    var_node_len_before <- length(nodes)
    nodes <- union(nodes, outputs)
    var_node_len_after <- length(nodes)
    if (var_node_len_after - var_node_len_before > 0) {
      lglst <- c(lglst, var_node_len_after - var_node_len_before)
      var_color_count <- var_color_count + 1
    }
    var_node_len_before <- length(nodes)
    nodes <- union(nodes, inputs)
    var_node_len_after <- length(nodes)
    if (var_node_len_after - var_node_len_before > 0) {
      lglst <- c(lglst, var_node_len_after - var_node_len_before)
      var_color_count <- var_color_count + 1
    }
  }
  process_data(inputs, outputs, data)
  print("=============================[displaying...] inputs=============================")
  print(inputs)
  print("-----------------------------[displaying...] outputs-----------------------------")
  print(outputs)
  print("-----------------------------[displaying...] data-----------------------------")
  print(data)
  print("=============================[end of display]=============================")
}
for (i in 0:(var_color_count - 1)) {
  colst <- c(colst, color_list[i %% length(color_list) + 1])
}

# Plotly Sankey diagram
fig <- plot_ly(
  type = "sankey",
  orientation = "h",
  node = list(
    label = nodes,
    color = rep(colst, times = lglst),
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
