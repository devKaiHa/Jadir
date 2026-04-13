import Link from "next/link"


export default function News() {
    return (
        <>
        {/* news-section */}
        <section className="news-section sec-pad">
            <div className="auto-container">
            <div className="sec-title centred">
                <span className="sub-title">Blog Post</span>
                <h2>Recent from News Room</h2>
            </div>
            <div className="row clearfix">
                <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                <div
                    className="news-block-one wow fadeInUp animated"
                    data-wow-delay="00ms"
                    data-wow-duration="1500ms"
                >
                    <div className="inner-box">
                    <div className="upper-box">
                        <span className="category">Investment</span>
                        <ul className="post-info clearfix">
                        <li>
                            <span>On</span> Mar 14, 2023
                        </li>
                        <li>
                            <span>By</span>{" "}
                            <Link href="/blog-details">Justin Langer</Link>
                        </li>
                        </ul>
                    </div>
                    <div className="image-box">
                        <figure className="image">
                        <Link href="/blog-details">
                            <img src="assets/images/news/news-1.jpg" alt="" />
                        </Link>
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/news/news-1.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                    <div className="lower-box">
                        <h3>
                        <Link href="/blog-details">
                            Revisiting Your Investment &amp; Distribution Goals
                        </Link>
                        </h3>
                        <div className="link">
                        <Link href="/blog-details">
                            <span>Explore More</span>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                <div
                    className="news-block-one wow fadeInUp animated"
                    data-wow-delay="300ms"
                    data-wow-duration="1500ms"
                >
                    <div className="inner-box">
                    <div className="upper-box">
                        <span className="category">Business</span>
                        <ul className="post-info clearfix">
                        <li>
                            <span>On</span> Feb 26, 2023
                        </li>
                        <li>
                            <span>By</span> <Link href="/blog-details">Colmin Neil</Link>
                        </li>
                        </ul>
                    </div>
                    <div className="image-box">
                        <figure className="image">
                        <Link href="/blog-details">
                            <img src="assets/images/news/news-2.jpg" alt="" />
                        </Link>
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/news/news-2.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                    <div className="lower-box">
                        <h3>
                        <Link href="/blog-details">
                            Dimensional Fund Advisors Interview with Director
                        </Link>
                        </h3>
                        <div className="link">
                        <Link href="/blog-details">
                            <span>Explore More</span>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                <div
                    className="news-block-one wow fadeInUp animated"
                    data-wow-delay="600ms"
                    data-wow-duration="1500ms"
                >
                    <div className="inner-box">
                    <div className="upper-box">
                        <span className="category">Financial Plan</span>
                        <ul className="post-info clearfix">
                        <li>
                            <span>On</span> Feb 05, 2023
                        </li>
                        <li>
                            <span>By</span>{" "}
                            <Link href="/blog-details">Boone Gerardo</Link>
                        </li>
                        </ul>
                    </div>
                    <div className="image-box">
                        <figure className="image">
                        <Link href="/blog-details">
                            <img src="assets/images/news/news-3.jpg" alt="" />
                        </Link>
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/news/news-3.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                    <div className="lower-box">
                        <h3>
                        <Link href="/blog-details">
                            Interested in Giving Back this year? Here are some tips
                        </Link>
                        </h3>
                        <div className="link">
                        <Link href="/blog-details">
                            <span>Explore More</span>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* news-section end */}
        </>
    )
}
