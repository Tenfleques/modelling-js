/*let CONFIG = {
	"":""
}*/
//getConfiguration();
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
function raschetParametrovDiskretnoiModeliCZapadnimTaktom(T0,T11, T22, T33, k){
    var denom = T33 + T22*T0 + T11*T0*T0;
    var a1 = (3*T33 + 2*T22*T0 + T11*T0*T0 - T0*T0*T0)/denom;
    var a2 = -(3*T33 + T22*T0)/denom;
    var a3 = T33/denom;
    var b = k*T33/denom;

    return {
        "a1" : a1,
        "a2" : a2,
        "a3" : a3,
        "b" : b
    }
}
function raschetPerehodnogoProtsessaObyekta(){
    var pomexa  =  null;
    if(arguments[0]){
        pomexa = arguments[0];
    }

}
function vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenov
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
function raschetaDispersiaOtnositelnoSrednego(yu,ym,N,d){    
      var yubar = 0; //средное значение yu
      var size = 0;
      for(var i = 3 + d; i < N+1+d; ++i, size ++ ){
        yubar += yu[i];
      } 
      yubar /= size;
       var S2y = 0;
       var S2ost = 0;

       for(var i = 3 + d; i < N+1+d; ++i ){
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
function kriteriaFishera(S2y, S2ost, F){   
       
  let Fraschetno = S2y/S2ost;
  //Ftablichno(p, f1, f2)
  // f1 = N - 1
  // f2 = N - 1 - l
  // p = 0.01
  var html = "Fp = " + Fraschetno.toFixed(4);
  html +=  (Fraschetno > F)? " > " + F + " то адекватно" : " < " + F + " то не адекватно";
  return html;

}
function vihodObyekataBezPomexa(paramsDiscreteModel, yi_1, yi_2, yi_3, u){
    return paramsDiscreteModel.a1*yi_1 
            + paramsDiscreteModel.a2*yi_2 
            + paramsDiscreteModel.a3*yi_3
            + paramsDiscreteModel.b*u;
}
function vihodObyekataCPomexoi(yi,p){
    let pomexa =  Math.random() * 2 - 1 // -1 <= pomexa < 1
    return yi + p*pomexa;
}
function paraObyektaSvyazPomexoi(d,N,y,yu,u,p,params){
  let dataY = [], dataYu = [];
  for(var i = 3 + d; i < N + 1 + d; ++i){
    y[i] = vihodObyekataBezPomexa(
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

//$(function(){
    let CONFIG = {
	"inputParams": {
		"TO": 0.1,
		"T1" : 4.21,
		"T2": 3.19,
		"T3" : 0,
		"k" : 12.1,
		"tau": 0.5,
		"p" : 0.61,
		"N" : 300,
		"F": 0.2,
		"d"
	}
    }
    let conf = {};

    for(var i in CONFIG.inputParams){
      let val = CONFIG.inputParams[i];
      conf[val.key] = val.value
    }
    var html = "";
    let T0 = conf["T0"],
     T1 = conf["T1"],
     T2 = conf["T2"],
     T3 = conf["T3"],
     k = conf["k"],
     tau = conf["tau"],
     p = conf["p"], 
     N = conf["N"],
     F = conf["F"], 
     d = conf["d"];
    let y = Array(), ym = Array(), ymp = Array(), u = Array(), yu = Array();
    main();
    function main(){
        /*
        * вход исходных данных для 
        * имитационной модели объекта 
        * и критерия Фишера T1, T2, T3, k, tau, p, T0, N, F tabl    
        */  
        
        /* пересчет коэфициентов уравнения () 
         * по постоянным времени Т1, Т2 объекта
         */
        let coeffSrc = Array(T1,T2,T3)
        let coeffs = pereschetKoefitsientPoPostoyanimVremeni(coeffSrc);
        //html += buildKeyValueTable(T3);
       console.log(coeffs)
        /*
        * расчет параметров дискретной модели () 
        * с заданным тактом Т0 по формулами a1, a2, b, d
        */       
       let paramsDiscreteModel = raschetParametrovDiskretnoiModeliCZapadnimTaktom(
           T0,coeffs.T11, coeffs.T22, coeffs.T33, k);
       //console.log(paramsDiscreteModel)    
       //html += buildKeyValueTable(paramsDiscreteModel,"параметри дискретной модели")
       /*
       * задание нулевых начальный условый
       */
        for(var i = 0; i < 3 + d; ++i){
            y[i] = 0.0;
            ym[i] = 0.0;
            ymp[i] = 0.0;
            yu[i] = 0.0;
        }
        u[0] = 0.0;
       /*
       * Формирование единичного ступенчатого 
       * воздействия на вход объекта
       */
        for(var i = 1; i < N; ++i){
            u[i] = 1;
        }
       /*
       * расчет переходного процесса объекта 
       * по имитациой модели без помехи и с учетом помехи &
       */
      let discreteModel = paraObyektaSvyazPomexoi(d,N,y,yu,u,p,paramsDiscreteModel);
      console.log(discreteModel);
       /*
       * вычисление сумм при искомых коэффициентах
       *  и массива свободных членов (i = 3 + d, N + 1 + d) 
       * системы уравнений
       */
       let AiB = 
       vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenov(d,N,yu,u);       
       //console.log(AiB)
       /*
       * решение системы уравнений по правилу Крамера 
       */
      //let a1ma2a3mbm = metodKramera(AiB.matrixA, AiB.vectorB);
       /*
       * печать параметров имитационной модели () 
       * и коэфиентов востановленной модели
       */
      //html += buildKeyValueTable(a1ma2a3mbm,"параметров имитационной модели 3-ой степени")
      //let secondOrderCalculatedModel = paraObyektaSvyazPomexoi(d,N,ym,ymp,u,p,a1ma2a3mbm);
       /*
       * расчет дисперсии относительно средного, 
       * остаточной дисперсии и
       * критерия Фишера
       */
      let S2yS2ost = raschetaDispersiaOtnositelnoSrednego(yu,ym,N,d);           
        /*
       * проверка выполнения условия адекватности модели объекту
       */
      let adekvatno = kriteriaFishera(S2yS2ost.S2y, S2yS2ost.S2ost,F);       
      //html += buildKeyValueTable(S2yS2ost,adekvatno)
       /*
       * печать переходных прцессов объекта по имитационной модели 
       * 1. без помехи,
       * 2. с помехой и
       * 3. по восстановленной модели при ступенчатом входом воздействии
       * 
       */
      data = [
        { label: "без помеха дискретных параметр", color:"blue", data: discreteModel["bezPomexa"],lines: {show: true,lineWidth: 1} },
        /*{ label: "с помехой дискретных параметр", color:"red", data: discreteModel["cPomexoi"],lines: {show: true,lineWidth: 1} },*/
        /*{ label: "без помеха расчетных параметр 2-ой степень", color:"green", data: secondOrderCalculatedModel["bezPomexa"], lines: {show: true,lineWidth: 1} },
        { label: "с помеха расчетных параметр 2-ой степень", color:"orange", data: secondOrderCalculatedModel["cPomexoi"], lines: {show: true,lineWidth: 1} }*/
      ];
      options = {
          series:{lines:{active:true}},
          legend:{position:"se"}
      };
     // $.plot(".container-x", data,options);
     // $("#input-data").html(parametersTableBuilder(T1, T2, T3, k, tau, p, T0, N, F, d))
     // $("#resultat-adekvatnocti").html(html);
      
    }
//})

function metodKramera(matrixA, vectorB){
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
function replaceColumn(matrix, vector, column){
    var res = Array ();
    for(var i = 0; i < matrix.length; i++){
        res[i] = matrix[i].slice();
        res[i][column] = vector[i];
    }
    return res;
}
