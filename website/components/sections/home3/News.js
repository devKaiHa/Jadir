import Link from "next/link"


export default function News() {
    return (
        <>
        {/* news-style-three */}
        <section className="news-style-three sec-pad">
            <div className="auto-container">
            <div className="row clearfix">
                <div className="col-lg-4 col-md-12 col-sm-12 title-column">
                <div className="sec-title">
                    <span className="sub-title">Blog Post</span>
                    <h2>Recent from our News Room</h2>
                    <p>
                    It is a long established fact that a reader will be distracted by
                    the readable.
                    </p>
                    <Link href="/blog-2" className="theme-btn btn-two">
                    Read All Post
                    </Link>
                </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 content-column">
                <div className="content-inner">
                    <div className="news-block-two">
                    <div className="inner-box">
                        <div className="image-box">
                        <figure className="image">
                            <Link href="/blog-details">
                            <img src="assets/images/news/news-4.jpg" alt="" />
                            </Link>
                        </figure>
                        <h6>Investment</h6>
                        </div>
                        <div className="content-box">
                        <ul className="post-info clearfix">
                            <li>
                            <span>On</span> Mar 14, 2023
                            </li>
                            <li>
                            <span>By</span>{" "}
                            <Link href="/blog-details">Justin Langer</Link>
                            </li>
                        </ul>
                        <h3>
                            <Link href="/blog-details">
                            Revisiting Your Investment &amp; Distribution Goals
                            </Link>
                        </h3>
                        <p>
                            Power choice untrammelled when nothing prevent to do what we
                            like best.
                        </p>
                        <div className="link">
                            <Link href="/blog-details">
                            <span>Explore More</span>
                            </Link>
                        </div>
                        <div className="share-box">
                            <Link href="/blog-details">
                            <i className="flaticon-share" />
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="news-block-two">
                    <div className="inner-box">
                        <div className="image-box">
                        <figure className="image">
                            <Link href="/blog-details">
                            <img src="assets/images/news/news-5.jpg" alt="" />
                            </Link>
                        </figure>
                        <h6>Business</h6>
                        </div>
                        <div className="content-box">
                        <ul className="post-info clearfix">
                            <li>
                            <span>On</span> Feb 26, 2023
                            </li>
                            <li>
                            <span>By</span>{" "}
                            <Link href="/blog-details">Colmin Neil</Link>
                            </li>
                        </ul>
                        <h3>
                            <Link href="/blog-details">
                            Dimensional Fund Advisors Interview with Director
                            </Link>
                        </h3>
                        <p>
                            Able to do what we like best, every pleasure is to be
                            welcomed and every pain avoided.
                        </p>
                        <div className="link">
                            <Link href="/blog-details">
                            <span>Explore More</span>
                            </Link>
                        </div>
                        <div className="share-box">
                            <Link href="/blog-details">
                            <i className="flaticon-share" />
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* news-style-three end */}
        </>
    )
}
