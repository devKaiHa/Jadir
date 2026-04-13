"use client"
import { useState } from 'react';
import Link from 'next/link';
import ModalVideo from 'react-modal-video';

export default function ChooseUs() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            {/* chooseus-style-four */}
            <section className="chooseus-style-four">
                <div className="bg-layer" style={{ backgroundImage: 'url(/assets/images/background/chooseus-bg-2.jpg)' }}></div>
                <div className="pattern-layer" style={{ backgroundImage: 'url(/assets/images/shape/shape-34.png)' }}></div>
                <div className="pattern-layer-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-35.png)' }}></div>
                <div className="pattern-layer-3" style={{ backgroundImage: 'url(/assets/images/shape/shape-36.png)' }}></div>
                <div className="outer-container">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-lg-6 col-md-12 col-sm-12 video-column">
                                <div className="video-content">
                                    <span className="big-text">features</span>
                                    <div className="video-inner" style={{ backgroundImage: 'url(/assets/images/resource/video-1.jpg)' }}>
                                        <div className="video-btn">
                                            <button onClick={() => setOpen(true)} className="lightbox-image">
                                                <i className="flaticon-play-button"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                                <div className="content-box">
                                    <div className="sec-title light">
                                        <span className="sub-title">Why Choose Us</span>
                                        <h2>Reason for Choosing Counsolve</h2>
                                    </div>
                                    <div className="inner-box">
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <div className="icon"><i className="flaticon-knowledge"></i></div>
                                                <div className="link">
                                                    <Link href="/index-4"><i className="flaticon-diagonal-arrow"></i></Link>
                                                </div>
                                            </div>
                                            <h6>Extensive</h6>
                                            <h3>Knowledge</h3>
                                            <p>Denounce with righteous indignation dislike men who are so beguiled.</p>
                                        </div>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <div className="icon"><i className="flaticon-clock"></i></div>
                                                <div className="link">
                                                    <Link href="/index-4"><i className="flaticon-diagonal-arrow"></i></Link>
                                                </div>
                                            </div>
                                            <h6>Time</h6>
                                            <h3>Savings</h3>
                                            <p>Belongs to those who fail in their duty through weakness of will same.</p>
                                        </div>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <div className="icon"><i className="flaticon-united"></i></div>
                                                <div className="link">
                                                    <Link href="/index-4"><i className="flaticon-diagonal-arrow"></i></Link>
                                                </div>
                                            </div>
                                            <h6>Team</h6>
                                            <h3>Approach</h3>
                                            <p>These cases are perfectly simple and easy to distinguish in a free hour like best.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* chooseus-style-four end */}

            {/* Video Modal */}
            <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId="nfP5N9Yc72A" onClose={() => setOpen(false)} />
        </>
    );
}
