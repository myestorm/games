import Group from '../libs/canvas/group';
import Image from '../libs/canvas/image';
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

    const imgWidth = 32;
    const imgHeight = 32;
    const playIcon = new Image({
      leftTop: {
        x: (size - imgWidth) / 2,
        y: (size - imgHeight) / 2
      },
      width: imgWidth,
      height: imgHeight,
      oWidth: 32,
      oHeight: 32,
      src: 'images/icon/play.png'
    });
    this.add(playIcon);

  }

};
