# Tame Pulsar Tree View
Tame your Pulsar (Atom) editor's tree view by making it obey the "Hidden On Startup" setting!

### Why?
It is a well-known bug that Atom, and its fork Pulsar, don't properly respect the `Hidden On Startup` setting of its tree view.

I have used a lot of bodge-fixes for this in the past, but every now and then they stopped working due to updates. With this repository I'm trying to maintain a working code snippet for Pulsar's `init.coffee` which will make the `Hidden On Startup` setting work the way it should.

### Setup Instructions
Open your init script:

`Edit > Init Script`

When the file is called `init.js`, add this snippet to the file:
```js
// RESET FLAG //
var codeRanOnce = false;


// EXECUTE CODE WHEN WORKSPACE IS OPENED //
atom.workspace.onDidOpen(function({item}){
	// make sure the code doesn't run twice
	if(codeRanOnce) return;
	
	// remember that the code ran once
	codeRanOnce = true;
	
	// check whether the `Hidden On Startup` setting is activated
	if(atom.packages.config.settings["tree-view"].hiddenOnStartup || false){
		// get tree-view element
		var treeView = atom.workspace.paneContainerForURI("atom://tree-view");
		
		// close the tree-view dock
		treeView.hide();
	}
});
```

When the file is called `init.coffee`, add this snippet to the file:
```coffee
## RESET FLAG ##
codeRanOnce = false


## EXECUTE CODE WHEN WORKSPACE IS OPENED ##
atom.workspace.onDidOpen ({item}) ->
	# make sure the code doesn't run twice
	if codeRanOnce then return
	
	# remember that the code ran once
	codeRanOnce = true
	
	# check whether the `Hidden On Startup` setting is activated
	if atom.packages.config.settings["tree-view"].hiddenOnStartup || false
		# get tree-view element
		treeView = atom.workspace.paneContainerForURI("atom://tree-view")
		
		# close the tree-view dock
		treeView.hide()
```

Now you can configure whether you want the tree-view to be hidden on startup in the settings of the `tree-view` package:

`Edit > Preferences > Packages > tree-view > Hidden On Startup`

> Successfully tested using Pulsar v1.104.0
