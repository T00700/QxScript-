function Env(name) {
  // 判断当前环境是否为 Loon
  const isLoon = typeof $loon !== "undefined";
  // 判断当前环境是否为 Surge
  const isSurge = typeof $httpClient !== "undefined" && !isLoon;
  // 判断当前环境是否为 QuantumultX
  const isQX = typeof $task !== "undefined";

  // 定义 read 方法，用于读取数据
  const read = (key) => {
    if (isLoon || isSurge) return $persistentStore.read(key);
    if (isQX) return $prefs.valueForKey(key);
  };

  // 定义 write 方法，用于写入数据
  const write = (key, value) => {
    if (isLoon || isSurge) return $persistentStore.write(key, value);
    if (isQX) return $prefs.setValueForKey(key, value);
  };

  // 定义 notify 方法，用于发送通知
  const notify = (title = "XiaoMao", subtitle = "", message = "", url = "") => {
    if (isLoon) $notification.post(title, subtitle, message, url);
    if (isSurge) $notification.post(title, subtitle, message, { url });
    if (isQX) $notify(title, subtitle, message, { "open-url": url });
  };

  // 定义 get 方法，用于发送 GET 请求
  const get = (url, callback) => {
    if (isLoon || isSurge) $httpClient.get(url, callback);
    if (isQX) {
      url.method = `GET`;
      $task.fetch(url).then((resp) => callback(null, {}, resp.body));
    }
  };

  // 定义 post 方法，用于发送 POST 请求
  const post = (url, callback) => {
    if (isLoon || isSurge) $httpClient.post(url, callback);
    if (isQX) {
      url.method = `POST`;
      $task.fetch(url).then((resp) => callback(null, {}, resp.body));
    }
  };

  // 定义 put 方法，用于发送 PUT 请求
  const put = (url, callback) => {
    if (isLoon || isSurge) $httpClient.put(url, callback);
    if (isQX) {
      url.method = "PUT";
      $task.fetch(url).then((resp) => callback(null, {}, resp.body));
    }
  };

  // 定义 toObj 方法，用于将字符串转为对象
  const toObj = (str) => JSON.parse(str);

  // 定义 toStr 方法，用于将对象转为字符串
  const toStr = (obj) => JSON.stringify(obj);

  // 定义 queryStr 方法，用于将对象转为可以请求的字符串
  const queryStr = (obj) => {
    return Object.keys(obj)
      .map((key) => `${key}=${obj[key]}`)
      .join("&");
  };

  // 定义 log 方法，用于输出日志
  const log = (message) => console.log(message);

  // 定义 done 方法，用于结束任务
  const done = (value = {}) => $done(value);

  // 返回包含所有方法的对象
  return {
    name,
    read,
    write,
    notify,
    get,
    post,
    put,
    toObj,
    toStr,
    queryStr,
    log,
    done,
  };
}

let $XiaoMaoSvip = new Env("EFHello");
let XiaoMaoIndex = 1;
if ($XiaoMaoSvip.read("EFHelloIndex")) {
  XiaoMaoIndex = parseInt($XiaoMaoSvip.read("EFHelloIndex")) || 1;
}

// 获取相应数据
let obj = JSON.parse(
  $response.body
    .replace(/hidden/g, "enabled")
    .replace(/false/g, "true")
    .replace(/disabled/g, "enabled")
    .replace(/visible/g, "enabled")
    .replace(/NONE/g, "RESTRICTED")
    .replace(/\"isEnrolled\":\w+/g, '"isEnrolled":true')
    .replace(/\"isGifted\":\w+/g, '"isGifted":false')
);
// 获取请求地址
let requestUrl = $request.url;
if (/^https:\/\/api\.hello\.ef\.com\/graphql?/.test(requestUrl)) {
  if (
    obj.data.hasOwnProperty("viewer") &&
    obj.data.viewer.hasOwnProperty("me")
  ) {
    let premium = {
      planType: "yearly",
      __typename: "Premium",
      paymentProviderName: "APPLE",
      endTime: 7956886942,
      isEnabled: true,
      isFamilyLeader: true,
    };
    obj.data.viewer.me.hasUsedRoleplay = true;
    obj.data.viewer.me.premium = premium;
  }

  if (
    obj.data.hasOwnProperty("node") &&
    obj.data.node.hasOwnProperty("sections") &&
    obj.data.node.sections.length
  ) {
    obj.data.node.sections.forEach((el, index) => {
      if (index > XiaoMaoIndex - 2) {
        el.progress.isCompleted = false;
      }
    });
    $XiaoMaoSvip.notify(
      "XiaoMao_EF Hello 执行成功！",
      "",
      "Nice!已解锁成功章节-" + XiaoMaoIndex + " ，顺序解锁请通过BoxJS依次配置。"
    );
  }
}
// 重写数据
$done({ body: JSON.stringify(obj) });
