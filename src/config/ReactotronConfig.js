import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.100' })
    .useReactNative()
    .connect();

  // eslint-disable-next-line no-console
  console.tron = tron;

  // Essa linha limpa minha timeline toda vez que damos
  // refresh na aplicação
  tron.clear();
}
