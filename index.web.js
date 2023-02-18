import {AppRegistry} from 'react-native';

import App from './src/App';
import {name as appName} from './app.json';

// Generate required css
import FontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import Ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import FontAwesome5_Brands from 'react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf';
import FontAwesome5_Regular from 'react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf';
import FontAwesome5_Solid from 'react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf';
const iconFontStyles = `
  @font-face {
    src: url('${Ionicons}');
    font-family: 'Ionicons';
  }
  @font-face {
    src: url('${FontAwesome}');
    font-family: 'FontAwesome';
  }
  @font-face {
    src: url('${FontAwesome5_Brands}');
    font-family: 'FontAwesome5_Brands';
  }
  @font-face {
    src: url('${FontAwesome5_Regular}');
    font-family: 'FontAwesome5_Regular';
  }
  @font-face {
    src: url('${FontAwesome5_Solid}');
    font-family: 'FontAwesome5_Solid';
  }
`;

// Create stylesheet
const style = document.createElement('style');
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
