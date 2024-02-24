#!/bin/bash

USERNAME="flexcodelabs"
REPO="rkpk-releases"

# Set the output folder
OUTPUT_FOLDER="./files"

curl -s "https://api.github.com/repos/$USERNAME/$REPO/releases/latest" \
     | jq -r '.assets[0].browser_download_url' \
     | xargs -I {} curl -L -o "$OUTPUT_FOLDER/$(basename {})" {}