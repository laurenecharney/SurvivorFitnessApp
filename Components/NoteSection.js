import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal'
import {StyleSheet,
        View, 
        TouchableOpacity, 
        Text, 
        ScrollView,
        TextInput } from 'react-native'

const SmallAppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainerSmall}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const LinkPressable = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.linkOpacity}>
        <Text style={styles.linkText}>{title}</Text>
    </TouchableOpacity>
);

const NotesSection = ({noteData, callback}) => {
    const [isNote, setIsNote] = useState(noteData != '');
    const [text, setText] = useState(noteData || "");
    const [confirmDeleteModal, showConfirmDelete] = useState(false);

    const toggleNote = () => {
        if(isNote) {
            if(text == '') {
                setIsNote(false);
                if(noteData != '') callback("");
            } else {
                showConfirmDelete(true);
            }
        } else {
            setIsNote(true);
        }
    }

    useEffect(() => {
        setIsNote(noteData != '')
        setText(noteData || "")
    }, [noteData])

    return(
        <View style = {{width: "84%", marginVertical: 15}}>
            <LinkPressable 
            onPress = {toggleNote}
            title = {!isNote ? "Add Note" : "Delete Note"}
            />
            <Modal
                propagateSwipe={true}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                isVisible={confirmDeleteModal}>
                <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <View style={{backgroundColor: "#fff", width: "90%", height: "24%", borderRadius: 19, alignItems: "center", justifyContent: 'space-around'}}>
                        <View style={{flex: 1, width: '100%'}}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center" }}>
                                <Text style={styles.cdheading}>{"Are you sure you want to delete this note?"}</Text>
                                <View style={styles.cdButtonContainer}>
                                    <SmallAppButton
                                        title={"Confirm"}
                                        onPress={() => {
                                            setText("");
                                            showConfirmDelete(false);
                                            setIsNote(false);
                                            callback("");
                                        }}
                                    />
                                    <SmallAppButton
                                        title={"Cancel"}
                                        onPress={() => showConfirmDelete(false)}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
            {isNote!="" && 
                <TextInput 
                style={styles.noteInputBox}
                multiline
                onChangeText={txt => setText(txt)}
                onEndEditing={() => callback(text)}
                defaultValue={text}
                />}
        </View>
    );
}

const styles = StyleSheet.create({
    appButtonContainerSmall: {
        elevation: 8,
        backgroundColor: '#AED804',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: '12%',
    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        alignSelf: "center",
    },
    linkOpacity: {
        //elevation: 8,
        //backgroundColor: '#AED804',
        //borderRadius: 10,
        width: "60%",
        marginTop: 8,
        marginBottom: -8,
        paddingHorizontal: '3%',
    },
    linkText: {
        fontSize: 15,
        color: '#AED804',
        fontWeight: "600",
        //alignSelf: "center",
        textDecorationLine: 'underline',
    },
    cdButtonContainer: {
        flexDirection: "row",
        width: '90%',
        justifyContent: "space-around"
    },
    cdheading:{
        fontSize: 18,
        margin: 20,
        fontWeight:'600',
        color: '#838383',
        textAlign: 'center'
    },
    noteInputBox: {
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D5D5D5',
        height: "45%", 
        width: "100%", 
        padding: 10, 
        paddingTop: 10
    },
});

export default NotesSection;