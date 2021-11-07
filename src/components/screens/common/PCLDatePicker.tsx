import React, {useState} from 'react'
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {flexRow, pcl} from './style'
import moment from 'moment'
import {Divider, Input} from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import PCLStatusBar from './PCLStatusBar'

interface PCLDatePickerProps {
  title?: string
  value: string | Date
  errorMessage?: string
  onChange: (date: any) => void
}

const PCLDatePicker: React.FC<PCLDatePickerProps> = ({
  title,
  value,
  errorMessage,
  onChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | string>(value)

  return (
    <View style={styles.container}>
      <Pressable
        style={{position: 'relative', flex: 1}}
        onPress={() => {
          console.log('pressed')
          setShowDatePicker(true)
        }}>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          errorStyle={errorMessage ? styles.inputErrorStyle : {}}
          disabled={true}
          errorMessage={errorMessage}
          labelStyle={styles.textStyle}
          style={{color: '#000'}}
          placeholderTextColor={pcl.textPlaceholder}
          placeholder="Date of Birth"
          leftIcon={
            <FontAwesome5 name="baby" size={20} color={pcl.textPlaceholder} />
          }
          value={moment(value).format('MMMM DD, YYYY')}
          multiline={false}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
        />
      </Pressable>
      <Modal animationType="slide" visible={showDatePicker} transparent>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <PCLStatusBar barStyle="dark-content" />
          <Text style={styles.titleStyle}>
            {title || 'Select Date of Birth'}
          </Text>
          <Divider />
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(selectedDate)}
            themeVariant="light"
            textColor={pcl.textPlaceholder}
            display="default"
            mode="date"
            maximumDate={moment().subtract(5, 'years').toDate()}
            minimumDate={moment().subtract(105, 'years').toDate()}
            onChange={(e: any, date: any) => {
              console.log(date)
              setSelectedDate(date)
            }}
          />
          <Divider />
          <View style={[flexRow, styles.buttonBox]}>
            <Button onPress={() => setShowDatePicker(false)} title="Cancel" />
            <Button
              onPress={() => {
                onChange(selectedDate)
                setShowDatePicker(false)
              }}
              title="OK"
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  titleStyle: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  inputContainerStyle: {
    borderColor: pcl.black,
    borderBottomWidth: 1 / 2,
  },
  inputErrorStyle: {
    padding: 5,
    borderRadius: 5,
    color: 'red',
  },
  textStyle: {
    color: '#000000aa',
  },
  buttonBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})

export default PCLDatePicker
