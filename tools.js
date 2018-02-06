module.exports = {
	replaceText : (text) => {
		return text.replace(/\n/g, "").replace(/\s/g, "");
	},
	timeout : (ms) => {
	  return new Promise((resolve) => {
	    setTimeout(resolve, ms);
	  });
	}
}