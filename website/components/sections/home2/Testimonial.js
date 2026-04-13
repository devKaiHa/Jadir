import Link from "next/link"
import TestimonialSlider09 from "@/components/slider/TestimonialSlider09"


export default function Testimonial() {
    return (
        <>
            {/* testimonial-style-two */}
            <section className="testimonial-style-two">
                <div className="outer-container">
                <div
                    className="pattern-layer"
                    style={{ backgroundImage: "url(assets/images/shape/shape-16.png)" }}
                />
                <span className="big-text">Praise</span>
                <div className="auto-container">
                    <TestimonialSlider09 />
                </div>
                </div>
                <div className="image-thumb">
                <ul className="thumb-list clearfix">
                    <li>
                    <div className="single-item">
                        <figure className="image">
                        <img src="assets/images/resource/thumb-1.jpg" alt="" />
                        </figure>
                    </div>
                    </li>
                    <li>
                    <div className="single-item">
                        <div className="icon-box">
                        <i className="flaticon-feedback" />
                        </div>
                        <h5>2.5k Clients Rated</h5>
                    </div>
                    </li>
                    <li>
                    <div className="single-item">
                        <figure className="image">
                        <img src="assets/images/resource/thumb-2.jpg" alt="" />
                        </figure>
                    </div>
                    </li>
                    <li>
                    <div className="single-item">
                        <div className="icon-box">
                        <i className="flaticon-cartoon" />
                        </div>
                        <h5>Avg.Rating 4.8/5</h5>
                    </div>
                    </li>
                    <li>
                    <div className="single-item">
                        <figure className="image">
                        <img src="assets/images/resource/thumb-3.jpg" alt="" />
                        </figure>
                    </div>
                    </li>
                    <li>
                    <div className="single-item">
                        <figure className="image">
                        <img src="assets/images/resource/thumb-4.jpg" alt="" />
                        </figure>
                    </div>
                    </li>
                </ul>
                </div>
            </section>
            {/* testimonial-style-two end */}
        </>    
    )
}
