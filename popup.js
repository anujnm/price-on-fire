var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://stats.g.doubleclick.net/dc.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackClick(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({currentWindow:true, active: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'get_search_results', function(response) {
      var start = '<table width="100%" border="0" cellspacing="0" cellpadding="3" class="product-list"><tbody>';
      var body = start;
      for (var i = 0; i < response.length; i++) {
        var url = response[i].viewItemURL[0];
        var rounded_price = Math.round(response[i].sellingStatus[0].convertedCurrentPrice[0].__value__);
        var img_html = '<tr><td><a id="pof-image-' + (i+1) + '" href="' + response[i].viewItemURL[0] +'" target="_blank"><img src="' + response[i].galleryURL[0] + '" alt="' + response[i].title[0] + '"/></a></td>';
        var title_html = '<td class="product-title"><div><a id="pof-title-' + (i+1) + '" href="' + url +'" target="_blank">' + response[i].title[0] + '</a></div>';
        var source_html =  '<div class="product-source">eBay.com</div></td>';
        var price_html =  '<td class="product-price"><a id="pof-price-' + (i+1) + '" class="product-price-button" target="_blank" href="' + url + '">$' + rounded_price + '</a></td></tr>';
        body += img_html + title_html + source_html + price_html;
      }
      body += '</tbody></table>';
      var div = document.createElement('div');
      div.innerHTML = body;
      document.body.appendChild(div);
      var feedback = '<a id="feedback" class="feedback" href="mailto:anuj@anuj.ca" target="_blank">We love feedback!</a>';
      var div_feedback = document.createElement('div');
      div_feedback.innerHTML = feedback;
      document.body.appendChild(div_feedback);
      var links = document.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
          links[i].addEventListener('click', trackClick);
      }
    });
  });
});
