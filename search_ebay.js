var ebay_results = null;

function getEbayResults() {
  var req = new XMLHttpRequest();
  req.open("GET", this.searchOnEbay_, true);
  req.onload = this.showResults_.bind(this);
  req.send(null);
}

function showResults_(e) {
  var response_string = e.currentTarget.response;
  var response_object = JSON.parse(response_string.substring(59, response_string.length-2))[0];
  var item_list = response_object.searchResult[0].item;
  ebay_results = item_list;
}

var search_term = encodeURIComponent(jQuery('#productTitle').text());

var searchOnEbay_ = 'http://svcs.ebay.com/services/search/FindingService/v1?' +
      'SECURITY-APPNAME=' +
      'OPERATION-NAME=findItemsByKeywords&' +
      'SERVICE-VERSION=1.0.0&' +
      'RESPONSE-DATA-FORMAT=JSON&' +
      'callback=_cb_findItemsByKeywords&' +
      'REST-PAYLOAD&' +
      'keywords=' + search_term +
      '&paginationInput.entriesPerPage=3';

getEbayResults();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == "get_search_results")
    sendResponse(ebay_results);
});
