function togglePip() {
  chrome.runtime.sendMessage({
    relayToNativePort: true,
    data: { action: 'toggle_float_for_top_window' },
  });
}

function hackPipInGoogleMeet() {
  document.addEventListener('click', () => {
    setTimeout(() => {
      var ulResult = document.evaluate(
        "//ul[contains(., 'Open picture-in-picture')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      );
      var ul = ulResult.singleNodeValue;

      if (ul) {
        var liResult = document.evaluate(
          ".//li[contains(., 'Open picture-in-picture')]",
          ul,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        );
        var li = liResult.singleNodeValue;
        if (li && !li.hasAttribute('jsaction')) {
          togglePip();
        }
        if (li && li.hasAttribute('jsaction')) {
          li.removeAttribute('jsaction');
          li.removeAttribute('delegate-controller');
        }
      }
    }, 0);
  });
}

function hackPipInZoom() {
  const iframe = document.querySelector('iframe#webclient');
  const iframeDoc = iframe.contentDocument;
  const pipButton = iframeDoc.getElementById('fullscreen-pip-btn');
  console.log(pipButton);
  if (pipButton) {
    pipButton.onclick = null;
    pipButton.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePip();
    };
  }
}

function _main_() {
  if (location.href.includes('google')) {
    hackPipInGoogleMeet();
  }
  if (location.href.includes('zoom')) {
    hackPipInZoom();
  }
}

_main_();
