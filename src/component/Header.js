import React from 'react';
import { List } from 'react-native-paper';
import { Text, View,  TouchableHighlight} from 'react-native'
import Popover from 'react-native-popover-view'
import MtIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isVisible: false,
      want: false,
      watched: false
    }
  }

  openPopover() {
    this.setState({isVisible: true});
  }

  closePopover() {
    this.setState({
      isVisible: false
    })
  }

  wantToWatch() {
    this.state.want ? this.setState({want: false}) : this.setState({want: true})
  }

  haveWatched() {
    this.state.watched ? this.setState({watched: false}) : this.setState({watched: true})
  }

  render() {
    const { isVisible, want, watched} = this.state
    return (
      <View>
        <MtIcons ref={ref => this.touchable = ref} 
          name='dots-vertical' size={20} color='#eceff1' onPress={() => this.openPopover()}/>
        <Popover
          placement='bottom'
          isVisible={isVisible}
          fromView={this.touchable}
          animationConfig={{duration: 50}}
          onClose={() => this.closePopover()}>
          <List.Section style={{width: 100}}>
            <List.Item 
              title="想看" 
              right={() => want ? 
                  <MtIcons name='star' size={20} style={{marginTop:6}}/> 
                  : <MtIcons name='star-outline' size={20} style={{marginTop:6}}/>}
              onPress={() => this.wantToWatch()}/>
            <List.Item 
              title="看过" 
              right={() => watched ? 
                  <MtIcons name='check-box-outline' size={20} style={{marginTop:8}}/> 
                  : <MtIcons name='checkbox-blank-outline' size={20} style={{marginTop:8}}/>}
              onPress={() => this.haveWatched()}/>
          </List.Section>
        </Popover>
      </View>
    );
  }
}