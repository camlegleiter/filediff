'use strict';

if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

function compareFiles(file1, file2) {
	file1.clearFileOutput();
	file2.clearFileOutput();

	var lines1 = file1.getLines();
	var lines2 = file2.getLines();
	
	if (lines1.length === lines2.length) {
		for (var i = 0; i < lines1.length; ++i) {
			if (lines1[i].replace(/\s+/, '') === lines2[i].replace(/\s+/, '')) {
				file1.addToOutput(lines1[i]);
				file2.addToOutput(lines2[i]);
			} else {
				file1.addToOutput(highlight(lines1[i]));
				file2.addToOutput(highlight(lines2[i]));
			}
		}
	} else {
		var i = lines1.length, j = lines2.length;
	}
}

function highlight(line) {
	var ret = '';
	
	for (var i = 0; i < line.length; ++i) {
		if (/\s/g.test(line[i])) {
			ret += line[i];
		} else {
			ret += '<span class="highlight">' + line[i] + '</span>';
		}
	}

	return ret;
}