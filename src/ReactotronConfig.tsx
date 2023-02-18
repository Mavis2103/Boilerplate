import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  host: '192.168.1.5',
  port: 9090,
  onConnect() {
    console.log('connected');
  },
}) // controls connection & communication settings
  .connect(); // let's connect!
