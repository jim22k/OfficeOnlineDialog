Example of using a "double jump" technique for doing OAuth flow for Office Online.

Why? Because the standard `Office.context.ui.displayDialogAsync` doesn't seem to work well for Office Online when doing an OAuth workflow which redirects cross-origin.

After the redirect, even though we are back on the same origin as the add-in, communication doesn't work. This manifests itself by Office.js not being able to load.
This only seems to happen if you redirect. The original dialog window can communicate fine.

The solution is to NEVER redirect away from the original dialog window. Instead, pop open a new window and communciate with it via BroadcastChannel.

So the flow looks like this:

1. Open a dialog (page1.html)
2. Page 1 opens a second window (page2.html)
3. Page 2 does the OAuth redirect flow and ends up back in same origin as the start
4. Page 2 communicates with Page 1 via BroadcastChannel
5. Page 1 communciates with add-in via Office.context.ui.messageParent
6. Page 1 sends a close() message to Page 2
7. Add-in calls dialog.close()
