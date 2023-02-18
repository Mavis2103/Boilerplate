import {Dimensions} from 'react-native';
const {width: widthWindow, height: heightWindow} = Dimensions.get('window');

/**
 * It returns an object with a width and height property, where the width is the width of the window
 * and the height is the width of the window divided by the aspect ratio.
 * @param aspectRatio - The aspect ratio of the window.
 * @returns An object with two properties: width and height.
 */
const fitScreen = (aspectRatio = heightWindow / widthWindow) => {
  return {
    width: widthWindow,
    height: widthWindow / aspectRatio,
  };
};

/**
 * Given a width, return a size object with the height calculated based on the aspect ratio of the
 * window.
 * @param {number} width - number - The width of the window
 * @param aspectRatio - The aspect ratio of the image.
 * @returns An object with a width and height property.
 */
const fitHorizotal = (
  width: number,
  aspectRatio = heightWindow / widthWindow,
) => {
  return {
    width: width,
    height: width / aspectRatio,
  };
};

/**
 * Given a height, return an object with a width and height that will fit the window vertically.
 * @param {number} height - number - the height of the container
 * @param aspectRatio - The aspect ratio of the window.
 * @returns An object with a width and height property.
 */
const fitVertical = (
  height: number,
  aspectRatio = heightWindow / widthWindow,
) => {
  return {
    width: height / aspectRatio,
    height: height,
  };
};

/**
 * It takes a number as an argument and returns an object with two properties, width and height, which
 * are calculated based on the size argument and the width and height of the window.
 * @param {number} size - The size of the element you want to scaleSize.
 * @returns An object with two properties, width and height.
 */
const scaleSize = (size: number) => {
  return {
    width: widthWindow * size,
    height: heightWindow * size,
  };
};

/**
 * ScaleWidth takes a number and returns a number that is the size of the window multiplied by the
 * number passed in.
 * @param {number} size - The size of the element in the design.
 */
const scaleWidth = (size: number) => widthWindow * size;

/**
 * ScaleHeight takes a number and returns a number that is the height of the window times the number
 * passed in.
 * @param {number} size - The size of the element in the design.
 */
const scaleHeight = (size: number) => heightWindow * size;

export const scale = {
  widthWindow,
  heightWindow,
  scaleSize,
  fitScreen,
  fitHorizotal,
  fitVertical,
  scaleWidth,
  scaleHeight,
};
