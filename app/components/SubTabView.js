/**
 *
 * @author keyy/1501718947@qq.com 17/1/6 16:38
 * @description
 */
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native'
import {
  TabViewAnimated,
  TabBar,
  TabBarTop
} from 'react-native-tab-view'
import MeetList from '../pages/MeetList'
import AppointmentList from '../pages/AppointmentList'

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 40,
    width: width / 2,
    backgroundColor: '#5067FF',
    position: 'absolute',
    bottom: 0,
    zIndex:999
  },
  tabBar: {
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: -999,
    height: 40
  },
  customStyle:{
    backgroundColor:'gray',
    zIndex:-999
  },
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class SubTabView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: '1', title: '聚会'},
        {key: '2', title: '约会'},
      ],
      ...this.props
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      ...nextProps
    })
  }

  _handleChangeTab = (index) => {
    this.setState({index: index}, ()=> {
      this.props.tabIndex(index)
    });
  };

  _renderHeader = (props) => {
    return <TabBarTop
      scrollEnabled={true}
      tabWidth={width / 2}
      tabStyle={styles.tabBar}
      style={styles.customStyle}
      indicatorStyle={styles.indicator}
      {...props} />;
  };

  _renderScene = ({route}) => {
    return (
      <View style={styles.container}>
        {this.props.locationTips()}
        {this.renderList(route)}
      </View>
    )
  };

  renderList(route) {
    switch (route.key) {
      case '1':
        return <MeetList style={[styles.page, {backgroundColor: '#ff4081'}]} {...this.state}/>;
      case '2':
        return <AppointmentList style={[styles.page, {backgroundColor: '#ff4081'}]} {...this.state}/>;
      default:
        return null;
    }
  }

  render() {
    return (
      <TabViewAnimated
        initialLayout={initialLayout}
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}