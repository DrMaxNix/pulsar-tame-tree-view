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
