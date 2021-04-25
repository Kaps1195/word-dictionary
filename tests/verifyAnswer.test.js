const { verifyAnswer } = require('../helpers/Dictionary');
const DictionaryWords = require('../models/Dictionary.json');

const words = DictionaryWords;
words.map((eachWord) => {
    const { id, word } = eachWord;

    test(`verifyAnswer should be a truthy value -> ${word} being evaluated`, () => {
        expect(verifyAnswer(id, word)).toBeTruthy();
    });
});