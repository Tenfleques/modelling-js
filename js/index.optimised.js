let CONFIG = getConfiguration();
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

function vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenovOpt
(d,N,yu,u,s){
    var matrixA = Array();
    var vectorB = [];
    for(var i =0; i < s; ++i){
        var arr = [];
        for(var j = 0; j < s; ++j)
            arr.push(0.0);
        matrixA.push(arr);
        vectorB.push(0.0);
    }
    
    for(var i = 2 + d; i < N + 1 + d; ++i){
        for(var j = 0; j < matrixA.length; ++j){
            for(var k = 0; k < matrixA.length; ++k){                
                if(k == matrixA.length - 1)
                    matrixA[j][k] += yu[i-(j+1)] * u[i - d - 1];
                else
                    matrixA[j][k] += yu[i-(j+1)] * yu[i-(k+1)];
            }
            if(j == matrixA.length - 1) 
                vectorB[j] += yu[i]*u[i-d-1];          
            else 
                vectorB[j] += yu[i]*yu[i-(j+1)];            
        }
    }
    return {
        "matrixA" : matrixA,
        "vectorB" : vectorB
    }
}
function vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenovx
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

$(function(){
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
    let y = Array(), ym = Array(), ymp = Array(), u = Array(), yu = Array(), ym3 = Array(), ymp3 = Array();
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
        let coeffSrc = Array(T1,T2)
        let coeffs = pereschetKoefitsientPoPostoyanimVremeni(coeffSrc);
        html += buildKeyValueTable(coeffs);
        
        /*
        * расчет параметров дискретной модели () 
        * с заданным тактом Т0 по формулами a1, a2, b, d
        */       
       let paramsDiscreteModel = raschetParametrovDiskretnoiModeliCZapadnimTaktom(
           T0,coeffs.T11, coeffs.T22, k);
       html += buildKeyValueTable(paramsDiscreteModel,"параметри дискретной модели")
       /*
       * задание нулевых начальный условый
       */
        for(var i = 0; i < 2 + d; ++i){
            y[i] = 0.0;
            ym[i] = 0.0;
            ymp[i] = 0.0;
            yu[i] = 0.0;
            ym3[i] = 0.0;
            ymp3[i] = 0.0;
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
       /*
       * вычисление сумм при искомых коэффициентах
       *  и массива свободных членов (i = 3 + d, N + 1 + d) 
       * системы уравнений
       */
       var Aopt = 
       vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenovOpt(d,N,yu,u,3);
       var Aopt2 =  vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenovx(d,N,yu,u);
       console.log(Aopt,Aopt2);
       
       /*
       * решение системы уравнений по правилу Крамера 
       */
      let a12dsjb = metodKramera(Aopt.matrixA, Aopt.vectorB);
      //Aopt = Aopt2;
      
      let a1ma2mb = metodKramera(Aopt.matrixA, Aopt.vectorB);
      console.log(a12dsjb);
      console.log(a1ma2mb);
       /*
       * печать параметров имитационной модели () 
       * и коэфиентов востановленной модели
       */
      html += buildKeyValueTable(a1ma2mb,"параметров имитационной модели 2-ой степени")
      
      
      let secondOrderCalculatedModel = paraObyektaSvyazPomexoi(d,N,ym,ymp,u,p,a1ma2mb);
      //console.log(secondOrderCalculatedModel);
      
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
      html += buildKeyValueTable(S2yS2ost,adekvatno)
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
        { label: "без помеха расчетных параметр 2-ой степень", color:"green", data: secondOrderCalculatedModel["bezPomexa"], lines: {show: true,lineWidth: 1} },
        { label: "с помеха расчетных параметр 2-ой степень", color:"orange", data: secondOrderCalculatedModel["cPomexoi"], lines: {show: true,lineWidth: 1}}
        
      ];
      options = {
          series:{lines:{active:true}},
          legend:{position:"se"}
      };
      $.plot(".container-x", data,options);
      $("#input-data").html(parametersTableBuilder(T1, T2, T3, k, tau, p, T0, N, F, d));
      $("#resultat-adekvatnocti").html(html);
      
    }
})

