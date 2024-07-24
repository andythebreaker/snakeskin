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
