// Allows users to open the side panel by clicking the action icon.
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Inject content script in all tabs first.
chrome.runtime.onInstalled.addListener(async () => {
  const tabs = await chrome.tabs.query({});
  tabs.forEach(({ id: tabId }) => {
    chrome.scripting
      .executeScript({
        target: { tabId },
        files: ['content.js'],
      })
      .catch(() => {});
  });
});

// Update badge text with the number of tools per tab.
chrome.tabs.onActivated.addListener(({ tabId }) => updateBadge(tabId));
chrome.tabs.onUpdated.addListener((tabId) => updateBadge(tabId));

function updateBadge(tabId) {
  chrome.action.setBadgeText({ text: '', tabId });
  chrome.action.setBadgeBackgroundColor({ color: '#2563eb' });
  chrome.tabs.sendMessage(tabId, { action: 'LIST_TOOLS' }).catch(() => {});
}

chrome.runtime.onMessage.addListener(({ tools }, { tab }) => {
  const text = tools?.length ? `${tools.length}` : '';
  chrome.action.setBadgeText({ text, tabId: tab.id });
});
