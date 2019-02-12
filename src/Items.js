import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window') // 获取当前屏幕的宽、高

const viewWidth = width / 3

const imgWidth = viewWidth - 10 * 2

const imgHeight = imgWidth / 0.697

class Items extends React.Component {
  renderStars(stars, average) {
    // if(stars === '00'){
    //   return
    // }
    const total = 5
    let full, half, empty
    full = stars !== '00' ? parseInt(stars[0]) - 1 : 0  // 如果评分是‘00’，则无评分
    if(stars[1] === '5'){
      full++
      half = 0
      empty = total - full
    }else{
      half = stars !== '00' ? 1 : 0
      empty = total - full - half
    }

    const results = []
    let i, j
    for(i=0; i<full; i++){
      results.push(
        <Image key={i} style={styles.star} source={require('./imgs/star-full.png')}/>
      )
    }

    if(half) {
      results.push(
        <Image key={i} style={styles.star} source={require('./imgs/star-half.png')}/>
      )
    }

    for(j=0; j<empty; j++){
      results.push(
        <Image key={j} style={styles.star} source={require('./imgs/star-empty.png')}/>
      )
    }

    return (
      <View style={styles.starsWrapper}>
        {results}
        <Text style={{marginLeft: 10}}>{average}</Text>
      </View>
    )
  }


  render() {
    let {title, img, stars, average} = this.props
    return (
      <View style={styles.root}>
        <Image style={styles.img} source={{uri: img}}/>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {this.renderStars(stars, average)}
        
      </View>
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