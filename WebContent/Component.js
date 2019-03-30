sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(UIComponent, JSONModel, Device){

	"use strict";

	return UIComponent.extend("com.dudev.UI5C.Component", {

		metadata : {
			manifest : "json"
		},

		//Standard functions
		init : function(){

            //Call the parent init method
			UIComponent.prototype.init.apply(this, arguments);
            
			
			//inicializar la navegación
			this.getRouter().initialize();
			
            var oModel = new JSONModel(Device);
            this.setModel(oModel, "deviceData");
			
		}

	});

});