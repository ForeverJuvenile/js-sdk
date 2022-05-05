# wx-js-sdk

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 演示地址
[https://drugs.rongxiangjiankang.com/wx-js-sdk](https://drugs.rongxiangjiankang.com/wx-js-sdk)

![GitHub Dark](./src/assets/images/qrcode.png)


### 微信开放标签设置
[开放标签](/src/main.js)

````JavaScript
    try {
        app.config.compilerOptions.isCustomElement = tag => tag.startsWith('wx-');
    } catch {
        app.config.isCustomElement = tag => tag.startsWith('wx-');
    }
````

### JS-SDK文档说明
[JS-SDK文档](./src/common/README.md)