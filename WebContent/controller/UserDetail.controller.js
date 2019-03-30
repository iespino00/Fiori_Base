sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel){
    "use strict";

        return Controller.extend("com.dudev.UI5C.controller.UserDetail",{

                /**
         * Event that will be called when the view is initialized
         */
        onInit : function(){

                    },
                    
                    
        onBack : function()
         {
           var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.navTo("mainRoute",null,true); //No conservar el historial
         }
    
     });

    });