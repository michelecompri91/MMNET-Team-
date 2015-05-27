function doClick(e){ 
	// if(e.source.id == "b_refresh"){
		// refreshData();
	// }else{
		$.v_action_bar.fireEvent('onButtonClick', {"id": e.source.id, "content":{}});
	// }
	
}



function refreshData(){
	var api = require("api");
	api.refresh({
		onSuccess: function(e){
			// for(var i in e){
				// // var 
			// }
		},
		onError: function(e){
			alert("error occured");
		}
	});
}
