import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';

const Starred = (props) => {
  const { navigation } = props;
  const star = navigation.getParam('star');
  return <WebView source={{ uri: star.html_url }} style={{ flex: 1 }} />;
};

export default Starred;

Starred.navigationOptions = (props) => ({
  title: props.navigation.getParam('star').name,
});

Starred.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
