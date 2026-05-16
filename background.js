// Background script for context menu and keyboard shortcuts
chrome.runtime.onInstalled.addListener(() => {
    // Create context menu items
    chrome.contextMenus.create({
        id: "convertSelectedTime",
        title: "Convert time with Zonex",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "openZonex",
        title: "Open Zonex converter",
        contexts: ["page"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "convertSelectedTime") {
        // Extract time from selected text and open popup with pre-filled data
        const selectedText = info.selectionText;
        const timePattern = /(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/;
        const match = selectedText.match(timePattern);
        
        if (match) {
            // Store the extracted time for use in popup
            chrome.storage.local.set({
                selectedTime: match[0],
                autoConvert: true
            });
        }
        
        // Open the extension popup
        chrome.action.openPopup();
    } else if (info.menuItemId === "openZonex") {
        chrome.action.openPopup();
    }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
    if (command === "_execute_action") {
        chrome.action.openPopup();
    }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelectedTime") {
        chrome.storage.local.get(["selectedTime", "autoConvert"], (result) => {
            sendResponse(result);
            // Clear the stored data after use
            chrome.storage.local.remove(["selectedTime", "autoConvert"]);
        });
        return true; // Keep the message channel open for async response
    }
});
