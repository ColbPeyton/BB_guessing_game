export async function getImage (name){
    const updatedName = name.replace(/\s/g, '+');
    const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${updatedName}`)
    const data = await response.json();
    return data;
}



export default{
    getImage
}




