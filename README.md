## README
This extension can help you improve your productivity by providing basic operations :
Suitable for Javascript and typescript.
## Features
Surround a text block with the following :

if(expression){
	//your
	//selected code
	//here
}else{
	
}
or 

try{
	//your
	//selected code
	//here
}catch(e){
	cosole.error(e);
	
}
or
JSON.parse(<yourSelectedExpressionHere>)
or
JSON.stringify(<yourSelectedExpressionHere>)

More surrounding expression will be available in the next versions

## Requirements
You need to always select your code from start to end. so that your cursor is at the end of the code you want to surround.
Undo (ctrl+Z or cmd+z) will remove the whole operation.
## Extension Settings
For example:

To surround a block with if/else :

1- surround your code 
2- (Windows => ctrl+shit+i) or (mac => cmd+shift+i)

To surround a block with try/catch :

1- surround your code 
2- (Windows => ctrl+shit+t) or (mac => cmd+shift+t)

To surround a block with JSON.parse(code) :

1- surround your code 
2- (Windows => ctrl+shit+p) or (mac => cmd+shift+p)

To surround a block with JSON.stringify(code) :

1- surround your code 
2- (Windows => ctrl+shit+j) or (mac => cmd+shift+j)

## Known Issues
Selecting a block from end to start will reject the operation and display a message.
Also I did not test this extension on Mac or Linux. So sorry in advance if there are bugs there.

## Release Notes
First commit

### 0.0.1
Initial release of surround-me
--