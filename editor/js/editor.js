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
		var range = '';
		var referenceNode;
		
		that.elements.viewable_text.on('mouseup', function(e) { 
		
			 var text = '';
          if(window.getSelection){
            text = window.getSelection();
          }else if(document.getSelection){
            text = document.getSelection();
          }else if(document.selection){
            text = document.selection.createRange().text;
          }
          text=text.toString();
          console.log(text)
		
		}).on('click', function(){
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