import { Text, View, Button, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useEffect, useState } from "react";
import { GenerateService } from "../services/generate";

export const Chat = () => {
    // array of dialogue strings, alternates between user and bot
    const [conversation, setConversation] = useState<Array<string>>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [updateScroll, setUpdateScroll] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);

    const genService = new GenerateService();

    useEffect(() => {
        if (firstRender) {
            genService.startChat().then((response) => {
                updateConversation([response]);
                setFirstRender(false);
            });
        }

        if (updateScroll) {
            scrollViewRef.current?.scrollToEnd({ animated: true });
            setUpdateScroll(false);
        }
    }, [firstRender]);


    const updateConversation = async (message: string[]) => {
        setConversation([...conversation, ...message]);
    }

    const handleSend = async () => {
        setLoading(true);

        const message = input.toString();
        genService.sendChat(conversation.join("\n"), message).then(async (response) => {
            updateConversation([message, response]);
        });
        setInput("");
        setUpdateScroll(true);
        setLoading(false);
    };

    return (
        <View >
            <ScrollView style={styles.scrollView} ref={scrollViewRef}>
            <View style={styles.chatContainer}>
                {loading && <ActivityIndicator size="small" color="#0000ff" />}
                {conversation.map((message, index) => (
                    <Text
                        key={index}
                        style={{
                            fontSize: 16,
                            color: index % 2 === 0 ? "black" : "#696d6e",
                            fontWeight: index % 2 === 1 ? "normal" : "bold",
                            marginVertical: 5,
                        }}
                    >
                        {`${index % 2 === 0 ? "Agent" : "User"} [${index + 1}]. ${message}`}
                    </Text>
                ))}
            </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setInput}
                    onSubmitEditing={handleSend}
                    value={input}
                    style={styles.inputBox}></TextInput>
                <TouchableOpacity 
                    onPress={handleSend}
                    style={styles.sendButton}></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    scrollView: {
        height: "80vh",
    },
    chatContainer: {
        backgroundColor: "#eeeee4",
        borderColor: "black",
        padding: 10,
        margin: 10,
    },
    inputContainer: {
        flexDirection: "row",
        display: "flex",
        height: "10vh"
    },
    inputBox: {
        margin: 10,
        flexGrow: 8,
        padding: 10,
        height: "auto",
        backgroundColor: "white",
        borderColor: "black",
    },
    sendButton: {
        margin: 10,
        backgroundColor: "blue",
        height: 30,
        width: 30,
        align: "center",
    }

}