var editor = function() { 
	
	var that = this;
	
	this.elements = {
		
		viewable_text : null, 
		input_field : null
	},
	
	this.text = '',
	
	this.init = function(parameters)
	{
		that.events();	
	},
	
	this.events = function() { 
		
		var typing = false;
		
		that.elements.viewable_text.on('click', function(){
			typing = true;
		});
		
		$(document).on('keypress', function(e) { 
			
			if(!typing) return;
			
			e.preventDefault();
			
			// focus on input text to bring up ios somehow
			
			var raw_unicode_character = (typeof e.which == "number") ? e.which : e.keyCode;
			var html_character = String.fromCharCode(raw_unicode_character);
    
			that.elements.viewable_text.html(that.text+=html_character)
			
		});
		
	}
}	