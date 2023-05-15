## RESET ##
codeRanOnce = false
tryTreeViewCloseInterval = null
tryTreeViewCloseIntervalCount = 0


## EXECUTE CODE WHEN WORKSPACE IS OPENED ##
atom.workspace.onDidOpen({item}) ->
	# make sure the code doesn't run twice
	if codeRanOnce then return
	
	# remember that the code ran once
	codeRanOnce = true
	
	# check whether the `Hidden On Startup` setting is activated
	if atom.packages.config.settings["tree-view"].hiddenOnStartup || false
		# schedule multiple tries to close the tree-view
		tryTreeViewClose()
		tryTreeViewCloseInterval = setInterval(tryTreeViewClose, 100)


## TRY TO CLOSE THE TREE-VIEW ##
tryTreeViewClose = () ->
	# get tree-view element
	treeView = atom.workspace.paneContainerForURI("atom://tree-view")
	
	# time out after too many tries
	tryTreeViewCloseIntervalCount++
	if tryTreeViewCloseIntervalCount >= 20
		clearInterval(tryTreeViewCloseInterval)
		return;
	
	# check if tree-view element exists
	if !treeView then return;
	
	# close the tree-view dock
	treeView.hide()
	
	# stop trying
	clearInterval(tryTreeViewCloseInterval)
