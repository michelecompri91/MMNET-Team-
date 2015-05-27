function doClick(e){
	Alloy.Globals.URL_QUESTION = $.fld_host_ask.value;
	Alloy.Globals.URL_REFRESH = $.fld_host_refresh.value;
	Alloy.Globals.devId = $.fld_iddev.value;
	close($.win_settings);
}

$.fld_host_ask.value = Alloy.Globals.URL_QUESTION;
$.fld_host_refresh.value = Alloy.Globals.URL_REFRESH;
$.fld_iddev.value = Alloy.Globals.devId;
