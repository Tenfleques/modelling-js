let CONFIG = getConfiguration();

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
            
        data = [
        { label: "без помеха дискретных параметр", color:"blue", data: discreteModel["bezPomexa"],lines: {show: true,lineWidth: 1} },
        { label: "с помехой дискретных параметр", color:"red", data: discreteModel["cPomexoi"],lines: {show: true,lineWidth: 1} },
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

