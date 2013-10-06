'use strict';

var FileDiff = new Class({
	initialize: function(input, output, clear) {
		this.__input = input;
		this.__output = output;
		this.__clear = clear;
		
		var self = this;
		$(this.__input).change(function(e) {
			self.__isReady = false;
			var file = e.target.files[0];
			
			if (file) {
				// Only compare .java files
				if (!file.name.endsWith('.java')) {
					$(self.__output).empty().append('Invalid file, must be a .java file');
					return;
				}
				
				self.__file = file;
				self.readFile();
			}
		});
		
		$(this.__clear).click(function() {
			self.emptyOutput();
		});
	},
	
	readFile: function() {
		var fileReader = new FileReader();
		
		var self = this;
		fileReader.onload = function(e) {
			self.emptyOutput();
			
			self.__lines = e.target.result.split('\n');
			
			_.each(self.__lines, function(line){
				var output = '<li>' + line + '</li>'
				$(self.__output).append(output);
			});
			
			self.__isReady = true;
			$(self).trigger('ready');
		};
		
		fileReader.readAsText(this.__file);
	},
	
	getLines: function() {
		return this.__lines;
	},
	
	addToOutput: function(line) {
		var output = '<li>' + line + '</li>'
		$(this.__output).append(output);
	},
	
	emptyOutput: function() {
		$(this.__output).empty();
	},
	
	isReady: function() {
		return this.__isReady;
	}
});

