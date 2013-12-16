'use strict';

FileDiff.module("Files", function(Module, App, Backbone, Marionette, $, _) {
    this.startWithParent = false;
    
    // Set up the locations of the two files and their content
    App.addRegions({
        file1View: '#file1',
        file2View: '#file2'
    });
    
    Module.addInitializer(function() {
    	// Make sure the user is using a current browser version by checking
    	// if we can use the necessary FileReader API objects
		if (window.File && window.FileReader && window.FileList && window.Blob) {
	    	var file1 = new Module.FileView({fileNumber: 1});
	    	var file2 = new Module.FileView({fileNumber: 2});

	    	// If the left file section has added a file
			this.listenTo(file1, 'ready', function() {
				// Check to see if the right file section has added a file
				if (!file2.isReady) return;

				// If it has, compare the files
				compareFiles(file1, file2);
			});
			
			// If the right file section has added a file
			this.listenTo(file2, 'ready', function() {
				// Check to see if the left file section has added a file
				if (!file1.isReady) return;

				// If it has, compare the files
				compareFiles(file1, file2);
			});

			// Display the views to the user
	        App.file1View.show(file1);
	        App.file2View.show(file2);
		} else {
			// The browser does not support reading files via JavaScript
			alert('The File APIs are not fully supported in this browser.');
		}
    });
});

FileDiff.module("Files", function(Module, App, Backbone, Marionette, $, _) {
	// A view to the user to display a file upload dialog and the file's content
	Module.FileView = Backbone.Marionette.ItemView.extend({
		// The specific template in the HTML
		template: '#file-template',

		// UI events to listen for
		// key -> the UI event
		// value -> the event handler
		events: {
			'change .file-input': 'onChangeFile',
			'click .fileupload-exists': 'onClearFileOutput'
		},

		// Specific UI components in the template
		ui: {
			input: '.file-input',
			output: '.file-output',
			clear: '.fileupload-exists'
		},

		// Runs when first constructing
		initialize: function(options) {
			this.fileNumber = options.fileNumber;
			this.isReady = false;
		},

		// Whenever a file is selected by the user
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
				
				// If it is a .java file, read it
				this.readFile(file);
				$("#select-file" + this.fileNumber).html("");
			}
		},

		// (Event Handler function) Clears file content from the screen
		onClearFileOutput: function() {
			this.clearFileOutput();
		},

		// Adds the given line as a list element to the file's output section
		addToOutput: function(line) {
			var output = '<li>' + line + '</li>'
			this.ui.output.append(output);
		},

		// Clears file content from the screen
		clearFileOutput: function() {
			this.ui.output.empty();
		},
	
		// Returns true if the function has loaded a file completely
		isReady: function() {
			return this.isReady;
		},

		// Returns the file content in array form; each line is in its own index
		getLines: function() {
			return this.lines;
		},

		// Reads the file for its content
		readFile: function(file) {
			var fileReader = new FileReader();
		
			var self = this;
			fileReader.onload = function(e) {
				// Clear all current output
				self.clearFileOutput();
				
				// Get all of the file content, and put each line in its own index in an array
				self.lines = e.target.result.split('\n');
				
				// For each line, print it within a list element (for line numbers)
				_.each(self.lines, function(line) {
					var output = '<li>' + line + '</li>'
					self.ui.output.append(output);
				});
				
				// Mark the file section as ready, and trigger an event to the parent application
				self.isReady = true;
				self.trigger('ready');
			};
			
			// Tell the file reader to read the user's file
			fileReader.readAsText(file);
		},

		// Used with the HTML template
		serializeData: function() {
			return {
				fileNumber: this.fileNumber
			};
		}
	});
});