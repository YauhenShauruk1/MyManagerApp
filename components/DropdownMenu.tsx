import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const options = ['In Progress', 'Completed', 'Cancelled'];

interface DropdownProps {
  selected: string;
  onSelect: (option: string) => void;
}

const DropdownMenu: React.FC<DropdownProps> = ({selected, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(selected);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedState(option);
    onSelect(option);
    setIsOpen(false); 
  };
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.buttonText}>
          {selectedState}
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
    padding: 5,
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

export default DropdownMenu