import {CalendarList, LocaleConfig} from 'react-native-calendars/src';
import {View} from 'react-native';
import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setDate} from '../../redux/store';

type CalendarScreenProps = {
  navigation?: any;
};

LocaleConfig.locales.ru = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  dayNames: [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'ru';

export const CalendarScreen: FC<CalendarScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(state => state.online.selectedDate);
  return (
    <View>
      <CalendarList
        current={selectedDate ? selectedDate : undefined}
        onDayPress={date => {
          dispatch(setDate(date));
          navigation.goBack();
        }}
      />
    </View>
  );
};
