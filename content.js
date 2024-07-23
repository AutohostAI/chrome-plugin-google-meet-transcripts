(function() {
  const bannerId = 'transcript-reminder-banner';

  function createBanner() {
    const banner = document.createElement('div');
    banner.id = bannerId;
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = 'red';
    banner.style.color = 'white';
    banner.style.textAlign = 'center';
    banner.style.padding = '10px';
    banner.style.zIndex = '1000';
    banner.innerText = 'Remember to enable meeting transcripts!';
    
    const dismissButton = document.createElement('button');
    dismissButton.innerText = 'X';
    dismissButton.style.marginLeft = '20px';
    dismissButton.style.backgroundColor = 'white';
    dismissButton.style.color = 'red';
    dismissButton.style.border = 'none';
    dismissButton.style.cursor = 'pointer';
    dismissButton.onclick = () => {
      banner.style.display = 'none';
    };
    
    banner.appendChild(dismissButton);
    document.body.appendChild(banner);
  }

  function init() {
    createBanner();
  }

  window.addEventListener('load', init);
})();
