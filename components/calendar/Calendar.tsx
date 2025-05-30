import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import dayjs from 'dayjs';

interface CalendarProps {
  onSelectDate: (date: string | null) => void;
  selectedDate: string | null;
  availableDates?: string[];
}

export function Calendar({ onSelectDate, selectedDate, availableDates = [] }: CalendarProps) {
  const { colors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf('month').day(); // 0 is Sunday
  const monthName = currentMonth.format('MMMM YYYY');

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const isDateAvailable = (date: string) => {
    return availableDates.length === 0 || availableDates.includes(date);
  };

  const isDateSelected = (date: string) => {
    return selectedDate === date;
  };

  const handleDateSelect = (date: string) => {
    if (isDateAvailable(date)) {
      onSelectDate(isDateSelected(date) ? null : date);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = dayjs().format('YYYY-MM-DD');

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentMonth.date(day).format('YYYY-MM-DD');
      const isToday = date === today;
      const isAvailable = isDateAvailable(date);
      const isSelected = isDateSelected(date);
      const isPast = dayjs(date).isBefore(dayjs(), 'day');

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            isSelected && { backgroundColor: colors.primary },
            !isAvailable && styles.unavailableCell,
            isPast && styles.pastCell,
          ]}
          onPress={() => handleDateSelect(date)}
          disabled={!isAvailable || isPast}
        >
          <Text
            style={[
              styles.dayText,
              { color: colors.text },
              isSelected && { color: colors.white },
              !isAvailable && { color: colors.textSecondary },
              isPast && { color: colors.textSecondary },
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navigationButton}>
          <ChevronLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.monthText, { color: colors.text }]}>{monthName}</Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navigationButton}>
          <ChevronRight size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdaysContainer}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={[styles.weekdayText, { color: colors.textSecondary }]}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysContainer}>{renderCalendarDays()}</View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.border }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.textSecondaryLight }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>Unavailable</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigationButton: {
    padding: 8,
  },
  monthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  todayCell: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  unavailableCell: {
    opacity: 0.5,
  },
  pastCell: {
    opacity: 0.5,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});