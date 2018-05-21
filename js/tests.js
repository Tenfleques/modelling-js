//test the matrix transformations
function testReplaceColumn(){
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
   let a00 = "a00",
        a01 = "a01",
        a02 = "a02";
    let a10 = "a10", 
        a11 = "a11",
        a12 = "a12";
    let a20 = "a20",
        a21 = "a21",
        a22 = "a22";
    let b0 = "b0",
        b1 = "b1",
        b2 = "b2";

    let A = Array(
        Array(a00, a01, a02),
        Array(a10, a11, a12),
        Array(a20, a21, a22)
    )
    let B = Array(b0,b1,b2);
    
    let A12B = Array(
        Array (a00, a01, b0),
        Array (a10, a11, b1 ),
        Array ( a20, a21, b2 )
    )
    let A13B = Array(
        Array (a00, b0, a02),
        Array (a10, b1, a12 ),
        Array ( a20, b2, a22 )
    )
    let A23B = Array(
        Array (b0, a01, a02),
        Array (b1, a11, a12),
        Array (b2, a21, a22 )
    )
    /*let pass = replaceColumn(A, B, 2) == A12B
    console.log(pass)*/
    console.log(JSON.stringify(replaceColumn(A, B, 0)) === JSON.stringify(A23B))
    console.log(JSON.stringify(replaceColumn(A, B, 1)) === JSON.stringify(A13B))
    console.log(JSON.stringify(replaceColumn(A, B, 2)) === JSON.stringify(A12B))
}
function testDeterminant(){

}
function testKramera(){

}
function testPereschetKoefitsientPoPostoyanimVremeni(){

}
function testRaschetParametrovDiskretnoiModeliCZapadnimTaktom(){

}
function testVichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenov(){

}
function testRaschetaDispersiaOtnositelnoSrednego(){

}
function testKriteriaFishera(){
    var S2y, S2ost, F;
    let pass = Array();
    S2y = 3;
    S2ost = 4; 

    F = 1;
    F = 0.1
    

    F = 0;

    F = -1;
    F = -0.1;

    F = "xxx";
}
function testVihodObyekataBezPomexa(){
    var paramsDiscreteModel, yi_1, yi_2, u;
}
function testVihodObyekataCPomexoi(yi,p){

}


testReplaceColumn();