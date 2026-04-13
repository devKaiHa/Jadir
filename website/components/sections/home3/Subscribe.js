

export default function Subscribe() {
    return (
      <>
      {/* subscribe-section */}
      <section className="subscribe-section alternat-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div
                  className="shape-2"
                  style={{
                    backgroundImage: "url(assets/images/shape/shape-29.png)"
                  }}
                />
                <div className="icon-box">
                  <i className="flaticon-newsletter" />
                </div>
                <span className="big-text">Newsletter</span>
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6 col-sm-12 text-column">
                    <div className="text-box">
                      <div
                        className="shape"
                        style={{
                          backgroundImage: "url(assets/images/shape/shape-17.png)"
                        }}
                      />
                      <h2>Subscribe Us</h2>
                      <p>Subscribe us to receive market updates.</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form-column">
                    <div className="form-inner">
                      <form method="post" action="contact">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address..."
                            required=""
                          />
                          <button type="submit">
                            <i className="flaticon-send" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* subscribe-section end */}
    </>    
    )
}
