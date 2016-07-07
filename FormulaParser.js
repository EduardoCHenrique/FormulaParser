let formula = '(1 / (1 * 1))';
formula = '(1)';

class FormulaParser {
    constructor() {
        this.index = 0;
        this.lexemes = {
            delimiters: {
                tokens: '()',
                expect: [ 'identifiers', 'value' ]
            },
            operations: {
                tokens:  '+-*/',
                expect: ['value', 'identifiers']
            },
            identifiers: {
                tokens:  'abcdefghijklmnopqrstuvxyz',
                expect: ['operation', 'delimiters']
            },
            value: {
                tokens:  '0123456789' ,
                expect: ['operation', 'delimiter']
            }
        };

        this.states = ['scope']; 

        this.currentExpectation = ['delimiters', 'identifiers', 'value'];
    }

    parse(input) {    
        while(this.index <= input.length) {
            const current = input[this.index];

            if( this.match(current, this.lexemes.delimiters.tokens) && this.match('delimiters', this.currentExpectation) ) {
                this.currentExpectation = this.lexemes.delimiters.expect;
            }

            if( this.match(current, this.lexemes.identifiers.tokens) && this.match('identifiers', this.currentExpectation) ) {
                this.currentExpectation = this.lexemes.identifiers.expect;
            }

            if( this.match(current, this.lexemes.value.tokens) && this.match('value', this.currentExpectation) ) {
                this.currentExpectation = this.lexemes.value.expect;
            }

            this.index++
        }
    }

    match(input, token) {
        if (Array.isArray(token)){
            token = token.join('')
        }

        // const tokenArray = token.
        // console.log('IIIIIII', input.split(''), token)
        if (token.split('').find( function(index) { return input === index }) !== -1 ) {
            return true;
        }
        return false;
    }
}

const formulaParser = new FormulaParser();

formulaParser.parse(formula);
