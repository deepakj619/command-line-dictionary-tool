# command-line-directory-tool
A simple command line directory tool built using an API.


The command-line tool should have the following functions - 

1. Word Definitions : Display definitions of a given word.

            dict defn <word>

2. Word Synonyms: Display synonyms of a given word. 

            dict syn <word>

3. Word Antonyms: Display antonyms of a given word. Note that not all words would have Antonyms (End point: /relatedWords). Example words with antonyms: single, break, start.

            dict ant <word>

4. Word Examples: Display examples of usage of a given word in a sentence. 

            dict ex <word>

5. Word Full Dict: Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word.

            dict full-dict <word>

6. Word of the Day Full Dict: Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a random word.

            dict full-dict-random
            
7. Word Game: This command is used display a definition, a synonym or an antonym and ask the user to guess the word. 
            dict play

