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


function onNavBtnTap_() {

    navigation.goToMainPage();

}
exports.onNavBtnTap_ = onNavBtnTap_;

// Place any code you want to run when the home page loads here.

/*HomePage.prototype.fun = function () {
    var page = topmost().currentPage;
    var logo = page.getViewById("logo");
    logo.animate({
        rotate: 3600,
        duration: 3000
    }).then(function () {
        logo.rotate = 0;
    });
}
module.exports = new HomePage();
*/
