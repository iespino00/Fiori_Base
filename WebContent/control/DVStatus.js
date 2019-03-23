sap.ui.define([
	"sap/ui/core/Control"
              ], function(Control)
{
	
	"use strict";
	
	return Control.extend("com.dudev.UI5C.control.DVStatus", 
			              {
		         		//Properties
		        metadata : {
		        	        properties : {
		        	        	         text  : {
		        	        	        	 	  type         : "string",
		        	        	        	 	  defaultValue : ""
		        	        	                 },
		        	        	         color : {
				        	        	          type 	: "string",
				        	        	          defaultValue : "#CCCCCC"
				        	        	         }
		        	                     }
		                   },
		   //Methods
		paint: function(){},
	    renderer : function(oRm, oControl){
	    	oRm.write('<div');
	    	oRm.write('>');
	    	
	    	
	    	oRm.write('</div>');
	    }	
	  });
	
});