(function () {
  const bannerId = "transcript-reminder-banner-1";
  const bannerTextid = `${bannerId}-text`;
  function createBanner() {
    const banner = document.createElement("div");
    banner.id = bannerId;
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.width = "100%";
    banner.style.backgroundColor = "#174072";
    banner.style.color = "white";
    banner.style.textAlign = "center";
    banner.style.padding = "10px";
    banner.style.zIndex = "1000";
    const textNode = document.createElement("span");
    textNode.id = bannerTextid;
    textNode.innerText = "Trying to automatically enable transcripts...";
    banner.appendChild(textNode);

    const dismissButton = document.createElement("button");
    dismissButton.innerText = "X";
    dismissButton.style.marginLeft = "20px";
    dismissButton.style.backgroundColor = "white";
    dismissButton.style.color = "#174072";
    dismissButton.style.border = "none";
    dismissButton.style.cursor = "pointer";
    dismissButton.onclick = () => {
      banner.style.display = "none";
    };

    banner.appendChild(dismissButton);
    document.body.appendChild(banner);
  }

  // Function to click on a button using XPath
  function clickButtonByXPath(xpath) {
    const button = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (button) {
      setTimeout(() => {
        button.click();
      }, 500);
      return true; // Button was found and clicked
    }
    return false; // Button not found
  }

  function closeBanner() {
    document.getElementById(bannerId)?.remove();
  }

  // Function to wait for an element to become visible and return a promise
  function waitForElement(xpath) {
    return new Promise((resolve, reject) => {
      // Cleanup function to clear the timeout if the observer resolves
      const cleanup = () => {
        clearTimeout(timeoutId);
      };

      // Set a timeout to reject the promise after 3 seconds
      const timeoutId = setTimeout(() => {
        observer.disconnect(); // Stop observing
        reject(new Error(`Element not found within 30 seconds: ${xpath}`)); // Reject the promise
      }, 30000);
      const observer = new MutationObserver(() => {
        if (clickButtonByXPath(xpath)) {
          observer.disconnect(); // Stop observing once the button is clicked
          resolve(null); // Resolve the promise
          cleanup();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  async function automaticallyEnable() {
    try {
      // Wait for the "Transcripts" button to become visible and click it
      await waitForElement("//button[contains(@aria-label, 'Activities')]");
      await waitForElement("//span[text()='Transcripts']");
      await waitForElement("//span[text()='Start transcription']");
      await waitForElement("//span[text()='Start']");
      await waitForElement("//button[contains(@aria-label, 'Close')]");
      closeBanner();
    } catch (err) {
      console.error(err);
      const bannerText = document.getElementById(bannerTextid);
      const banner = document.getElementById(bannerId);
      if (bannerText && banner) {
        bannerText.innerText = "Failed to enable transcripts.";
        banner.style.backgroundColor = "red";
      }
    }
  }

  function init() {
    createBanner();
    automaticallyEnable();
  }

  window.addEventListener("load", init);
})();
