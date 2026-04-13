import Link from "next/link"

export default function Banner() {
    return (
        <>
        {/* banner-section */}
        <section className="banner-style-four">
            <figure className="image-layer">
            <img src="assets/images/banner/banner-img-2.png" alt="" />
            </figure>
            <div className="growth-layer">
            <img src="assets/images/shape/shape-33.png" alt="" />
            </div>
            <div className="award-box">
            <img src="assets/images/icons/award-3.png" alt="" />
            </div>
            <div className="pattern-layer">
            <div
                className="pattern-1"
                style={{ backgroundImage: "url(assets/images/shape/shape-30.png)" }}
            />
            <div
                className="pattern-2"
                style={{ backgroundImage: "url(assets/images/shape/shape-31.png)" }}
            />
            <div
                className="pattern-3"
                style={{ backgroundImage: "url(assets/images/shape/shape-32.png)" }}
            />
            </div>
            <div className="outer-container">
            <div className="content-box">
                <h6>growing is Best Things</h6>
                <h2>
                Let us Help <br />
                You Take Your Finances to <span>The Next Level.</span>
                </h2>
                <div className="lower-box">
                <div className="btn-box">
                    <Link href="/index-4" className="theme-btn btn-one">
                    Services &amp; Plan
                    </Link>
                </div>
                <div className="rating-box">
                    <div className="icon-box">
                    <i className="flaticon-cartoon" />
                    </div>
                    <h5>
                    Avg.Rating <span>4.8/5</span> <br />
                    Based on 2,500 Client Reviews
                    </h5>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* banner-section end */}
        </>
    )
}
