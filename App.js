// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Touchable,
//   TouchableOpacity,
// } from 'react-native';
// import React from 'react';

// const App = () => {
//   // const [number, onChangeNumber] = React.useState('');
//   const [text, setText] = React.useState('');
//   console.warn(text);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.text}>Todo App</Text>
//       </View>
//       <TextInput
//         style={styles.input}
//         onChangeText={e => setText(e)}
//         value={text}
//         placeholder="Enter Task..."
//       />
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.textbtn}>Add</Text>
//       </TouchableOpacity>
//       <View>
//         {list.map((x, i) => {
//           <Text key={i}>{x}</Text>;
//         })}
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {},
//   text: {
//     fontSize: 20,
//   },
//   header: {
//     backgroundColor: '#000',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     borderColor: 'white',
//     fontSize: 20,
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'white',
//     width: '70%',
//     marginLeft: 55,
//   },
//   textbtn: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'black',
//   },
// });

// export default App;
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    if (editingTaskId) {
      setTasks(
        tasks.map(task => {
          if (task.id === editingTaskId) {
            return {...task, text: newTask};
          }
          return task;
        }),
      );
      setNewTask('');
      setEditingTaskId(null);
    } else {
      const task = {
        id: Date.now().toString(),
        text: newTask,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const handleEditTask = task => {
    setNewTask(task.text);
    setEditingTaskId(task.id);
  };

  const handleDeleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const renderItem = ({item}) => (
    <View style={styles.task}>
      <Text style={styles.taskText}>{item.text}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity
          style={styles.taskActionButton}
          onPress={() => handleEditTask(item)}>
          <Text style={styles.taskActionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.taskActionButton}
          onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.taskActionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>
            {editingTaskId ? 'Save' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.taskList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskList: {
    flex: 1,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  taskActionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'blue',
    borderRadius: 4,
    marginLeft: 4,
  },
  taskActionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default App;
