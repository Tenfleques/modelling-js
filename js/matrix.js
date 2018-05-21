function replaceColumn(matrix, vector, column){
    var res = Array ();
    for(var i = 0; i < matrix.length; i++){
        res[i] = matrix[i].slice();
        res[i][column] = vector[i];
    }
    return res;
}
function determinant(a){
    let math = require("mathjs");  
    return math.det(a);
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

    let am1 = deltaA23B/deltaA;
    let am2 = deltaA13B/deltaA; 
    let bm = deltaA12B/deltaA;

    return {
        "a1" : am1,
        "a2" : am2,
        "b" : bm
    }
}
function metodKramera3x(matrixA, vectorB){
    var deltaA, deltaA123B, deltaA12B4, deltaA1B34, deltaB234;
    var A123B = Array(), A12B4 = Array(), A2B34 = Array(), B234 = Array(), A2;
    
    A123B = replaceColumn(matrixA, vectorB, 3);
    A13B4 = replaceColumn(matrixA, vectorB, 2);
    A2B34 = replaceColumn(matrixA, vectorB, 1);
    B234 = replaceColumn(matrixA, vectorB, 0);

    let math = require("mathjs");

    deltaA =  math.det(matrixA);
    deltaA123B = math.det(A123B);
    deltaB234 = math.det(B234);
    deltaA12B4 = math.det(A13B4); 
    deltaA1B34 = math.det(A2B34);
    

    let am1 = deltaA1B34/deltaA;
    let am2 = deltaA12B4/deltaA;
    let am3 = deltaB234/deltaA; 
    let bm = deltaA123B/deltaA;

    return {
        "a1" : am1,
        "a2" : am2,
        "a3" : am3,
        "b" : bm
    }
}
function pereschetKoefitsientPoPostoyanimVremeni(spiskaTov){
    let n = spiskaTov.length;
    switch(n){
        case 1:
            return {
                "T11": spiskaTov[0]
            }
        case 2:
            return {
                "T11": spiskaTov[0] + spiskaTov[1],
                "T22": spiskaTov[0] * spiskaTov[1]
            }
        case 3:
            return {
                "T11": spiskaTov[0] + spiskaTov[1] 
                        + spiskaTov[2],

                "T22": spiskaTov[0] * spiskaTov[1] 
                        + spiskaTov[0] * spiskaTov[2]
                        + spiskaTov[1] * spiskaTov[2],

                "T33": spiskaTov[0] 
                        * spiskaTov[1] 
                        * spiskaTov[2]
            }
        default:
            return "Net Koeefitsient";
    }
}
function kriteriaFishera(S2y, S2ost, F){
    let Fraschetno = S2y/S2ost;
    var html = "Fp = " + Fraschetno.toFixed(4);
    html +=  (Fraschetno > F)? " > " + F + " то адекватно" : " < " + F + " то не адекватно";
    return html;
  
  }
  function raschetParametrovDiskretnoiModeliCZapadnimTaktom(T0,T11, T22, k){
    var a1 = (T11*T0 + 2*T22 - T0*T0)/(T22 + T11*T0);
    var a2 = -(T22)/(T22 + T11*T0);
    var b = k*T0*T0/(T22 + T11*T0);

    return {
        "a1" : a1,
        "a2" : a2,
        "b" : b
    }
}

