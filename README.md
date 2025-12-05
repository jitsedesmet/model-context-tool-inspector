# Model Context Tool Inspector

A Chrome Extension that allows developers to inspect, monitor, and execute tools exposed via the experimental `navigator.modelContextTesting` Web API.

## Prerequisites

**Important:** This extension relies on the experimental `navigator.modelContextTesting` Web API. You must enable the "Experimental Web Platform features" flag in `chrome://flags` to turn it on.

## Installation

1.  **Download the Source:**
    Clone this repository or download the source files into a directory.

2.  **Open Chrome Extensions:**
    Navigate to `chrome://extensions/` in your browser address bar.

3.  **Enable Developer Mode:**
    Toggle the **Developer mode** switch in the top right corner of the Extensions page.

4.  **Load Unpacked:**
    Click the **Load unpacked** button that appears in the top left. Select the directory containing `manifest.json` (the folder where you saved the files).

## Usage

1.  **Navigate to a Page:**
    Open a web page that exposes Model Context tools.

2.  **Open the Inspector:**
    Click the extension's action icon (the puzzle piece or pinned icon) in the Chrome toolbar. This will open the **Side Panel**.

3.  **Inspect Tools:**
    * The extension will inject a content script to query the page.
    * A table will appear listing all available tools found on the page.

4.  **Execute a Tool:**
    * **Tool:** Select the desired tool from the dropdown menu.
    * **Input Arguments:** Enter the arguments for the tool in the text area.
        * *Note:* The input must be valid JSON (e.g., `{"text": "hello world"}`).
    * Click **Execute Tool**.
