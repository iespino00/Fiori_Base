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
	    	oRm.write('<div class="dvStatus" id="id-dvStatus" style="background-color:black" ');
	    	oRm.writeControlData(oControl);
	    	oRm.write('>');
	    	
	    	oRm.write('<p class="dvStatus-text" >In Progress</p>');
	    	oRm.write('</div>');
	    }	
	  });
	
});