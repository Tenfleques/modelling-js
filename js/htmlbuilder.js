function parametersTableBuilder(T1, T2, T3, k, tau, p, T0, N, F, d){
    var html = "<table class='small mt-3 col-12'>" ;
    html += "<theader><td colspan='2'>входные параметры</td></theader>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>T0</td><td>"+T0+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>T1</td><td>"+T1+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>T2</td><td>"+T2+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>T3</td><td>"+T3+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>k</td><td>"+k+"</td></tr>";    
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>&tau;</td><td>"+tau+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>p</td><td>"+p+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>N</td><td>"+N+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>F</td><td>"+F+"</td></tr>";
    html += "<tr class='col-12 border border-dark border-left-0 border-right-0 border-top-0'><td>d</td><td>"+d+"</td></tr>";
    html += "</table>";
    return html;
}
function buildKeyValueTable(coeff){
    var html = "<div class='row mt-3 border border-dark border-left-0 border-right-0 border-top-0'>";
    if(arguments[1])
        html += "<div class='small col-12'>"+arguments[1]+"</div>";
    for(var j in coeff){
        html += "<small class='col-6 text-left'>";
        html +=  j;
        html += "</small>";
        html += "<small class='col-6 text-right'>";
        html +=  coeff[j].toFixed(4);
        html += "</small>";
    }    
    html += "</div>";
    return html;
}