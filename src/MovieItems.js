import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'

const {width, height} = Dimensions.get('window') // 获取当前屏幕的宽、高

const viewWidth = width / 3

const imgWidth = viewWidth - 10 * 2

const imgHeight = imgWidth / 0.697

class Items extends React.Component {
  renderStars(stars, average) {

    const total = 5
    let full, half, empty
    full = stars !== '00' ? parseInt(stars[0]) : 0  // 如果评分是‘00’，则无评分
    half = stars[1] === '5' ? 1 : 0
    empty = total - full - half
    
    const results = []
    let i, j
    for(i=0; i<full; i++){
      results.push(
        <Image key={i+'i'} style={styles.star} source={require('./imgs/star-full.png')}/>
      )
    }

    if(half) {
      results.push(
        <Image key={i+6} style={styles.star} source={require('./imgs/star-half.png')}/>
      )
    }

    for(j=0; j<empty; j++){
      results.push(
        <Image key={j+'j'} style={styles.star} source={require('./imgs/star-empty.png')}/>
      )
    }

    /** 若评分为0，则显示暂无评分 
     *  若评分为整型，则先转换成浮点型，然后去一位小数：7 -> 7.0
    */
    return (
      <View style={styles.starsWrapper}>
        {average !== 0 ? results : <Text style={{marginLeft: 10}}>暂无评分</Text>}
        {average !== 0 ? <Text style={{marginLeft: 10}}>{parseFloat(average).toFixed(1)}</Text> : <Text style={{marginLeft: 10}}></Text>}
      </View>
    )
  }


  render() {
    let {title, img, stars, average, onPress} = this.props
    return (
      <TouchableOpacity style={styles.root} onPress={onPress}>
        <Image style={styles.img} source={{uri: img}}/>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {this.renderStars(stars, average)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 15,
    width: imgWidth,
    marginRight: 15
  },
  img:{
    width: imgWidth,
    height: imgHeight,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5
  },
  star: {
    width: 12,
    height: 12
  },
  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
})

export default Items