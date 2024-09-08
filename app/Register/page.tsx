import Image from 'next/image'
import React from 'react'
import Bg from '../assets/background.png'
import RegistrationForm from '../components/RegistrationForm'

const Register = () => {
    return (
        <div>
            <Image alt='sbs' src={Bg} width='1200' height='1200' />
            <RegistrationForm />
        </div>
    )
}

export default Register