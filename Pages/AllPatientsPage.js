import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';

export default class AllPatientsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "First Last"},
        {id:2,  name: "First Last"} ,
        {id:3,  name: "First Last"} ,
        {id:4,  name: "First Last"} ,
        {id:5,  name: "First Last"} ,
        {id:6,  name: "First Last"} ,
        {id:8,  name: "First Last"} ,
        {id:9,  name: "First Last"} ,
        {id:10, name: "First Last"} ,
        {id:11, name: "First Last"},
        {id:12,  name: "First Last"} ,
        {id:13,  name: "First Last"} ,
        {id:14,  name: "First Last"} ,
        {id:15,  name: "First Last"} ,
        {id:16,  name: "First Last"} ,
        {id:17,  name: "First Last"} ,
        {id:18, name: "First Last"} ,
        {id:19, name: "First Last"},
      ]
    };
  }

  renderItem = ({item}) => {
    return (
        <ScrollView>
            <View style={styles.row}>
                <View>
                    <View style={styles.nameContainer}>
                        <TouchableOpacity><Text style={styles.nameTxt}>{item.name}</Text></TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth:1,
                            borderColor:"#AED803",
                            alignItems:'center',
                            justifyContent:'center',
                            width:25,
                            height:25,
                            backgroundColor:'#fff',
                            borderRadius:50,}}>
                                <Text style={{color:"#AED803"}}>i</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
  }

  render() {
    return(
      <View style={{ flex: 1, backgroundColor:'fff' }} >
        <Text style={styles.headline}>Clients</Text>
        <FlatList 
          extraData={this.state}
          data={this.state.calls}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 50,
        marginTop: 25,
        marginLeft: 100,
        color: '#3E3E3E'
    },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E6E6E6',
    backgroundColor: '#fff',
    borderBottomWidth: 0.25,
    borderTopWidth:0.25,
    padding: 50,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#3E3E3E',
    fontSize: 23,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});