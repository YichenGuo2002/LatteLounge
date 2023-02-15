

const home = () =>{
 return(
    <div className="cover-container d-flex p-3 mx-auto flex-column" id="homePage">
        <main role="main" className="inner cover">
        <h1 className="cover-heading">LatteLounge</h1>
        <p className="lead">Come indulge in the finest beans, roasts, and blends, and experience
                    the warm and welcoming ambiance of your favorite coffee house from the comfort of your own screen.</p>
        <p className="lead">
        <a href="/coffeeHouse" className="btn btn-lg btn-primary">Learn more</a>
        </p>
        </main>
    </div>
 )
}

export default home