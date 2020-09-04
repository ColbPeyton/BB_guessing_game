const getImage = require('../helpers/getImage');


test('Get image of Walter White', ()=>{
    getImage('Walter White')
    .then(image => expect(image)
    .toEqual(expect.objectContaining(
        {
            name: 'Walter White',
            img: expect.any(String)
        }
    ))
    )
});