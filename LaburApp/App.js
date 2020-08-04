import * as React from 'react';
import { View, Platform, Image, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HelperText, TextInput, Button, Divider, ProgressBar, List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Moment from './moment';
import * as Control from './controls';

//usuario
let datosUsuario ={};
datosUsuario['tipoUsuarioId'] = 2;
datosUsuario['estadoUsuario'] = 2;


function insertarUsuario (){
    const [message, setMessage] = React.useState('')

    fetch('http://192.168.0.6:3030/usuarios/', {
        method: 'POST',
        body: JSON.stringify(datosUsuario),
        cache: 'no-cache',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {                   
            // this.setState({
            //     message: data['data']['messageOk']
            // });
            setMessage('TODO OK')
        })
        .catch((error) => {
            console.log(`Error : ( ' + ${error.message} + ' )`)
            // this.setState({
            //     message: 'Ocurrio un error, intentelo nuevamente'
            // });
            setMessage('TODO NO OK')
        })
    return message;
}

function WelcomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, flexDirection : 'column'}}>   
            <View style={{ flex: 1, backgroundColor : '#FAFAFA'}}></View>
            <View style={{ flex : 3,  backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>  
                <Image style={{ flex : 1,  backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center', height : 250, width : 250, borderRadius : 125 , resizeMode : 'contain'}} source={require('./assets/Logo.png')} />
            </View>
            <View style={{ flexDirection : 'column', flex : 1}}>
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '80%', borderRadius : 100, borderWidth : 1,borderColor : '#FAFAFA' }} mode="contained" onPress={() => navigation.navigate('SignUp_One')}> Regístrarse </Button>
                </View>
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '80%', borderRadius : 100, borderWidth : 1, borderColor : '#6200ee' }} mode="outline" onPress={() => console.log('Login')}> Iniciar Sesión </Button>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor : '#FAFAFA'}}></View>
        </View> 
    )
}

