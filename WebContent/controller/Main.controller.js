sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller,JSONModel){
    "use strict";
    
    return Controller.extend("com.dudev.UI5C.controller.Main",{
    
        /**
         * Event that will be called when the view is initialized
         */
        onInit : function()
             {            
              this._loadTasks();
             },
             
        /*Function para cargar las tareas*/
        _loadTasks: function()
        			{
        	        var oController = this;
        	
        			$.getJSON("./model/mock/tasks.json" , function(json){
        			   var oModel = new JSONModel(json);
        			   oController.getView().byId("tabTasks").setModel(oModel); //Se asigna el modelo del Json a la tabla de la vista.
        				});
        			}
        
    });
    
});