import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <>
      <section className="comingsoon-section centred">
        <div className="auto-container">
          <div className="content-box">
            <div
              className="shape"
              style={{
                backgroundImage: "url(/assets/images/shape/shape-49.png)",
              }}
            ></div>
            <span className="big-text">Coming&nbsp;Soon</span>
            <figure className="logo-box">
              <Link href="/">
                <img src="/assets/images/logo.png" alt="Logo" />
              </Link>
            </figure>
            <h2>
              Counsolve Investment <br />
              Conference ’23
            </h2>
            <p>
              Idea of denouncing pleasure and praising pain was born & we will
              give you account of system.
            </p>
            <div className="timer">
              <div
                className="cs-countdown clearfix"
                data-countdown="08/08/2023 05:06:59"
              ></div>
            </div>
            <div className="btn-box">
              <button type="button" className="theme-btn btn-two">
                Get Reminder
              </button>
            </div>
            <ul className="social-links clearfix">
              <li>
                <a href="/">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fa-brands fa-square-twitter"></i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fa-brands fa-square-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
