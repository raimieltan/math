import './style.css';

function Homepage() {
    return (
        <body>
            <div className="homepage">
                <div class="header">
                    <div>

                        <a href="/">
                            <div id="logo"></div>
                        </a>

                        <ul>
                            <li class="selected">
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/signup">Sign Up</a>
                            </li>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="home" >
                    <div id="featured" >
                        {/* Mathemathics Learning Program */}
                    </div>
                </div>
                <div class="footer">
                    <div>
                        <p class="footnote">&#169; Copyright &#169; 2011. Company name. All rights reserved</p>
                    </div>
                </div>

            </div>
        </body>

    );
}

export default Homepage;