function SignUp_One({ navigation }) { /* Vista 1 de la interfaz - Datos de la cuenta (EMAIL PASSWORD) */

    const [email, setEmail] = React.useState(''); // Email ingresado por el usuario
    const [msgEmail, setMsgEmail] = React.useState(''); // Mensaje para el usuario en el campo email (si está correcto o no)
    const [condEmail, setCondEmail] = React.useState(false); // Condición del Email -- True = Valido / False = Email invalido

    const checkEmail = (email) => {
        let res = Control.checkControlEmail(email)
        if (res.bool === false) {
            setEmail(email)
            setMsgEmail(res.msg)
            setCondEmail(false)
        } else {
            setEmail(email)
            setMsgEmail(res.msg)
            setCondEmail(true)
        }
    }

    const [password, setPassword] = React.useState('');
    const [msgPassw, setMsgPassw] = React.useState('');
    const [condPassw, setCondPassw] = React.useState(false);

    const checkPassword = (data) => {
        let res = Control.checkControlPassword(data)
        if (res.bool === false) {
            setPassword(data)
            setMsgPassw(res.msg)
            setCondPassw(false)
        } else {
            setMsgPassw('')
            setPassword(data)
            setCondPassw(true)
        }
    }

    const [confirmPassword, setConfirm] = React.useState('');
    const [msgConfirmPassw, setMsgConfirm] = React.useState('');
    const [condConfirm, setCondConfirmPassw] = React.useState(false);

    const checkConfirm = (data) => {
        let res = Control.checkControlPassword(data)
        if (res.bool === false) {
            setConfirm(data)
            setMsgConfirm(res.msg)
            setCondConfirmPassw(false)
        } else {
            setMsgConfirm('')
            setConfirm(data)
            setCondConfirmPassw(true)
        }
    }

    const [equalPassw, setEqualPassw] = React.useState(false)

    const checkEqual = () => {
        let res = Control.checkControlEqualPassword([password,confirmPassword])
        if (res.bool === false) {
            setMsgPassw(res.msg0)
            setMsgConfirm(res.msg1)
            setEqualPassw(false)
        } else {
            setEqualPassw(true)
        }
    }

    const checkValidatePageOne = () => {
        checkEmail(email);
        checkEqual();
        let res = Control.checkControlValidate([condEmail,equalPassw,condPassw,condConfirm])
        if (res === true) {
            datosPrimera();
            navigation.navigate('SignUp_Two');
        }
    }

    function datosPrimera (){
    datosUsuario['nombreUsuario'] = email;
    datosUsuario['emailPersona'] = email;
    datosUsuario['contrasenaUsuario'] = password;
    }

    
    return (
        <View style={{ flex: 1, flexDirection : 'column', backgroundColor : '#FAFAFA'}}> 
            <Divider style={{height : '0.4%'   } } />
            <View style={{ flex: 0.09,  flexDirection : 'row', backgroundColor : '#FAFAFA', margin : '5%',justifyContent : 'center', alignItems : 'center'}} >
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#6200ee' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }} progress={1} color='#c4c4c4' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#c4c4c4' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#c4c4c4' /> 
                </View>
            </View>
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{ margin :'2%'}} > Información de la cuenta </Text>
            </View>
            <Divider style={{height : '0.4%'}} />
            <View style={{ flex : 6,  backgroundColor : '#FAFAFA', flexDirection : 'column', justifyContent:'center', marginTop : 0}}>  

                <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>

                    <Text>Email *</Text>
                    <TextInput mode="outlined" style={{ height: 30 }} value={email} onChangeText={ email => checkEmail( email ) } />
                    <HelperText type="error">{msgEmail}</HelperText>

                    <Text>Contraseña *</Text>
                    <TextInput mode="outlined" style={{ height: 30 }} value={password} onChangeText={ password => checkPassword( password )} />
                    <HelperText type="error">{msgPassw}</HelperText>

                    <Text>Confirmar Contraseña *</Text>
                    <TextInput mode="outlined" style={{ height: 30 }} value={confirmPassword} onChangeText={ confirmPassword => checkConfirm( confirmPassword ) }/>
                    <HelperText type="error">{msgConfirmPassw}</HelperText>

                </View>

            </View>
            <View style={{ flexDirection : 'row', flex : 1}}> 
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1, borderColor : '#6200ee' }} mode="outline" onPress={() => navigation.goBack()}> Anterior </Button>
                </View>
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1 }} mode="contained" onPress={ checkValidatePageOne }> Siguiente </Button>
                </View>
            </View>
            <View style={{ flex: 0.3, backgroundColor : '#FAFAFA'}} ></View>
        </View>
    );
}

