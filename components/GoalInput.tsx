import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, TextInput, View, Dimensions, useWindowDimensions } from "react-native";

// Define types for GoalInput props
interface GoalInputProps {
    addGoalHandle: (goalText: string) => void;
    onCancel: () => void;
    visible: boolean;
}

function GoalInput(props: GoalInputProps) {
    const [enteredGoalText, setEnteredGoalText] = useState<string>('');

    const { width, height } = useWindowDimensions();

    const goalInputHandler = (enteredText: string) => {
        setEnteredGoalText(enteredText);
    };

    const onAdd = () => {
        props.addGoalHandle(enteredGoalText);
        setEnteredGoalText('');
        console.log('width', deviceWidth);
        console.log('height', deviceHeight);
    }

   let content = (
    <>
        <Image style={styles.img} source={require('../assets/images/goal.png')} />
        <TextInput style={styles.inputText} placeholderTextColor='#fff' placeholder='Your app goals' onChangeText={goalInputHandler} value={enteredGoalText} />
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onAdd}>Add goal</Pressable>
            <View>
                <Pressable style={styles.button} onPress={props.onCancel}>Cancel</Pressable>
            </View>
        </View>
    </>
   )

   if(width > 500) {
    content = (
        <>
            <TextInput style={styles.inputText} placeholderTextColor='#fff' placeholder='Your app goals' onChangeText={goalInputHandler} value={enteredGoalText} />
            <View style={styles.landscapeContainer}>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={onAdd}>Add goal</Pressable>
                </View>
                <Image style={styles.img} source={require('../assets/images/goal.png')} />
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={props.onCancel}>Cancel</Pressable>
                </View>
            </View>
        </>
       )
   }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                {content}
            </View>
        </Modal>
    )
}

export default GoalInput;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 24,
        padding: 16,
        backgroundColor: '#1e085a',
    },
    landscapeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        // width: 100,
        width: deviceHeight < 400 ? 100 : 150,
        // height: 100,
        height: deviceHeight < 400 ? 100 : 150,
        margin: 20,
    },
    inputText: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        padding: deviceHeight < 400 ? 24 : 16,
        color: '#fff',
        borderRadius: 4,
        fontSize: deviceHeight < 400 ? 16 : 24,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        color: '#fff',
        backgroundColor: '#000',
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        width: 100,
        marginHorizontal: 8,
    }
})