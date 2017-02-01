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
  TouchableOpacity,
  Picker
} from 'react-native';

var styles = require('./style');
var {
  WEEKDAYS,
  MONTHS,
} = require('./util');

var HeaderControls = React.createClass({
  propTypes: {
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number,
    getNextYear: React.PropTypes.func.isRequired,
    getPrevYear: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired,
    textStyle: Text.propTypes.style,
    onYearChange: React.PropTypes.func.isRequired,
    minDate: React.PropTypes.instanceOf(Date),
    maxDate: React.PropTypes.instanceOf(Date)
  },
  getInitialState() {
    return {
      selectedMonth: this.props.month,
      yearPicker: false,
      monthPicker: false,
      year: '',
      month: ''
    };
  },

  // Trigger date change if new props are provided.
  // Typically, when selectedDate is changed programmatically.
  //
  componentWillReceiveProps: function(newProps) {
    this.setState({
      selectedMonth: newProps.month,
    });
  },

  // Logic seems a bit awkawardly split up between here and the CalendarPicker
  // component, eg: getNextYear is actually modifying the state of the parent,
  // could just let header controls hold all of the logic and have CalendarPicker
  // `onChange` callback fire and update itself on each change
  getNext() {
    var next = this.state.selectedMonth + 1;
    if (next > 11) {
      this.setState( { selectedMonth: 0 },
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getNextYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: next },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  },

  getPrevious() {
    var prev = this.state.selectedMonth - 1;
    if (prev < 0) {
      this.setState({ selectedMonth: 11},
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getPrevYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: prev },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  },

  previousMonthDisabled() {
    return ( this.props.minDate &&
             ( this.props.year < this.props.minDate.getFullYear() ||
               ( this.props.year == this.props.minDate.getFullYear() && this.state.selectedMonth <= this.props.minDate.getMonth() )
             )
           );
  },

  nextMonthDisabled() {
    return ( this.props.maxDate &&
             ( this.props.year > this.props.maxDate.getFullYear() ||
               ( this.props.year == this.props.maxDate.getFullYear() && this.state.selectedMonth >= this.props.maxDate.getMonth() )
             )
           );
  },

  onYearSelect(year) {
      this.setState({yearPicker: !this.state.yearPicker});
      this.props.onYearChange(year);
  },

  onMonthSelect(month) {
      this.setState({monthPicker: !this.state.monthPicker});
      this.props.onMonthChange(month);
  },

  render() {
    var textStyle = this.props.textStyle;

    var previous;
    if ( this.previousMonthDisabled() ) {
      previous = (
        <Text style={[styles.prev, textStyle, styles.disabledTextColor]}>{this.props.previousTitle || 'ماه قبل'}</Text>
      );
    }
    else {
      previous = (
        <TouchableOpacity onPress={this.getPrevious}>
          <Text style={[styles.prev, textStyle]}>{this.props.previousTitle || 'ماه قبل'}</Text>
        </TouchableOpacity>
      );
    }

    var next;
    if ( this.nextMonthDisabled() ) {
      next = (
        <Text style={[styles.next, textStyle, styles.disabledTextColor]}>{this.props.nextTitle || 'ماه بعد'}</Text>
      );
    }
    else {
      next = (
        <TouchableOpacity onPress={this.getNext}>
          <Text style={[styles.next, textStyle]}>{this.props.nextTitle || 'ماه بعد'}</Text>
        </TouchableOpacity>
      );
    }

    var yearsItems = [];
    //console.log(this.props.minDate.jYear());
    // var minYear = moment(this.props.minDate.year()+'/'+(this.props.minDate.month())+'/'+this.props.minDate.day(), 'jYYYY/jM/jD');
    var minYear = typeof this.props.minDate != 'undefined' ? this.props.minDate.jYear() : 1340;
    var maxYear = typeof this.props.maxDate != 'undefined' ? this.props.maxDate.jYear() : 1400;
    for (var i = 1300; i <= 1400; i++) {
        yearsItems.push(<Picker.Item key={i} label={''+i+''} value={i} />)
    }

    var months = typeof this.props.months != 'undefined' ? this.props.months : MONTHS;
    var monthValue = 0;
    months = months.map(function(month) {
        return (<Picker.Item key={month} label={month} value={monthValue++} />);
    });

    var month = null;

    if(false) {
        month = (<View>
              <TouchableOpacity onPress={()=>this.setState({monthPicker: !this.state.monthPicker})}>
                  <View>
                      <Text style={[styles.monthLabel, textStyle]}>
                        { (this.props.months || MONTHS)[this.state.selectedMonth] }
                      </Text>
                  </View>
              </TouchableOpacity>
          </View>);
    } else {
        month = (<View style={styles.monthPickerWrapper}>
            <Picker
                style={styles.monthPicker}
                selectedValue={this.state.selectedMonth}
                onValueChange={(month) => this.onMonthSelect(month)}>
                {months}
            </Picker>
        </View>);
    }

    var year = null;
    if(false) {
        year = (<TouchableOpacity onPress={()=>this.setState({yearPicker: !this.state.yearPicker})}>
            <View>
                <Text style={[styles.yearLabel, textStyle]}>
                  { this.props.year }
                </Text>
            </View>
        </TouchableOpacity>);
    } else {
        year = (<View style={styles.yearPickerWrapper}><Picker
              style={styles.yearPicker}
              selectedValue={this.props.year}
              onValueChange={(year) => this.onYearSelect(year)}>
              {yearsItems}
          </Picker></View>);
    }

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.headTitleWrapper}>
          {year}
          {month}
        </View>
        <View style={styles.headBodyWrapper}>
            <View style={styles.prevMonth}>
              {next}
            </View>
            <View style={styles.nextMonth}>
              {previous}
            </View>
        </View>
      </View>
    );
  },
});

module.exports = HeaderControls;
