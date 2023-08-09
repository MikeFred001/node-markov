"use strict";

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = {};
    for (let word = 0; word < this.words.length; word++) {
      if (chains[this.words[word]]) {
        chains[this.words[word]].push(this.words[word + 1] || null);
      } else {
        chains[this.words[word]] = [this.words[word + 1]];
      }
    }
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    let chains = this.getChains();
    let story = `${Object.keys(chains)[0]}`;

    for(let wordList in chains) {
      console.log(wordList);
      let idx = Math.floor(Math.random() * chains[wordList].length);
      if (!chains[wordList][idx]) {
        return story;
      } else if (chains[wordList][idx]) {
        story += ` ${chains[wordList][idx]}`;
      }
    }

    return story;
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    }
}


module.exports = {
  MarkovMachine,
};
