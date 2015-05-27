function doClick(e){
	$.v_footer.fireEvent("onButtonClick", {"id": e.source.id});
	setActiveButton(e.source.id);
}

exports.setData = function(id){
	setActiveButton(id);
};


$.v_footer.addEventListener("setActiveButton", function(data){
	setActiveButton(data.id);
});


function setActiveButton(id){
	Ti.API.info("footer: " + id);
	if(id === "b_questions"){
		$.b_add.backgroundImage = "/add.png";
		$.b_history.backgroundColor = "#feb100";
		$.b_questions.backgroundColor = "#d87000";
	}else if(id === "b_history"){
		$.b_add.backgroundImage = "/add.png";
		$.b_history.backgroundColor = "#d87000";
		$.b_questions.backgroundColor = "#feb100";
	}else if(id === "b_add"){
		$.b_add.backgroundImage = "/add_active.png";
		$.b_history.backgroundColor = "#feb100";
		$.b_questions.backgroundColor = "#feb100";
	}
}
