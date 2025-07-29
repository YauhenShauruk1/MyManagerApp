import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const options = ['No Filter', 'Completed', 'Cancelled', 'In Progress'];

interface DropdownProps {
  selectedFilter: string;
  onSelect: (option: String) => void;
}

const FilterDropdown: React.FC<DropdownProps> = ({ selectedFilter, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(selectedFilter);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedState(option);
    onSelect(option);
    setIsOpen(false); 
    return option;
  };
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.buttonText}>
          {selectedState || 'State ▼'}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionSelect(option)}
              style={styles.option}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  dropdownButton: {
    padding: 12,
    backgroundColor: '#E7CFBC',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#E7CFBC',
    borderRadius: 8,
    elevation: 3,
  },
  option: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default FilterDropdown