function SignUp_Two({ navigation }) {

    const [firstName, setFirstName] = React.useState('');
    const [msgFirstName, setMsgFirstName] = React.useState('');
    const [condFirstName, setCondFirstName] = React.useState(false);

    const checkFirstName = (data) => {
        let res = Control.checkControlFirstName(data)
        if (res.bool === false) {
            setFirstName(data)
            setMsgFirstName(res.msg)
            setCondFirstName(false)
        } else {
            setFirstName(data)
            setMsgFirstName(res.msg)
            setCondFirstName(true)
        }
    }

    const [secondName, setSecondName] = React.useState('');
    const [msgSecondName, setMsgSecondName] = React.useState('');
    const [condSecondName, setCondSecondName] = React.useState(false);

    const checkSecondName = (data) => {
        let res = Control.checkControlSecondName(data)
        if (res.bool === false) {
            setSecondName(data)
            setMsgSecondName(res.msg)
            setCondSecondName(false)
        } else {
            setSecondName(data)
            setMsgSecondName(res.msg)
            setCondSecondName(true)
        }
    }

    const [dni, setDni] = React.useState('');
    const [msgDni, setMsgDni] = React.useState('');
    const [condDni, setCondDni] = React.useState(false);

    const checkDni = (data) => {
        let res = Control.checkControlDni(data)
        if (res.bool === false) {
            setDni(data)
            setMsgDni(res.msg)
            setCondDni(false)
        } else {
            setDni(data)
            setMsgDni(res.msg)
            setCondDni(true)
        }
    }

    const [msgDate, setMsgDate] = React.useState('');

    const checkDate = (data) => {
        let res = Control.checkControlDate(data)
        if (res.bool === false) {
            setMsgDate(res.msg)
            setCondCustomDate(false)
        } else {
            setMsgDate(res.msg)
            setCondCustomDate(true)
        }
    }

    const [customDate, setCustom] = React.useState('DD-MM-AAAA')
    const [condCustomDate, setCondCustomDate] = React.useState(false);
    const [date] = React.useState(new Date());
    const [mode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');

        let dateDMA = Moment(selectedDate).format('DD-MM-YYYY') // CUSTOM DATE (Fecha que se le muestra al usuario)
        let dateAMD = Moment(selectedDate).format('YYYY-MM-DD')
        setCustom(dateDMA)
        console.log(dateDMA)

        checkDate(dateAMD)
    }

    const showMode = () => {
        setShow(true);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    // FUNCION DEL JSON 
    function datosSegunda (){
    datosUsuario['nombrePersona'] = firstName;
    datosUsuario['apellidoPersona'] = secondName;
    datosUsuario['dniPersona'] = dni;
    datosUsuario['fechanacPersona'] = String(customDate);
    }

    const checkValidatePageTwo = () => {
        checkFirstName(firstName);
        checkSecondName(secondName);
        checkDni(dni);
        checkDate(customDate);
        let res = Control.checkControlValidate([ condFirstName , condSecondName, condDni, condCustomDate ])
        if (res === true) {
            datosSegunda();
            navigation.navigate('SignUp_Three');
        }
    }
    

    return (
        <View style={{ flex: 1, flexDirection : 'column', backgroundColor : '#FAFAFA'}}> 
            <Divider style={{height : '0.4%'   } } />
            <View style={{ flex: 0.09,  flexDirection : 'row', backgroundColor : '#FAFAFA', margin : '5%',justifyContent : 'center', alignItems : 'center'}} >
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#6200ee' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }} progress={1} color='#6200ee' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#c4c4c4' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#c4c4c4' /> 
                </View>
            </View>
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{ margin :'2%'}} > Información Personal </Text>
            </View>
            <Divider style={{height : '0.4%'}} />
            <View style={{ flex : 6,  backgroundColor : '#FAFAFA', flexDirection : 'row', justifyContent:'center', marginTop : 40}}>  
                <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
                    <Text>Nombre *</Text>
                    <TextInput mode="outlined" style={{ height: 30 }} value={firstName} onChangeText={ firstName => checkFirstName(firstName) } />
                    <HelperText type="error">{msgFirstName}</HelperText>

                    <Text>Apellido *</Text>
                    <TextInput mode="outlined" style={{ height: 30 }} value={secondName} onChangeText={ secondName => checkSecondName(secondName) } />
                    <HelperText type="error">{msgSecondName}</HelperText>

                    <Text>DNI *</Text>
                    <TextInput mode="outlined" style={{ height: 30 }} value={dni} onChangeText={ dni => checkDni( dni ) } />
                    <HelperText type="error">{msgDni}</HelperText>

                    <Text>Fecha de nacimiento *</Text>
                    <Button  mode="text" style={{ width: '100%'}} value={date} onPress={showDatepicker}>{customDate}</Button>
                    {show && (
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                    )}
                    <HelperText type="error">{msgDate}</HelperText>
                </View>
            </View>
            <View style={{ flexDirection : 'row', flex : 1}}> 
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1, borderColor : '#6200ee' }} mode="outline" onPress={() => navigation.goBack()}> Anterior </Button>
                </View>
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1 }} mode="contained" onPress={ checkValidatePageTwo }> Siguiente </Button>
                </View>
            </View>
            <View style={{ flex: 0.3, backgroundColor : '#FAFAFA'}} ></View>
        </View>
    );
}

