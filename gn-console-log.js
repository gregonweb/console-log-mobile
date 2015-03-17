/*
 * VERSION: 1.01
 * DATE: 2015-03-13
 * UPDATES AND DOCS AT: (todo)
 *
 * @author: Gregor Nitsche
 **/

$(document).ready(function(){

$("head").append("<style>#gn-console {-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-text-size-adjust: none;width: 100%;z-index: 200;bottom: 0;left:0;position: fixed;color: white;font-family:sans-serif;-webkit-appearance: none;appearance: none;}#gn-console-ctrl {padding: 10px;max-width: 600px;margin: 0 auto;background-color:rgba(0,0,0,0.5);border-top-left-radius: 10px;border-top-right-radius: 10px;}#gn-console-ctrl b {padding-top:5px; font-size:25px;}#gn-console-log {max-width: 600px;height: 20%;max-height: 200px;background-color:rgba(0,0,0,0.5);overflow-x: hidden;overflow-y: auto;padding: 10px;margin: 0 auto;}.gn-console-log-output {border-top: 1px dotted black;padding-top: 5px;margin-top: 5px;}#gn-console-log-btn {float:right;border: 1px solid white;background-color: transparent;color: white;padding: 5px 20px;border-radius: 5px;font-size:18px;}</style>");

$("body").append("<div id=\"gn-console\"><div id=\"gn-console-ctrl\"><b>console log:</b><input type=\"button\" id=\"gn-console-log-btn\" value=\"Run\" onclick=\"console.clear(); gnConsoleLog();\" /></div><div id=\"gn-console-log\"></div></div>");
	console.log('(create console container: ok)');
});
function gnConsoleRun() {

	var uiconsole={};
	uiconsole.log=function() {
		$('#gn-console-log').append('<div class="gn-console-log-output">'+arguments[0].toString()+'</div>');
	}

	var aop=true;

	jQuery.aop.before( {target: console, method: 'log'},
	  function(args) {
		  if(aop){
			  uiconsole.log.apply(this,args);
			  $("#gn-console-log").scrollTop(999999999); // scroll to end
		  }
	  }
	);


	jQuery.aop.before( {target: console, method: 'clear'},
	  function(args) {
		  if(aop){
			  $('.gn-console-log-output').remove();
			  console.log = function() {} // clear log
		  }
	  }
	);
}
