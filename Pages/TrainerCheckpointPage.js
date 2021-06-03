import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import MultilineInputSaveComponent from '../Components/MultilineInputSaveComponent'
import DateTextBox from '../Components/DateTextBox'

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default class TrainerCheckpointPage  extends Component{
    constructor(props){
        super(props);

        this.state = {
            expanded_general: false,
            expanded_skin_fold: false,
            expanded_girth: false,
            expanded_treadmill: false,
            weight: "Weight (lbs)",
            BMI: "BMI",
            body_fat_pct: "Body Fat Percentage",
            total_body_fat: "Total Body Fat (lbs)",
            lean_mass: "Lean Mass", 
            blood_pressure: "Blood Pressure (mm Hg)",
            range_of_motion:  "Range of Motion",
            resting_hr: "Resting HR (bpm)",
            Abdominal_skin_fold: "Abdominal",
            ChestSkinFold: "Chest",
            Midaxillary: "Midaxillary",
            Subscapular: "Subscapular",
            Supraillac: "Supraillac",
            Thigh: "Thigh",
            Tricep: "Tricep",
            Abdominal_girth: "Abdominal",
            Biceps: "Biceps",
            Calf: "Calf",
            ChestGirth: "Chest",
            Hip: "Hip",
            Shoulders: "Shoulders",
           ThighGirth: "Thigh",
            Waist: "Waist",
            Total_Inches_Lost: "Total Inches Lost",
            Distance: "Distance",
            Speed: "Speed",
            HR: "HR",
            BR: "BR",
            trainerNotes: "",
            edit: false

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    changeText = (newValue)=>{
        this.setState({trainerNotes: newValue});
    }


    toggleExpandGeneral=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_general : !this.state.expanded_general})
      }
    toggleExpandSkinFold=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_skin_fold : !this.state.expanded_skin_fold})
    }
    toggleExpandGirth=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_girth : !this.state.expanded_girth})
    }
    toggleExpandTreadmill=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded_treadmill : !this.state.expanded_treadmill})
    }


    render(){
        // const {edit,} = this.state;
        return(
            <View style = {styles.container}>
            <View style={styles.fixedHeader}>

            
            </View>
                <ScrollView contentContainerStyle = {

                    {
                        position: 'fixed',
                        paddingBottom: 75,
                        overflow: 'hidden',
                    }
                } 
                    style={{maxHeight: '100%'}}
                >
                    <AppButton
                            title = {this.state.edit ? "Save" : "Log Session"}
                            onPress={()=>this.setState({edit: !this.state.edit})}
                        />   
                    
                        <DateTextBox edit = {this.state.edit}/>
                         
                    
                    <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpandGeneral()}>
                        <Text style={[styles.title, styles.font]}>General Data</Text>
                        <Icon name={this.state.expanded_general ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#838383'} />
                    </TouchableOpacity>
                        <View style={styles.parentHr}/>
                            {
                                this.state.expanded_general &&                
                                <View style={styles.child}>
                                    {this.state.edit ? 
                                    <TextInput style = {styles.input}
                                    returnKeyType="done"
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.weight ? this.state.weight : "Weight (lbs)"}
                                    defaultValue = {this.state.weight == "Weight (lbs)" ? null : this.state.weight}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newWeight => this.setState({weight: newWeight})}
                                    />:
                                    <Text style = {{color: this.state.weight =="Weight (lbs)" ? "#D5D5D5" : "black"}}>Weight: 
                                    {this.state.weight =="Weight (lbs)" ? "": this.state.weight} lbs</Text>
                                    }
                                    {/* {
                                        <TextInputAccordion
                                            edit={this.state.edit}
                                            attribute={this.state.weight}
                                            defaultValue = {"Weight (lbs)"}
                                            label={"Weight (lbs): "}
                                            setVal={(newVal) => {this.setState({ weight: newVal})}}/>

                                    } */}
                                </View>
                            }
                            {
                            this.state.expanded_general &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                ref={(input) => { this.secondTextInput = input; }}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.BMI ? this.state.BMI : "BMI"}
                                defaultValue = {this.state.BMI == "BMI" ? null : this.state.BMI}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newBMI => this.setState({BMI: newBMI})}
                                // keyboardType = {'numeric'}
                                />
                            </View>}
                            {
                            this.state.expanded_general &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.body_fat_pct ? this.state.body_fat_pct : "Body Fat Percentage"}
                                defaultValue = {this.state.body_fat_pct == "Body Fat Percentage" ? null : this.state.body_fat_pct}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {new_body_fat_pct => this.setState({body_fat_pct: new_body_fat_pct})}
                                keyboardType = {'numeric'}
                                />
                            </View>}
                            {
                            this.state.expanded_general &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.lean_mass ? this.state.lean_mass : "Lean Mass"}
                                defaultValue = {this.state.lean_mass == "Lean Mass" ? null : this.state.lean_mass}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {new_value => this.setState({lean_mass: new_value})}
                                keyboardType = {'numeric'}
                                />
                            </View>}
                            {
                            this.state.expanded_general &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.blood_pressure ? this.state.blood_pressure : "Blood Pressure (mm Hg)"}
                                defaultValue = {this.state.blood_pressure == "Blood Pressure (mm Hg)" ? null : this.state.blood_pressure}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {new_value => this.setState({blood_pressure: new_value})}
                                keyboardType = {'numeric'}
                                />
                            </View>}
                            {
                            this.state.expanded_general &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.range_of_motion ? this.state.range_of_motion : "Range of Motion"}
                                defaultValue = {this.state.range_of_motion == "Range of Motion" ? null : this.state.range_of_motion}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {new_value => this.setState({range_of_motion: new_value})}
                                />
                            </View>}
                            {
                            this.state.expanded_general &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.resting_hr ? this.state.resting_hr : "Resting HR (bpm)"}
                                defaultValue = {this.state.resting_hr == "Resting HR (bpm)" ? null : this.state.resting_hr}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {new_value => this.setState({resting_hr: new_value})}
                                />
                            </View>}
                
                    <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpandSkinFold()}>
                        <Text style={[styles.title, styles.font]}>Skin Fold Tests</Text>
                        <Icon name={this.state.expanded_general ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#838383'} />
                    </TouchableOpacity>
                        <View style={styles.parentHr}/>
    
                            {
                                this.state.expanded_skin_fold &&
                                <View style={styles.child}>
                                    <TextInput style = {styles.input}
                                    // returnKeyType="done"
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.Abdominal_skin_fold ? this.state.Abdominal_skin_fold : "Abdominal"}
                                    defaultValue = {this.state.Abdominal_skin_fold == "Abdominal" ? null : this.state.Abdominal_skin_fold}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newValue => this.setState({Abdominal_skin_fold: newValue})}
                                    keyboardType = {'numeric'}
                                    />
                                </View>}
                                {
                                this.state.expanded_skin_fold &&
                                <View style={styles.child}>
                                    <TextInput style = {styles.input}
                                    // returnKeyType="done"
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.ChestSkinFold ? this.state.ChestSkinFold : "Chest"}
                                    defaultValue = {this.state.ChestSkinFold == "Chest" ? null : this.state.ChestSkinFold}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newValue => this.setState({ChestSkinFold: newValue})}
                                    keyboardType = {'numeric'}
                                    />
                                </View>}
                                {
                                this.state.expanded_skin_fold &&
                                <View style={styles.child}>
                                    <TextInput style = {styles.input}
                                    // returnKeyType="done"
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.Midaxillary ? this.state.Midaxillary : "Midaxillary"}
                                    defaultValue = {this.state.Midaxillary == "Midaxillary" ? null : this.state.Midaxillary}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newValue => this.setState({Midaxillary: newValue})}
                                    keyboardType = {'numeric'}
                                    />
                                </View>}
                                {
                                this.state.expanded_skin_fold &&
                                <View style={styles.child}>
                                    <TextInput style = {styles.input}
                                    // returnKeyType="done"
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.Subscapular ? this.state.Subscapular : "Subscapular"}
                                    defaultValue = {this.state.Subscapular == "Subscapular" ? null : this.state.Subscapular}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newValue => this.setState({Subscapular: newValue})}
                                    keyboardType = {'numeric'}
                                    />
                                </View>}
                                {
                                this.state.expanded_skin_fold &&
                                <View style={styles.child}>
                                    <TextInput style = {styles.input}
                                    // returnKeyType="done"
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.Supraillac ? this.state.Supraillac : "Supraillac"}
                                    defaultValue = {this.state.Supraillac == "Supraillac" ? null : this.state.Supraillac}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newValue => this.setState({Supraillac: newValue})}
                                    keyboardType = {'numeric'}
                                    />
                                </View>}
                                {
                                this.state.expanded_skin_fold &&
                                <View style={styles.child}>
                                    <TextInput style = {styles.input}
                                    // returnKeyType="done"
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.Thigh ? this.state.Thigh : "Thigh"}
                                    defaultValue = {this.state.Thigh == "Thigh" ? null : this.state.Thigh}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newValue => this.setState({Thigh: newValue})}
                                    keyboardType = {'numeric'}
                                    />
                                </View>}
                                {
                                this.state.expanded_skin_fold &&
                                <View style={styles.child}>
                                    <TextInput style = {styles.input}
                                    // returnKeyType="done"
                                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    underlineColorAndroid = "transparent"
                                    placeholder = {this.state.Tricep ? this.state.Tricep : "Tricep"}
                                    defaultValue = {this.state.Tricep == "Tricep" ? null : this.state.Tricep}
                                    placeholderTextColor = "#D5D5D5"
                                    color="black"
                                    autoCapitalize = "sentences"
                                    onChangeText = {newValue => this.setState({Tricep: newValue})}
                                    keyboardType = {'numeric'}
                                    />
                                </View>}
                     <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpandGirth()}>
                        <Text style={[styles.title, styles.font]}>Girth Measurements (in)</Text>
                        <Icon name={this.state.expanded_girth ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#838383'} />
                    </TouchableOpacity>
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Abdominal_girth ? this.state.Abdominal_girth : "Abdominal"}
                                defaultValue = {this.state.Abdominal_girth == "Abdominal" ? null : this.state.Abdominal_girth}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Abdominal_girth: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Biceps ? this.state.Biceps : "Biceps"}
                                defaultValue = {this.state.Biceps == "Biceps" ? null : this.state.Biceps}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Biceps: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Calf ? this.state.Calf : "Calf"}
                                defaultValue = {this.state.Calf == "Calf" ? null : this.state.Calf}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Calf: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.ChestGirth ? this.state.ChestGirth : "Chest"}
                                defaultValue = {this.state.ChestGirth == "Chest" ? null : this.state.ChestGirth}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({ChestGirth: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Hip ? this.state.Hip : "Hip"}
                                defaultValue = {this.state.Hip == "Hip" ? null : this.state.Hip}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Hip: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Shoulders ? this.state.Shoulders : "Shoulders"}
                                defaultValue = {this.state.Shoulders == "Shoulders" ? null : this.state.Shoulders}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Shoulders: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.ThighGirth ? this.state.ThighGirth : "Thigh"}
                                defaultValue = {this.state.ThighGirth == "Thigh" ? null : this.state.ThighGirth}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({ThighGirth: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Waist ? this.state.Waist : "Waist"}
                                defaultValue = {this.state.Waist == "Waist" ? null : this.state.Waist}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Waist: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                        {
                            this.state.expanded_girth &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Total_Inches_Lost ? this.state.Total_Inches_Lost : "Total Inches Lost"}
                                defaultValue = {this.state.Total_Inches_Lost == "Total Inches Lost" ? null : this.state.Total_Inches_Lost}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Total_Inches_Lost: newValue})}
                                keyboardType = {'numeric'}
                                />
                        </View>}
                    <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpandTreadmill()}>
                        <Text style={[styles.title, styles.font]}>6 Minute Treadmill Test</Text>
                        <Icon name={this.state.expanded_treadmill ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#838383'} />
                    </TouchableOpacity>
                    {
                            this.state.expanded_treadmill &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Distance ? this.state.Distance : "Distance"}
                                defaultValue = {this.state.Distance == "Distance" ? null : this.state.Distance}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Distance: newValue})}
                                keyboardType = {'numeric'}
                                />
                    </View>
                }
                    {
                            this.state.expanded_treadmill &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.Speed ? this.state.Speed : "Speed"}
                                defaultValue = {this.state.Speed == "Speed" ? null : this.state.Speed}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({Speed: newValue})}
                                keyboardType = {'numeric'}
                                />
                    </View>}
                    {
                            this.state.expanded_treadmill &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.HR ? this.state.HR : "HR"}
                                defaultValue = {this.state.HR == "HR" ? null : this.state.HR}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({HR: newValue})}
                                keyboardType = {'numeric'}
                                />
                    </View>}
                    {
                            this.state.expanded_treadmill &&
                            <View style={styles.child}>
                                <TextInput style = {styles.input}
                                // returnKeyType="done"
                                // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                underlineColorAndroid = "transparent"
                                placeholder = {this.state.BR ? this.state.BR : "BR"}
                                defaultValue = {this.state.BR == "BR" ? null : this.state.BR}
                                placeholderTextColor = "#D5D5D5"
                                color="black"
                                autoCapitalize = "sentences"
                                onChangeText = {newValue => this.setState({BR: newValue})}
                                keyboardType = {'numeric'}
                                />
                    </View>}
            <View style={styles.wrapper}>     
                <View style={styles.notes}>
                    <Text style = {styles.title}> Notes: </Text>
                    <MultilineInputSaveComponent
                        edit={this.state.edit}
                        value={this.state.trainerNotes}
                        placeholder = "Record Routine, exercise reps ... "
                        changeText = {newValue => this.changeText(newValue)}
                        //heading = "Trainer Notes"
                    />

                <Text style={{fontSize: 10, padding: 10,margin:10}}>
                    *If needed, please contact ____ with any concerns or questions.
                    </Text>

                <Text style = {styles.title}> Admin Notes: </Text>
                <MultilineInputSaveComponent
                        edit={false}
                        value={"Lorem Impsum dolor"}
                        placeholder = ""
                        changeText = {newValue => this.changeText(newValue)}
                        //heading = "Admin Notes"
                    />
                </View>
        
                    
            </View>   
        </ScrollView>
      
        </View>);
        }
        
    }


