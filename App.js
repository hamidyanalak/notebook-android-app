import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setISAddMode] = useState(false);


  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals =>
      [...currentGoals, { id: Math.random().toString(), value: goalTitle }
      ]);
      
    setISAddMode(false);
  };
  

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setISAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title={'Add New Goal'} onPress={() => setISAddMode(true) } />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      < FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem id={itemData.item.id} onDelete ={removeGoalHandler} title={itemData.item.value} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30
  }
});
