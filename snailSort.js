const snail = (array) => {
  let result;

  while (array.length) {

    // get the first row/array, and shift the entire row out of
    // our working array and into our result array
    result = (result ? result.concat(array.shift()) : array.shift());

    // loop through the remaining arrays, and pop the last item off
    // of each to add it to our result array
    for (var i = 0; i < array.length; i++)
      result.push(array[i].pop());

    // get the entire bottom row and pop it out of our working array
    // reverse the items in it and add them to our result array
    result = result.concat((array.pop() || []).reverse());

    // loop through the remaining arrays, and run a for loop in reverse
    // to push each of the first items for each array into our result
    for (var i = array.length - 1; i >= 0; i--)
      result.push(array[i].shift());
  }

  return result;
}
