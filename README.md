# DateTimePicker

App Overview
This application is a smart thermostat control tool that allows users to set specific times for their heating system to turn on, with separate settings for AM and PM hours. This provides a more efficient way to manage energy usage, ensuring a comfortable home environment while potentially saving on energy costs.

The application includes two main functions:

checkAmPm(time): This function checks if a given time is in the AM or PM. It creates a Date object from the input time and uses the getHours method to determine if the time is before or after noon. It returns "AM" if the time is before noon and "PM" if it's after.

onChange(event, selectedDate, key): This function handles changes to the selected date. It takes an event, a selected date, and a key as parameters. It uses the checkAmPm function to determine if the selected date is in the AM or PM. If the selected date is in the PM but the user has indicated a preference for AM hours (as indicated by the isAm variable), the application will display an alert notifying the user that they cannot input PM hours in AM hours.

The application is designed to be intuitive and easy to use, making it a valuable tool for anyone looking to better manage their home's heating system.
# time-date-picker-v1
