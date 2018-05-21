var lang = "ru";
$(function(){
    let navLinks = [{   
            "link" : "index.html",
            "fa"   : "fa-2x fa-home",
            "caption" : {
                "ru" : " Дискретная модель",
                "en" : " Discrete model"
            }

        },{   
            "link" : "index.2nd-order.html",
            "fa"   : "fa-2x fa-line-chart",
            "caption" : {
                "ru" : " имитационая модель ^2",
                "en" : " immitated model ^2"
            }

        },{   
            "link" : "index.3rd-order.html",
            "fa"   : "fa-2x fa-line-chart",
            "caption" : {
                "ru" : " имитационая модель ^3",
                "en" : " immitated model ^3"
            }

        },{   
            "link" : "settings.html",
            "fa"   : "fa-2x fa-cog",
            "caption" : {
                "ru" : " настройка",
                "en" : " settings"
            }

        }
    ];
    var html = "";
    navLinks.map(function(val){
        
        html += navBuilder(val);
    })
    $(".sidenav-left").html(html);
    function navBuilder(navObject){
        var html = "";
        var active = (window.location.pathname == "/"+navObject["link"]) ? "text-primary bg-white" : "";
        html += '<a href="'+navObject["link"]+'" class="nav-link col-12 border border-right-0 border-left-0 border-top-0 border-secondary m-0 '+active+'">';
        html +=    '<i class="col-12 m-3 fa '+navObject["fa"]+'"></i>';
        html +=     '<small>' + navObject["caption"][lang] + '</small>'
        html += '</a>'
        return html;
    }
})