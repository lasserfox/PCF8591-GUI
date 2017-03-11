$(document).ready(function(){
    // Muestra el contenido de la pesta�a pasada como parametro a la funcion,
    // cambia el color de la pesta�a y aumenta el padding para que tape el  
    // borde superior del contenido que esta juesto debajo y se vea de este 
    // modo que esta seleccionada.
	
	var hum=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=0"));
	var otro=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=1"));
	var luz=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=2"));
	var temp=parseInt(invocarAjax("/AutoFarm/Manager?cmdOpt=leer&canal=3"));
	
	var historico = invocarAjax("/AutoFarm/Manager?cmdOpt=leerHistorico&escala=dias&rango=2");
	var data = [{ label: "Luz", y: luz },{ label: "Humedad", y: hum },{ label: "Temperatura", y: temp },{ label: "Otro", y: otro }];
	
	//cargarGrafico("titulo 1","column",data);
	cargarGrafico2(historico);
	
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







function cargarGrafico2(historico) {
	
	var lines = historico.split('\n');
	var limit = lines.length;   
	var y = 0;
	var data = []; 
	var dataSeries = { type: "line" };
	var dataSeries2 = { type: "line" };
	var dataSeries3 = { type: "line" };
	var dataPoints = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	for (var i = 0; i < limit; i++) {
		fecha = lines[i].split(" - ")[0];
		pote = parseInt(lines[i].split(" - ")[1]);
		luz = parseInt(lines[i].split(" - ")[2]);
		temp = parseInt(lines[i].split(" - ")[3]);
		hume = parseInt(lines[i].split(" - ")[4]);
		
		ftemp=fecha.replace(" ","T")+"Z";
		dateTime = new Date(Date.parse(ftemp));

		dataPoints.push({
			x: dateTime,
			y: luz
		});
		
		dataPoints2.push({
			x: dateTime,
			y: temp
		});
		
		dataPoints3.push({
			x: dateTime,
			y: hume
		});
		
	}


	
	dataSeries.dataPoints = dataPoints;
	dataSeries2.dataPoints = dataPoints2;
	dataSeries3.dataPoints = dataPoints3;
	data.push(dataSeries); 
	data.push(dataSeries2);      
	data.push(dataSeries3);   
	
	var chart = new CanvasJS.Chart("chartContainer",
	{
		zoomEnabled: true,
		animationEnabled: true,
		title:{
			text: "100,000 Data Points! Zoom-in And Observe Axis Labels" 
		},
		axisX :{
			labelAngle: -30
		},
		axisY :{
			includeZero:false
		},
		data: data  
	});
	chart.render();
}

	   