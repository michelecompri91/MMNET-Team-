function doClick(e){
	Alloy.Globals.URL = $.fld_host.value;
	Alloy.Globals.devId = $.fld_iddev.value;
	close($.win_settings);
}

$.fld_host.value = Alloy.Globals.URL;
$.fld_iddev.value = Alloy.Globals.devId;
$.fld_idgcm.value = Alloy.Globals.gcm;

Ti.API.info(Alloy.Globals.devId + "  " + Alloy.Globals.gcm);
