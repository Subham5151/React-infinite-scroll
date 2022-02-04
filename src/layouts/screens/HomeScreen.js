import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BigList from 'react-native-big-list';
import axios from 'axios';
// https://randomuser.me/api/?page=3&results=10

const ITEM_HEIGHT = 50;
const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const getUsers = async () => {
    // let response = await fetch(
    //   'https://randomuser.me/api/?page=${currentPage}&results=10',
    // );
    // const data = await response.json();
    // axios({
    //   method: 'get',
    //   url: 'https://randomuser.me/api/?page=${currentPage}&results=10',
    // }).then(response => {
    //   setUsers([...users, ...response.data.results]);
    // });

    try {
      const response = await axios.get(
        'https://randomuser.me/api/?page=${currentPage}&results=10',
      );
      console.log('response==============', response.data);
      setUsers([...users, ...response.data.results]);
      if (response.ok) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } catch {
      console.log('error');
    }
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapper}>
        <Image style={styles.imageSize} source={{uri: item.picture.large}} />
        <View>
          <Text
            style={
              styles.txtName
            }>{`${item.name.title}${item.name.first} ${item.name.last} `}</Text>
          <Text style={styles.emailName}>{item.email}</Text>
        </View>
      </View>
    );
  };
  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    getUsers();
  }, [currentPage]);
  return (
    <View>
      <Text>hi</Text>
      <TouchableOpacity style={styles.searchCta}>
        <Image
          style={styles.searchImg}
          source={require('../../assets/imgs/search-img.png')}
        />
      </TouchableOpacity>
      <FlatList
        data={users}
        renderItem={renderItem}
        headerHeight={100} // Default 0, need to specify the header height
        footerHeight={100}
        keyExtractor={item => item.email}
        // renderFooter={renderLoader}
        // onEndReached={loadMoreItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1, width: '100%'},
  itemWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  imageSize: {
    height: 50,
    width: 50,
    marginRight: 16,
  },
  txtName: {fontSize: 16, color: '#000', marginBottom: 4},
  emailName: {color: '#777'},
  loaderStyle: {marginVertical: 8},
  searchCta: {
    height: 64,
    backgroundColor: 'yellow',
    width: 64,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  searchImg: {
    height: 24,
    width: 24,
  },
});
export default HomeScreen;
