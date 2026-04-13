"use client";
import { useState } from "react";
import Link from "next/link";

export default function Faq() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({ status: false, key });
        } else {
            setIsActive({ status: true, key });
        }
    };

    return (
        <section className="faq-section sec-pad">
            <span className="big-text">faq’s</span>
            <div className="auto-container">
                <div className="row clearfix">
                    {/* Image Column */}
                    <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                        <div className="image-box">
                            <figure className="image">
                                <img src="/assets/images/resource/faq-1.jpg" alt="FAQ" />
                            </figure>
                            <div className="btn-box">
                                <Link href="/faq" className="theme-btn btn-one">
                                    Read More Q&A
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                        <div className="content-box">
                            <div className="sec-title">
                                <span className="sub-title">Faq’s</span>
                                <h2>Get the Answers <br />to Common Questions</h2>
                            </div>
                            <ul className="accordion-box">
                                {[0, 1, 2, 3].map((index) => (
                                    <li key={index} className={`accordion block ${isActive.key === index ? 'active-block' : ''}`}>
                                        <div className={`acc-btn ${isActive.key === index ? 'active' : ''}`} onClick={() => handleToggle(index)}>
                                            <div className="icon-box"><i className="flaticon-right-chevron"></i></div>
                                            <h4>{[
                                                "What Does a Financial Advisor Do?",
                                                "What industries do you specialize in?",
                                                "Can you guarantee for growth?",
                                                "What makes your business plans so special?"
                                            ][index]}</h4>
                                        </div>
                                        <div className={`acc-content ${isActive.key === index ? 'current' : ''}`}>
                                            <p>Our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every circumstance owing to the claims.</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
