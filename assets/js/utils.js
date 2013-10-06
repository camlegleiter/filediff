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

	var lines1Type = [], lines2Type = [];

	for (var i = 0; i < lines1.length; ++i) {
		for (var j = 0; j < lines2.length; ++j) {
			if (i === j && lines1[i].replace(/\s+/, '') === lines2[j].replace(/\s+/, '')) {
				lines1Type[i] = 1;
				lines2Type[i] = 1;
				break;
			}

			if (lines1Type[i] === undefined) {
				if (lines1[i].replace(/\s+/, '') === lines2[j].replace(/\s+/, '')) {
					lines1Type[i] = 2;
					lines2Type[j] = 2;
				} /*else if (lines1[i].replace(/\s+/, '') ~~ lines2[j].replace(/\s+/, '')) {
					line1Type[i] = 3;
					line2Type[j] = 3;
				}*/
			}
		}

		if (lines1Type[i] === undefined) {
			lines1Type[i] = 0;
		}
	}

	for (var j = 0; j < lines2.length; ++j) {
		if (lines2Type[j] === undefined) {
			lines2Type[j] = 4;
		}
	}

	for(var i = 0; i < lines1Type.length; i++){
		if(lines1Type[i] === 0)
			file1.addToOutput(highlight(lines1[i], 'red'))
		else if(lines1Type[i] === 1)
			file1.addToOutput(lines1[i])
		else if(lines1Type[i] === 2)
			file1.addToOutput(highlight(lines1[i], 'blue'))
		else if(lines1Type[i] === 3)
			file1.addToOutput(highlight(lines1[i], 'yellow'))
		else if(lines1Type[i] === 4)
			file1.addToOutput(highlight(lines1[i], 'green'))
	}

	for(var i = 0; i < lines2Type.length; i++){
		if(lines2Type[i] === 0)
			file2.addToOutput(highlight(lines2[i], 'red'))
		else if(lines2Type[i] === 1)
			file2.addToOutput(lines2[i])
		else if(lines2Type[i] === 2)
			file2.addToOutput(highlight(lines2[i], 'blue'))
		else if(lines2Type[i] === 3)
			file2.addToOutput(highlight(lines2[i], 'yellow'))
		else if(lines2Type[i] === 4)
			file2.addToOutput(highlight(lines2[i], 'green'))
	}
	
	// if (lines1.length === lines2.length) {
	// 	for (var i = 0; i < lines1.length; ++i) {
	// 		if (lines1[i].replace(/\s+/, '') === lines2[i].replace(/\s+/, '')) {
	// 			file1.addToOutput(lines1[i]);
	// 			file2.addToOutput(lines2[i]);
	// 		} else {
	// 			file1.addToOutput(highlight(lines1[i]));
	// 			file2.addToOutput(highlight(lines2[i]));
	// 		}
	// 	}
	// } else {
	// 	for (var i = 0; i < lines1.length; ++i) {
	// 		file1.addToOutput(lines1[i]);
	// 	}

	// 	for (var i = 0; i < lines2.length; ++i) {
	// 		file2.addToOutput(lines2[i]);
	// 	}
	// }
}

function highlight(line, color) {
	var ret = '';
	
	for (var i = 0; i < line.length; ++i) {
		if (/\s/g.test(line[i])) {
			ret += line[i];
		} else {
			ret += '<span class="highlight-' + color + '">' + line[i] + '</span>';
		}
	}

	return ret;
}