function raschetaDispersiaOtnositelnoSrednego(yu,ym,N,d){    
      var yubar = 0; //средное значение yu
      var size = 0;
      for(var i = 2 + d; i < N+1+d; ++i, size ++ ){
        yubar += yu[i];
      } 
      yubar /= size;
       var S2y = 0;
       var S2ost = 0;

       for(var i = 2 + d; i < N+1+d; ++i ){
           S2y += Math.pow(yu[i] - yubar,2);
           S2ost += Math.pow(ym[i] - yu[i],2);
       }
       let l = 3; //число связей, наложенных на выборку
       S2y /= (N-1);
       S2ost /= (N - 1 - l);

       return {
           "S2y" : S2y,
           "S2ost" : S2ost
       }
}
function vihodObyekataBezPomexa(paramsDiscreteModel, yi_1, yi_2, u){
    return paramsDiscreteModel.a1*yi_1 
            + paramsDiscreteModel.a2*yi_2 
            + paramsDiscreteModel.b*u;
}
function vihodObyekataBezPomexa3x(paramsDiscreteModel, yi_1, yi_2, yi_3, u){
    return paramsDiscreteModel.a1*yi_1 
            + paramsDiscreteModel.a2*yi_2 
            + paramsDiscreteModel.a3*yi_3
            + paramsDiscreteModel.b*u;
}
function vihodObyekataCPomexoi(yi,p){
    let pomexa =  Math.random() * 2 - 1 // -1 <= pomexa < 1
    return yi + p*pomexa;
}
function paraObyektaSvyazPomexoi3x(d,N,y,yu,u,p,params){
    let dataY = [], dataYu = [];
    for(var i = 2 + d; i < N + 1 + d; ++i){
      y[i] = vihodObyekataBezPomexa3x(
          params,y[i-1],y[i-2],y[i-3],u[i-d-1]);
      dataY.push(Array(i,y[i]));
  
      yu[i] = vihodObyekataCPomexoi(y[i],p);
      dataYu.push(Array(i,yu[i]));
    }
    return {
      "bezPomexa" : dataY, 
      "cPomexoi":  dataYu
    };
}
function paraObyektaSvyazPomexoi(d,N,y,yu,u,p,params){
  let dataY = [], dataYu = [];
  for(var i = 2 + d; i < N + 1 + d; ++i){
    y[i] = vihodObyekataBezPomexa(
        params,y[i-1],y[i-2],u[i-d-1]);
    dataY.push(Array(i,y[i]));

    yu[i] = vihodObyekataCPomexoi(y[i],p);
    dataYu.push(Array(i,yu[i]));
  }
  return {
    "bezPomexa" : dataY, 
    "cPomexoi":  dataYu
  };
}
function vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenov
(d,N,yu,u){
    var matrixA = Array(
        Array(0,0,0),
        Array(0,0,0),
        Array(0,0,0)
    );
    var vectorB = Array(0,0,0);

    for(var i = 2 + d; i < N + 1 + d; ++i){
           matrixA[0][0] += Math.pow(yu[i-1],2); 
           matrixA[0][1] += yu[i-1] * yu[i-2];
           matrixA[0][2] += yu[i-1] * u[i - d - 1];

           matrixA[1][0] += yu[i-1] * yu[i-2];
           matrixA[1][1] += Math.pow(yu[i-2],2);
           matrixA[1][2] += yu[i-2] * u[i - d - 1];

           matrixA[2][0] += yu[i-1] * u[i - d - 1];
           matrixA[2][1] += yu[i-2] * u[i - d - 1];
           matrixA[2][2] += Math.pow(u[i - d - 1],2);    
               
           vectorB[0] += yu[i]*yu[i-1];
           vectorB[1] += yu[i]*yu[i-2];
           vectorB[2] += yu[i]*u[i-d-1];
       }
       return {
           "matrixA" : matrixA,
           "vectorB" : vectorB
       }
}
function vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenov3x
(d,N,yu,u){
    var matrixA = Array(
        Array(0,0,0,0),
        Array(0,0,0,0),
        Array(0,0,0,0),
        Array(0,0,0,0)
    );
    var vectorB = Array(0,0,0,0);

    for(var i = 3 + d; i < N + 1 + d; ++i){


           matrixA[0][0] += yu[i-1] * yu[i-1]; 
           matrixA[0][1] += yu[i-1] * yu[i-2];
           matrixA[0][2] += yu[i-1] * yu[i-3];           
           matrixA[0][3] += yu[i-1] * u[i - d - 1];
           
           matrixA[1][0] += yu[i-1] * yu[i-2];
           matrixA[1][1] += yu[i-2] * yu[i-2];
           matrixA[1][2] += yu[i-3] * yu[i-2];
           matrixA[1][3] += yu[i-2] * u[i - d - 1];

           matrixA[2][0] += yu[i-1] * yu[i-3];
           matrixA[2][1] += yu[i-2] * yu[i-3];
           matrixA[2][2] += yu[i-3] * yu[i-2];
           matrixA[2][3] += yu[i-3] * u[i - d - 1];

           matrixA[3][0] += yu[i-1] * u[i - d - 1];
           matrixA[3][1] += yu[i-2] * u[i - d - 1];
           matrixA[3][2] += yu[i-3] * u[i - d - 1];
           matrixA[3][3] += Math.pow(u[i - d - 1],2);
        
           vectorB[0] += yu[i]*yu[i-1];
           vectorB[1] += yu[i]*yu[i-2];
           vectorB[2] += yu[i]*yu[i-3];
           vectorB[3] += yu[i]*u[i-d-1];
       }
       return {
           "matrixA" : matrixA,
           "vectorB" : vectorB
       }
}
