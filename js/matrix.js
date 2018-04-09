function replaceColumn(matrix, vector, column){
    var res = Array ();
    for(var i = 0; i < matrix.length; i++){
        res[i] = matrix[i].slice();
        res[i][column] = vector[i];
    }
    return res;
}
function determinant(a){
    /*
    *  a =
    *   /                  \
    *   | a00   a01     a02 |
    *   | a10   a11     a12 |
    *   | a20   a21     a22 |
    *   \                  /
    */

    /*
    * /_\ a = a00 * (a11*a22 - a21*a12) 
    *           - a01 * (a10*a22 - a20*a12) 
    *           + a02 * (a10*a21 - a20*a11)
    */
   return a[0][0] * (a[1][1]*a[2][2] - a[2][1]*a[1][2]) 
            - a[0][1] * (a[1][0]*a[2][2] - a[2][0]*a[1][2]) 
            + a[0][2] * (a[1][0]*a[2][1] - a[2][0]*a[1][1]);
}
function metodKramera(matrixA, vectorB){
    var deltaA, deltaA12B, deltaA13B, deltaA23B;
    var A12B = Array(), A13B = Array(), A23B = Array();
    A12B = replaceColumn(matrixA, vectorB, 2);
    A13B = replaceColumn(matrixA, vectorB, 1);
    A23B = replaceColumn(matrixA, vectorB, 0);

    deltaA = determinant(matrixA);
    deltaA12B = determinant(A12B);
    deltaA13B = determinant(A13B); 
    deltaA23B = determinant(A23B);

    /*
    *  A12B =
    *   /                  \
    *   | a00   a01     b0 |
    *   | a10   a11     b1 |
    *   | a20   a21     b2 |
    *   \                  /
    *  
    * A1B3 = 
    *   /                  \
    *   | a00   b0     a02 |
    *   | a10   b1     a12 |
    *   | a20   b2     a22 |
    *   \                  /
    * 
    * AB23 =
    *   /                  \
    *   | b0   a01     a02 |
    *   | b1   a11     a12 |
    *   | b2   a21     a22 |
    *   \                  /
    * 
    * */

    let am1 = deltaA23B/deltaA;
    let am2 = deltaA13B/deltaA; 
    let bm = deltaA12B/deltaA;

    return {
        "am1" : am1,
        "am2" : am2,
        "bm" : bm
    }
}
function metodGaussa(matrixA, vectorB){
    var am1, am2, bm;
    return {
        "am1" : am1,
        "am2" : am2,
        "bm" : bm
    }
}