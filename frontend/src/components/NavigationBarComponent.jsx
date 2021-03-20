import {Link} from "react-router-dom";

const NavigationBarComponent = () => {
    return (
        <nav className="nav-wrapper teal accent-4 navbar">
            <div className="container">
                <Link to="/" className="brand-logo black-text">
                    <img className="responsive-img" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter" style={{ marginTop: "10px" }}/>
                </Link>
                <ul className="right">
                    <li>
                        <Link to="/login" className="green-text text-darken-3">
                            <button className="btn">login</button>
                        </Link>
                    </li>
                    <li> <span className="green-text text-darken-3">or</span> </li>
                    <li>
                        <Link to="/signup" className="black-text">
                            <button className="waves-effect waves-light btn orange darken-4">sign up</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationBarComponent;
