import { Logo } from '../components/'
import main from '../assets/images/main-alternative.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Job <span>Searching</span> App
                    </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum neque eaque necessitatibus illum non omnis fugiat quod recusandae minima officiis quibusdam totam similique, est iure enim reprehenderit debitis suscipit soluta?</p>
                    <Link to='/register' className="btn btn-hero">
                        Login/Register
                    </Link>
                    <img src={main} alt="job hunt" className='img main-img' />
                </div>
            </div>
        </Wrapper >
    )
}



export default Landing

