const fs = require('fs');

module.exports = async (ctx, next) => {
	ctx.state.reptileUrl = "https://www.xs.la/22_22031/";
	ctx.state.reptileData = [];
	ctx.state.reptileDetail = "";
	try {
    await next();
  } catch (err) {
    
  }


  fs.writeFile(`${__dirname}/article-detail.txt`, ctx.state.reptileDetail
  , function (err) {
  	if (err) {
  	   console.log(err)
  	}
  });
  ctx.body = `<a href="${__dirname}/article-detail.txt" download>${__dirname}/article-detail.txt</a>`


	

	// data.forEach(function (item) {
	//     getArticle(item);
	// });
}