import GoalInput from '@/components/GoalInput';
import GoalItem from '@/components/GoalItem';
import { useState } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Button, StatusBarStyle, Pressable, Text } from 'react-native';

type itemDataType = {
  text: string,
  id: string,
}

const STYLES = ['default', 'dark-content', 'light-content'] as const;
// const TRANSITIONS = ['fade', 'slide', 'none'] as const;

export default function HomeScreenReact() {
  const [courseGoals, setCourseGoals] = useState<itemDataType[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const startGoallHundler = () => {
    setIsVisible(true)
  }

  const endModalHundler = () => {
    setIsVisible(false)
  }
  const addGoalHandle = (enteredGoalText: string) => {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, 
      {text: enteredGoalText, id: Math.random().toString()}
    ]);
    endModalHundler()
  }

  function deleteGoalHundler (id: string) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals = currentCourseGoals.filter(goal => goal.id !== id)
    })
  }

  // statusbar
  // const [hidden, setHidden] = useState(false);
  // const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
  //   STYLES[0],
  // );
  // const [statusBarTransition, setStatusBarTransition] = useState<
  //   'fade' | 'slide' | 'none'
  // >(TRANSITIONS[0]);

  // const changeStatusBarVisibility = () => setHidden(!hidden);

  // const changeStatusBarStyle = () => {
  //   const styleId = STYLES.indexOf(statusBarStyle) + 1;
  //   if (styleId === STYLES.length) {
  //     setStatusBarStyle(STYLES[0]);
  //   } else {
  //     setStatusBarStyle(STYLES[styleId]);
  //   }
  // };

  // const changeStatusBarTransition = () => {
  //   const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
  //   if (transition === TRANSITIONS.length) {
  //     setStatusBarTransition(TRANSITIONS[0]);
  //   } else {
  //     setStatusBarTransition(TRANSITIONS[transition]);
  //   }
  // };

  return (
    <>
      {/* <StatusBar style='light' /> */}
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={STYLES[0]}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <View style={styles.appContainer}>
        <Pressable onPress={startGoallHundler}>
            <Text style={styles.button}>Click me</Text>
        </Pressable>
        <GoalInput visible={isVisible} addGoalHandle={addGoalHandle} onCancel={endModalHundler} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData: { item: itemDataType }) => {
              return <GoalItem 
                      text={itemData.item.text} 
                      id={itemData.item.id}
                      onDeleteItem={deleteGoalHundler} 
                    />
            }}
            alwaysBounceVertical={false}
          >
          </FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: 'black',
    textAlign: 'center',
    color: 'white',
  },
  goalsContainer: {
    flex: 5,
  },
});
