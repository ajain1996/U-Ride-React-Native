import React, { useRef, useContext, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar, Icon } from 'react-native-elements';
import { colors, parameters } from '../global/styles'
import { StatusBar } from 'expo-status-bar';
// import { GOOGLE_MAPS_APIKEY } from "@env";
import { OriginContext, DestinationContext } from '../contexts/contexts';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DestinationScreen = ({ navigation }) => {

    const { dispatchOrigin } = useContext(OriginContext)
    const { dispatchDestination } = useContext(DestinationContext)

    const textInput1 = useRef(4);
    const textInput2 = useRef(5);

    const [destination, setDestination] = useState(false)

    return (
        <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
            <StatusBar backgroundColor="#fff" style='dark' />
            <View style={{ height: 16 }} />
            <View style={styles.view2}>
                <View style={styles.view1}>
                    <Icon
                        type="material-community"
                        name="arrow-left"
                        color={colors.grey1}
                        size={32}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <TouchableOpacity>
                    <View style={{ top: 25, alignItems: "center" }}>
                        <View style={styles.view3}>
                            <Avatar
                                rounded
                                avatarStyle={{}}
                                size={30}
                                source={require('../../assets/blankProfilePic.jpg')}
                            />
                            <Text style={{ marginLeft: 5 }}>For Someone</Text>
                            <Icon
                                type="material-community"
                                name="chevron-down"
                                color={colors.grey1}
                                size={26}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {destination === false &&
                <View style={{ marginTop: 15, flexDirection: "row", margin: 20 }}>
                    <GooglePlacesAutocomplete
                        nearbyPlacesAPI='GooglePlacesSearch'
                        placeholder="From..."
                        listViewDisplayed="auto"
                        debounce={400}
                        currentLocation={true}
                        ref={textInput1}
                        minLength={2}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        autoFocus={true}
                        styles={autoComplete}
                        renderLeftButton={() => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons name="location-sharp" size={24} color="black" />
                            </View>
                        )}
                        renderRightButton={() => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginRight: 8,
                                    backgroundColor: "white",
                                    padding: 9,
                                    borderRadius: 30,
                                    alignItems: "center",
                                }}
                            >
                                <AntDesign
                                    name="clockcircle"
                                    size={11}
                                    style={{ marginRight: 6 }}
                                    color="black"
                                />
                                <Text style={{ color: 'black' }}>Search</Text>
                            </View>
                        )}
                        query={{
                            key: "AIzaSyDk7cSQO8JE0YgoEyo50Py8ozZTuBCHtIg",
                            language: "en"
                        }}
                        onPress={(data, details = null) => {
                            dispatchOrigin({
                                type: "ADD_ORIGIN", payload: {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    address: details.formatted_address,
                                    name: details.name
                                }
                            })

                            setDestination(true)
                        }}

                    />
                </View>
            }

            {destination === true &&
                <View style={{ marginTop: 15, flexDirection: "row", margin: 20 }}>
                    <GooglePlacesAutocomplete
                        query={{ key: "AIzaSyDk7cSQO8JE0YgoEyo50Py8ozZTuBCHtIg" }}
                        onPress={(data, details = null) => {
                            dispatchDestination({
                                type: "ADD_DESTINATION", payload: {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    address: details.formatted_address,
                                    name: details.name
                                }
                            })
                            navigation.navigate("RequestScreen", { state: 0 })
                        }}
                        placeholder="Goint o..."
                        textInputProps={{
                            placeholderTextColor: "silver",
                        }}
                        styles={autoComplete}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        listViewDisplayed="auto"
                        debounce={400}
                        currentLocation={true}
                        ref={textInput2}
                        minLength={2}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        autoFocus={true}
                        renderLeftButton={() => (
                            <View style={{ marginLeft: 10 }}>
                                <Ionicons name="location-sharp" size={24} color="black" />
                            </View>
                        )}
                        renderRightButton={() => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginRight: 8,
                                    backgroundColor: "white",
                                    padding: 9,
                                    borderRadius: 30,
                                    alignItems: "center",
                                }}
                            >
                                <AntDesign
                                    name="clockcircle"
                                    size={11}
                                    style={{ marginRight: 6 }}
                                    color="black"
                                />
                                <Text style={{ color: 'black' }}>Search</Text>
                            </View>
                        )}
                    />
                </View>
            }
        </View>
    )
}

const autoComplete = {
    textInput: {
        backgroundColor: "#eee",
        borderRadius: 20,
        fontWeight: "700",
        marginTop: 7,
        color: 'black',
    },
    textInputContainer: {
        backgroundColor: "#eee",
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#999'
    },
    description: {
        color: '#000'
    }
}

export default DestinationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: parameters.statusBarHeight
    },

    view1: {
        position: "absolute",
        top: 25,
        left: 12,
        backgroundColor: colors.white,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 10

    },

    view3: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 10,
        backgroundColor: colors.white,
        height: 30,
        zIndex: 10
    },

    view2: {
        backgroundColor: colors.white,
        zIndex: 4,
        paddingBottom: 10,
    },

    view24: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        paddingHorizontal: 20
    },

    view25: {
        flexDirection: 'row',
        alignItems: "baseline"
    },

    flatlist: {
        marginTop: 20,
        zIndex: 17,
        elevation: 8
    },
});