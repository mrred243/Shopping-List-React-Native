import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableWithoutFeedback, Keyboard
 } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const addItem = () => {
    setData([...data, {key:text}]);
    setText('');
}
  const clearItems = () => {
  setData([]);
}


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      <View style={styles.container}>

          <TextInput
          style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setText(text)}
          value={text} />
          <View style={{flexDirection: 'row'}}>
              <Button  onPress={addItem}  title='Add' />
              <Button  onPress={clearItems}  title='Clear' />
          </View>
          <Text style={{color: 'pink', fontWeight: 'bold', fontSize: 20}}>Shopping List</Text>
            <FlatList data={data}
                      renderItem={({item}) => <Text>{item.key}</ Text>}
            />

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 300
  },
});
