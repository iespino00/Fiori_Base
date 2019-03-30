sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast){
    "use strict";

        return Controller.extend("com.dudev.UI5C.controller.Main",{
    	
    	isMockRun: true,
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
	                    url: "",
	                    datatype: "json",
	                    cache: "false",
	                    data: {

	                                        }
			                }).done(function(oResponse){
		
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
	            }
	            
	          

            });

    });