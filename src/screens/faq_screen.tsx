import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropdownArrow from '../assets/arrow';

const DATA = [
  {
    title: 'title1',
    text: 'First Item\nFirst ItemFirst ItemFirst ItemFirst ItemFirst Item\nFirst ItemFirst ItemFirst Item',
  },
  {
    title: 'title2',
    text: '2 Item\nv ItemFirst 2 ItemFirst ItemFirst 2 Item\nFirst ItemFirst ItemFirst Item',
  },
  {
    title: 'title3',
    text: '3 Item\n3 ItemFirst ItemFirst 3 ItemFirst Item\n3 ItemFirst ItemFirst 3',
  },
];

const Item = ({text, title}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const onPress = () => setIsOpen(!isOpen);
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
        <View style={isOpen ? styles.arrowRevert : styles.arrow}>
          <DropdownArrow />
        </View>
      </View>
      {isOpen ? <Text>{text}</Text> : <></>}
    </TouchableOpacity>
  );
};

export const FAQScreen = ({}) => {
  const renderItem = ({item}: {item: any}) => (
    <Item title={item.title} text={item.text} />
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.title}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
  arrow: {},
  arrowRevert: {transform: [{rotate: '180deg'}]},
});