function SignUp_Three({ navigation }) {

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [msgPhoneNumber, setMsgPhoneNumber] = React.useState('');
    const [condPhoneNumber, setCondPhoneNumber] = React.useState(false);

    const checkPhoneNumber = (data) => {
        let res = Control.checkControlPhoneNumber(data)
        if (res.bool === false) {
            setPhoneNumber(data)
            setMsgPhoneNumber(res.msg)
            setCondPhoneNumber(false)
        } else {
            setPhoneNumber(data)
            setMsgPhoneNumber(res.msg)
            setCondPhoneNumber(true)
        }
    }

    const [address, setAddress] = React.useState('');
    const [msgAddress, setMsgAddress] = React.useState('');
    const [condAddress, setCondAddress] = React.useState(false);

    const checkAdress = (data) => {
        let res = Control.checkControlAddress(data)
        if (res.bool === false) {
            setAddress(data)
            setMsgAddress(res.msg)
            setCondAddress(false)
        } else {
            setAddress(data)
            setMsgAddress(res.msg)
            setCondAddress(true)
        }
    }

    // FUNCION DEL JSON 
    function datosTercera (){
        datosUsuario['telefonoPersona'] = phoneNumber;
        datosUsuario['domicilioPersona'] = address;
        datosUsuario['localidadPersona'] = city;
    }

    const checkValidatePageThree = () => {
        checkPhoneNumber(phoneNumber)
        checkAdress(address)
        let res = Control.checkControlValidate([ condPhoneNumber , condAddress ])
        if (res === true) {
            datosTercera();
            navigation.navigate('SignUp_Four');
        }
    }

    const [provincia, setProvincia] = React.useState(14);
    const [city, setCity] = React.useState(2687);
    return (
        <View style={{ flex: 1, flexDirection : 'column', backgroundColor : '#FAFAFA'}}> 
            <Divider style={{height : '0.4%'   } } />
            <View style={{ flex: 0.09,  flexDirection : 'row', backgroundColor : '#FAFAFA', margin : '5%',justifyContent : 'center', alignItems : 'center'}} >
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#6200ee' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }} progress={1} color='#6200ee' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#6200ee' /> 
                </View>
                <View style={{ flex: 0.25, backgroundColor : '#FAFAFA'}}>
                    <ProgressBar style={{  width : '85%', height :'50%', borderRadius : 100 }}  progress={1} color='#c4c4c4' /> 
                </View>
            </View>
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{ margin :'2%'}} > Información de Contacto </Text>
            </View>
            <Divider style={{height : '0.4%'}} />
            <View style={{ flex : 6,  backgroundColor : '#FAFAFA', flexDirection : 'column', justifyContent:'center'}}>
                <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
                    <Text>Número Telefónico *</Text>
                    <TextInput mode="outlined" style={{ height: 30, width:'100%' }} value={phoneNumber} onChangeText={ phoneNumber => checkPhoneNumber( phoneNumber ) } />
                    <HelperText type="error">{msgPhoneNumber}</HelperText>  

                    <Text>Direccion *</Text>
                    <TextInput mode="outlined" style={{ height: 30, width:'100%' }} value={address} onChangeText={ address => checkAdress( address ) } />
                    <HelperText type="error">{msgAddress}</HelperText>  

                    <View style={{flexDirection : 'row', flex : 1, marginTop: 10, width: '50%'}}>
                        <List.Section title="Selecciona una provincia" style={{ justifyContent:'center', alignItems:'center' }}>
                            <DropDownPicker
                                items={[
                                {label: 'Córdoba', value: 14}
                            ]}
                            defaultValue={provincia}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', width: '100%', flex: 1}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={ (item) => { setProvincia( item.value ) } }
                        />
                    </List.Section>
                    <List.Section title="Selecciona una ciudad" style={{ justifyContent:'center', alignItems:'center' }}>
                        <DropDownPicker
                            items={[
                                {label: 'Rio Cuarto', value: 2687}
                            ]}
                            defaultValue={city}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', width: '100%', flex: 1}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={ (item) => { setCity( item.value ) } }
                        />
                    </List.Section>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection : 'row', flex : 1}}> 
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1, borderColor : '#6200ee' }} mode="outline" onPress={() => navigation.goBack()}> Anterior </Button>
                </View>
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1 }} mode="contained" onPress={ checkValidatePageThree }> Siguiente </Button>
                </View>
            </View>
            <View style={{ flex: 0.3, backgroundColor : '#FAFAFA'}} ></View>
        </View>
    );
}

