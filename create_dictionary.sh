#!/bin/bash

# Filter to only five-letter words
cat ./data/all_words.txt | grep -x '.\{6\}' > ./data/five_letter_words.txt

# Create json array
DICTIONARY_FILE="./data/dictionary-array.js"
echo "export default [" > $DICTIONARY_FILE
sed 's/$/",/' ./data/five_letter_words.txt | sed 's/^/"/' | sed '$s/,$//' >> $DICTIONARY_FILE
echo "];" >> $DICTIONARY_FILE
node ./data/assign_frequency.js
