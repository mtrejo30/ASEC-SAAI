var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	},
	goToPasswordPage: function() {
		frameModule.topmost().navigate("views/password/password");
	},
	goToMainPage: function () {
	    frameModule.topmost().navigate("views/main/main");
	},
	goToPdfPage: function () {
	    frameModule.topmost().navigate("views/pdf/pdf");
	},
	goToLimitePage: function () {
	    frameModule.topmost().navigate("views/limite/limite");
	},
	goToCuentaPage: function () {
	    frameModule.topmost().navigate("views/acceso/acceso");
	},
	signOut: function() {
		config.invalidateToken();
		frameModule.topmost().navigate({
			moduleName: "views/login/login",
			animated: false,
			clearHistory: true
		});
	},
	startingPage: function() {
	    return config.token ? "views/list/list" : "views/login/login";
	}
};
