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
function raschetPerehodnogoProtsessaObyekta(){
    var pomexa  =  null;
    if(arguments[0]){
        pomexa = arguments[0];
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
        console.log(yu[i-1],yu[i-2])
           //a11
           matrixA[0][0] += Math.pow(yu[i-1],2); 
           //a12
           matrixA[0][1] += yu[i-1] * yu[i-2];
           //a13
           matrixA[0][2] += yu[i-1] * u[i - d - 1];
           //a21
           matrixA[1][0] += yu[i-2];
           //a22
           matrixA[1][1] += Math.pow(yu[i-2],2);
           //a23
           matrixA[1][2] += yu[i-2] * u[i - d - 1];
           //a31
           matrixA[2][0] += yu[i-1] * u[i - d - 1];
           //a32
           matrixA[2][1] += yu[i-2] * u[i - d - 1];
           //a33
           matrixA[2][2] += Math.pow(u[i - d - 1],2);

        
           //b1
           vectorB[0] += yu[i]*yu[i-1];
           //b2
           vectorB[1] += yu[i]*yu[i-2];
           //b3
           vectorB[2] += yu[i]*u[i-d-1];
       }
       return {
           "matrixA" : matrixA,
           "vectorB" : vectorB
       }
}

function raschetaDispersiaOtnositelnoSrednego(){

}
function kriterizFishera(){

}
function pechatPerehodnixProtsessovObyektPoImitatsionnoiModeli(){

}

function vihodObyekataBezPomexa(paramsDiscreteModel, yi_1, yi_2, u){
    return paramsDiscreteModel.a1*yi_1 
            + paramsDiscreteModel.a2*yi_2 
            + paramsDiscreteModel.b*u;
}
function vihodObyekataCPomexoi(yi,p){
    let pomexa =  Math.random() * 2 - 1 // -1 <= pomexa < 1
    return yi + p*pomexa;
}

$(function(){
    let T0, T1, T2, T3, k, tau, p, N , F, d;
    let y = Array(), ym = Array(), u = Array(), yu = Array();
    main();
    function main(){
        /*
        * вход исходных данных для 
        * имитационной модели объекта 
        * и критерия Фишера T1, T2, T3, k, tau, p, T0, N, F tabl    
        */
       
        var isxhodniiDannix = vvodIsxhodnixDannix();      
        console.log(T1, T2, T3, k, tau, p, T0, N, F, d) 
        /* пересчет коэфициентов уравнения () 
         * по постоянным времени Т1, Т2 объекта
         */
        let coeffSrc = Array(T1,T2,T3).filter((index,val) => 
            val !== '');

        console.log(coeffSrc);
        let coeffs = pereschetKoefitsientPoPostoyanimVremeni(coeffSrc);
        console.log(coeffs);
        /*
        * расчет параметров дискретной модели () 
        * с заданным тактом Т0 по формулами a1, a2, b, d
        */
       
       let paramsDiscreteModel = raschetParametrovDiskretnoiModeliCZapadnimTaktom(
           T0,coeffs.T11, coeffs.T22, k);
       console.log(paramsDiscreteModel);

       /*
       * задание нулевых начальный условый
       */
        for(var i = 0; i < 2 + d; ++i){
            y[i] = 0.0;
            ym[i] = 0.0;
        }
        u[0] = 0.0;
        console.log(y,ym,u)
       /*
       * Формирование единичного ступенчатого 
       * воздействия на вход объекта
       */
        for(var i = 1; i < N; ++i){
            u[i] = 1;
        }
        console.log(u)
       /*
       * расчет переходного процесса объекта 
       * по имитациой модели без помехи и с учетом помехи &
       */
        for(var i = 2 + d; i < N + 1 + d; ++i){
            y[i] = vihodObyekataBezPomexa(
                paramsDiscreteModel,y[i-1],y[i-2],u[i-d-1]);
            yu[i] = vihodObyekataCPomexoi(y[i],p);
        }
        console.log(y,yu)
       /*
       * вычисление сумм при искомых коэффициентах
       *  и массива свободных членов (i = 3 + d, N + 1 + d) 
       * системы уравнений
       */
       let AiB = 
       vichislenieCummPriIsckomnikKoeffitsientIMassivaSvobodnixChlenov(d,N,yu,u);       
       console.log(AiB.matrixA);
       console.log(AiB.vectorB);
       /*
       * решение системы уравнений по правилу Крамера 
       */
      let a1ma2mb = metodKramera(AiB.matrixA, AiB.vectorB);
       /*
       * печать параметров имитационной модели () 
       * и коэфиентов востановленной модели
       */

       /*
       * расчет дисперсии относительно средного, 
       * остаточной дисперсии и
       * критерия Фишера
       */
      yubar = 0; //средное значение yu
      for(var i = 0; i < yu.length; ++i ){
        yubar += yu[i];
      }
      yubar /= yu.length;

       var S2y = 0;
       var S2ost = 0;
       for(var i = 3 + d; i < N+1+d; ++i ){
           S2y += Math.pow(yu[i] - yubar,2);
           S2ost += Math.pow(ym[i] - yu[i],2);
       }
       let l = 3; //число связей, наложенных на выборку
       S2y /= (N-1);
       S2ost /= (N - 1 - l);
       /*
       * проверка выполнения условия адекватности модели объекту
       */
       let Fraschetno = S2y/S2ost;

       //Ftablichno(p, f1, f2)
       // f1 = N - 1
       // f2 = N - 1 - l
       // p = 0.01

       let adekvatno = (Fraschetno > F)? "адекватно" : "не адекватно";

       /*
       * печать переходных прцессов объекта по имитационной модели 
       * 1. без помехи,
       * 2. с помехой и
       * 3. по воссановленной модели при ступенчатом входом воздействии
       * 
       */
      $("#resultat-adekvatnocti").html(adekvatno);
      $(".results").html();
    }
    
    


    function vvodIsxhodnixDannix(){
        var src = $(".src-input").map(function(){
            var key = $(this).prop("name");
            var val = Number($(this).val());    
            switch(key){
                case "T0":
                    T0 = val;
                    break;
                case "T1":
                    T1 = val;
                    break;
                case "T2":
                    T2 = val;
                    break;
                case "T3":
                    T3 = val;
                    break;
                case "k":
                    k = val;
                    break;
                case "tau":
                    tau = val;
                    break;
                case "p":
                    p = val;
                    break;
                case "N":
                    N = val;
                    break;
                case "F":
                    F = val;
                    break;
            }
        })
        if(T0){
            d =  Math.round(tau/T0);
        }else{
            d = 0;
        }
        
        return  src;
    }
})

