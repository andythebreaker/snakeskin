# snakeskin
```function findAndFilterSVGNodes() {
    // Find all <g> elements with class 'sankey-node'
    const nodes = document.querySelectorAll('g.sankey-node');

    // Filter out nodes that include "林于馨" in their innerHTML
    const filteredNodes = Array.from(nodes).filter(node => node.innerHTML.includes("林于馨"));

    // Array to store object representations of <rect> elements
    let rects = [];

    // Iterate over filtered nodes and find <rect> elements inside
    filteredNodes.forEach(node => {
        const rectElements = node.querySelectorAll('rect');
        rectElements.forEach(rect => {
            // Get width and height of <rect>
            const width = rect.getAttribute('width');
            const height = rect.getAttribute('height');
            // Get x and y position of <rect> relative to the SVG or parent container
            const x = rect.getAttribute('x');
            const y = rect.getAttribute('y');
            
            // Store information in an object
            rects.push({ width, height, x, y });
        });
    });

    // Return array of objects containing width, height, x, y of <rect> elements
    return rects;
}
```
---

## 分析`https://github.com/plotly/plotly.js`

### 範例程式`https://plotly.com/javascript/sankey-diagram/#basic-sankey-diagram`

- 加上DIV在BODY中
- 該DIV ID是`'myDiv'`

```javascript=
Plotly.react('myDiv', data, layout)
```

#### 追蹤

- `Plotly.react('myDiv', data, layout)`
- `plotDone = exports.newPlot(gd, data, layout, config);`
  - 與plotly.js hello word相同 (大概是這樣)
  ```
  import "https://unpkg.com/virtual-webgl@1.0.6/src/virtual-webgl.js"
  import "./plotly-2.33.0.js"
  import "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js"
  Plotly.newPlot("gd", [{ y: [1, 2, 3] }])
  ```
- `return exports._doPlot(gd, data, layout, config);`

---

###### 示意圖

![image](https://github.com/andythebreaker/snakeskin/assets/43373581/6dadb406-ed9c-4caa-8996-a69ac410d74d)

## 重要

### 能量流的線，滑鼠游標懸停於上，可顯示其流量

觀看蛇圖請用chrome右上角的[漢堡圖示](https://zh.wikipedia.org/zh-tw/%E6%BC%A2%E5%A0%A1%E9%81%B8%E5%96%AE)，縮放25%，用筆電的觸控板縮放並平移

###### 縮放

![image](https://github.com/andythebreaker/snakeskin/assets/43373581/1f14cd7f-a242-4cfc-b5dd-d75b3bc71d38)
![image](https://github.com/andythebreaker/snakeskin/assets/43373581/68e32129-3e2e-4098-8b4c-197676eb0c11)

###### 平移

![image](https://github.com/andythebreaker/snakeskin/assets/43373581/68999662-7161-4f90-a098-e58c9586f476)

## 檔案名稱說明

|檔案名稱|說明|超連結(新分頁中開啟)|
|--|--|--|
|buyr.svg|**蛇行圖**of購買者價格交易表487部門-Co相關|[可互動的蛇圖.svg](https://raw.githubusercontent.com/andythebreaker/snakeskin/main/buyr.svg)|
|g.svg|**蛇行圖**of生產者價格交易表487部門-Co相關|[可互動的蛇圖.svg](https://raw.githubusercontent.com/andythebreaker/snakeskin/main/g.svg)|
|main.py|主程式|[下載(右鍵另存新檔)](https://raw.githubusercontent.com/andythebreaker/snakeskin/main/main.py)|
|op1.txt|**輸出**of購買者價格交易表487部門-Co相關||
|op.txt|**輸出**of生產者價格交易表487部門-Co相關||
|b.csv|**CSV**of購買者價格交易表487部門-Co相關||
|g.csv|**CSV**of生產者價格交易表487部門-Co相關||

## 資料規格

![image](https://github.com/andythebreaker/snakeskin/assets/43373581/8811cedf-c929-43b8-8797-aa59f4a76214)

紅色輸入，綠色輸出

## 圖案的製備方法

### 1. 主方法

使用[https://sankeymatic.com/build/](https://sankeymatic.com/build/)開源蛇圖繪製器，線上工具，離線可用，需有大記憶體與中央處理器的電腦，不然會跑很久。

- 缺失
  - 對CSV檔案相容性差
- 優點
  - 可批次匯入數據
 
### 2. 改善，使用python主程式

可匯入CSV檔，輸出sankeymatic相容的格式

### 3. 使用者手動把步驟2的輸出結果貼到步驟1

調整長寬為:

- Width:
- 500000
- Height:
- 20000

### 4. 下載SVG

須拉到X軸最右邊，Y軸中間，方可檢視圖片

#### (看更多...)給工程師的話

edit svg

```
<text x="10" y="20" font-family="Arial" font-size="16" fill="black">
    Scroll down to middle of y axis
</text>
<g transform="translate(-496500,18) scale(0.25)">
```

## 主程式的使用方法

1. download .py file
2. use text editor to open the file
3. at line 37, give input file name
4. at line 48, give output file name
5. put input csv in the same folder as the .py file
6. in the folder, left click, select "open with 終端機"
7. run command "python main.py"

### 輸入 CSV 的要求

![image](https://github.com/andythebreaker/snakeskin/assets/43373581/12758d7d-0e5e-4be5-bc7f-5aacf7f1a529)

#### 紅色部分

- 需要有值
- 不會被讀到

#### 綠色部分

- 會被讀到

#### CSV 外型

- 須為矩形

#### CSV 編碼

- 須為UTF-8

##### CSV: BIG5 TO UTF8

- open VS code
- open target file
- left bottom of VS code edit area, find: select codec
- 1. read with... big5
- 2. save with... utf8

## 參考資料

![image](https://github.com/andythebreaker/snakeskin/assets/43373581/3988ca4d-4f02-41ac-98bd-4c2a6f622a3b)
![image](https://github.com/andythebreaker/snakeskin/assets/43373581/17ba53f7-7adb-4c0e-931c-17ee10b04158)

