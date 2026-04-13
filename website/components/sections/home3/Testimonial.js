import TestimonialSlider10 from '@/components/slider/TestimonialSlider10'

export default function Testimonial() {
    return (
        <>
        {/* testimonial-style-three */}
        <section className="testimonial-style-three sec-pad">
            <span className="big-text">feedback</span>
            <div className="auto-container">
            <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                <div className="image-box">
                    <figure className="image">
                    <img src="assets/images/resource/testimonial-2.jpg" alt="" />
                    </figure>
                    <div className="text-box">
                    <div className="icon-box">
                        <i className="flaticon-cartoon" />
                    </div>
                    <h5>
                        Avg.Rating <span>4.8/5</span> <br />
                        Based on 2,500 Client <br />
                        Reviews.
                    </h5>
                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                    <div className="sec-title">
                    <span className="sub-title">Testimonials</span>
                    <h2>Clients about our Service</h2>
                    </div>
                    <TestimonialSlider10 />
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* testimonial-style-three end */}
        </>

    )
}
