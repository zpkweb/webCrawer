const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (ctx, next) => {
	await axios.get(ctx.state.reptileUrl)
	  .then(function (response) {
	  	let $ = cheerio.load(response.data);
	  	$('#list a').each(function (i, elem) {
  			if(11 < i && i< 15){
  				let that = $(elem);
  				ctx.state.reptileData.push({
  					href : that.attr('href')
  				});
  			}
	  	});
	    return next();
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}