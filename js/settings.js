let CONFIG = getConfiguration();

$(function(){
    for(let i in CONFIG["inputParams"]){
        let val = CONFIG["inputParams"][i];
        $("[name = \""+ val.key+"\"]").val(val.value); 
    }
    $(".update-settings").on("click",function saveConfig(){
        var isxhodniiDannix = vvodIsxhodnixDannix();
        CONFIG["inputParams"] = isxhodniiDannix ;
        setConfiguration(CONFIG);
        $(this).attr("disabled",true);
    })

    function vvodIsxhodnixDannix(){
        let T0 =0, d = 0, tau = 0;
        var src = $(".src-input").map(function(){
            var key = $(this).prop("name");
            var val = Number($(this).val()); 
                       
            if(key == "tau")
                tau = val;
            if(key == "T0")
                T0 = val;
            return {key : key, value: val}; 
        })
        if(T0 != 0)
            d =  Math.round(tau/T0);
        src.push({key: "d", value: d});
        return  src;
    }
})