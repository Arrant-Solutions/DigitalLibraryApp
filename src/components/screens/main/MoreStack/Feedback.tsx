import React, {useState} from 'react'
import Header from 'components/screens/common/Header'
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native'
import {Icon} from 'react-native-elements'
import {black, pcl, shadow} from 'components/screens/common/style'
import PCLButton from 'components/screens/common/PCLButton'
import {useAppSelector} from 'redux/hooks'
import {selectAuth} from 'redux/slices/authSlice'
import {postData} from 'redux/services'
import {FeedbackI} from 'types/Feedback'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {MoreParamList} from '.'

type FeedbackNavProps = StackNavigationProp<MoreParamList, 'Feedback'>

const Feedback = () => {
  const {navigate} = useNavigation<FeedbackNavProps>()
  const [stars, setStars] = useState<{selected: boolean}[]>([
    {selected: false},
    {selected: false},
    {selected: false},
    {selected: false},
    {selected: false},
  ])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    user: {user_id},
  } = useAppSelector(selectAuth)

  const handleSubmit = async () => {
    const feedback = {
      user_id: Number(user_id),
      message,
      rating: stars.reduce((acc, rating) => {
        return acc + (rating.selected ? 1 : 0)
      }, 0),
    }
    // console.log(JSON.stringify(feedback, null, 2))
    try {
      setLoading(true)
      const {statusCode, data} = await postData<FeedbackI, FeedbackI>(
        '/feedback',
        feedback,
      )

      if (statusCode === 200) {
        Alert.alert(
          'Success',
          'You feedback has been received. We will revert on your email address provided.',
          [{text: 'Continue', onPress: () => navigate('MoreScreen')}],
          {cancelable: false},
        )
      } else {
        throw new Error('failed to submit')
      }
    } catch (error) {
      Alert.alert('Unable to submit your feedback, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{flex: 1}}>
      <Header back title="Feedback" showActionButtons={false} />
      <View style={[styles.card, shadow]}>
        <Text style={styles.title}>Rate Your Experience</Text>
        <Text style={styles.subText}>Are you satisfied with the service?</Text>
        <View style={styles.starsContainer}>
          {stars.map(({selected}, index) => (
            <Icon
              key={index + 1}
              tvParallaxProperties={undefined}
              type="ionicon"
              name={selected ? 'star' : 'ios-star-outline'}
              size={35}
              color={selected ? pcl.gold : black[40]}
              containerStyle={{marginRight: 10}}
              onPress={() => {
                setStars(stars.map((item, ind) => ({selected: ind <= index})))
              }}
            />
          ))}
        </View>
      </View>
      <TextInput
        style={[styles.input, shadow]}
        multiline
        numberOfLines={10}
        placeholder="Tell us how we can improve"
        onChangeText={setMessage}
      />
      <PCLButton
        titleStyle={{fontSize: 16, fontWeight: 'bold', color: '#000b'}}
        loading={loading}
        disabled={
          !(message.length > 10 && stars.find(({selected}) => selected))
        }
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  )
}

export default Feedback

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdfdfd',
    marginTop: 10,
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: pcl.purple,
  },
  subText: {
    marginVertical: 10,
    fontSize: 13,
    color: black[40],
  },
  starsContainer: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#fdfdfd',
    borderColor: black[30],
    borderWidth: 1 / 3,
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    height: 200,
  },
})
