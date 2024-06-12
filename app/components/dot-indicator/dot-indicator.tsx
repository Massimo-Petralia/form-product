import {View} from 'react-native';
import {style} from './dot-indicator.style';

export const DotIndicator = ({
  index,
  counter,
}: {
  index: number;
  counter: number;
}) => {
  return (
    <View
      style={[
        style.dot,
        {backgroundColor: index === counter ? 'dodgerblue' : 'grey'},
        {height: index === counter ? 14: 10},
        {width: index === counter ? 14: 10}
      ]}></View>
  );
};
