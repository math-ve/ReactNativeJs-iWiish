import cheerio from 'cheerio'

const parseDynamicImgUrl = (data) => {
    return data.substr(2, data.indexOf(".jpg") + 2);
}

const getDataFromUrl = async (baseUrl) => {
    return new Promise(resolve => {
        fetch(baseUrl).then((res) => {
            res.text()
            .then((html) => {
                var $ = cheerio.load(html);

                // GET IMG URL
                var imgUrl = $('#landingImage').attr('data-old-hires');
                // IF BOOK ?
                if (imgUrl == "" || imgUrl == undefined) {
                    if ($('#imgBlkFront').attr('data-a-dynamic-image'))
                        imgUrl = parseDynamicImgUrl($('#imgBlkFront').attr('data-a-dynamic-image'));
                    else if ($('#ebooksImgBlkFront').attr('data-a-dynamic-image'))
                        imgUrl = parseDynamicImgUrl($('#ebooksImgBlkFront').attr('data-a-dynamic-image'));
                    else if ($('#landingImage').attr('data-a-dynamic-image'))
                        imgUrl = parseDynamicImgUrl($('#landingImage').attr('data-a-dynamic-image'));
                }

                var title = $('#productTitle').text().replace(/\s\s+/g, '').replace(/\n+/g, '');

                var price = $('#priceblock_ourprice').text();
                if (price === "")
                    price = $('.offer-price').text();

                if (price == "") {
                    var price = $('#priceblock_saleprice').text();
                }
                if (price == "") {
                    var price = $('#priceblock_dealprice').text();
                }

                resolve ({
                    title: title,
                    imgUrl: imgUrl,
                    price: price
                })                
            })
        })          
    })
  
}

export { getDataFromUrl }