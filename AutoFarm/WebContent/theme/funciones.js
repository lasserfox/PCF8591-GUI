$(document).ready(function(){
    // Muestra el contenido de la pesta�a pasada como parametro a la funcion,
    // cambia el color de la pesta�a y aumenta el padding para que tape el  
    // borde superior del contenido que esta juesto debajo y se vea de este 
    // modo que esta seleccionada.
	cargarGrafico();
	
	
	res=invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=0");
	alert (res);
	res=invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=1");
	alert (res);
	res=invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=2");
	alert (res);
	res=invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=3");
	alert (res);
	
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




function cargarGrafico(datos) {

//Better to construct options first and then pass it as a parameter
	var options = {
		title: {
			text: "Column Chart using jQuery Plugin"
		},
                animationEnabled: true,
		data: [
		{
			type: "column", //change it to line, area, bar, pie, etc
			dataPoints: [
				{ label: "Luz", y: 10 },
				{ label: "Humedad", y: 11 },
				{ label: "Temperatura", y: 14 },
			]
		}
		]
	};

	$("#chartContainer").CanvasJSChart(options);

}