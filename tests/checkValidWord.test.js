const { checkValidWord } = require('../helpers/Dictionary');
const DictionaryWords = require('../models/Dictionary.json');

const words = DictionaryWords;
// words.push({word: 'nope'});
words.map((eachWord) => {
    const { word } = eachWord;
    test(`checkValidWord should return a valid word present in our db -> ${word} being evaluated`, () => {
        expect(checkValidWord(word)).toBeTruthy();
      });
});
