import './style.css';

function TeacherPage() {
    return (
        <div>
            <div class="header">
                <div>

                    <a href="/teacher-page">
                        <div id="logo"></div>
                    </a>

                    <ul>
                        <li class="selected">
                            <a href="/teacher-page">Home</a>
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
                                    <h5 class="card-title">Algebra 101</h5>
                                    <p class="card-text">A Study of mathematical symbols and the rules for manipulating these symbols.</p>
                                    <a href="/subs" class="btn btn-primary">Open</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Geometry2</h5>
                                    <p class="card-text">With arithmetic, one of the oldest branches of mathematics. It is concerned with properties of space that are related with distance, shape, size, and relative position of figures. </p>
                                    <a href="/subs" class="btn btn-primary">Open</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <br /> <br />
                <div>
                    <p>
                        <a class="btn btn-primary" data-toggle="collapse" href="#addsub" role="button" aria-expanded="false" aria-controls="collapseExample">Add subject</a>
                    </p>
                    <div class="collapse" id="addsub">
                        <div class="card card-body">
                            <input type="title" placeholder="Title"/>
                            <input type="desc" placeholder="Description"/>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TeacherPage;
