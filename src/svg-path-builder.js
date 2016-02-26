/* takes commands and builds into svg path string */

var space = '\u0020';

//todo: do lots of testing with different paths
// make a collection of different paths
//  study how svg-path-parser breaks up paths.

function handleCommand (memo, command, index, commands) {
	var result;
	switch(command.code){
	case 'M':
		result = 'M' + command.x + space + command.y;
		break;
	case 'm':
		result = 'm' + command.x + space + command.y;
		break;
	case 'L':
		if(index > 0 && commands[index-1].code === 'L') {
			result = space + command.x + space + command.y;
		} else {
			result = 'L' + command.x + space + command.y;
		}
		break;
	case 'l':
		if(index > 0 && commands[index-1].code === 'l') {
			result = space + command.x + space + command.y;
		} else {
			result = 'l' + command.x + space + command.y;
		}
		break;
	case 'V':
		if(index > 0 && commands[index-1].code === 'V') {
			result = space + command.y;
		} else {
			result = 'V' + command.y;
		}
		break;
	case 'v':
		if(index > 0 && commands[index-1].code === 'v') {
			result = space + command.y;
		} else {
			result = 'v' + command.y;
		}
		break;
	case 'H':
		if(index > 0 && commands[index-1].code === 'H') {
			result = space + command.x;
		} else {
			result = 'H' + command.x;
		}
		break;
	case 'h':
		if(index > 0 && commands[index-1].code === 'h') {
			result = space + command.x;
		} else {
			result = 'h' + command.x;
		}
		break;
	case 'C':
		result = 'C' + command.x1 + space + command.y1 + space + command.x2 + space + command.y2 + space + command.x + space + command.y;
		break;
	case 'c':
		result = 'c' + command.x1 + space + command.y1 + space + command.x2 + space + command.y2 + space + command.x + space + command.y;
		break;
	case 'S':
		if(index > 0 && commands[index-1].code === 'S') {
			result = space + command.x2 + space + command.y2 + space + command.x + space + command.y;
		} else {
			result = 'S' + space + command.x2 + space + command.y2 + space + command.x + space + command.y;
		}
		break;
	case 's':
		if(index > 0 && commands[index-1].code === 's') {
			result = space + command.x2 + space + command.y2 + space + command.x + space + command.y;
		} else {
			result = 's' + space + command.x2 + space + command.y2 + space + command.x + space + command.y;
		}
		break;
	case 'Q':
		if(index > 0 && commands[index-1].code === 'Q') {
			result = space + command.x1 + space + command.y1 + space + command.x + space + command.y;
		} else {
			result = 'Q' + space + command.x1 + space + command.y1 + space + command.x + space + command.y;
		}
		break;
	case 'q':
		if(index > 0 && commands[index-1].code === 'q') {
			result = space + command.x1 + space + command.y1 + space + command.x + space + command.y;
		} else {
			result = 'q' + space + command.x1 + space + command.y1 + space + command.x + space + command.y;
		}
		break;
	case 'T':
		if(index > 0 && commands[index-1].code === 'T') {
			result = space + command.x + space + command.y;
		} else {
			result = 'T' + space + command.x + space + command.y;
		}
		break;
	case 't':
		if(index > 0 && commands[index-1].code === 't') {
			result = space + command.x + space + command.y;
		} else {
			result = 't' + space + command.x + space + command.y;
		}
		break;
	case 'A':
		if(index > 0 && commands[index-1].code === 'A') {
			result = space + command.rx + space + command.ry + space + command.xAxisRotation + space + (+command.largeArc) + space + (+command.sweep) + space + command.x + space + command.y;
		} else {
			result = 'A' + command.rx + space + command.ry + space + command.xAxisRotation + space + (+command.largeArc) + space + (+command.sweep) + space + command.x + space + command.y;
		}
		break;
	case 'a':
		if(index > 0 && commands[index-1].code === 'a') {
			result = space + command.rx + space + command.ry + space + command.xAxisRotation + space + (+command.largeArc) + space + (+command.sweep) + space + command.x + space + command.y;
		} else {
			result = 'a' + command.rx + space + command.ry + space + command.xAxisRotation + space + (+command.largeArc) + space + (+command.sweep) + space + command.x + space + command.y;
		}
		break;
	case 'Z':
		result = 'Z';
		break;
	case 'z':
		result = 'z';
		break;
	default :
		// do something else
	}
	return memo + result;
}

function build(commands){
	return commands.reduce(handleCommand, '');
}


exports.build = build;