/**
 * 获取依赖
 * @type {*}
 */

const cheerio = require('cheerio');

const Koa = require('koa');
const Router = require('koa-router');
const compose = require('koa-compose');
const app = new Koa();
var router = Router();
app.use(router.routes()).use(router.allowedMethods());


router.get('/crawer', compose([require(`${__dirname}/get-article`),require(`${__dirname}/get-article-list`),require(`${__dirname}/get-article-detail`)]));


function getArticle(item) {
	// 拼接请求地址
  let url = reptileUrl + '/p/' + item.slug;
   /**
 * 核心业务
 * 发请求，解析数据，生成数据
 */
    superagent.get(url).end(function (err, res) {
        // 抛错拦截
	    // if (err) {
	    //     return throw Error(err);
	    // }
      // 解析数据
        let $ = cheerio.load(res.text);
    // 获取容器，存放在变量里，方便获取
        let $post = $('div.post');
    // 获取script里的json数据
        let note = JSON.parse($('script[data-name=page-data]').text());
        /**
         * 存放数据容器
         * @type {Array}
         */
        let data = {
            
        };
       // 生成数据
        // 写入数据, 文件不存在会自动创建
        fs.writeFile(__dirname + '/data/article_' + item.slug + '.json', JSON.stringify({
            status: 0,
            data: data
        }), function (err) {
            if (err) throw err;
            console.log('写入完成');
        });
    });
}



app.listen(3033);
// const opn = require('opn');
// opn('http://localhost:3033/crawer', { app: ['chrome'] });