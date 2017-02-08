$(document).ready(function(){
    // Muestra el contenido de la pesta�a pasada como parametro a la funcion,
    // cambia el color de la pesta�a y aumenta el padding para que tape el  
    // borde superior del contenido que esta juesto debajo y se vea de este 
    // modo que esta seleccionada.
	cargarGrafico();
	
	//res=invocarAjax("ManagementSrvlt?cmdOpt=cargarInstancias");
	res=invocarUrl("/ManagementSrvlt");
	//alert(res);
	
    $("#btnRefrescar").click(function(){
    	var instancia=$("#InstanciaWas option:selected" ).text();
        endScroll(instancia);
    });    
    
    $("#updateEarBtn").click(function(){
    	var app=$("#aplicacion option:selected" ).text();
    	updateEar(app);
    });
});



function invocarUrl(url){
	var result = null;
	$.post(url,{
		parama:"cmdOpt",
		paramb:"value2"},
		function(data, status){
			alert("Data: " + data + "\nStatus: " + status);
		});
}



function invocarAjax(url){
	var result=null;	
		$.ajax({
		    url:url,
		    type:'POST',
		    async: false,
		    error: function(){},
		    success: function(data,status,xhr){alert("a")},
		    complete: function(xhr,status){alert(xhr)}
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