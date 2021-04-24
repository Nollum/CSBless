/**
 * Function to round a number to one decimal place.
 * 
 * @see Math
 * 
 * @param {number} x The number to be checked.
 * 
 * @return The rounded number.
 */
function round(x) {
    return Math.round(x * 10) / 10;
}

/**
 * Function to check whether or not a value is safe to use.
 * 
 * Function checks if a parameter x is between 5,000,000 and -5,000,000. If it's not, it throws an exception.
 * 
 * @param {number} x The number to be checked.
 */
function is_safe(x) {
    const max_safe = 5000000;
    const min_safe = -5000000;
    if (x < min_safe || x > max_safe) {
        throw new Error("Error: one or more entries are too large to use.");
    }
}

/**
 * Private helper function to take a vector-formatted string and parse an array.
 *
 * Given a string of the form "[a1,a2,...,an]", where a1-an are real numbers, this function
 * takes a1-an, parces a float value and places them into an array[float]. If the input is formatted
 * incorrectly, or it doesn't match a given size requirement, it throws the appropriate error.
 *
 * @access private
 * @alias  parse_vector
 * @see    is_safe
 * 
 * @param {int}    size The specified size of the vector.
 * @param {string} v    The vector string.
 * 
 * @return {array} The vector array.
 */
function parseVector(v, size = 0) {
    const check = /\[[0-9-.,]+[0-9-.]*\]/; //regex for array of floats
    if (check.test(v)) { //checks arg against the regex
        vector = v.substring(1, v.length - 1).split(','); //parses the numbers into an array
        if (vector.length !== size && size > 0) { //runs if one of the vectors isn't the right size
            throw new Error("Error: one of the vectors is not of the right size.");
        }
        for (let i = 0; i < size; i++) { //parses floats from a1-an
            vector[i] = parseFloat(vector[i]);
            is_safe(vector[i]);
        }
    } else { //runs if vector is not fotmatted properly
        throw new Error("Error: one of the vectors is invalid.");
    }
    return vector;
}

/**
 * Takes the dot product of two given vector-formatted strings.
 *
 * Given two strings of the form "[a1,a2,...,an]", where a1-an are real numbers, this function
 * parses the vector array[float] values of both and takes the dot product of the two
 * resulting vectors. ex. v1 = "[0,1,2]", v2 = "[3,4,5]", function returns 0*3 + 1*4 + 2*5 = 14.
 * If the two vectors are not the same size or are not formatted properly, fucntion throws an error.
 *
 * @alias  dot_product
 * @see    parse_vector
 * @see    is_safe
 * @see    round
 * 
 * @param {str} v1 The first vector string.
 * @param {str} v2 The second vector string.
 * 
 * @return {number} The dot product of the two vectors.
 */
const dot_product = function(v1, v2) {
    const vector1 = parseVector(v1);
    const vector2 = parseVector(v2, vector1.length);
    let x = 0;
    for (let i = 0; i < vector1.length; i++) {
        x = x + (vector1[i] * vector2[i]);
        is_safe(x);
    }
    return x;
};

/**
 * Takes the cross product of two given vector-formatted strings.
 *
 * Given two strings of the form "[a1,a2,a3]", where a1,a2,a3 are real numbers, this function
 * parses the vector array[float] values of both and takes the cross product of the two
 * resulting vectors. ex. v1 = "[0,0,1]", v2 = "[1,0,0]", function returns [0,1,0]
 * If the two vectors are not in R^3 or are not formatted properly, fucntion throws an error.
 *
 * @alias cross_product
 * @see   parse_vector
 * @see   is_safe
 * @see   round
 * 
 * @param {str} v1 The first vector string.
 * @param {str} v2 The second vector string.
 * 
 * @return {array[num]} The cross product of the two vectors.
 */
const cross_product = function(v1, v2) {
    const vector1 = parseVector(v1, 3);
    const vector2 = parseVector(v2, 3);
    let x = [];
    for (let i = 0; i < 3; i++) {
        const index1 = (i + 1) % 3;
        const index2 = (i + 2) % 3;
        x[i] = round((vector1[index1] * vector2[index2]) - (vector1[index2] * vector2[index1]));
        is_safe(x[i]);
    }
    return x;
};

/**
 * Adds a given array of vector-formatted strings.
 *
 * Given an array of strings of the form "[a1,a2,...,an]", where a1-an are real numbers, this function
 * parses the vector array[float] values of each and adds all of the
 * resulting vectors. ex. v = ["[0,1", "[1,1]", "[1,0]"], function returns [2,2]
 * If any of the vectors are not the same size or are not formatted properly, fucntion throws an error.
 *
 * @alias add_vectors
 * @see   parse_vector
 * @see   is_safe
 * 
 * @param {array[str]} v The array of vector strings.
 * 
 * @return {array[num]} The addition of the vectors
 */
 const add_vectors = function(v) {
    const vectors = []
    vectors[0] = parseVector(v[0]);
    const size = vectors[0].length
    for (let i = 1; i < v.length; i++) {
        vectors[i] = parseVector(v[i], size)
    }
    let x = [];
    for (let i = 0; i < size; i++) {
        x[i] = 0;
        for (let j = 0; j < vectors.length; j++) {
            x[i] += vectors[j][i] * 1;
            is_safe(x[i]);
        }
    }
    return x;
};

/**
 * Function that take the length of 
 * 
 * @see parseVector
 * @see is_safe
 * @see Math
 * 
 * @param {string} v The vector who's length is to be calculated.
 * @param {boolean} [square] When set to true, function gives the square of the length, set to false by default.
 * @returns 
 */
const length = function(v, square = false) {
    vector = parseVector(v);
    let length = 0;
    for (i in vector) {
        length += i * i;
        is_safe(length);
    }
    if (square) {
        return length;
    }
    return Math.sqrt(length);
};

//TODO: finish
const projection = function(u, v) {
    return dot_product(u, v) / length(u, true);
};

//exporting functions
module.exports = {
    cp: cross_product,
    dp: dot_product,
    add: add_vectors
}
