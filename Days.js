/**
 * Persian Calendar Picker Component
 *
 * Copyright 2016 Reza (github.com/rghorbani)
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */

'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
var moment = require('moment-jalaali');

var styles = require('./style');
var {
  MAX_ROWS,
  MAX_COLUMNS,
} = require('./util');
var Day = require('./Day');

var Days = React.createClass({
  propTypes: {
    maxDate: React.PropTypes.instanceOf(moment),
    minDate: React.PropTypes.instanceOf(moment),
    date: React.PropTypes.object.isRequired,
    day: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
    onDayChange: React.PropTypes.func.isRequired,
    selectedDayColor: React.PropTypes.string,
    selectedDayTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style
  },
  getInitialState() {
    return {
      //selectedStates: [],
    };
  },

  componentDidMount() {
    //this.updateSelectedStates(this.props.date.jDate());
  },

  // Trigger date change if new props are provided.
  // Typically, when selectedDate is changed programmatically.
  //
  componentWillReceiveProps: function(newProps) {
  },

  onPressDay(day) {
    this.props.onDayChange({day: day});
  },

  // Not going to touch this one - I'd look at whether there is a more functional
  // way you can do this using something like `range`, `map`, `partition` and such
  // (see underscore.js), or just break it up into steps: first generate the array for
  // data, then map that into the components
  getCalendarDays() {
    var columns,
      matrix = [],
      i,
      j,
      month = this.props.month,
      year = this.props.year,
      currentDay = 0,
      thisMonthFirstDay = moment(year+'/'+(month + 1)+'/1', 'jYYYY/jM/jD'),
      dayOfWeek = (thisMonthFirstDay.weekday() + 1) % 7,
      slotsAccumulator = 0;

    for (i = 0; i < MAX_ROWS; i++ ) { // Week rows
      columns = [];

      for (j = 0; j < MAX_COLUMNS; j++) { // Day columns
        if (slotsAccumulator >= dayOfWeek) {
          if (currentDay < moment.jDaysInMonth(year, month)) {
            columns.push(<Day
                      key={j}
                      day={currentDay+1}
                      selected={this.props.day === currentDay+1}
                      date={moment(year+'/'+(month + 1)+'/'+(currentDay + 1), 'jYYYY/jM/jD')}
                      maxDate={this.props.maxDate}
                      minDate={this.props.minDate}
                      onDayChange={this.onPressDay}
                      screenWidth={this.props.screenWidth}
                      selectedDayColor={this.props.selectedDayColor}
                      selectedDayTextColor={this.props.selectedDayTextColor}
                      textStyle={this.props.textStyle} />);
            currentDay++;
          } else if (currentDay >= moment.jDaysInMonth(year, month)) {
              columns.push(<Day
                          key={j}
                          day={''}
                          screenWidth={this.props.screenWidth} />);
          }
        } else {
          columns.push(<Day
                        key={j}
                        day={''}
                        screenWidth={this.props.screenWidth} />);
        }

        slotsAccumulator++;
      }
      matrix[i] = [];
      columns.reverse();
      matrix[i].push(<View style={styles.weekRow}>{columns}</View>);
    }

    return matrix;
  },

  render() {
    return <View style={styles.daysWrapper}>{ this.getCalendarDays() }</View>;
  },
});

module.exports = Days;
