#!/bin/sh

# Fetch the latest release information from GitHub API
latest_release_info=$(curl -s https://api.github.com/repos/opensyncsolutions/frontend/releases/latest)

# Extract the browser download URL for the zip file
zip_url=$(echo $latest_release_info | jq -r '.assets[] | select(.name == "app.zip") | .browser_download_url')

# Check if zip_url is not empty
if [ -z "$zip_url" ]; then
    echo "No app.zip file found in the latest release"
    exit 1
fi

# Download the zip file
wget -O app.zip $zip_url

mkdir ./client

# Unzip the downloaded release
unzip app.zip -d ./client

# Clean up
rm app.zip
