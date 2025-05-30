import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

interface SegmentOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const { colors } = useTheme();
  const [segmentWidths, setSegmentWidths] = useState<{ [key: string]: number }>({});
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (optionValue: string) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSegmentWidths(prev => ({ ...prev, [optionValue]: width }));
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const getSelectedIndicatorPosition = () => {
    const selectedIndex = options.findIndex(option => option.value === value);
    if (selectedIndex === -1) return 0;
    
    let position = 0;
    for (let i = 0; i < selectedIndex; i++) {
      position += segmentWidths[options[i].value] || 0;
    }
    
    return position;
  };

  const getSelectedIndicatorWidth = () => {
    return segmentWidths[value] || 0;
  };

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(getSelectedIndicatorPosition(), { duration: 200 }) },
      ],
      width: withTiming(getSelectedIndicatorWidth(), { duration: 200 }),
    };
  });

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      <View style={[styles.segmentedControl, { backgroundColor: colors.inputBackground }]}>
        {containerWidth > 0 && Object.keys(segmentWidths).length === options.length && (
          <Animated.View 
            style={[
              styles.selectedIndicator, 
              { backgroundColor: colors.primary },
              indicatorStyle,
            ]} 
          />
        )}
        
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              { width: `${100 / options.length}%` },
            ]}
            onPress={() => onChange(option.value)}
            onLayout={handleLayout(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                { color: value === option.value ? colors.white : colors.text }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 12,
    height: 48,
    position: 'relative',
    overflow: 'hidden',
  },
  selectedIndicator: {
    position: 'absolute',
    height: '100%',
    borderRadius: 12,
    zIndex: 0,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});