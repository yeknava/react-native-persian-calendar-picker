import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';

var styles = require('./style');
var {
  WEEKDAYS,
} = require('./util');

class WeekDaysLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DAY_WIDTH: (this.props.screenWidth - 16)/7
        };
    }

  render() {
    var labels = (this.props.weekdays || WEEKDAYS).map((day, key) => { return <Text key={key} style={[styles.dayLabels, this.props.textStyle]}>{day}</Text>; });
    labels.reverse();
    return (
      <View style={styles.dayLabelsWrapper}>
        { labels }
      </View>
    );
  }
}

WeekDaysLabels.propTypes = {
  screenWidth: React.PropTypes.number,
  textStyle: Text.propTypes.style
};

export default WeekDaysLabels;
