/*global Ti: true, require: true */

(function (activity, gcm) {
	Ti.API.info("gcm_activity.js HERE THE ACTIVITY IS CALLED!!!");
	// if(activity == null){
		// Ti.API.info("ACTIVITY NUUUUUUUUULL");
	// }
	
	var intent = activity.intent;
	var payload = "";

	// if (intent.hasExtra('ntfId')) {
		// Ti.API.info("FOUND EXTRA ntfID");
		// gcm.data = {
			// ntfId: intent.getIntExtra('ntfId', 0),
			// payload: intent.getStringExtra('payload')
		// };
	// }
	
	if(intent.hasExtra('payload')){
		payload = intent.getStringExtra('payload');
		gcm.data = {
			payload: intent.getStringExtra('payload')
		};
	}
	
	// if (gcm.isLauncherActivity) {
		Ti.API.info("gcm.isLauncherActivity " + gcm.mainActivityClassName);
		var mainActivityIntent = Ti.Android.createIntent({
			className: gcm.mainActivityClassName,
			packageName: Ti.App.id,
			action: Ti.Android.ACTION_SENDTO,
			// flags: Ti.Android.FLAG_ACTIVITY_NEW_TASK | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
		});	 
		mainActivityIntent.putExtra("payload", payload);
		mainActivityIntent.addCategory(Ti.Android.CATEGORY_DEFAULT);
		activity.startActivity(mainActivityIntent);
	// }
	// else {
		// activity.finish();
	// }

})(Ti.Android.currentActivity, require('net.iamyellow.gcmjs'));