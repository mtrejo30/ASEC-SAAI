
/*Archivo que uso para redireccionarme*/
var navigation = require("../../shared/navigation");
var observable = require("data/observable");
var pageModule = require("ui/page");
var view = require("ui/core/view");
var scrollViewModule = require("ui/scroll-view");
var borderModule = require("ui/border");
var dialogsModule = require("ui/dialogs");
var utilsModule = require("utils/utils");
var socialShare = require("nativescript-social-share");
var statusBarUtil = require("../../shared/utils/status-bar-util");
var dialogs = require("ui/dialogs");

var page;
var drawerElement;
var groceryListElement;
var mainContentElement;


var viewModel = new observable.Observable();


var pageData = new observable.Observable();


/*Se activa con el evento tap: tapVerify del button con id: submit-button*/
exports.tapVerify = function () {
    navigation.goToHome();
}

exports.logian_ = function () {
    navigation.goToPdfPage();
}

////////////////////////////////////////////CAMBIAR  Y REDUCIR CODIGO///////////////////////////////////////////
 function onchange (args) {
    var sender = args.object;
    var parent = sender.parent;
    if (parent)
    {
        var lblItem = view.getViewById(parent, "idDropDown").selectedIndex;
        
        if (lblItem ==undefined)
        {
            
        }
        else {
            var nombre = view.getViewById(parent, 'nombre1');
            nombre.visibility = "visible";
            var nombrecombo = view.getViewById(parent, 'idDropDown1');
            nombrecombo.visibility = "visible";
        }
           
        
    }
}
 exports.onchange = onchange;
 function onchange1(args) {
     var sender = args.object;
     var parent = sender.parent;
     if (parent) {
         var lblItem = view.getViewById(parent, "idDropDown1").selectedIndex;
         
         if (lblItem == undefined) {

         }
         else {
             var nombre = view.getViewById(parent, 'nombre2');
             nombre.visibility = "visible";
             var nombrecombo = view.getViewById(parent, 'idDropDown2');
             nombrecombo.visibility = "visible";
         }


     }
 }
 exports.onchange1 = onchange1;

 function onchange2(args) {
     var sender = args.object;
     var parent = sender.parent;
     if (parent) {
         var lblItem = view.getViewById(parent, "idDropDown2").selectedIndex;

         if (lblItem == undefined) {

         }
         else {
             var nombre = view.getViewById(parent, 'nombre3');
             nombre.visibility = "visible";
             var nombrecombo = view.getViewById(parent, 'idDropDown3');
             nombrecombo.visibility = "visible";
         }


     }
 }
 exports.onchange2 = onchange2;
 function onchange3(args) {
     var sender = args.object;
     var parent = sender.parent;
     if (parent) {
         var lblItem = view.getViewById(parent, "idDropDown3").selectedIndex;

         if (lblItem == undefined) {

         }
         else {
             var nombre = view.getViewById(parent, 'nombre4');
             nombre.visibility = "visible";
             var nombrecombo = view.getViewById(parent, 'idDropDown4');
             nombrecombo.visibility = "visible";
         }


     }
 }
 exports.onchange3 = onchange3;
 function onchange4(args) {
     var sender = args.object;
     var parent = sender.parent;
     if (parent) {
         var lblItem = view.getViewById(parent, "idDropDown4").selectedIndex;

         if (lblItem == undefined) {

         }
         else
         {
             navigation.goToPdfPage();
            

           
         }


     }
 }
 exports.onchange4 = onchange4;



///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;
    statusBarUtil.configure();
    mainContentElement = page.getViewById("main-content");
    var page = args.object;
    viewModel.set("items0", [ "2016", "2015", "2014"]);
    viewModel.set("items1", ["Informe Anual"]);
    viewModel.set("items2", [ "Informe de registro 2016"]);
    viewModel.set("items3", [ "por tomo", "por auditoria"]);
    viewModel.set("items4", ["Informe", "Municipios", "Estados"]);

    viewModel.set("test", "Test for parent binding!");
    
    page.bindingContext = viewModel;
    

}
exports.pageLoaded = pageLoaded;

exports.buttonTap = function (args)
{
   
    dialogsModule.alert({
        message: "Enter a valid email address.",
        okButtonText: "OK"
    });
}

exports.visible = function (args) {
    dialogsModule.alert({
        message: "Enter a valid email address.",
        okButtonText: "OK"
    });
}


exports.menu = function () {
    drawerElement.toggleDrawerState();
};
exports.drawerOpening = function () {
    if (page.ios) {
        mainContentElement.animate({
            duration: 250,
            opacity: 0.5
        });
    }
};
exports.drawerClosing = function () {
    if (page.ios) {
        mainContentElement.animate({
            duration: 250,
            opacity: 1
        });
    }
};
exports.signOut = navigation.signOut;

