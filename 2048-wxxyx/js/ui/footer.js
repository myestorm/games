import Group from '../libs/canvas/group';
import Image from '../libs/canvas/image';
import Text from '../libs/canvas/text';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const groupWidth = screenWidth;
const groupHeight = 160;

const imgWidth = 180;
const imgHeight = 120;

export default class Footer extends Group {
  constructor () {
    super({
      leftTop: {
        x: 0,
        y: screenHeight - groupHeight,
      },
      width: groupWidth,
      height: groupHeight
    });
    const logo = new Image({
      src: 'images/2048/logo.png',
      leftTop: {
        x: (groupWidth - imgWidth) / 2,
        y: 0,
      },
      width: imgWidth,
      height: imgHeight,
      oWidth: 360,
      oHeight: 240,
    });
    this.add(logo);

    const copyright = new Text({
      leftTop: {
        x: 0,
        y: imgHeight
      },
      width: groupWidth,
      height: 40,
      // font: `12px ${fonts.Light}`,
      fontSize: 12,
      fontFamily: fonts.Light,
      color: '#927963',
      text: 'totonoo studio 2022'
    });
    this.add(copyright);
  }
};
