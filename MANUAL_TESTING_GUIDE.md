# Manual Testing Guide: GitHub to DeepWiki Redirector Extension

This guide provides steps to manually test the "GitHub to DeepWiki Redirector" browser extension, with a focus on the recent styling changes and core functionality.

## 1. Loading the Unpacked Extension

Follow the instructions for your browser:

**Google Chrome / Chromium-based browsers:**
1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable "Developer mode" using the toggle switch, usually found in the top-right corner.
3.  Click the "Load unpacked" button.
4.  In the file dialog, select the directory where your extension files (e.g., `manifest.json`, `style.css`, `content.js`) are located.
5.  The extension should now appear in your list of extensions and be active.

**Mozilla Firefox:**
1.  Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2.  Click the "Load Temporary Add-on..." button.
3.  In the file dialog, navigate to your extension's directory and select the `manifest.json` file (or any file within the directory).
4.  The extension will be loaded temporarily and will appear in the list. Note that temporary add-ons in Firefox are removed when you close the browser.

## 2. Test Environment

*   **Target Pages:** Perform all tests on GitHub repository homepages (e.g., `https://github.com/username/repository-name`). The redirector icon is designed to appear on these pages.
*   **Browser Tools:** Keep your browser's Developer Tools (usually opened with F12 or Ctrl+Shift+I/Cmd+Option+I) handy, especially the Inspector/Elements panel to check CSS properties if needed, and the Console for any errors.

## 3. Light Mode Testing

Ensure your operating system and browser are in their default/light mode theme.

### 3.1. Verifying Default Icon Appearance
*   **Action:** Navigate to a GitHub repository homepage.
*   **Expected Result:**
    *   The DeepWiki launcher icon should be visible (usually in the bottom-right corner).
    *   **Background Color:** A light, slightly transparent gray (`rgba(240, 240, 240, 0.9)`).
    *   **Border Radius:** Slightly rounded corners (`8px`).
    *   **Shadow:** A subtle shadow effect (`0 4px 12px rgba(0, 0, 0, 0.15)`).
    *   **Padding:** A small amount of padding around the icon image (`4px`).
    *   The icon image itself (`wiki-icon.png`) should be clearly visible within these styles.

### 3.2. Verifying Hover Effect
*   **Action:** Hover your mouse cursor over the DeepWiki launcher icon.
*   **Expected Result:**
    *   The icon should smoothly scale up slightly and lift (`transform: scale(1.1) translateY(-2px)`).
    *   The shadow should become slightly more pronounced (`box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2)`).
    *   The transition should be smooth (`0.2s cubic-bezier(0.25, 0.1, 0.25, 1)` for transform and shadow).

### 3.3. Verifying Active (Click) Effect
*   **Action:** Press and hold the left mouse button on the DeepWiki launcher icon (without releasing, to observe the active state before redirection).
*   **Expected Result:**
    *   The icon should scale down slightly from the hover state and lift a bit less (`transform: scale(1.05) translateY(-1px)`).
    *   The background color should become slightly darker/different (`background-color: rgba(230, 230, 230, 0.95)`).
    *   The shadow should revert to its normal (or slightly less) state (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)`).
    *   The transition into this state should be very quick (`transition-duration: 0.05s`).

## 4. Dark Mode Testing

### 4.1. Simulating or Enabling Dark Mode

**Windows:**
*   Go to Settings > Personalization > Colors.
*   Choose "Dark" under "Choose your default app mode" or "Choose your color".

**macOS:**
*   Go to System Preferences > General.
*   Select "Dark" for the Appearance.

**Linux (GNOME/KDE):**
*   This varies by distribution and desktop environment. Usually found in System Settings > Appearance or Theme settings.

**Browser-Specific (for testing `prefers-color-scheme`):**
*   **Chrome/Edge:**
    1.  Open Developer Tools (F12).
    2.  Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Menu.
    3.  Type "rendering" and select "Show Rendering".
    4.  In the Rendering tab, scroll down to "Emulate CSS media feature prefers-color-scheme" and select "prefers-color-scheme: dark".
*   **Firefox:**
    1.  Navigate to `about:config`.
    2.  Search for `ui.systemUsesDarkTheme`.
    3.  If it exists, set its value to `1` (Number type). If it doesn't exist, you can create it by selecting Number and clicking the "+" button, then setting the name and value. (This method might not always perfectly reflect OS-level `prefers-color-scheme` for all web content, so OS-level switching is preferred if possible.)

After enabling dark mode, reload the GitHub page.

### 4.2. Verifying Icon Appearance in Dark Mode
*   **Action:** Navigate to a GitHub repository homepage with dark mode enabled.
*   **Expected Result:**
    *   The DeepWiki launcher icon should be visible.
    *   **Background Color:** A dark, slightly transparent gray (`rgba(40, 42, 45, 0.9)`).
    *   **Shadow:** A shadow adapted for dark backgrounds (`0 4px 12px rgba(0, 0, 0, 0.35)`).
    *   Other properties like border-radius and padding should remain consistent with light mode.

### 4.3. Verifying Hover Effect in Dark Mode
*   **Action:** Hover your mouse cursor over the DeepWiki launcher icon.
*   **Expected Result:**
    *   The icon should smoothly scale up and lift (same transform as light mode: `scale(1.1) translateY(-2px)`).
    *   The background color should become slightly lighter or different from the default dark mode background (`background-color: rgba(55, 58, 62, 0.95)`).
    *   The shadow should become slightly more pronounced, adapted for dark mode (`box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45)`).
    *   Smooth transitions should be observed.

### 4.4. Verifying Active (Click) Effect in Dark Mode
*   **Action:** Press and hold the left mouse button on the DeepWiki launcher icon.
*   **Expected Result:**
    *   The icon should scale down slightly from hover and lift a bit less (same transform as light mode: `scale(1.05) translateY(-1px)`).
    *   The background color should change appropriately for an active state in dark mode (`background-color: rgba(30, 32, 35, 0.95)`).
    *   The shadow should revert to its normal dark mode shadow or slightly less (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35)`).
    *   Quick transition into this state.

## 5. Functionality Check

*   **Action:**
    1.  In either light or dark mode, click the DeepWiki launcher icon (press and release).
    2.  Observe the URL you are redirected to.
*   **Expected Result:**
    *   You should be redirected to the corresponding DeepWiki page for the GitHub repository. For example, if you are on `https://github.com/octocat/Spoon-Knife`, clicking the icon should redirect you to `https://deepwiki.com/github.com/octocat/Spoon-Knife`.
    *   The redirection should happen relatively quickly.

## 6. What to Look For (General Tips)

*   **Smooth Transitions:** All hover and active effects should have smooth animations, not jerky or instant changes (unless an instant change is intended, like the quick transition for the active state).
*   **No Visual Glitches:** Look for any flickering, misplaced elements, incorrect sizing, or unexpected color changes during transitions or mode switches.
*   **Consistency:** The icon's core image should remain clear and well-positioned across all states and modes. Padding and border-radius should generally be consistent unless specified otherwise for a particular state.
*   **Color Accuracy:** Colors should match the specified RGBA values for each state and mode. You can use browser developer tools (eyedropper or computed styles) to verify if needed.
*   **No Console Errors:** Keep an eye on the browser's developer console for any JavaScript errors related to the extension.
*   **Responsiveness:** While not the primary focus of these styling changes, ensure the icon doesn't behave erratically if the browser window is resized (it should generally stay in the bottom-right).

By following these steps, you can thoroughly test the visual and functional aspects of the "GitHub to DeepWiki Redirector" extension.