function SignUp_Four({ navigation }) {
    return (
        <View style={{ flex: 1, flexDirection : 'column', backgroundColor : '#FAFAFA'}}> 
            <Divider style={{height : '0.4%'   } } />
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{ margin :'2%'}} > Finalizar</Text>
            </View>
            <Divider style={{height : '0.4%'}} />
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginTop: 40, marginLeft: 40}}>  
                <Text>Email: </Text>
                <Text>{datosUsuario['emailPersona']}</Text>
            </View>
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginLeft: 40}}> 
                <Text>Nombre: </Text>
                <Text>{datosUsuario['nombrePersona']}</Text>
            </View>
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginLeft: 40}}> 
                <Text>Apellido: </Text>
                <Text>{datosUsuario['apellidoPersona']}</Text>
            </View>
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginLeft: 40}}> 
                <Text>DNI: </Text>
                <Text>{datosUsuario['dniPersona']}</Text>
            </View>
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginLeft: 40}}> 
                <Text>Fecha de nacimiento: </Text>
                <Text>{datosUsuario['fechanacPersona']}</Text>
            </View>
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginLeft: 40}}> 
                <Text>Numero telefónico: </Text>
                <Text>{datosUsuario['telefonoPersona']}</Text>
            </View>
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginLeft: 40}}> 
                <Text>Domicilio: </Text>
                <Text>{datosUsuario['domicilioPersona']}</Text>
            </View>
            <View style={{ flex : 0.5,  backgroundColor : '#FAFAFA', flexDirection : 'row', marginLeft: 40}}> 
                <Text>Ciudad: </Text>
                <Text>{datosUsuario['localidadPersona']}</Text>
            </View>
            <View style={{ flexDirection : 'row', flex : 1}}> 
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1, borderColor : '#6200ee' }} mode="outline" onPress={() => navigation.goBack()}> Anterior </Button>
                </View>
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1 }} mode="contained" onPress={ () => navigation.navigate('SignUp_Five')}> Finalizar </Button>
                </View>
            </View>
            <View style={{ flex: 0.3, backgroundColor : '#FAFAFA'}} ></View>
        </View>
        );
}

function SignUp_Five({ navigation }) {

    let res = insertarUsuario();

    return (
        <View style={{ flex: 1, flexDirection : 'column', backgroundColor : '#FAFAFA'}}> 
            <Divider style={{height : '0.4%'   } } />
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{ margin :'2%'}} > Finalizar </Text>
            </View>
            <Divider style={{height : '0.4%'}} />
            <View style={{ flex : 15,  backgroundColor : '#FAFAFA', flexDirection : 'row', justifyContent: 'center', alignItems: 'center'}}>  
                <Text>{res}</Text>
            </View>
            <View style={{ flexDirection : 'row', flex : 1}}> 
                <View style={{flex : 1, backgroundColor : '#FAFAFA', justifyContent : 'center', alignItems : 'center'}}>
                    <Button style={{ width: '90%', borderRadius : 100, borderWidth : 1 }} mode="contained" onPress={ () => navigation.navigate('Welcome')}> Volver al inicio </Button>
                </View>
            </View>
            <View style={{ flex: 0.3, backgroundColor : '#FAFAFA'}} ></View>
        </View>
        );
}

const Stack = createStackNavigator();

function LaburApp() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome"  options={{ title: 'Bienvenido' }} component={WelcomeScreen} />
            <Stack.Screen name="SignUp_One" options={{ title: 'Regístrate' }} component={SignUp_One} />
            <Stack.Screen name="SignUp_Two" options={{ title: 'Regístrate' }} component={SignUp_Two} />
            <Stack.Screen name="SignUp_Three" options={{ title: 'Regístrate' }} component={SignUp_Three} />
            <Stack.Screen name="SignUp_Four" options={{ title: 'Regístrate ' }} component={SignUp_Four} />
            <Stack.Screen name="SignUp_Five" options={{ title: 'Regístrate ' }} component={SignUp_Five} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <LaburApp />
        </NavigationContainer>
    );
}
