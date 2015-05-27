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
	if(id === "b_questions"){
		$.b_accepted_questions.backgroundColor = "#feb100";
		$.b_history.backgroundColor = "#feb100";
		$.b_questions.backgroundColor = "#d87000";
	}else if(id === "b_history"){
		$.b_accepted_questions.backgroundColor = "#feb100";
		$.b_history.backgroundColor = "#d87000";
		$.b_questions.backgroundColor = "#feb100";
	}else if(id === "b_accepted_questions"){
		$.b_accepted_questions.backgroundColor = "#d87000";
		$.b_history.backgroundColor = "#feb100";
		$.b_questions.backgroundColor = "#feb100";
	}
}
