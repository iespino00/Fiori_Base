sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast){
    "use strict";

        return Controller.extend("com.dudev.UI5C.controller.Main",{
    	
    	isMockRun: false,

            /**
         * Event that will be called when the view is initialized
         */
        onInit : function(){
        	this._loadTasks();
        },
           /*Funcion para cambiar tareas*/
           _loadTasks: function()
           {
	        	var oController = this;
	        	
	        	if(oController.isMockRun)
	        	{
	        		$.getJSON("./model/mock/tasks.json", function(json){
	            		var oModel = new JSONModel(json);
	            		oController.getView().byId("tabTasks").setModel(oModel);
	            	});
	        	}else{
	        		MessageToast.show("ToDo: Agregar llamado a WS de tareas");
	        	     }
            }

            });

    });