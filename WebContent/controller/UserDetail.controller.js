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
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("userDetailRoute").attachPatternMatched(this.onPageLoaded, this);
        },

                //Evento llamado cada vez que se navega a esta vista
        onPageLoaded : function(oEvent)
        {
        	//Get user code from url
        	var userCode = oEvent.getParameter("arguments").code;
        	
        	this._loadDetail(userCode);
        	
        },

         _loadDetail : function(userCode)
         {
        	var oController = this;
        	$.ajax({
                type: "GET",
                url: "http://webide.dudev.mx/dudev/webide/pro/com.dudev.SDY/appi",
                datatype: "json",
                cache: "false",
                data: {
                    dvsn : "TASK",
                    opn  : "GTBU",
                    c    : userCode
                }
            }).done(function(oResponse){
            	var oModel = new JSONModel(oResponse);
            	oController.getView().setModel(oModel);
            }).fail(function(){
                //Handle errors
            }).always(function(){
            	//Reset Values
            });
        },

       onBack : function()
       {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("mainRoute", null, true);/*No conservar historial*/
        }


                    });

    });