import React,{Component} from 'react';
import {View,Text,Image,Button,FlatList} from 'react-native';
export default class kitty extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      reloadButtonDisplay:"none"
    };
  }

  componentDidMount(){
    //this.loadFacts()
  }

  
  loadFacts() {
    let endpoint='https://cat-fact.herokuapp.com';
    let resource='/facts/random?animal_type=cat&amount=5';
    fetch(endpoint + resource)
      .then( (response) => { return response.json() } )
      .then( (json) => {
        this.setState({data:json})
        json.forEach( (item,index)=>{
          this.loadImage(index)
        })
        this.setState({reloadButtonDisplay:"flex"})
      })
  }

  loadImage(index){
    let endpoint='https://api.thecatapi.com';
    let resource='/v1/images/search';
    fetch(endpoint+resource)
      .then( (response)=>{ return response.json() } )
      .then( (json)=>{
        this.state.data[index].imgUrl = json[0].url
        this.setState({data:this.state.data})
      })
  }


  render() {
    const {data} = this.state;
    
    return(
      <View>
        <FlatList
          data={data}
          keyExtractor={( item , index) => index.toString()}
          renderItem={({ item }) => 
          <View>
            <Image style={{width:"100%",height:200}} source={{uri:item.imgUrl}} />
            <Text>{item.text}, {item.releaseYear}</Text>
          </View>
          }
          ListFooterComponent={
            <View style={{display:this.state.reloadButtonDisplay}}>
              <Button
                  onPress={ ()=> this.loadFacts() } 
                  title="reload"
                />
            </View>
          }
        />
        <View>
          <Button
              title="Exibir Gatos"
              onPress={() => { this.loadFacts()} }
          />
        </View>
      </View>
    )
  }

}
