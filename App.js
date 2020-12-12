/* eslint-disable */
import React from 'react';
import {StyleSheet, Text, View, AsyncStorage,ScrollView} from 'react-native';
import {Appbar,TextInput,Button,Card,List} from 'react-native-paper';

export default class App extends React.Component {

  arr=[]
  id=0

  state = {
    text: '',
    item:[
      {id:1, data:"loading"}
    ],
    renderList: []

  };

  storeData= async ()=>{
    this.arr.push({id: this.id, data: this.state.text})
      this.id++;
    await AsyncStorage.setItem("myList", JSON.stringify(this.arr))
     this.setState({
         item: JSON.parse(await AsyncStorage.getItem("myList"))
     })
    console.log(this.state)
  }

  async componentDidMount() {
      this.setState({
          item: JSON.parse(await AsyncStorage.getItem("myList")) || ""
      })
      this.arr=JSON.parse(await AsyncStorage.getItem("myList")) || ""
      this.id= this.arr[this.arr.length-1].id + 1
  }

    render() {
      if(this.state.item.length>0){
          this.state.renderList= this.state.item.map(item=>{
              return (
                  <Card key={item.id} style={{margin:7}}>
                      <List.Item
                          title={item.data}
                          description="Item description"
                          right= {()=> <List.Icon icon="delete" />}
                      />
                  </Card>
              )
          })
      }
      else{
          this.state.renderList= <Text>No Items</Text>
      }
    return (
        <View style={styles.container}>
            <Appbar.Header>
              <Appbar.Content title="TODO APP" />
            </Appbar.Header>

            <TextInput
                label="Add TODO Item"
                value={this.state.text}
                onChangeText={text => this.setState({text})}
            />

            <Button icon="camera" mode="contained" onPress={() => this.storeData()} style={{margin: 7}}>
              Add TODO
            </Button>
        <ScrollView>
            <View>
                {this.state.renderList}
            </View>
        </ScrollView>
        </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3'
  }
})
