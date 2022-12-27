import Wrapper from "../assets/wrappers/BigSidebar"
import Navlinks from "./Navlinks"
import Logo from "./Logo"
import { useAppContext } from "../context/appContext"

const BigSidebar = () => {
    const { showSidebar, toggleSidebar } = useAppContext
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <Navlinks toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar
