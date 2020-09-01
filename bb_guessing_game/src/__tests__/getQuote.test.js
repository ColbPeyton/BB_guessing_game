const getQuote = require('../helpers/getQuote');

test('Retrieved random quote from API', ()=>{
    getQuote(1)
    .then(quote => expect(quote)
    .toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {
	                quote: expect.any(String),
		            author: expect.any(String)
                }
            )
        ])
    ));
});

test('Retrieve 3 quotes from API', ()=>{
    getQuote(3)
    .then(quote => expect(quote)
    .toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {
	                quote: expect.any(String),
		            author: expect.any(String)
                },
                {
	                quote: expect.any(String),
		            author: expect.any(String)
                },
                {
	                quote: expect.any(String),
		            author: expect.any(String)
                }
            )
        ])
    ));
});