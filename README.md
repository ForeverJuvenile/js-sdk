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
[http://ftest.rongxiangjiankang.com/wx-js-sdke](http://ftest.rongxiangjiankang.com/wx-js-sdke)
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

### JS-SDK

[JS-SDK](/src/common/README.md)
<br/>
[所有menu项](/src/common/MENU.md)