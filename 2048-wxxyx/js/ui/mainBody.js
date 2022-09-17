import Group from '../libs/canvas/group';
import Text from '../libs/canvas/text';
import Rect from '../libs/canvas/rect';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const gap = 12;
const size = screenWidth - gap * 2;
const col = 4;
const row = 4;

const gridWidth = (size - ((col + 1) * gap)) / col;
const gridHeight = (size - ((row + 1) * gap)) / row;

export default class MainBody extends Group {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {string} props.text 文本
   */
   constructor () {
    super({
      leftTop: {
        x: gap,
        y: 126 + window.fixedGameOffset
      },
      width: size,
      height: size
    });

    const gridGroup = new Group({
      leftTop: {
        x: 0,
        y: 0
      },
      width: size,
      height: size
    });
    this.add(gridGroup);

    const bg = new Rect({
      leftTop: {
        x: 0,
        y: 0
      },
      width: size,
      height: size,
      background: '#bdad9e',
      borderRadius: 4
    });
    gridGroup.add(bg);

    
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const grid = new Rect({
          leftTop: {
            x: gap + i * (gridWidth + gap),
            y: gap + j * (gridHeight + gap)
          },
          width: gridWidth,
          height: gridHeight,
          background: '#cfc1b2',
          borderRadius: 4
        });
        gridGroup.add(grid);
      }
    }

    const dataGroup = new Group({
      leftTop: {
        x: gap,
        y: gap
      },
      width: size - 2 * gap,
      height: size - 2 * gap
    });
    this.add(dataGroup);
    this.dataGroup = dataGroup;
  }
  
  setData (data) {
    this.data = [...data];
    this.dataGroup.children = [];
    this.data.map((val, index) => {
      if (val === 0) {
        return;
      }
      const _row = Math.floor(index / col);
      const _col = index % col;
      
      let fontColor, bgColor, fontSize;

      switch (val) {
        case 2 : {
          fontColor = '#796e64'
          bgColor = '#f0e4d9';
          fontSize = 48;
          break;
        }
        case 4: {
          fontColor = '#796e64'
          bgColor = '#efe0c5';
          fontSize = 48;
          break;
        }
        case 8: {
          fontColor = '#f9f6f1'
          bgColor = '#fcae6f';
          fontSize = 48;
          break;
        }
        case 16: {
          fontColor = '#f9f6f1'
          bgColor = '#2da8e1';
          fontSize = 40;
          break;
        }
        case 32: {
          fontColor = '#f9f6f1'
          bgColor = '#3466af';
          fontSize = 40;
          break;
        }
        case 64: {
          fontColor = '#f9f6f1'
          bgColor = '#514597';
          fontSize = 40;
          break;
        }
        case 128: {
          fontColor = '#f9f6f1'
          bgColor = '#7d4294';
          fontSize = 32;
          break;
        }
        case 256: {
          fontColor = '#f9f6f1'
          bgColor = '#c22f8a';
          fontSize = 32;
          break;
        }
        case 512: {
          fontColor = '#f9f6f1'
          bgColor = '#dc2e4f';
          fontSize = 32;
          break;
        }
        case 1024: {
          fontColor = '#f9f6f1'
          bgColor = '#e04a32';
          fontSize = 24;
          break;
        }
        case 2048: {
          fontColor = '#f9f6f1'
          bgColor = '#e86225';
          fontSize = 24;
          break;
        }
        default: {
          fontColor = '#f9f6f1'
          bgColor = '#e84a25';
          fontSize = 24;
          break;
        }
      }
      
      const grid = new Group({
        leftTop: {
          x: _col * (gridWidth + gap),
          y: _row * (gridHeight + gap)
        },
        width: gridHeight,
        height: size - 2 * gap
      });
      this.dataGroup.add(grid);

      const rect = new Rect({
        leftTop: {
          x: 0,
          y: 0
        },
        width: gridWidth,
        height: gridHeight,
        background: bgColor,
        borderRadius: 4
      });
      grid.add(rect);

      const text = new Text({
        leftTop: {
          x: 0,
          y: 4 // 设置视觉居中
        },
        width: gridWidth,
        height: gridHeight,
        // font: `${fontSize}px ${fonts.Bold}`,
        fontSize: fontSize,
        fontFamily: fonts.Bold,
        color: fontColor,
        text: val
      });
      grid.add(text);
    });
  }
};
