// components/FunFactSection.js
"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import ModalVideo from "react-modal-video";

export default function Funfacts() {
  const [isOpen, setIsOpen] = useState(false);

  const handleVideoOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <section className="funfact-section">
        <div className="auto-container">
          <div className="inner-container">
            <div
              className="bg-layer"
              style={{
                backgroundImage:
                  "url(/assets/images/background/funfact-bg.jpg)",
              }}
            ></div>
            <div className="row clearfix">
              <div className="col-lg-5 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                  <div className="icon-box">
                    <img src="/assets/images/icons/icon-15.png" alt="" />
                  </div>
                  <h2>We can handle the toughest financial tasks ever!...</h2>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 inner-column">
                <div className="inner-box">
                  <div className="funfact-inner">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 funfact-block">
                        <div className="funfact-block-one">
                          <div className="inner-box">
                            <div className="count-outer count-box">
                              <CountUp start={0} end={840} duration={1.5} />
                              <span className="text">Billion</span>
                            </div>
                            <p>Client assets under advisement.</p>
                            <div className="link">
                              <a href="/">
                                <i className="flaticon-diagonal-arrow"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 funfact-block">
                        <div className="funfact-block-one">
                          <div className="inner-box">
                            <div className="count-outer count-box">
                              <CountUp start={0} end={93} duration={1.5} />
                              <span className="text">Locations</span>
                            </div>
                            <p>Service with Professional Firm</p>
                            <div className="link">
                              <a href="/">
                                <i className="flaticon-diagonal-arrow"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-box">
              <a
                onClick={handleVideoOpen}
                className="lightbox-image video-btn"
                data-caption=""
              >
                <i className="flaticon-play-button"></i>Delight in Video
              </a>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="nfP5N9Yc72A"
          onClose={() => setIsOpen(false)}
        />
      </section>
    </>
  );
}
