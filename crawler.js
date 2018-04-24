var fs = require('fs');
var request = require('sync-request');
var cheerio = require('cheerio');

// ES6 定义一个类
class Data {
    constructor() {
        // this.hisDay = "";
        // this.hisDayList = [{
        //     "year" : 0,
        //     "picUrl" : "",
        //     "link" : "",
        //     "text" : "",
        //     "date" : ""
        // }]
        this.month = undefined;
        this.monthList = [
            {
                "hisDay" : "",
                "hisList" : [
                    {
                        "year" : undefined,
                        "picUrl" : undefined,
                        "link" : undefined,
                        "text" : undefined,
                        "date" : undefined
                    }
                ]
            }
        ]


    }
}

var dataFromDiv = (div, id) => {
    let e = cheerio.load(div);
    let hdListItem = {};
    hdListItem.id = id;
    hdListItem.year = e('.time .poh b').text();
    let picUrlText = e('.pic .pica img').attr('data-original') || '';
    if(picUrlText && picUrlText.indexOf('http://www.todayonhistory.com') == -1) {
        picUrlText = 'http://www.todayonhistory.com' + picUrlText
    }
    hdListItem.picUrl = picUrlText;
    hdListItem.link = e('.pic .t a').attr('href') || e('.text a').attr('href');
    hdListItem.text = e('.pic .t a').text() || e('.text a').text();
    hdListItem.date = e('.pic .t span').text() || e('.text span').text();
    // console.log(hdListItem.date);

    return hdListItem
};

var dataFromUrl = (url) => {
    // 用 GET 方法获取 url 链接的内容
    let r = request('GET', url);
    let body = r.getBody('utf-8');
    // cheerio.load 用来把 HTML 文本解析为一个可以操作的 DOM
    let e = cheerio.load(body);
    let hdListItem = {};

    // 获取需爬内容列表
    let dataDivs = e('#container>li:not(.poh)');
    let hisDayList = [];
    for (let k = 0; k < dataDivs.length; k++) {
        let div = dataDivs[k];
        hdListItem = dataFromDiv(div, k);
        hisDayList.push(hdListItem)
    }
    return hisDayList
};

var saveData = (dataList) => {
    // JSON.stringify 第 2 3 个参数配合起来是为了让生成的 json
    // 数据带有缩进的格式，第三个参数表示缩进的空格数
    var s = JSON.stringify(dataList, null, 2);
    // 把 json 格式字符串写入到 文件 中
    var fs = require('fs');
    var path = './src/assets/history.json';
    fs.writeFileSync(path, s)
};

var __main = () => {
    // 主函数
    var year = [31, 28, 31, 30, 31, 30, 31, 31, 30, 11, 30, 31];
    // let year = [2, 3];
    let url = '';
    let dataList = [];
    for(let i = 1; i <= year.length; i++) {
        let monthDay = [];
        let data = new Data();
        data.month = i;
        for(let j = 1; j <= year[i - 1]; j++) {
            let monthDayItem = {};
            // 每次循环出一日的当年今日数组
            url = 'http://www.todayonhistory.com/' + i + '/' + j + '/';
            console.log(url);
            monthDayItem.day = j;
            monthDayItem.hisDay = i + '/' + j + '/';
            monthDayItem.hisDayList = dataFromUrl(url);
            // console.log(monthDayItem);
            monthDay.push(monthDayItem);
            // console.log(monthDay);
        }
        data.monthList = monthDay;
        // console.log(i);
        dataList.push(data);
    }
    saveData(dataList);
};

__main();
