var Animation = require("ui/animation").Animation;
var Color = require("color").Color;
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var statusBarUtil = require("../../shared/utils/status-bar-util");
var formUtil = require("../../shared/utils/form-util");
/*Archivo que uso para redireccionarme*/
var navigation = require("../../shared/navigation");

var scrollViewModule = require("ui/scroll-view");

var pageData;
var user;
var page;
var email;
var password;
var submitButton;


exports.loaded = function (args) {
    page = args.object;
    
    pageData = new Observable({
        user: user,
        authenticating: false,
        isLogin: true
    });
    page.bindingContext = pageData;
    statusBarUtil.configure();

    email = page.getViewById("email");
    password = page.getViewById("password");
    submitButton = page.getViewById("submit-button");
    formUtil.hideKeyboardOnBlur(page, [email, password]);

    handleAndroidFocus();
    addLetterSpacing();
    inicio();
    setHintColors();

    // Create the parallax background effect by scaling the background image
    page.getViewById("background").animate({
        scale: { x: 1.2, y: 1.2 },
        duration: 8000
    });
};

function handleAndroidFocus() {
    var container = page.getViewById("container");
    if (container.android) {
        container.android.setFocusableInTouchMode(true);
        container.android.setFocusable(true);
        email.android.clearFocus();
    }
}

function addLetterSpacing() {
    var mainLabel = page.getViewById("main-label");
    var initialLabel = page.getViewById("initial-label");
    var androidLetterSpacing = 0.2;

    if (mainLabel.android && mainLabel.android.setLetterSpacing) {
        mainLabel.android.setLetterSpacing(androidLetterSpacing);
        //initialLabel.android.setLetterSpacing(androidLetterSpacing);
    }
    if (mainLabel.ios) {
        var text = mainLabel.ios.text;
        var attributedString = NSMutableAttributedString.alloc().initWithString(text);
        attributedString.addAttributeValueRange(NSKernAttributeName, 5.0, NSMakeRange(0, text.length));
        mainLabel.ios.attributedText = attributedString;
        //initialLabel.ios.attributedText = attributedString;
    }
}

function setHintColors() {
    var placeHolderColor = pageData.get("isLogin") ? "#ACA6A7" : "#C4AFB4";

    if (email.android) {
        var color = android.graphics.Color.parseColor(placeHolderColor);
        email.android.setHintTextColor(color);
        password.android.setHintTextColor(color);
    }
    if (email.ios) {
        var dictionary = new NSDictionary([new Color(placeHolderColor).ios], [NSForegroundColorAttributeName]);
        email.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(
			email.hint, dictionary);
        password.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(
			password.hint, dictionary);
    }
}

exports.focusPassword = function () {
    password.focus();
};

function disableForm() {
    email.isEnabled = false;
    password.isEnabled = false;
    submitButton.isEnabled = false;
    pageData.set("authenticating", true);
}
function enableForm() {
    email.isEnabled = true;
    password.isEnabled = true;
    submitButton.isEnabled = true;
    pageData.set("authenticating", false);
}

exports.submit = function () {
    if (!user.isValidEmail()) {
        dialogsModule.alert({
            message: "Enter a valid email address.",
            okButtonText: "OK"
        });
        return;
    }

    disableForm();

    if (pageData.get("isLogin")) {
        login();
    } else {
        register();
    }
};

function login() {
    user.login()
		.catch(function () {
		    dialogsModule.alert({
		        message: "Unfortunately we could not find your account.",
		        okButtonText: "OK"
		    });
		    enableForm();
		    return Promise.reject();
		})
		.then(enableForm)
		.then(navigation.goToListPage);
}



exports.forgotPassword = function () {
    if (!pageData.get("isLogin")) {
        return;
    }
    navigation.goToPasswordPage();
}
/*Se activa con el evento tap: tapLogin del button con id: submit-button*/
exports.login_ = function () {
    if (!pageData.get("isLogin")) {
        return;
    }
    navigation.goToMainPage();
}
exports.cuenta = function () {

    navigation.goToCuentaPage();
}


function updateSubmitButtonText() {
    submitButton.text = pageData.get("isLogin") ? "Login" : "Sign up";
}

function inicio() {
    var initialContainer = page.getViewById("initial-container");
    var mainContainer = page.getViewById("container");
    var containerLogo = page.getViewById("container-logo");
    var formControls = page.getViewById("form-controls");
    var signUpStack = page.getViewById("sign-up-stack");
    var animations = [];

    // Fade out the initial content over one half second.
    initialContainer.animate({
        opacity: 0,
        duration: 500
    }).then(function () {
        // After the animation completes, hide the initial container and
        // show the main container and logo. The main container and logo will
        // not immediately appear because their opacity is set to 0 in CSS.
        initialContainer.style.visibility = "collapsed";
        mainContainer.style.visibility = "visible";
        containerLogo.style.visibility = "visible";

        // Fade in the main container and logo over one half second.
        animations.push({ target: mainContainer, opacity: 1, duration: 500 });
        animations.push({ target: containerLogo, opacity: 1, duration: 500 });

        // Slide up the form controls and sign up container.
        animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
        animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

        // Kick off the animation queue
        new Animation(animations, false).play();
    });
}
