var editor = function() { 
	
	var that = this;
	
	this.elements = {
		
		viewable_text : null, 
		cursor : null, 
		input_field : null
	},
	
	this.text = null,
	this.text_array = null,
	
	this.init = function(parameters)
	{
		that.events();	
		
		that.text = that.elements.viewable_text.text();
	},
	
	this.events = function() { 
		
		var typing = false, selection, text;
		var cursor_position = 0;
		var selection_start=0, selection_end = 0;
		
		// A string of the selected text
		var selected_text; 
		// Array of the text that isn't selected
		var remaining_text; 
		
		that.elements.viewable_text.on('mouseup', function(e) { 
			
			if(window.getSelection)
			{
				selection = window.getSelection();
			}
				else if(document.getSelection)
			{
				selection = document.getSelection();
			}
				else if(document.selection)
			{
				selection = document.selection.createRange().text;
			}
			
			// Get the text
			selected_text = selection.toString();
			
			// Update positions to slice array 
			cursor_position = selection.baseOffset;
			selection_start = selection.baseOffset;
			selection_end = selection.extentOffset;
		
			console.log(selection.baseOffset)
			console.log(selection.extentOffset)
			console.log(selection.baseNode.length)
			
			// Get the text that isn't selected to rebuild if they hit back space
			remaining_text = that.elements.viewable_text.text().split(selected_text);
			console.log(' length ' + selected_text.length)
					
		}).on('click', function(){
			typing = true;
		});
		
		$(document).on('keydown',function(e){
			if(!typing) return;
			// Back space
			if(e.keyCode==8)
			{
				e.preventDefault();
			} 
			
			
		}).on('keyup',function(e){
			if(!typing) return;
			if(e.keyCode==8) e.preventDefault();
			
		}).on('keypress', function(e) { 
			
			if(!typing) return;
			
			e.preventDefault(); 
			// focus on input text to bring up ios somehow
			var raw_unicode_character = (typeof e.which == "number") ? e.which : e.keyCode;
			var html_character = String.fromCharCode(raw_unicode_character);
    
			that.elements.viewable_text.html(that.text+=html_character);
			
			
			
			
		});
		
	}
}	