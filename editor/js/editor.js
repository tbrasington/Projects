var editor = function() { 
	
	var that = this;
	
	this.elements = {
		
		viewable_text : null, 
		cursor : null, 
		input_field : null
	},
	
	this.text = null,
	this.text_array = null,
	
	
	this.selection;
	this.cursor_position;
	this.selection_start;
	this.selection_end;
	
	
	this.ctrlz;
	
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
				that.selection = window.getSelection();
			}
				else if(document.getSelection)
			{
				that.selection = document.getSelection();
			}
				else if(document.selection)
			{
				that.selection = document.selection.createRange().text;
			}
			
			// Get the text
			that.selected_text = that.selection.toString();
			
			// Update positions to slice array 
			that.cursor_position = that.selection.baseOffset;
			that.selection_start = that.selection.baseOffset;
			that.selection_end = that.selection.extentOffset;
		
			
			// Get the text that isn't selected to rebuild if they hit back space
			that.remaining_text = that.elements.viewable_text.text().split(that.selected_text);
			
			
			console.log(' length ' + that.selected_text.length)
					
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
			if(e.keyCode==8) 
			{
				e.preventDefault();
				
				console.log(that.selection.baseOffset)
				console.log(that.selection.extentOffset)
								that.ctrlz= that.text.substr(that.selection.baseOffset, that.selection.extentOffset)
				
				//that.elements.viewable_text.html(that.text.substr(0, that.text.length-1));
				
				
				that.elements.viewable_text.html(that.text.slice(that.selection.baseOffset, that.selection.extentOffset));
				// need to get adjoining strings and merge them together
				that.text = that.elements.viewable_text.text();
			
			
			}
			
		}).on('keypress', function(e) { 
			
			if(!typing) return;
			
			e.preventDefault(); 
			// focus on input text to bring up ios somehow
			var raw_unicode_character = (typeof e.which == "number") ? e.which : e.keyCode;
			var html_character = String.fromCharCode(raw_unicode_character);
			that.text = that.text+=html_character
			that.elements.viewable_text.html(that.text);
			
			
			
			
		});
		
	}
}	