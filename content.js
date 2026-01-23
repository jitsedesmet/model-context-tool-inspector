console.debug('[WebMCP] Content script injected');

chrome.runtime.onMessage.addListener(({ action, name, inputArgs }, _, reply) => {
  try {
    if (!navigator.modelContextTesting) {
      throw new Error(
        'Error: You must run Chrome with the "Experimental Web Platform features" flag enabled.',
      );
    }
    if (action == 'LIST_TOOLS') {
      listTools();
      navigator.modelContextTesting.registerToolsChangedCallback(listTools);
    }
    if (action == 'EXECUTE_TOOL') {
      console.debug(`[WebMCP] Execute tool "${name}" with`, inputArgs);
      const promise = navigator.modelContextTesting.executeTool(name, inputArgs);
      promise.then(reply).catch(({ message }) => reply(JSON.stringify(message)));
      return true;
    }
  } catch ({ message }) {
    chrome.runtime.sendMessage({ message });
  }
});

function listTools() {
  const tools = navigator.modelContextTesting.listTools();
  console.debug(`[WebMCP] Got ${tools.length} tools`, tools);
  chrome.runtime.sendMessage({ tools, url: location.href });
}
