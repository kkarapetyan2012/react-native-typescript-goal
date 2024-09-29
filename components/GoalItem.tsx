import { Pressable, StyleSheet, Text, View } from "react-native";

interface GoalItemProps {
    text: string;
    id: string;
    onDeleteItem: (id: string) => void;
}

const GoalItem: React.FC<GoalItemProps> = (props) => {
    return (
      <View style={styles.goalItem}>
        <Pressable 
          android_ripple={{color: '#210644'}} 
          onPress={() => props.onDeleteItem(props.id)} 
          style={({ pressed }) => pressed && styles.pressedItem}
        >
          <Text style={styles.goalText}>{props.text}</Text>
        </Pressable>
      </View>
    );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6, // not working in ios
    backgroundColor: '#5e0acc',
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: 'white',
    padding: 8,
  },
})