sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast){
    "use strict";

        return Controller.extend("com.dudev.UI5C.controller.Main",{
    	
    	isMockRun: false,
    	taskSelected : true,
    	oModelTeam: null,

            /**
         * Event that will be called when the view is initialized
         */
        onInit : function(){
        	this._loadTasks();
        	this._loadTeam(); //Ejecutar funcion para cargar JSON del team
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
	        	//	MessageToast.show("ToDo: Agregar llamado a WS de tareas");
	        		$.ajax({
	                    type: "GET",
	                    url: "http://webide.dudev.mx/dudev/webide/pro/com.dudev.SDY/appi",
	                    datatype: "json",
	                    cache: "false",
	                    data: {
	                    	   dvsn: "TASK",
	                    	   opn: "GAO"
	                           }
			                }).done(function(oResponse)
			                		{
			                	var oModel = new JSONModel(oResponse);
			                	oController.getView().byId("tabTasks").setModel(oModel);
			                        }).fail(function(){
			                    //Handle errors
			                }).always(function(){
		
			                });
	        		
	        	     }
            },
            
            _loadTeam: function()
            {
               var oController=this;
           //    if(oController.isMockRun)
           // 	   {
            	   		$.getJSON("./model/mock/team.json" ,function(json){
            	   		var oModel = new JSONModel(json);
            	   		oController.getView().byId("tabTeam").setModel(oModel);
            	   		oController.oModelTeam = oModel;
            	   		});
            //	   }else{
           // 		   MessageToast.show("ToDo: Agregar llamado a WS de equipo");
           // 	   }
               
            },
            
               onChangeTasks : function(){
	        	   this.getView().byId("btnTasks").setVisible(false);
	        	   this.getView().byId("btnTeam").setVisible(true);
	        	   this.getView().byId("tiTasks").setText("Tasks");
	        	   this.getView().byId("panTeam").setVisible(false);
	        	   this.getView().byId("panTasks").setVisible(true);
	        	   this.taskSelected = false;
	        	   
	           },
            
	            onChangeTeam : function(){
	            	this.getView().byId("btnTeam").setVisible(false);
	            	this.getView().byId("btnTasks").setVisible(true);
	            	this.getView().byId("tiTasks").setText("Team");
	            	this.getView().byId("panTasks").setVisible(false);
	            	this.getView().byId("panTeam").setVisible(true);
	            	 this.taskSelected = true;
	            	
	            },
	           
	            onSearch : function()
	            {
	            	var data = this.getView().byId("txtSearch").getValue();
	            	var oList = null;
	            	
	            	if(this.taskSelected)
	            		{
	            		oList = this.getView().byId("tabTasks");
	            		}
		            	else{
		            		oList = this.getView().byId("tabTeam");	
		            		}
	            	
	                var oBinding = oList.getBinding("items");
	                
	                oBinding.filter([new sap.ui.model.Filter([
	                	new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, data) // en data va la informacion que va filtrando
	                ], false)]); //false nos obliga a que todas las condiciones se cumplan para que se filtre
	            },
	            
	            //Funciones de Formulario
	            onOpenForm: function(){
	            	var oDialog = this._getFormDialog();
	            	sap.ui.getCore().byId("cbUserFTask").setModel(this.oModelTeam);
	            	oDialog.open();
	            	
	            },
	            
	            //Funcion para obtener el fragmento
	            _getFormDialog: function(){
	            	if(!this._oFormDialog)
	            		{
	            		  this._oFormDialog = sap.ui.xmlfragment("com.dudev.UI5C.view.fragments.FormTask", this);
	            		  this.getView().addDependent(this._oFormDialog); //Aparecera sobre esta vista.
	            		}
	            	return this._oFormDialog;
	            },
	            
	            onCloseForm: function(){
	            	this._getFormDialog().close();
	            },
	            
	            onProgressChange: function(){
	            	var slProgress = sap.ui.getCore().byId("slProgressFTask").getValue();
	            	sap.ui.getCore().byId("onProgressFTask").setNumber(slProgress);
	            },
	            
	            onConfirmForm: function()
	            {
	            	
	            	var oName = sap.ui.getCore().byId("txtTitleFTask").getValue();
	                var oUser = sap.ui.getCore().byId("cbUserFTask").getSelectedKey();
	                var oDate = sap.ui.getCore().byId("dpDateFTask").getValue();
	                var oStatus = sap.ui.getCore().byId("cbStatusFTask").getSelectedKey();
	                var oProgress = sap.ui.getCore().byId("slProgressFTask").getValue();
	                
	                var oController = this;
	            	$.ajax({
	                    type: "GET",
	                    url: "http://webide.dudev.mx/dudev/webide/pro/com.dudev.SDY/appi",
	                    datatype: "json",
	                    cache: "false",
	                    data: {
	                    	   dvsn: "TASK",
	                    	   opn: "AT",
	                    	   //enviado parametros recibidos del 
	                    	   t: oName,
	                    	   u: oUser,
	                    	   d: oDate,
	                    	   s: oStatus,
	                    	   p: oProgress
	                           }
			                }).done(function(oResponse)
			                		{
			                	var oModel = new JSONModel(oResponse);
			                	MessageToast.show(oResponse.message.code); // en un message se mostrara la respuesta del servidor
			                		oController.onCloseForm()
			                		
			                	oController._loadTasks(); // recargando la tarea
			                        }).fail(function(){
			                    //Handle errors
			                }).always(function(){
		
			                });	
	            	
	            	
	            },
	            
	            // Funciones de Detalle
	            onSelectTask: function (oEvent)
	            {
	            	
	            	var oObject = oEvent.getSource().getBindingContext().getObject();
	            	var oModel = new JSONModel(oObject);
	            	
	            	var oDialog = this._getDetailDialog();
	            	oDialog.open();
	            	oDialog.setModel(oModel);
	            	sap.ui.getCore().byId("stTaskStatus").paint();
	            	
	            },
	            
	            //Funcion para obtener el detalle
	            _getDetailDialog: function()
	            {
	            	if(!this._oDetailDialog)
            		{
            		  this._oDetailDialog = sap.ui.xmlfragment("com.dudev.UI5C.view.fragments.DetailTask", this);
            		  this.getView().addDependent(this._oDetailDialog); //Aparecera sobre esta vista.
            		}
            	    return this._oDetailDialog;
	            },
	            
	            onCloseDetail: function(){
	           	 this._getDetailDialog().close();
	            },
	            
	            onSelectUser: function(oEvent)
	            {
	            	//Evento -> Control -> Modelo -> Object
	            	var oObject = oEvent.getSource().getBindingContext().getObject();
	                var oController = this;
	                
	                //Esperar 300 milisegundos
	                setTimeout(function(){
	                	                var oRouter = sap.ui.core.UIComponent.getRouterFor(oController); // Obteniendo el Router
	                	                 oRouter.navTo("userDetailRoute",{
	                	                	                              code : oObject.Code //Codigo del Usuario Seleccionado
	                	                	                             });
	                                     }, 300);
	            }
	            
	          

            });

    });