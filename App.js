import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentInput, setCurrentInput] = useState('');

  //display equation
  const handleNumberInput = (num) => {
    if (displayValue === '0' || displayValue === '') {
      setDisplayValue(num.toString());
      setCurrentInput(num.toString());
    } else {
      setDisplayValue(prev => prev + num);
      setCurrentInput(prev => prev + num);
    }
  };
  //display decimal
  const handleDecimalInput = () => {
    if (!currentInput.includes('.')) {
      setDisplayValue(prev => prev + '.');
      setCurrentInput(prev => prev + '.');
    }
  };
  //display operator
  const handleOperatorInput = (operator) => {
    if (currentInput) {
      setDisplayValue(prev => prev + ' ' + operator + ' ');
      setCurrentInput('');
    } else if (displayValue[displayValue.length - 1] !== ' ') {
      setDisplayValue(prev => prev.slice(0, -1) + ' ' + operator + ' ');
    } else {
      setDisplayValue(prev => prev + operator + ' ');
    }
  };
  //calculates
  const handleEqual = () => {
    try {
      const result = eval(displayValue.replace(/×/g, '*').replace(/÷/g, '/'));
      setDisplayValue(result.toString());
      setCurrentInput(result.toString());
    } catch (e) {
      setDisplayValue('Error');
      setCurrentInput('');
    }
  };
  //clear display
  const handleClear = () => {
    setDisplayValue('0');
    setCurrentInput('');
  };
  //deletes number
  const handleDelete = () => {
    setDisplayValue(prev => {
      if (prev.length === 1) {
        return '0';
      }
      return prev.slice(0, -1);
    });
    setCurrentInput(prev => {
      if (prev.length === 1) {
        return '';
      }
      return prev.slice(0, -1);
    });
  };
  //negative number
  const handleToggleSign = () => {
    if (currentInput !== '' && currentInput !== '0') {
      const newValue = parseFloat(currentInput) * -1;
      setDisplayValue(newValue.toString());
      setCurrentInput(newValue.toString());
    }
  };
  //calculate percentage
  const handlePercentage = () => {
    if (currentInput !== '' && currentInput !== '0') {
      const newValue = parseFloat(currentInput) / 100;
      setDisplayValue(newValue.toString());
      setCurrentInput(newValue.toString());
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Container */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {[[7, 8, 9, '÷'], [4, 5, 6, '×'], [1, 2, 3, '-'], ['C', 0, '.', '+']].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, item === '=' && styles.equalButton, item === 'C' && styles.clearButton]}
                onPress={() => item === '=' ? handleEqual() : item === 'C' ? handleClear() : item === '.' ? handleDecimalInput() : isNaN(item) ? handleOperatorInput(item) : handleNumberInput(item)}
              >
                <Text style={[styles.buttonText, isNaN(item) && styles.operatorButtonText, item === '=' && styles.equalButtonText]}>{item === '/' ? '÷' : item === '*' ? '×' : item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        {/* additional functions */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={handleToggleSign}
          >
            <Text style={styles.operatorButtonText}> +/- </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={handlePercentage}
          >
            <Text style={styles.operatorButtonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.equalButton]}
            onPress={handleEqual}
          >
            <Text style={styles.equalButtonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 30,
    width: '90%',
  },
  displayText: {
    fontSize: 48,
    color: '#333',
    textAlign: 'right',
    width: '100%',
  },
  buttonContainer: {
    flex: 3,
    width: '90%'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  button: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    margin: 2,
    padding: 15
  },
  buttonText: {
    fontSize: 34,
    color: '#333'
  },
  operatorButtonText: {
    fontSize: 34,
    color: '#ff9500'
  },
  equalButton: {
    backgroundColor: '#fff'
  },
  equalButtonText: {
    color: '#ff9500',
    fontSize: 34
  },
  clearButton: {
    backgroundColor: '#f0f0f0'
  },
  deleteButton: {
    backgroundColor: '#fff'
  },
  operatorButton: {
    backgroundColor: '#fff'
  }
});
