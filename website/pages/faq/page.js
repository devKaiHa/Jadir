"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [isActive, setIsActive] = useState({
    status: false,
    key: 1,
  });

  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({ status: false });
    } else {
      setIsActive({ status: true, key });
    }
  };
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Faq’s">
        <div>
          {/* faq-page-section */}
          <section className="faq-page-section sec-pad">
            <div className="auto-container">
              <div className="row clearfix">
                <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                  <div className="faq-sidebar">
                    <div className="text-box">
                      <h3>Ask your Question</h3>
                      <p>
                        Belongs to those who fail in their duty through
                        weakness.
                      </p>
                    </div>
                    <div className="form-inner">
                      <form method="post" action="/faq">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="Name *"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <div className="select-box">
                            <select className="selectmenu">
                              <option>Category</option>
                              <option>Traditional Consulting</option>
                              <option>Portfolio Management</option>
                              <option>Asset Allocation</option>
                              <option>Risk Management</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <textarea
                            name="message"
                            placeholder="Question..."
                            defaultValue={""}
                          />
                        </div>
                        <div className="form-group message-btn">
                          <button type="submit" className="theme-btn btn-two">
                            Send Request
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                  <div className="faq-content">
                    <span className="big-text">faq’s</span>

                    {/* Management FAQs */}
                    <div className="accordion-content">
                      <h3>Management</h3>
                      <ul className="accordion-box">
                        {/* FAQ Item */}
                        <li className="accordion block">
                          <div
                            className={
                              isActive.key === 1 ? "acc-btn active" : "acc-btn"
                            }
                            onClick={() => handleToggle(1)}
                          >
                            <div className="icon-box">
                              <i className="flaticon-right-chevron" />
                            </div>
                            <h4>What does Counsolve do?</h4>
                          </div>
                          <div
                            className={
                              isActive.key === 1
                                ? "acc-content current"
                                : "acc-content"
                            }
                          >
                            <p>
                              Our power of choice is untrammelled and when
                              nothing prevents our being able to do what we like
                              best, every circumstance owing to the claims.
                            </p>
                          </div>
                        </li>

                        {/* Additional FAQ Items */}
                        {[
                          {
                            key: 2,
                            question: "What industries do you specialize in?",
                          },
                          { key: 3, question: "Can you guarantee growth?" },
                          {
                            key: 4,
                            question: "What makes your business plans special?",
                          },
                        ].map((faq) => (
                          <li key={faq.key} className="accordion block">
                            <div
                              className={
                                isActive.key === faq.key
                                  ? "acc-btn active"
                                  : "acc-btn"
                              }
                              onClick={() => handleToggle(faq.key)}
                            >
                              <div className="icon-box">
                                <i className="flaticon-right-chevron" />
                              </div>
                              <h4>{faq.question}</h4>
                            </div>
                            <div
                              className={
                                isActive.key === faq.key
                                  ? "acc-content current"
                                  : "acc-content"
                              }
                            >
                              <p>
                                Our power of choice is untrammelled and when
                                nothing prevents our being able to do what we
                                like best, every circumstance owing to the
                                claims.
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Service FAQs */}
                    <div className="accordion-content">
                      <h3>Service</h3>
                      <ul className="accordion-box">
                        {[
                          { key: 5, question: "How long does it take?" },
                          {
                            key: 6,
                            question: "How do you price your services?",
                          },
                          { key: 7, question: "What is your refund policy?" },
                        ].map((faq) => (
                          <li key={faq.key} className="accordion block">
                            <div
                              className={
                                isActive.key === faq.key
                                  ? "acc-btn active"
                                  : "acc-btn"
                              }
                              onClick={() => handleToggle(faq.key)}
                            >
                              <div className="icon-box">
                                <i className="flaticon-right-chevron" />
                              </div>
                              <h4>{faq.question}</h4>
                            </div>
                            <div
                              className={
                                isActive.key === faq.key
                                  ? "acc-content current"
                                  : "acc-content"
                              }
                            >
                              <p>
                                Our power of choice is untrammelled and when
                                nothing prevents our being able to do what we
                                like best, every circumstance owing to the
                                claims.
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* faq-page-section end */}

          {/* cta-section */}
          <section className="cta-section alternat-2">
            <div className="outer-container">
              <div
                className="pattern-layer"
                style={{
                  backgroundImage: "url(assets/images/shape/shape-25.png)",
                }}
              />
              <div className="image-box-one">
                <figure className="image">
                  <img src="assets/images/resource/cta-1.jpg" alt="" />
                </figure>
                <div className="phone">
                  <h4>
                    Call: <a href="tel:41888765432">(+41) 888.76.5432</a>
                  </h4>
                </div>
              </div>
              <div className="image-box-two">
                <figure className="image">
                  <img src="assets/images/resource/cta-2.jpg" alt="" />
                </figure>
                <div className="text-box">
                  <h6>
                    Do you Have <br />
                    any idea to Join <br />
                    With Us
                  </h6>
                </div>
              </div>
              <div className="auto-container">
                <div className="row clearfix">
                  <div className="col-lg-8 col-md-12 col-sm-12 offset-lg-2 content-column">
                    <div className="content-box">
                      <h2>
                        Believe us when <br />
                        it comes to investment
                      </h2>
                      <div className="inner-box">
                        <figure className="image-box">
                          <img src="assets/images/resource/cart-1.jpg" alt="" />
                        </figure>
                        <p>
                          The moment, so blinded by desire, that they cannot
                          foresee and trouble that are bound to ensue.
                        </p>
                        <Link href="/Contact-us" className="theme-btn btn-two">
                          Send Request
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* cta-section end */}
        </div>
      </Layout>
    </>
  );
}
