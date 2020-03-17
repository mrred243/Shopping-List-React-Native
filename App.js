import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableWithoutFeedback, Keyboard
 } from 'react-native';
import * as firebase from 'firebase';
import { Input, Button } from 'react-native-elements';

const firebaseConfig = {
  apiKey: "AIzaSyBwMt8aDf7BsA2yveRrSrvRaXpXCfuPa0U",
  authDomain: "shoppinglist-7c5af.firebaseapp.com",
  databaseURL: "https://shoppinglist-7c5af.firebaseio.com",
  projectId: "shoppinglist-7c5af",
  storageBucket: "shoppinglist-7c5af.appspot.com",
  messagingSenderId: "123821735992",
  appId: "1:123821735992:web:5620541fcd10a17d9f26cd",
  measurementId: "G-ZYZF5CP4EE"
};

firebase.initializeApp(firebaseConfig);


export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);

  const saveItem = () => {
      firebase.database().ref('items/')
      .push( {'product': product, 'amount': amount} );
 }

 useEffect(() => {
   firebase.database().ref('items/').on('value', snapshot => {
   const data = snapshot.val();
   console.log(data);
  if(data !== null) {
      const prods = Object.values(data);
      setItems(prods);
}

})}, []);


const listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      <View style={styles.container}>

          <TextInput
          style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setProduct(text)}
          value={product} />
          <TextInput
          style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setAmount(text)}
          value={amount} />

          <View style={{flexDirection: 'row'}}>
              <Button  onPress={saveItem}  title='Add' />
          </View>
          <Text style={{color: 'pink', fontWeight: 'bold', fontSize: 20}}>Shopping List</Text>
            <FlatList
              style={{marginLeft : "5%"}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <View style={styles.listcontainer}>
              <Text style={{fontSize: 18}}>{item.product}, {item.amount}  </Text>
              </View>}

              data={items}
              ItemSeparatorComponent={listSeparator}
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
