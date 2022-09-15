import Image from '../libs/canvas/image';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

export default class BackGround extends Image {
  constructor () {
    super({
      src: 'images/2048/bg.jpg',
      leftTop: {
        x: 0,
        y: 0,
      },
      width: screenWidth,
      height: screenHeight
    });
  }
};
