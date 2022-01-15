#!/bin/bash

cat ./data/all_words.txt | grep -x '.\{6\}' > ./data/five_letter_words.txt
