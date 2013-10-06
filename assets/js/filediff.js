'use strict';

FileDiff.module("Files", function(Module, App, Backbone, Marionette, $, _) {
    this.startWithParent = false;
    
    App.addRegions({
        file1View: '#file1',
        file2View: '#file2'
    });
    
    Module.addInitializer(function() {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
	    	var file1 = new Module.FileView({fileNumber: 1});
	    	var file2 = new Module.FileView({fileNumber: 2});

			this.listenTo(file1, 'ready', function() {
				if (!file2.isReady) return;
				compareFiles(file1, file2);
			});
			
			this.listenTo(file2, 'ready', function() {
				if (!file1.isReady) return;
				compareFiles(file1, file2);
			});

	        App.file1View.show(file1);
	        App.file2View.show(file2);
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
    });
});

FileDiff.module("Files", function(Module, App, Backbone, Marionette, $, _) {
	Module.FileView = Backbone.Marionette.ItemView.extend({
		template: '#file-template',

		events: {
			'change .file-input': 'onChangeFile',
			'click .fileupload-exists': 'onClearFileOutput'
		},

		ui: {
			input: '.file-input',
			output: '.file-output',
			clear: '.fileupload-exists'
		},

		initialize: function(options) {
			this.fileNumber = options.fileNumber;
			this.isReady = false;
		},

		onChangeFile: function(e) {
			this.isReady = false;
			// Get only the first file
			var file = e.target.files[0];
			
			if (file) {
				// Only compare .java files
				if (!file.name.endsWith('.java')) {
					this.ui.output.empty().append('Invalid file, must be a .java file');
					return;
				}
				
				this.readFile(file);
			}
		},

		onClearFileOutput: function() {
			this.clearFileOutput();
		},

		addToOutput: function(line) {
			var output = '<li>' + line + '</li>'
			this.ui.output.append(output);
		},

		clearFileOutput: function() {
			this.ui.output.empty();
		},
	
		isReady: function() {
			return this.isReady;
		},

		getLines: function() {
			return this.lines;
		},

		readFile: function(file) {
			var fileReader = new FileReader();
		
			var self = this;
			fileReader.onload = function(e) {
				self.clearFileOutput();
				
				self.lines = e.target.result.split('\n');
				
				_.each(self.lines, function(line) {
					var output = '<li>' + line + '</li>'
					self.ui.output.append(output);
				});
				
				self.isReady = true;
				self.trigger('ready');
			};
			
			fileReader.readAsText(file);
		},

		serializeData: function() {
			return {
				fileNumber: this.fileNumber
			};
		}
	});
});