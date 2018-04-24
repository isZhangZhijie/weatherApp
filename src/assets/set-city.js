let city = require('./china-city-list.json')

// console.log(city)

let saveData = (dataList) => {
  // JSON.stringify 第 2 3 个参数配合起来是为了让生成的 json
  // 数据带有缩进的格式，第三个参数表示缩进的空格数
  let s = JSON.stringify(dataList, null, 2);
  // 把 json 格式字符串写入到 文件 中
  let fs = require('fs');
  let path = './city-list.json';
  fs.writeFileSync(path, s)
};

// 省份列表
let province = []
for(let i = 0; i < city.length; i++) {
  // console.log(city[i][7])
  if(province.indexOf(city[i][7]) == -1) {
    province.push(city[i][7]);
  }
}
// console.log(province)
let chinaCity = []
for(let i = 0; i < province.length; i++) {
  // console.log(province[i])
  let onePro = {
    "pro_zh": undefined,
    "pro_en": undefined,
    "cityList": []
  }
  for(let j = 0; j < city.length; j++) {
    // console.log(city[j])
    if(province[i] == city[j][7] && onePro.cityList.indexOf(city[j] == -1)) {
      onePro.pro_zh = city[j][7]
      onePro.pro_en = city[j][6]
      let newCity = {
        "code": city[j][0],
        "city_en": city[j][1],
        "city_zh": city[j][2],
        "country_code" :city[j][3],
        "sup_city_en": city[j][8],
        "sup_city_zh": city[j][9],
        "latitude": city[j][10],
        "longitude": city[j][11]
      }
      onePro.cityList.push(newCity)
    }
  }
  chinaCity.push(onePro)
}
saveData(chinaCity)
