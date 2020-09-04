module.exports = function filterByKey(array, key) {
    const result = [];
    console.log(JSON.stringify(array));

    for(let i = 0; i < array.length; i++){
        result.push(array[i][0][key])
    }

    console.log(result)
    return result;
  }