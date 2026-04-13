import Link from "next/link"


export default function About() {
    return (
        <>
        {/* about-style-four */}
        <section className="about-style-four">
            <div className="auto-container">
            <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                <div className="image-box">
                    <figure className="image image-1">
                    <img src="assets/images/resource/about-4.jpg" alt="" />
                    </figure>
                    <figure className="image image-2">
                    <img src="assets/images/resource/about-5.jpg" alt="" />
                    </figure>
                    <figure className="image image-3">
                    <img src="assets/images/resource/about-6.jpg" alt="" />
                    </figure>
                    <div className="image-content">
                    <div className="light-icon">
                        <img src="assets/images/icons/icon-27.png" alt="" />
                    </div>
                    <div className="icon-box">
                        <i className="flaticon-analysis-1" />
                    </div>
                    <h5>Consulting Since</h5>
                    <h2>2014</h2>
                    <h5>
                        <Link href="/index-4">Our History</Link>
                    </h5>
                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                    <div className="sec-title">
                    <span className="sub-title">Our Story</span>
                    <h2>
                        Specialized in <br />
                        Investment Consulting
                    </h2>
                    </div>
                    <div className="text-box">
                    <p>
                        Every pleasure is to be welcomed and every pain avoided. But in
                        certain circumstances and owing to the claims of duty
                        obligations of business it will frequently occur that.
                    </p>
                    </div>
                    <div className="inner-box">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                        <div className="single-item">
                            <div className="icon-box">
                            <i className="flaticon-submit" />
                            </div>
                            <h5>
                            <span>840 Billion</span> Client assets under advisement.
                            </h5>
                            <ul className="list-item clearfix">
                            <li>Investment Strategy</li>
                            <li>Risk Management</li>
                            <li>Investment Manager Selection</li>
                            </ul>
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                        <div className="single-item">
                            <div className="icon-box">
                            <i className="flaticon-money-growth" />
                            </div>
                            <h5>
                            <span>9.2k</span> Corporate, Family and Institutional
                            Clients
                            </h5>
                            <ul className="list-item clearfix">
                            <li>Cases are perfectly simple</li>
                            <li>To do what we like best</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="btn-box">
                    <Link href="/index-4" className="theme-btn btn-two">
                        More About Us
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* about-style-four end */}
        </>

    )
}
