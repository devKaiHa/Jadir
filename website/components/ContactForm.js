import React from "react";

function ContactForm() {
  return (
    <section className="contact-style-two ">
      <div className="outer-container sec-pad">
        <div className="pattern-layer">
          <div className="pattern-1"></div>
          <div className="pattern-2"></div>
        </div>
        <figure className="image-layer">
          <img src="/assets/images/resource/contact-1.png" alt="" />
        </figure>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 title-column">
              <div className="sec-title light">
                <span className="sub-title">Drop a Line</span>
                <h2>
                  Let’s Talk!... <br />
                  Send Your Message
                </h2>
                <p>Fill in the form and let us know what you need.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="form-inner">
                  <form
                    method="post"
                    action="sendemail.php"
                    id="contact-form"
                    className="default-form"
                  >
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Your first name"
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lname"
                          placeholder="Your last name"
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Company</label>
                        <input
                          type="text"
                          name="subject"
                          placeholder="Company name"
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone num"
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Official email address"
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label>Are you interested in?</label>
                        <div className="select-box">
                          <select className="selectmenu">
                            <option value="traditional-consulting">
                              Traditional Consulting
                            </option>
                            <option value="portfolio-management">
                              Portfolio Management
                            </option>
                            <option value="asset-allocation">
                              Asset Allocation
                            </option>
                            <option value="risk-management">
                              Risk Management
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <label>Message</label>
                        <textarea
                          name="message"
                          placeholder="Message goes here..."
                        ></textarea>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <div className="check-box">
                          <input
                            className="check"
                            type="checkbox"
                            id="checkbox1"
                          />
                          <label htmlFor="checkbox1">
                            Click here to confirm you have read our privacy
                            policy*
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                        <button
                          className="theme-btn btn-two"
                          type="submit"
                          name="submit-form"
                        >
                          <span>Send Message</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
