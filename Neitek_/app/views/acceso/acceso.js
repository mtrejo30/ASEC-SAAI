var BasePage = require("../../shared/BasePage");
var view = require("ui/core/view");
var borderModule = require("ui/border");
var navigation = require("../../shared/navigation");
var observable = require("data/observable");
var pageModule = require("ui/page");
var topmost = require("ui/frame").topmost;
var HomePage = function () { };
HomePage.prototype = new BasePage();
HomePage.prototype.constructor = HomePage;

function onNavBtnTap() {

    navigation.goToLoginPage();

}
exports.onNavBtnTap = onNavBtnTap;

