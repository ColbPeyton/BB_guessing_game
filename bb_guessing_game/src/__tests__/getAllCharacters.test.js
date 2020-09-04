import {getAllCharacters, getAmountOfCharacters} from '../helpers/getAllCharacters';

test('Return array of all character objects', ()=>{
    getAllCharacters()
    .then(character => expect(character)
    .toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                expect.anything()
            )
        ])
    ));
})

test('Return array of 3 random chacters from chacter object on easy', ()=>{
    expect(getAmountOfCharacters(3, 1))
    .toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {
                    name : expect.any(String),
                    img: expect.any(String)
                }
            ),
            expect.objectContaining(
                {
                    name : expect.any(String),
                    img: expect.any(String)
                }
            ),
            expect.objectContaining(
                {
                    name : expect.any(String),
                    img: expect.any(String)
                }
            )
        ])
    )
})
