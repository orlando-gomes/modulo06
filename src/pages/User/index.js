import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  /* Não funciona. Static não enxerga this.
  static navigationOptions = {
    title: this.props.navigation.getParam('user').name,
  };
  Vamos ter que transformar em função
  */

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    firstStars: [],
    stars: [],
    loading: true,
    page: 0,
    refreshing: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({
      firstStars: response.data,
      stars: response.data,
      loading: false,
      page: 1,
    });
  }

  loadMore = async () => {
    const { stars, page } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const nextPage = page + 1;
    const response = await api.get(
      `/users/${user.login}/starred?page=${String(nextPage)}`
    );

    this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      page: nextPage,
    });
  };

  refreshList = () => {
    this.setState({
      refreshing: true,
    });
    const { firstStars } = this.state;
    this.setState({
      stars: firstStars,
      page: 1,
      refreshing: false,
    });
  };

  showRepo = (star) => {
    const { navigation } = this.props;

    navigation.navigate('Starred', { star });
    // console.tron.log(star);
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#7159c1" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={(star) => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            refreshing={refreshing}
            onRefresh={this.refreshList}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title onPress={() => this.showRepo(item)}>{item.name}</Title>
                  <Author onPress={() => this.showRepo(item)}>
                    {item.owner.login}
                  </Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

/* Isso funciona
User.navigationOptions = {
  title: 'Usuários',
};
*/
