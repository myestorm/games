import Group from '../libs/canvas/group';
import Text from '../libs/canvas/text';
import Rect from '../libs/canvas/rect';

const screenWidth = window.innerWidth;
const gap = 12;
const size = screenWidth - gap * 2;

export default class MainBody extends Group {
   constructor () {
    super({
      leftTop: {
        x: gap,
        y: 126 + window.fixedGameOffset
      },
      width: size,
      height: size
    });

    this.visible = false;

    const bg = new Rect({
      leftTop: {
        x: 0,
        y: 0
      },
      width: size,
      height: size,
      background: 'rgba(0,0,0,0.72)',
      borderRadius: 4
    });
    this.add(bg);

    const text = new Text({
      leftTop: {
        x: 0,
        y: 120
      },
      width: size,
      height: 64,
      // font: `36px ${fonts.Bold}`,
      fontSize: 36,
      fontFamily: fonts.Bold,
      color: '#f9f6f1',
      text: 'Game Over'
    });
    this.add(text);

    const rect = new Rect({
      leftTop: {
        x: (size - 128) / 2,
        y: 184
      },
      width: 128,
      height: 36,
      background: '#f2744c',
      borderRadius: 4
    });
    this.add(rect);

    const label = new Text({
      leftTop: {
        x: (size - 128) / 2,
        y: 186
      },
      width: 128,
      height: 36,
      // font: `16px ${fonts.Bold}`,
      fontSize: 16,
      fontFamily: fonts.Bold,
      color: '#ffffff',
      text: 'Try It Again'
    });
    this.add(label);

  }

};
