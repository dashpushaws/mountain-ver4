import React, { useEffect, useCallback, useState } from 'react';
import { ListItem } from 'react-native-elements'
import api from '../api/list'
import { mtnList } from '../shared/mtnList'


const SearchList = ({ navigation, keyword }) => {

  list = mtnList;
  // const [list, setList] = useState([])
  // const getList = useCallback(async () => {
  //   const result = await api.list();
  //   console.log(result.data)
  //   setList(result.data);
  // }, [])

  // useEffect(() => {
  //   getList();
  // }, [])

  if (keyword && keyword.length > 1) {
    list = list.filter(item => item.title.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1)

    return (
      list.map((item, i) => (
        <ListItem
          containerStyle={{ width: "100%" }}
          key={i}
          bottomDivider onPress={() => {
            navigation.navigate('Detail', { id: item.id })
          }}
        >
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))
    )
  } else {
    return (
      <></>
    )
  }
}

export default SearchList;