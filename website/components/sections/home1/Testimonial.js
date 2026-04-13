import TestimonialSlider06 from '@/components/slider/TestimonialSlider06'
import Link from 'next/link'

export default function Testimonial() {
    return (
        <>
        {/* testimonial-section */}
        <section className="testimonial-section sec-pad">
            <div
            className="pattern-layer"
            style={{ backgroundImage: "url(assets/images/shape/shape-11.png)" }}
            />
            <div className="auto-container">
            <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                    <div className="sec-title light">
                    <span className="sub-title">Testimonials</span>
                    <h2>
                        Our Clients have been Extremely Satisfied by our Professionalism
                    </h2>
                    </div>
                    <div className="inner-box">
                    <div className="single-item">
                        <div className="icon-box">
                        <img src="assets/images/icons/icon-7.png" alt="" />
                        </div>
                        <h5>
                        Avg.Rating 4.8/5 <br />
                        Based on 2,500 Client Reviews
                        </h5>
                    </div>
                    <div className="tag">Excellent Service</div>
                    </div>
                    <div className="link">
                    <Link href="/">
                        <span>Read All Reviews</span>
                    </Link>
                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
                <div className="testimonial-content">
                    <div className="testimonial-slider">
                   <TestimonialSlider06 />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* testimonial-section end */}
        </>

    )
}
