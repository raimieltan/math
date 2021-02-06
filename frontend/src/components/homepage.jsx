import './style.css';

function Homepage() {
    return (
        <div className="homepage">

            <body>
                <div class="page">
                    <div class="header">
                        <div>
                            <a href="/homepage" id="logo"><img src="./img/logo.png"
                                alt="logo"></img></a>
                            <ul>
                                <li class="selected">
                                    <a href="/homepage">Home</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/services">Services</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="body">
                        <div id="featured">
                            <input type="email" placeholder="EMAIL"></input>
                            <input type="password" placeholder="PASSWORD"></input>
                            <a id="btn" href="/wall">SIGN IN</a>
                            <a id="reg" href="/signup">Register here</a>
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

export default Homepage;
