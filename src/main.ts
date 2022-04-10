import { AppID, AppSecret } from "./serect";
import {
  ITransResponse,
  IRequestParams,
  IMap,
  ITransResult,
} from "./interface";
import { ServerResponse } from "http";

const md5 = require("md5");
const https = require("https");
const querystring = require("querystring");

const errorMap: IMap = {
  52001: "请求超时",
  52002: "系统错误",
  52003: "未授权用户",
  54000: "必填参数为空",
  54001: "签名错误",
  54003: "访问频率受限",
  54004: "账户余额不足",
  54005: "长query请求频繁",
  58000: "客户端IP非法",
  58001: "译文语言方向不支持",
  58002: "服务当前已关闭",
  90107: "认证未通过或未生效",
};

export const translate = (word: string) => {
  const salt: number = Math.random();
  const sign: string = md5(AppID + word + salt + AppSecret);
  const regExp = /[a-zA-Z]/g;
  let from, to;

  const isEnglish = regExp.test(word[0]);

  from = !isEnglish ? "zh" : "en";
  to = isEnglish ? "zh" : "en";

  const params: IRequestParams = {
    q: word,
    from,
    to,
    appid: AppID,
    salt,
    sign,
  };

  const query: string = querystring.stringify(params);

  const options = {
    hostname: "fanyi-api.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET",
  };

  const request = https.request(options, (response: ServerResponse) => {
    const chunks: Buffer[] = [];
    response.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    response.on("end", () => {
      const result: string = Buffer.concat(chunks).toString();
      const obj: ITransResponse = JSON.parse(result);
      if (obj.error_code) {
        console.error(errorMap[obj.error_code] || obj.error_msg);
        process.exit(2);
      } else {
        obj.trans_result.map((item: ITransResult) => {
          console.log(item.dst);
        });
        process.exit(0);
      }
    });
  });

  request.end();
};
