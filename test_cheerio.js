const $ = require('cheerio');
const rp = require('request-promise');
//const fetch = require("node-fetch");

const url = "https://www.amazon.fr/Crossing-Chasm-3rd-Disruptive-Mainstream/dp/0062292986/ref=msx_wsirn_v1_3?pd_rd_w=6Nph7&pf_rd_p=3e225780-6ad3-4bd3-820c-a28382e1230a&pf_rd_r=MYCQJDW88QPWD1SB287T&pd_rd_r=ee5661b7-fd11-4466-9c39-c0693ce5df3d&pd_rd_wg=4evvL&pd_rd_i=0062292986&psc=1"

rp(url)
    .then((html) => {
        const test = []
        for(var i = 0; i < $("img", html).length; i++) {
            console.log($("img", html)[i].attribs["data-a-dynamic-image"])
        }
        //console.log(test)
    })


// LDLC FONCTIONNE
// rp(url)
//     .then((html) => {
//         const test = []
//         for(var i = 0; i < $("img", html).length; i++) {
//             if ($("img", html)[i].attribs.src && $("img", html)[i].attribs.src !== undefined &&
//                 $("img", html)[i].attribs.title && $("img", html)[i].attribs.title !== undefined) {
//                     test.push({
//                         src: $("img", html)[i].attribs.src,
//                         title: $("img", html)[i].attribs.title
//                     })
//                     break                 
//                 }

//         }
//         console.log(test)
//     })

//'data-a-dynamic-image'

///Library/Frameworks/Python.framework/Versions/3.9/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/Library/Frameworks/Python.framework/Versions/3.9/bin