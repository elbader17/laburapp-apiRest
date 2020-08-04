import Moment from './moment';

export const checkControlEmail = (email) => { // FUNCION PARA VERIFICAR EL EMAIL
    var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email === '') {
        return {
            bool: false,
            msg: 'El email no puede estár vacio.'
        };
    } else {
        if (!emailRegex.test(email)) {
            return {
                bool: false,
                msg: 'El formato del email no es valido'
            }
        } else {
            return {
                bool: true,
                msg: ''
            }
        }
    }
};

export const checkControlPassword = (passw) => {
    if (passw === '') {
        return {
            bool: false,
            msg: 'La contraseña no puede estár vacía.'
        }
    } else {
        if (passw.length < 8) {
            return {
                bool: false,
                msg: 'La contraseña debe contener minimo de 8 caracteres'
            }
        } else {
            if ((passw.length >= 8) && (passw.length < 16)){
                return {
                    bool:true,
                    msg: ''
                }
            } else {
                if ( passw.length >= 16) {
                    return {
                        bool: false,
                        msg: 'La contraseña debe contener máximo 16 caracteres'
                    }
                }
            }
        }
    }
}

export const checkControlEqualPassword = (array) => {
    console.log('Equal ------')
    console.log(array[0])
    console.log(array[1])
    console.log('End Equal --')
    if ( array[0] === '') {
        if (array[1] === '') {
            return {
                bool: false,
                msg0: 'La contraseña no puede estar vacía',
                msg1: 'La contraseña no puede estar vacía'
            }
        } else {
            return {
                bool: false,
                msg0: 'La contraseña no puede estar vacía',
                msg1: ''
            }
        }
    } else {
        if (array[1] === '') {
            return {
                bool: false,
                msg0: '',
                msg1: 'La contraseña no puede estar vacía.'
            }
        } else {
            if (array[0] != array[1]) {
                return {
                    bool: false,
                    msg0: '',
                    msg1: 'Las contraseñas no coinciden'
                }
            } else {
                return {
                    bool: true,
                    msg0: '',
                    msg1: ''
                }
            }
        }
    }
}

export const checkControlFirstName = (firstName) => {
    let firstNameRegex = new RegExp("^[a-zA-Z ]+$");
    if (firstName === '') {
        return {
            bool: false,
            msg: 'El nombre no puede estar vacío'
        }
    } else {
        if (!firstNameRegex.test(firstName)) {
            return {
                bool: false,
                msg: 'El nombre no puede contener números'
            }
        } else {
            return {
                bool: true,
                msg: ''
            }
        }
    }
}

export const checkControlSecondName = (secondName) => {
    let secondNameRegex = new RegExp("^[a-zA-Z ]+$");
    if (secondName === '') {
        return {
            bool: false,
            msg: 'El apellido no puede estar vacío'
        }
    } else {
        if (!secondNameRegex.test(secondName)) {
            return {
                bool: false,
                msg: 'El apellido no puede contener números'
            }
        } else {
            return {
                bool: true,
                msg: ''
            }
        }
    }
}

export const checkControlDni = (dni) => {
    if (dni === '') {
        return {
            bool: false,
            msg: 'El DNI no puede estar vacío'
        }
    } else {
        if (dni.length != 8) {
            return {
                bool: false,
                msg: 'El DNI debe contener 8 números'
            }
        } else {
            if (isNaN(dni)) {
                return {
                    bool: false,
                    msg: 'El DNI solo debe contener números'
                }
            } else {
                return {
                    bool: true,
                    msg: ''
                }
            }
        }
    }
}

export const checkControlDate = (date) => {
    let dDate = Moment(date).format('DD') // Día ingresado por el usuario
    let mDate = Moment(date).format('MM') // Mes ingresado por el usuairo
    let yDate = Moment(date).format('YYYY') // Año ingresado por el usuairo

    if ((dDate === '') || (mDate === '') || (yDate === '') ) { // Verifico que no sea vacío
        return {
            bool: false,
            msg: 'La fecha de nacimiento no puede estar vacía'
        }
    } else {
        let res = new Date() // Obtengo la fecha actual
        let dRes = Moment(res).format('DD') // Día de la fecha actual
        let mRes = Moment(res).format('MM') // Mes de la fecha actual
        let yRes = Moment(res).format('YYYY') // Año de la fecha actual

        if (yRes <= yDate) {
            return {
                bool: false,
                msg: 'Debe ser mayor de edad'
            }
        } else {
            if ((yRes - yDate) < 18 ){ 
                return {
                    bool: false,
                    msg: 'Debe ser mayor de edad'
                }
            } else {
                if ((yRes - yDate) == 18) {
                    if (mRes < mDate) {
                        return {
                            bool: false,
                            msg: 'Debe ser mayor de edad'
                        }
                    } else {
                        if (dRes < dDate) {
                            return {
                                bool: false,
                                msg: 'Debe ser mayor de edad'
                            }
                        } else {
                            return {
                                bool: true,
                                msg: ''
                            }
                        }
                    }
                } else {
                    return {
                        bool: true,
                        msg: ''
                    }
                }
            }
        }
    }
}

export const checkControlPhoneNumber = (number) => {
    if (number === '') {
        return {
            bool: false,
            msg: 'El número telefonico no puede estar vacío'
        }
    } else {
        if (isNaN(number)) {
            return {
                bool: false,
                msg: 'El número telefonico solo debe contener números'
            }
        } else {
            if (number.length != 9) {
                return {
                    bool: false,
                    msg: 'El número telefonico debe contener 9 números'
                }
            } else {
                return {
                    bool: true,
                    msg: ''
                }
            }
        }
    }
}

export const checkControlAddress = (address) => {
    return{
        bool: true,
        msg: ''
    }
}

export const checkControlValidate = (array) => {
    let validate = false
    console.log('Validate -------')
    console.log(array[0])
    console.log(array[1])
    console.log(array[2])
    console.log(array[3])
    console.log('End Validate ---')

    for (var i = 0; i < array.length; i++) {
        if (array[i] === true){
            validate = true
        } else {
            return false
        }
    }
    return validate
}