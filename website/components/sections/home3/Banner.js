import Link from "next/link"

export default function Banner() {
    return (
        <>
        {/* banner-section */}
        <section className="banner-style-three">
            <div className="pattern-layer">
            <div
                className="pattern-2"
                style={{ backgroundImage: "url(assets/images/shape/shape-22.png)" }}
            />
            <div
                className="pattern-1"
                style={{ backgroundImage: "url(assets/images/shape/shape-21.png)" }}
            />
            <div
                className="pattern-3"
                style={{ backgroundImage: "url(assets/images/shape/shape-23.png)" }}
            />
            </div>
            <div className="auto-container">
            <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                    <h6>Welcome to Counsolve</h6>
                    <h2>Investment advisory services</h2>
                    <p>
                    The moment, so blinded by desire, that they cannot foresee and
                    trouble that are bound to ensue.{" "}
                    </p>
                    <div className="support-box">
                    <div
                        className="shape"
                        style={{
                        backgroundImage: "url(assets/images/shape/shape-18.png)"
                        }}
                    />
                    <div className="single-item">
                        <div className="icon-box">
                        <i className="flaticon-headphone" />
                        </div>
                        <h5>
                        Have <br />
                        Question?
                        </h5>
                    </div>
                    <div className="phone">
                        <h3>
                        <a href="tel:4188822333">(+41) 888.22.333</a> (or)
                        </h3>
                    </div>
                    </div>
                    <div className="btn-box">
                    <Link href="/contact" className="theme-btn btn-two">
                        Send Your Request
                    </Link>
                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                <div className="image-box">
                    <div className="shape">
                    <div
                        className="shape-1"
                        style={{
                        backgroundImage: "url(assets/images/shape/shape-19.png)"
                        }}
                    />
                    <div
                        className="shape-2"
                        style={{
                        backgroundImage: "url(assets/images/shape/shape-20.png)"
                        }}
                    />
                    </div>
                    <figure className="image">
                    <img src="assets/images/banner/banner-img-1.jpg" alt="" />
                    </figure>
                    <div className="growth-box">
                    <h5>Monthly Growth</h5>
                    <div className="progress-box">
                        <h5>$48,560,25</h5>
                        <div className="bar">
                        <div className="bar-inner count-bar" data-percent="60%" />
                        <div className="count-text">+18%</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <ul className="social-links clearfix">
            <li>
                <h5>Social Connect</h5>
            </li>
            <li>
                <Link href="/">
                <i className="fa-brands fa-facebook" />
                </Link>
            </li>
            <li>
                <Link href="/">
                <i className="fa-brands fa-square-twitter" />
                </Link>
            </li>
            <li>
                <Link href="/">
                <i className="fa-solid fa-basketball" />
                </Link>
            </li>
            <li>
                <Link href="/">
                <i className="fa-brands fa-youtube" />
                </Link>
            </li>
            </ul>
        </section>
        {/* banner-section end */}
        </>
    )
}
