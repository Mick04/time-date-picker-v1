// Import necessary modules
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Text, SafeAreaView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";

// Define the main App component
export default function App() {
  // Define state variables for different times and whether to show their pickers
  const [amHours, setAmHours] = useState(new Date());
  const [amTemp, setAmTemp] = useState();
  const [pmHours, setPmHours] = useState(new Date());
  const [pmTemp, setPmTemp] = useState();
  const [isAm, setIsAm] = useState(true); // Add this state variable at the top of your component

  const [show, setShow] = useState({
    amHours: false,
    amTemp: false,
    pmHours: false,
    pmTemp: false,
  });

  // Map keys to setter functions
  const setters = {
    amHours: setAmHours,
    amTemp: setAmTemp,
    pmHours: setPmHours,
    pmTemp: setPmTemp,
  };
  // Define function to check if the time is AM or PM
  const checkAmPm = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    return hours < 12 ? "AM" : "PM";
  };

  // Define function to handle date change
  const onChange = (event, selectedDate, key) => {
    const currentDate = selectedDate || setters[key];
    const amOrPm = checkAmPm(currentDate);

    console.log("amOrPm1 ", amOrPm); // Logs 'AM' or 'PM'

    if (amOrPm === "PM" && isAm) {
      Alert.alert(
        "Icorrect Input",
        "You can't input PM hours in AM hours.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    console.log("amOrPm2 ", amOrPm); // Logs 'AM' or 'PM'

    if (amOrPm === "AM" && !isAm) {
      Alert.alert(
        "Icorrect Input",
        "You can't input AM hours in PM hours.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    setters[key](currentDate);
    setShow((prev) => ({ ...prev, [key]: false }));
  };

  // Define function to handle temperature change
  const onValueChange = (itemValue, key) => {
    setters[key](itemValue);
    setShow((prev) => ({ ...prev, [key]: false }));
  };

  // Define function to show the picker
  const showPicker = (key) => {
    setShow((prev) => ({ ...prev, [key]: true }));
  };

  // Define the component's UI
  return (
    <View style={styles.container}>
      <Text style={{ paddingTop: 20, paddingBottom: 20, fontSize: 20 }}>
        {" "}
        AM Hours
      </Text>
      <DateTimePicker
        value={amHours}
        mode={"time"}
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          setIsAm(true);
          onChange(event, selectedDate, "amHours");
        }}
      />
      
      <Text style={{ paddingTop: 20, paddingBottom: 20, fontSize: 20 }}>
        {" "}
        PM Hours
      </Text>
      <DateTimePicker
        value={pmHours}
        mode={"time"}
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          setIsAm(false);
          onChange(event, selectedDate, "pmHours");
        }}
      />
<Text style={{ paddingTop: 15, paddingBottom: 20, fontSize: 20 }}>
        AM Temperature
      </Text>
      {show.amTemp && (
        <Picker
          selectedValue={amTemp}
          onValueChange={(itemValue) => onValueChange(itemValue, 'amTemp')}
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 20,
            height: 10,
            width: 100,
          }}
        >
          {[...Array(100).keys()].map((value) => (
            <Picker.Item key={value} label={`${value}°C`} value={value} />
          ))}
          
        </Picker>
      )}
      <Text
        style={{  paddingBottom: 1 }}
        onPress={() => showPicker("amTemp")}
      >
        {amTemp}°C
      </Text>

      <Text style={{ paddingTop: 15, paddingBottom: 10, fontSize: 20 }}>
        PM Temperature
      </Text>

      {show.pmTemp && (
        <Picker
          selectedValue={pmTemp}
          onValueChange={(itemValue) => onValueChange(itemValue, 'pmTemp')}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20,
            height: 50,
            width: 100,
          }}
        >
          {[...Array(100).keys()].map((value) => (
            <Picker.Item key={value} label={`${value}°C`} value={value} />
          ))}
        </Picker>
      )}
      <Text
        style={{ marginTop: 5, paddingBottom: 10 }}
        onPress={() => showPicker("pmTemp")}
      >
        {pmTemp}°C
      </Text>
      {/* Repeat for other time pickers */}
      {/* <StatusBar style="auto" />
      <Text>{`${amHours.getHours()}:${
        amHours.getMinutes() < 10 ? "0" : ""
      }${amHours.getMinutes()}`}</Text> */}
    </View>
  );
}

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
