const axios = require('axios');
const { JSDOM } = require('jsdom');

const getProuctUrl = (product_id) => `
https://www.amazon.com/gp/product/ajax/ref=dp_aod_unknown_mbc?asin=${product_id}&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-2&pc=dp&experienceId=aodAjaxMain
`;

async function getPrices(product_id) {
  const productUrl =  getProuctUrl(product_id);
  const { data: html } = await axios.get(productUrl, {
    headers: {
      'Accept': 'text/html,*/*',
      'Host': 'www.amazon.com',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'pragma': 'no-cache'
    },
  });
  const dom = new JSDOM(html);
  const $ = (selector) => dom.window.document.querySelector(selector);
  // console.log(dom.window.document.querySelector('.a-price .a-offscreen').textContent); // "Hello world"
  // console.log(data);
  const pinnedElement = $('#pinned-de-id');
  const title = pinnedElement.querySelector('#aod-asin-title-text').textContent.trim();
  const pinnedPrice = $(".a-price .a-offscreen").textContent;
  const pinned = {
    price: pinnedPrice,

  };
  const result = {
    title,
    pinned,
    offers: []
  };
  console.log(result)
}

getPrices('B0002E4Z8M');