// RESET FLAG //
var codeRanOnce = false;
var tryTreeViewCloseInterval = null;
var tryTreeViewCloseIntervalCount = 0;


// EXECUTE CODE WHEN WORKSPACE IS OPENED //
atom.workspace.onDidOpen(function({item}){
	// make sure the code doesn't run twice
	if(codeRanOnce) return;
	
	// remember that the code ran once
	codeRanOnce = true;
	
	// check whether the `Hidden On Startup` setting is activated
	if(atom.packages.config.settings["tree-view"].hiddenOnStartup || false){
		// schedule multiple tries to close the tree-view
		tryTreeViewClose();
		tryTreeViewCloseInterval = setInterval(tryTreeViewClose, 100);
	}
});


// TRY TO CLOSE THE TREE-VIEW //
tryTreeViewClose = function(){
	// get tree-view element
	var treeView = atom.workspace.paneContainerForURI("atom://tree-view");
	
	// time out after too many tries
	tryTreeViewCloseIntervalCount++;
	if(tryTreeViewCloseIntervalCount >= 20){
		clearInterval(tryTreeViewCloseInterval);
		return;
	}
	
	// check if tree-view element exists
	if(!treeView) return;
	
	// close the tree-view dock
	treeView.hide();
	
	// stop trying
	clearInterval(tryTreeViewCloseInterval);
}
