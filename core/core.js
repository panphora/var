function debounce (func, timeout = 2000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function savePage () {
  console.log("savePage called");

  fetch("/save-page", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pageHTML: getPageHTML()
    }),
  })
  .then(res => {
    console.log(res);
  })
  .then(data => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function getPageHTML () {
  const doctypeString = new XMLSerializer().serializeToString(document.doctype);
  const pageHTML = document.documentElement.outerHTML;
  return doctypeString + "\n" + pageHTML;
}

function watchDomForChanges (callback) {
  // Select the node that will be observed for mutations
  const targetNode = document;

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}

let savePageDebounced = debounce(savePage);
watchDomForChanges(savePageDebounced);