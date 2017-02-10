$(document).ready(function(){
    // Muestra el contenido de la pesta�a pasada como parametro a la funcion,
    // cambia el color de la pesta�a y aumenta el padding para que tape el  
    // borde superior del contenido que esta juesto debajo y se vea de este 
    // modo que esta seleccionada.
	
	var luz=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=0"));
	var hum=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=1"));
	var temp=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=2"));
	var otro=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=3"));
	
	var data = [{ label: "Luz", y: luz },{ label: "Humedad", y: hum },{ label: "Temperatura", y: temp },];
	
	cargarGrafico("titulo","column",data);
	
    $("#btnRefrescar").click(function(){
    	var instancia=$("#InstanciaWas option:selected" ).text();
        endScroll(instancia);
    });    
    
    $("#updateEarBtn").click(function(){
    	var app=$("#aplicacion option:selected" ).text();
    	updateEar(app);
    });
});

function invocarAjax(url){
	var result=null;	
		$.ajax({
		    url:url,
		    type:'POST',
		    async: false,
		    error: function(){},
		    success: function(data,status,xhr){result=data},
		    complete: function(xhr,status){}
		});
		return result;
	}




function cargarGrafico(titulo,tipo,datos) {
//Better to construct options first and then pass it as a parameter
	var options = {
		title: {
			text: titulo
		},
                animationEnabled: true,
		data: [
		{
			type: tipo, //change it to line, area, bar, pie, etc
			dataPoints: datos
		}
		]
	};

	$("#chartContainer").CanvasJSChart(options);

}