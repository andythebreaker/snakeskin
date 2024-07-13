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
print(output)

clean_str <- gsub("\\[|\\]|'", "", output)
string_list <- strsplit(clean_str, ",")[[1]]
string_list <- trimws(string_list)


color_list <- list("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#FFC0CB")
colst <- list()
colst <- c(colst, color_list[length(color_list)])
lglst <- list()

for (i in seq_along(string_list)) {
    elem <- string_list[i]
    print(elem)
    decoded_raw <- base64_decode(elem)
    decoded_string <- rawToChar(decoded_raw)
    print(decoded_string)
    data <- read.csv(decoded_string, header = TRUE, stringsAsFactors = FALSE, row.names = 1)
    outputs <- colnames(data)[]
    inputs <- rownames(data)[]
    if (i == 1) {
        nodes <- c(inputs, outputs)
        lglst <- c(lglst, length(inputs), length(outputs))
    } else {
        nodes <- c(nodes, outputs)
        lglst <- c(lglst, length(outputs))
    }
    process_data(inputs, outputs, data)
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
