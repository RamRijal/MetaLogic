// import Bg from '../assets/background.png'
import Image from 'next/image'
import Logo from '../assets/Layer 2.png'
import RegistrationForm from '../components/RegistrationForm'
import '../globals.css'

const Register = () => {
    return (
        <div className='background'>
            <Image src={Logo} width={180} height={180} alt='logo' className='p-6' />
            <h1 className='flex justify-center items-center text-6xl font-bold'>Register</h1>
            <div className='p-12'>
           <RegistrationForm/>
            </div>
        </div>
    )
}
export default Register