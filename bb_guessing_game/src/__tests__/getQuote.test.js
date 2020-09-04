import {getQuote, getAmountOfQuotes} from '../helpers/getQuote';

test('Retrieved Walter White quote from API', ()=>{
    getQuote('Walter White')
    .then(quote => expect(quote)
    .toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {
                    quote_id: expect.any(Number),
	                quote: expect.any(String),
                    author: expect.any(String),
                    series: "Breaking Bad"
                }
            )
        ])
    ));
});

test('Retrieve 3 quotes from API', ()=>{
    getAmountOfQuotes(3, ['Walter White', 'Saul Goodman', 'Walter White'])
    .then(quote => expect(quote)
    .toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {
                    quote_id: expect.any(Number),
	                quote: expect.any(String),
                    author: expect.any(String),
                    series: "Breaking Bad"
                }
            ),
            expect.objectContaining(
                {
                    quote_id: expect.any(Number),
	                quote: expect.any(String),
                    author: expect.any(String),
                    series: "Breaking Bad"
                }
            ),
            expect.objectContaining(
                {
                    quote_id: expect.any(Number),
	                quote: expect.any(String),
                    author: expect.any(String),
                    series: "Breaking Bad"
                }
            )
        ])
    ));
});