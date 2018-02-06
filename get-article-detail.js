const axios = require('axios');
const cheerio = require('cheerio');
var fetch = require('node-fetch');
const tools = require('./tools');

module.exports = async (ctx, next) => {
	let i = 0;
	for (const url of ctx.state.reptileData) {
		i++;
		console.log(`第${i}次请求：https://www.xs.la${url.href}`);
    const response = await fetch(`https://www.xs.la${url.href}`);
    let $ = cheerio.load(await response.text());
    $('.box_con').each(function (i, elem) {
    	let that = $(elem);
    	let contentText = that.find('#content').text();
    	ctx.state.reptileDetail+=that.find('.bookname h1').text();
    	ctx.state.reptileDetail+='\r\n';
    	ctx.state.reptileDetail+=tools.replaceText(contentText);
    	ctx.state.reptileDetail+='\r\n';
    })
  }
  console.log('请求结束')



  // let i = 0;
  // const textPromises = ctx.state.reptileData.map(async url => {
  //   i++;
  //   console.log(`第${i}次请求：https://www.xs.la${url.href}`);
  //   await tools.timeout(10000);
  //   const response = await fetch(`https://www.xs.la${url.href}`);
  //   return response.text();
  // });
  // for (const textPromise of textPromises) {
  // 	let $ = cheerio.load(await textPromise);
  // 	$('.box_con').each(function (i, elem) {
  // 		let that = $(elem);
  // 		let contentText = that.find('#content').text();
  // 		ctx.state.reptileDetail+=that.find('.bookname h1').text();
  // 		ctx.state.reptileDetail+='\r\n';
  // 		ctx.state.reptileDetail+=tools.replaceText(contentText);
  // 		ctx.state.reptileDetail+='\r\n';
  // 	})
  // }
}