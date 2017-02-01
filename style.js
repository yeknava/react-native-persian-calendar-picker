/**
 * Persian Calendar Picker Component
 *
 * Copyright 2016 Reza (github.com/rghorbani)
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 *
 * @flow
 */

'use strict';

import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const scale = Dimensions.get('window').width / 375;

function normalize(size: number): number {
  return Math.round(scale * size);
}

var styles = StyleSheet.create({
  calendar: {
    height: normalize(400),
    marginTop: normalize(10),
  },
  dayWrapper: {
    width: normalize(50),
    height: normalize(40),
    backgroundColor: 'transparent',
  },
  dayButton: {
    width: normalize(50),
    height: normalize(40),
    alignSelf: 'center',
  },
  dayButtonSelected: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
    backgroundColor: '#5ce600',
    alignSelf: 'center',
  },
  dayLabel: {
    fontSize: normalize(14),
    color: '#000',
    marginTop: normalize(6),
    alignSelf: 'center',
  },
  monthPicker: {
    marginBottom: -10
  },
  yearPicker: {
    marginBottom: -10
  },
  dayLabelsWrapper: {
    flexDirection: 'row',
    marginBottom: normalize(10),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  daysWrapper: {
    alignSelf: 'center',
  },
  dayLabels: {
    width: normalize(50),
    fontSize: normalize(10),
    color: '#000',
    textAlign: 'center',
  },
  selectedDay: {
    width: normalize(60),
    height:normalize(60),
    backgroundColor: '#5ce600',
    borderRadius: normalize(30),
    alignSelf: 'center',
  },
  yearLabel: {
    fontSize: normalize(20),
    color: '#000',
    width: normalize(180),
    textAlign: 'center',
  },
  monthLabel: {
    fontSize: normalize(16),
    color: '#000',
    width: normalize(180),
    textAlign: 'center',
  },
  headTitleWrapper: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    paddingBottom: 5
  },
  headBodyWrapper: {
    flexDirection: 'row',
  },
  yearPickerWrapper: {
    width: normalize(120),
  },
  monthPickerWrapper: {
    width: normalize(180),
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    marginBottom: normalize(10),
    padding: normalize(5),
    paddingBottom: normalize(3),
    backgroundColor: 'transparent',
  },
  prevMonth: {
    width: normalize(80),
    flex: 1,
    alignItems: 'flex-start',

    paddingLeft: 5,
    paddingTop: 5
  },
  nextMonth: {
    width: normalize(80),
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
    paddingTop: 5
  },
  prev: {
    textAlign: 'right',
    fontSize: normalize(14),
  },
  next: {
    textAlign: 'left',
    fontSize: normalize(14),
  },
  // yearLabel: {
  //   fontSize: normalize(14),
  //   fontWeight: 'bold',
  //   color: '#000',
  //   textAlign: 'center',
  // },
  weeks: {
    flexDirection: 'column',
  },
  weekRow: {
    flexDirection: 'row',
  },
  disabledTextColor: {
    color: '#BBBBBB',
  },
});

module.exports = styles;
