'use strict';

if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

function compareFiles(file1, file2) {
    // Clean out the file display before comparing them and redisplaying with highlights
	file1.clearFileOutput();
	file2.clearFileOutput();

	var lines1 = file1.getLines();
	var lines2 = file2.getLines();

	var lines1Type = [], lines2Type = [];
	var lines1Stats = [], lines2Stats = [];

    // For each line in our original file
	for (var i = 0; i < lines1.length; i++) {
        // Examine each line in the new file
	    for (var j = 0; j < lines2.length; j++) {
            // If we're on the same line number and the lines are identical, make are the "same"
		    if (i === j && lines1[i].replace(/\s+/g, '') === lines2[j].replace(/\s+/g, '')) {
				lines1Type[i] = 1;
				lines2Type[i] = 1;
				lines1Stats[1]++;
				lines2Stats[1]++;
				break;
		    }
            // As long as the new line hasn't been flagged as "same"
		    if (lines2Type[j] !== 1) {
                // If we've found a matching line farther along in the new file, we know that it isn't the "same"
		        if (j > i && lines1[i].replace(/\s+/g, '') === lines2[j].replace(/\s+/g, '')) {
                    // Mark the lines as "moved" and move on down the old file
			        lines1Type[i] = 2;
			        lines2Type[j] = 2;
					lines1Stats[2]++;
					lines2Stats[2]++;
			        break;
                // If we found an identical line before the same line number
		        } else if (lines1[i].replace(/\s+/g, '') === lines2[j].replace(/\s+/g, '')) {
                    // Mark the line as "moved" and keep checking for a better match
			        lines1Type[i] = 2;
			        lines2Type[j] = 2;
					lines1Stats[2]++;
					lines2Stats[2]++;
			    }
		    }
            // If we haven't marked either lines as anything
		    if (lines1Type[i] === undefined && lines2Type[j] === undefined) {
                // If they've been "modified" (use helper comparison method with over 80% similar characters)
		        if (lineCompare(lines1[i].replace(/\s+/g, ''), lines2[j].replace(/\s+/g, '')) >= .8) {
		            // Mark them as "modified"
			        lines1Type[i] = 3;
			        lines2Type[j] = 3;
					lines1Stats[3]++;
					lines2Stats[3]++;
			    }
			}
		}

        // If our old line didn't find a match, mark it as deleted
		if (lines1Type[i] === undefined) {
			lines1Type[i] = 0;
			lines1Stats[0]++;
		}
	}

    // For each line in the new file, if it hasn't been labeled, mark it as "inserted"
	for (var j = 0; j < lines2.length; ++j) {
		if (lines2Type[j] === undefined) {
			lines2Type[j] = 4;
			lines2Stats[4]++;
		}
	}

    // For each line in the old document, add it to the view and highlight appropriately
	for(var i = 0; i < lines1Type.length; i++){
		if(lines1Type[i] === 0)
			file1.addToOutput(highlight(lines1[i], 'red'))
		else if(lines1Type[i] === 1)
			file1.addToOutput(lines1[i])
		else if(lines1Type[i] === 2)
			file1.addToOutput(highlight(lines1[i], 'blue'))
		else if(lines1Type[i] === 3)
			file1.addToOutput(highlight(lines1[i], 'yellow'))
	}

    // For each line in the new document, add it to the view and highlight appropriately
	for(var i = 0; i < lines2Type.length; i++){
		if(lines2Type[i] === 1)
			file2.addToOutput(lines2[i])
		else if(lines2Type[i] === 2)
			file2.addToOutput(highlight(lines2[i], 'blue'))
		else if(lines2Type[i] === 3)
			file2.addToOutput(highlight(lines2[i], 'yellow'))
		else if(lines2Type[i] === 4)
			file2.addToOutput(highlight(lines2[i], 'green'))
	}
	
	// Based on line stats (index 0 = deleted, 1 = same, 2 = moved, 3 = modified, 4 = inserted
}

// Compares characters and returns the percentage of matching chars from the first line
function lineCompare(line1, line2) {
    var count = 0;
    for (var i = 0; i < line1.length; i++) {
        for(var j = 0; j < line2.length; j++)
            if (line1[i] === line2[j]) {
                count++;
                line2 = line2.slice(0, j) + line2.slice(j+1);
                break;
            }
    }
    return (1.0 * count / line1.length);
}

// Highlights the appropriate line in the file displayed with what color is given
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