#!/bin/bash

cd data

# Filter to only five-letter words
cat all_words.txt | grep -x '.\{6\}' > five_letter_words.txt

# Create json array
DICTIONARY_FILE="dictionary-array.js"
echo "export default [" > $DICTIONARY_FILE
sed 's/$/",/' five_letter_words.txt | sed 's/^/"/' | sed '$s/,$//' >> $DICTIONARY_FILE
echo "];" >> $DICTIONARY_FILE

# Get common words
curl https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears-medium.txt \
    -o common_words.txt
COMMON_WORDS_FILE="common-words.js"
echo "export default [" > $COMMON_WORDS_FILE
cat common_words.txt | grep -x '.\{5\}' | sed 's/$/",/' | sed 's/^/"/' | sed '$s/,$//' >> $COMMON_WORDS_FILE
echo "];" >> $COMMON_WORDS_FILE

node create_dictionary.js