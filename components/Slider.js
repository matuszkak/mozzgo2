import * as React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Slider } from "@miblanchard/react-native-slider";

// styles
import {
  aboveThumbStyles,
  componentThumbStyles,
  customStyles,
  customStyles2,
  customStyles3,
  customStyles4,
  customStyles5,
  customStyles6,
  customStyles7,
  customStyles8,
  customStyles9,
  iosStyles,
  styles,
  trackMarkStyles,
} from '../styles';

const thumbImage = require('../assets/images/thumb.png');

const DEFAULT_VALUE = 1000;

const CustomThumb = () => (
  <View style={componentThumbStyles.container}>
    <Text>Any</Text>
  </View>
);

const renderAboveThumbComponent = () => {
  return <View style={aboveThumbStyles.container} />;
};

const SliderContainer = (props: {
  caption: string;
  children: React.ReactElement;
  sliderValue?: Array<number>;
  trackMarks?: Array<number>;
}) => {
  const { caption, sliderValue, trackMarks } = props;
  const [value, setValue] = React.useState(
    sliderValue ? sliderValue : DEFAULT_VALUE,
  );
  let renderTrackMarkComponent: React.ReactNode;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? trackMarkStyles.activeMark
          : trackMarkStyles.inactiveMark;
      return <View style={style} />;
    };
  }

  const renderChildren = (props) => {
    return React.Children.map(
      props.children,
      (child: React.ReactElement) => {
        if (!!child && child.type === Slider) {
          return React.cloneElement(child, {
            onValueChange: setValue,
            renderTrackMarkComponent,
            trackMarks,
            value,
            step: 100,

          });
        }

        return child;
      },
    );
  };

  return (

    <View style={styles.sliderContainer}>
      <View style={styles.titleContainer}>
        <Text>{caption} </Text>
        <Text> {Array.isArray(value) ? value.join(' - ') : value}</Text>
      </View>
      {renderChildren()}
    </View>
  );
};

const SliderExample = (props) => (
  props.onChange(value),
  <View>
    {/* <ScrollView contentContainerStyle={styles.container}> */}


    <SliderContainer caption="                 How many steps to add?                  ">
      <Slider
        animateTransitions
        maximumTrackTintColor="#d3d3d3"
        maximumValue={10000}
        minimumTrackTintColor="#1fb28a"
        minimumValue={0}
        thumbTintColor="#1a9274"
        value={value}
        onValueChange={
          (value) => setValue(value)
            />
    </SliderContainer>

    {/* </ScrollView> */}
  </View>
);

export default SliderExample;
