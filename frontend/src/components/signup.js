import './style.css';

function SignUp() {
    return (
        <div className="signup">

            <body>
                <div class="page">
                    <div class="header">
                        <div>
                            <a href="homepage.js" id="logo"><img src="./img/logo.png"
                                alt="logo"></img></a>
                            <ul>
                                <li class="selected">
                                    <a href="homepage.js">Home</a>
                                </li>
                                <li>
                                    <a href="about.js">About</a>
                                </li>
                                <li>
                                    <a href="services.js">Services</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="body">
                        <div id="featured">
                        <input type="fname" placeholder="First Name"></input>
                            <input type="lname" placeholder="Last Name"></input>
                            <input type="email" placeholder="EMAIL"></input>
                            <input type="password" placeholder="PASSWORD"></input>
                            <a id="btn" href="wall.js">SIGN IN</a>
                            <a id="reg" href="signup.js">Register here</a>

                        </div>
                    </div>
                    <div class="footer">
                        <div>
                            <p class="footnote">&#169; Copyright &#169; 2011. Company name. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default SignUp;
