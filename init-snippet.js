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
