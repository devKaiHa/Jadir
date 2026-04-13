import Link from "next/link";

export default function About() {
    return (
        <>
        {/* about-style-two */}
        <section className="about-style-two sec-pad">
            <div
            className="pattern-layer"
            style={{ backgroundImage: "url(assets/images/shape/shape-13.png)" }}
            />
            <div className="auto-container">
            <div className="sec-title">
                <span className="sub-title">About Us</span>
                <h2>
                Offer Expert Advice on <br />
                Tax Planning, Insurance &amp; Investments
                </h2>
            </div>
            <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
                <div className="inner-box">
                    <div className="experience-box">
                    <h2>08</h2>
                    <h6>
                        Years <br />
                        Experience in <br />
                        Consulting
                    </h6>
                    </div>
                    <ul className="list-item clearfix">
                    <li>Investment Strategy Development</li>
                    <li>Risk Management</li>
                    <li>Investment Manager Selection</li>
                    </ul>
                    <div className="btn-box">
                    <Link href="/" className="theme-btn btn-two">
                        Explore More
                    </Link>
                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                    <h3>US Based Consulting Firm</h3>
                    <div className="text-box">
                    <p>
                        <span>c</span>ounsolve to those who fail their duty through
                        weakness will which is the same as saying through shrinking from
                        toil pain these cases
                    </p>
                    <p>are perfectly simple and easy to distinguish.</p>
                    </div>
                    <h5>Explore our company's rich history &amp; legacy.</h5>
                    <div className="quote-box">
                    <div className="icon-box">
                        <i className="flaticon-quote" />
                    </div>
                    <h4>
                        Earning it’s a kind of magic. We make sure to preserve it.
                    </h4>
                    <h6>Rodriguez Kyle</h6>
                    <span className="designation">
                        Ceo &amp; Founder of Counsolve
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* about-style-two end */}
        </>
    )
}
