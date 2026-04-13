import Link from "next/link"


export default function News() {
    return (
        <>
        {/* news-style-four */}
        <section className="news-style-four">
            <div className="auto-container">
            <div className="sec-title">
                <span className="sub-title">Blog Post</span>
                <h2>Read Recent from News Room</h2>
                <div className="more-link">
                <Link href="/blog">Read All Post</Link>
                </div>
            </div>
            <div className="row clearfix">
                <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                <div className="news-block-three">
                    <div className="inner-box">
                    <div className="image-box">
                        <h6>Investment</h6>
                        <figure className="image">
                        <Link href="blog-details">
                            <img src="assets/images/news/news-6.jpg" alt="" />
                        </Link>
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/news/news-6.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                        <div className="author-box">
                        <figure className="thumb-box">
                            <img src="assets/images/news/thumb-1.png" alt="" />
                        </figure>
                        <h5>Colmin Neil</h5>
                        <ul className="post-info clearfix">
                            <li>Feb 26, 2023</li>
                            <li>.</li>
                            <li>3 mins read</li>
                        </ul>
                        </div>
                    </div>
                    <div className="lower-content">
                        <h3>
                        <Link href="blog-details">
                            Revisiting Your Investment &amp; Distribution Goals
                        </Link>
                        </h3>
                        <div className="link-box">
                        <Link href="blog-details">
                            <span>Explore More</span>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                <div className="news-block-three">
                    <div className="inner-box">
                    <div className="image-box">
                        <h6>Business</h6>
                        <figure className="image">
                        <Link href="blog-details">
                            <img src="assets/images/news/news-7.jpg" alt="" />
                        </Link>
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/news/news-7.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                        <div className="author-box">
                        <figure className="thumb-box">
                            <img src="assets/images/news/thumb-1.png" alt="" />
                        </figure>
                        <h5>Colmin Neil</h5>
                        <ul className="post-info clearfix">
                            <li>Feb 26, 2023</li>
                            <li>.</li>
                            <li>3 mins read</li>
                        </ul>
                        </div>
                    </div>
                    <div className="lower-content">
                        <h3>
                        <Link href="blog-details">
                            Dimensional Fund Advisors Interview with Director
                        </Link>
                        </h3>
                        <div className="link-box">
                        <Link href="blog-details">
                            <span>Explore More</span>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 post-block">
                <div className="post-inner">
                    <div className="post-block-two">
                    <h6>Financial Plan</h6>
                    <div className="inner-box">
                        <figure className="image-box">
                        <Link href="blog-details">
                            <img src="assets/images/news/post-4.jpg" alt="" />
                        </Link>
                        </figure>
                        <h5>Feb 05, 2023</h5>
                        <h4>
                        <Link href="blog-details">
                            Interested in Giving Backthis year? Here are some tips.
                        </Link>
                        </h4>
                    </div>
                    </div>
                    <div className="post-block-two">
                    <h6>Managment</h6>
                    <div className="inner-box">
                        <figure className="image-box">
                        <Link href="blog-details">
                            <img src="assets/images/news/post-5.jpg" alt="" />
                        </Link>
                        </figure>
                        <h5>Jan 28, 2023</h5>
                        <h4>
                        <Link href="blog-details">
                            Reports First Quarter 2022 Diluted EPS of $5.45, or $8.63 as
                            adjusted
                        </Link>
                        </h4>
                    </div>
                    </div>
                    <div className="post-block-two">
                    <h6>Technology</h6>
                    <div className="inner-box">
                        <figure className="image-box">
                        <Link href="blog-details">
                            <img src="assets/images/news/post-6.jpg" alt="" />
                        </Link>
                        </figure>
                        <h5>Jan 14, 2023</h5>
                        <h4>
                        <Link href="blog-details">
                            How to Recover from a Market Crash if You're Retired
                        </Link>
                        </h4>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* news-style-four end */}
        </>

    )
}
