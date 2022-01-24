import React, { useState, useEffect } from 'react';

const SmallAppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainerSmall}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const SmallerAppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainerSmall, {width: "60%"}]}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const NotesSection = ({initNote = '', setCallback, sessionIndexNumber}) => {
    const [isNote, setIsNote] = useState(initNote != '');
    const [text, setText] = useState(initNote);
    //const [confirmNoteDelete, setConfirmDelete] = useState(false);
    const [confirmDeleteModal, showConfirmDelete] = useState(false);

    const toggleNote = () => {
        if(isNote) {
            showConfirmDelete(true);
        } else {
            setIsNote(true);
        }
    }

    const editNote = (newText) => {
        setText(newText);
        callback(newText); //placeholder; will handle api call
    }

    useEffect(() => {
        if (initSessionData) { 
            showSessionInfo()

        } else {
            console.log("Data not ready yet")
        }
    }, [sessionIndexNumber]);

    return(
        <View style = {{width: "84%", marginVertical: 15}}>
            <SmallerAppButton 
            onPress = {toggleNote}
            title = {!note ? "Add Note" : "Delete Note"}
            />
            <Modal
                propagateSwipe={true}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                isVisible={confirmDeleteModal}>
                <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <View style={{backgroundColor: "#fff", width: "90%", height: "24%", borderRadius: "19", alignItems: "center", justifyContent: 'space-around'}}>
                        <View style={{flex: 1, width: '100%'}}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center" }}>
                                <Text style={styles.cdheading}> {"Are you sure you want to delete this note?"} </Text>
                                <View style={styles.datePickerModalButtonContainer}>
                                    <SmallAppButton
                                        title={"Continue"}
                                        onPress={() => {
                                            setConfirmDelete(true);
                                            showConfirmDelete(false);
                                            setIsNote(false);
                                        }}
                                    />
                                    <SmallAppButton
                                        title={"Cancel"}
                                        onPress={() => {
                                            setConfirmDelete(false);
                                            showConfirmDelete(false);
                                        }}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
            {note && 
                <TextInput 
                style={[styles.dateBar, {height: "60%", width: "100%", padding: 10, paddingTop: 10}]}
                multiline
                onChangeText={editNote}
                defaultValue={text}
                />}
        </View>
    );
}

export default NotesSection;

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
    cdheading:{
        fontSize: 18,
        margin: 20,
        fontWeight:'600',
        color: '#838383',
        textAlign: 'center'
    },
    dateBar: {
        marginVertical: 15,
        width: '84%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D5D5D5',
    },
    datePickerModalButtonContainer: {
        flexDirection: "row",
        width: '90%',
        justifyContent: "space-around"
    },
});