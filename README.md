price-on-fire
=============

Chrome extension for price comparison between Amazon and eBay.

Price on Fire is an easy to use extension that helps consumers find the best prices for the products they wish to purchase. 
This extension compares product prices on Amazon with the prices of the same products on eBay. 
To use this extesion, the user must go to an Amazon product page, and once the page is fully loaded, click on the orange 
PoF logo and watch the prices from eBay merchants show up. 

The extension can only parse Amazon's product pages, so it uses a page action instead of a browser action. The background 
script (background.js) checks whether the page that is loaded in the current browser tab is an Amazon product page or not. 
If it is, then it will show the page action. The page action uses a content script to parse through the web page on the current
tab and find the product name. It then uses eBay's shoppping API to search for similar products and their prices. popup.js 
then displays these products on the popup. 
