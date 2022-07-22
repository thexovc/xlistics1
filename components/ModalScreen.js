import { StyleSheet, Text, Modal, Dimensions, FlatList, TouchableWithoutFeedback, View } from 'react-native'
import React  from 'react'
import tw from "twrnc";
import Book from './Book';

  
const deviceHeight = Dimensions.get("window").height
export class ModalScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  show = () => {
    this.setState({show: true})
  }

  close = () => {
    this.setState({show: false})
  }

  renderOutsideTouchable(onTouch)  {
    const view = <View style={{flex: 1, width: '100%'}}/>
    if (!onTouch) return  view

    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
          {view}
      </TouchableWithoutFeedback>
    )
  }

renderTitle = () => {
  const {title} =this.props
  return (
    <View style={tw`w-15 h-1.5 bg-gray-300 rounded-lg self-center mt-2`}>
                    {title}
                </View>
  )
}


renderContent = () => {
  // const {onPress} = this.props
  
  return (
    <View>
      <FlatList
      style={{marginBottom: 5}}
      showsVerticalScrollIndicator={false} 
      // renderItem={this.renderItem}
      // extraData={Data}
      // keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={this.renderSeperator}
      contentContainerStyle={{
        paddingBottom: 40
      }}
      />
     <Book/>
    </View>
  )
}

  // renderItem = ({item}) => {              
  //   return (
  //     <View style={{height: 90, flex: 1, alignItems: "flex-start", justifyContent: "center", marginLeft: 10}}>
  //       <Text style={{fontSize: 18, fontWeight: 'normal', color: 'black'}}
  //       >{item.name}</Text>
  //     </View>
  //   )
  // }

  // renderSeperator = () => (
  //   <View
  //     style={{
  //       opacity: 0.1,
  //       backgroundColor: '#182E44',
  //       height: 1
  //     }}>
  //   </View>
  // )

  render() {
    let {show} = this.state
    const {onTouchOutside, title} = this.props

    return(
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end'
            }}
            >

              {this.renderOutsideTouchable(onTouchOutside)}
              <View style={{
                backgroundColor:'#FFFFFF',
                width: '100%',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                paddingHorizontal: 10,
                maxHeight: deviceHeight * 0.5
              }}>
                
                {this.renderTitle()}
                {this.renderContent()}
              </View>
        </View>

      </Modal>
    )
}
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// })





