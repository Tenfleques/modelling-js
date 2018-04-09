var gui = require('nw.gui');
var win = gui.Window.get();
if (process.platform == "darwin") {
	var menu = new gui.Menu({type: "menubar"});
	menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
	gui.Window.get().menu = menu;
}
var appname = "Идентификация дискретной динамической модели по имитационной модели объекта";

document.onkeydown=disableconsole;
function disableconsole(e){
	/*evtobj = window.event? event : e;
	if(evtobj.keyCode == 123 || (evtobj.metaKey && evtobj.altKey && evtobj.keyCode ==73))
		return false;*/
}
$(function() {
	//localStorage.clear();
	//sessionStorage.clear();
	/*$(document).on("contextmenu", function(e){
		e.preventDefault();
	});*/
	$("disabled").click(function() {
		 return false;
	 });
});

function errorBox(){
	//args[] = header, border, level
	$("#errorBox-header").html(arguments[0]);
	$("#errorBox-body").html(arguments[1]);
	$("#close-btn-var-color").removeClass("btn-danger")
	$("#close-btn-var-color").removeClass("btn-warning")
	$("#close-btn-var-color").removeClass("btn-success")
	var btnclas = isDefined(arguments[2])?arguments[2]:"btn-danger"
	$("#close-btn-var-color").addClass(btnclas)
	$('#errorBox').modal();
}

(function ($, window) {
	

    $.fn.contextMenu = function (settings) {
		 	return this.each(function () {
				var contextField = $(this).parent()
				$(this).on("contextmenu", function (e) {
					// return native menu if pressing control
					if(!isDefined(e.clientX)){
						e.clientX = 450;
						e.clientY = 190;
					}
					if (e.ctrlKey) return;

						//open menu
					var $menu = $(settings.menuSelector)
								.data("invokedOn", $(e.target))
								.show(function(){
									contextField .addClass('dimmed')
								})
								.css({
										position: "absolute",
										left: getMenuPosition(e.clientX+70, 'width', 'scrollLeft'),
										top: getMenuPosition(e.clientY-70, 'height', 'scrollTop')
								})
								.off('click', function(){
						contextField .removeClass('dimmed')
					})
					return false;
				});
				$('body').click(function () {
					$(settings.menuSelector).hide();
					contextField .removeClass('dimmed')
				});
			});
  	};
    $(".copyright").html("Fleques Board &copy;"+new Date().getFullYear());
    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 8:
          window.history.back();
        //case 37: //go left
        //    break;
        //case 39: //go right
        //    break;
      }
    }
    $(".go-back").on("click",function(){
      window.history.back();
    })
    $("#window-action-closebutton").on('click',function() {
      gui.Window.get().close();
    });
    $("#window-action-minimizebutton").on('click',function() {
       gui.Window.get().minimize();
    });
    $("#window-action-zoombutton").on('click',function() {
      gui.Window.get().toggleFullscreen();
		});
		$(".appname").html(appname);
		$(".show-page").on("click",function(){
			$(".main-view").addClass("hidden");
			$("#"+$(this).data("open")).removeClass("hidden");
		})

    gui.Window.get().show();
})(jQuery, window);
