const getAnswers = require('../helpers/getAnswers');


test('Generate an array(4) of answer objects', ()=>{
    expect(getAnswers("Walter White"))
    .toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {
                    name: expect.any(String),
                    correct: expect.any(Boolean)
                },
                {
                    name: expect.any(String),
                    correct: expect.any(Boolean)
                },
                {
                    name: expect.any(String),
                    correct: expect.any(Boolean)
                },
                {
                    name: expect.any(String),
                    correct: expect.any(Boolean)
                },
            )
        ])
    )
})
