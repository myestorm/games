import Group from '../libs/canvas/group';
import Text from '../libs/canvas/text';
import Rect from '../libs/canvas/rect';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const gap = 12;
const size = screenWidth - 12 * 2;

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
        y: 126
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

    const col = 4;
    const row = 4;
    const gridWidth = (size - ((col + 1) * gap)) / col;
    const gridHeight = (size - ((row + 1) * gap)) / row;
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

    
  }
};
