function isGitHubRepoHomepage(url) {
    // Regex to strictly match https://github.com/user/repo or https://github.com/user/repo/
    // It ensures no further path segments exist after the repo name.
    const pattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
    return pattern.test(url);
  }
  
  function createDeepWikiLink() {
    const currentUrl = window.location.href;
    if (isGitHubRepoHomepage(currentUrl)) {
      console.log("GitHub Repo Homepage detected:", currentUrl);
  
      // Prevent adding multiple icons if script runs multiple times (e.g., SPA navigation)
      if (document.getElementById('deepwiki-launcher-icon')) {
          return;
      }
  
      const iconUrl = chrome.runtime.getURL('icons/wiki-icon.png'); // Get icon path
  
      const wikiIcon = document.createElement('img');
      wikiIcon.id = 'deepwiki-launcher-icon';
      wikiIcon.src = iconUrl;
      wikiIcon.title = 'Open in DeepWiki'; // Tooltip on hover
  
      wikiIcon.onclick = function() {
        // Replace github.com with deepwiki.com
        // Using URL constructor for potentially more robust parsing if needed later
        try {
            const urlObject = new URL(currentUrl);
            urlObject.hostname = 'deepwiki.com'; // Change the hostname
            const newUrl = urlObject.toString();
  
            console.log("Opening DeepWiki URL:", newUrl);
            window.open(newUrl, '_blank'); // Open in a new tab
        } catch (e) {
            console.error("Error parsing or creating new URL:", e);
            // Fallback: simple string replacement (less robust)
            const fallbackUrl = currentUrl.replace('github.com', 'deepwiki.com');
             if (fallbackUrl !== currentUrl) {
                 console.log("Opening DeepWiki URL (fallback):", fallbackUrl);
                 window.open(fallbackUrl, '_blank');
             }
        }
      };
  
      document.body.appendChild(wikiIcon);
    } else {
       console.log("Not a GitHub Repo Homepage:", currentUrl);
       // Optional: Remove icon if navigation changes page type within SPA
       const existingIcon = document.getElementById('deepwiki-launcher-icon');
       if (existingIcon) {
           existingIcon.remove();
       }
    }
  }
  
  // Initial check when the script loads
  createDeepWikiLink();
  
  // --- Handling Single Page Application (SPA) Navigation ---
  // GitHub uses SPA navigation (pushState) which doesn't trigger full page reloads.
  // We need to re-run our check when the URL changes.
  
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      // Re-run the check function whenever the URL changes
      createDeepWikiLink();
    }
  }).observe(document.body, { subtree: true, childList: true }); // Observe changes
  
  // Alternative/Robust SPA check: Listen for specific GitHub events if available,
  // or use history API listeners. MutationObserver is a common approach.
  
  // You might also want to listen to 'popstate' event for back/forward navigation
  window.addEventListener('popstate', createDeepWikiLink);
  
  