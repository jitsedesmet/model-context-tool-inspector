chrome.runtime.onMessage.addListener(async ({ action, name, inputArgs }) => {
  try {
    if (!navigator.modelContextTesting) {
      throw new Error('Error: You must run Chrome with the "Experimental Web Platform features" flag enabled.');
    }
    if (action == 'LIST_TOOLS') {
      await listTools();
      navigator.modelContextTesting.registerToolsChangedCallback(listTools);
    }
    if (action == 'EXECUTE_TOOL') {
      await navigator.modelContextTesting.executeTool(name, inputArgs);
    }
  } catch ({ message }) {
    chrome.runtime.sendMessage({ message });
  }
});

async function listTools() {
  const tools = await navigator.modelContextTesting.listTools();
  chrome.runtime.sendMessage({ tools, url: location.href });
}
