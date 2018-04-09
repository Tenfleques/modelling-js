$(function() {
    let URL = "http://localhost:7070/stats/hits/all";
    let updateInterval = 1000;
    function processServerInsances(serverData){        
        var data = [];
        serverData.map(function(val){
            data.push(Array(val.key, val.value));
        })
        $.plot("#bar-chart-count", [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            }
        });                
    }
    function update() {
        var getServerInstances = $.get(URL);
        getServerInstances.done(processServerInsances)
        getServerInstances.fail(exceptionHandler)
        setTimeout(update, updateInterval);
    }
    //supdate();
});