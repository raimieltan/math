import './style.css';

function Homepage() {
    return (
        <div>
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
                            <a href="/profile">Profile</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div >
                <div id="main-featured" >
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Start Learning</h5>
                                    <p class="card-text">The skills of learning today are more important than knowledge, which is so readily available on the Internet.</p>
                                    <a href="/learn" class="btn btn-primary">Start</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Take a quiz</h5>
                                    <p class="card-text">Practice is the only way to become proficient in a new skill. The best way to think about math is to search for patterns. </p>
                                    <a href="/quiz" class="btn btn-primary">Start</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Homepage;