const styles = StyleSheet.create({

    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 50,
        marginTop: 25,
        marginLeft: 100,
        color: '#3E3E3E',
        justifyContent: 'space-evenly',

    },
    scroll: {
        // paddingTop: 165,
        // paddingBottom: 200,
        overflow: 'hidden',
        // width: '100%'
        // zIndex: 0
        // paddingBottom: 300,
        // height:  100
        // position: 'absolute',
        // flexDirection: 'row',
    },
    heading:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },

    title:{
        fontSize: 15,
        fontWeight:'400',
        color: '#838383',
    },
    
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#C9C9C9",
        marginLeft: 15,
        marginRight: 15
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%'
    },
    child:{
        backgroundColor: 'white',
        padding:16,
        borderBottomWidth: 1,
        borderColor: "#D5D5D5",
        width:'60%',
        marginLeft:30,
        flexDirection: 'row'

    },
    notes: {
        width: '90%',
        margin: 10,
        height: '35%',
        marginBottom: 20,
        top: 2,
        fontSize: 15,
        position: 'relative',
        
    },
    fixedHeader: {
        zIndex: 1,
        width: '100%',
        backgroundColor:'white',
        top: 0,
        left: 0,
        

        // position: 'absolute'
    },

    sessionNumber:{
       fontSize: 17,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: '#838383',
        fontWeight: 'bold',
        paddingBottom: 20,
    },

    appButtonContainer: {
        elevation: 8,
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 200,
        alignSelf: "center",
        margin: 20
    },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    sessionNumberContainer: {
        elevation: 8,
        backgroundColor:'#AED804',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '90%',
        height: '7%',
        alignSelf: "center",
        margin: 20,
        justifyContent: "center",
    },
    sessionNumberText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
});
