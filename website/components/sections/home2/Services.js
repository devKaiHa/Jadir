import Link from "next/link";

export default function service() {
  return (
    <>
      {/* service-style-two */}
      <section className="service-style-two sec-pad">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-14.png)" }}
        />
        <div className="auto-container">
          <div className="sec-title centred light">
            <span className="sub-title">Services</span>
            <h2>Phenomenal Consulting Solutions</h2>
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                <div className="service-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <div className="icon">
                        <i className="flaticon-analytics" />
                      </div>
                      <span className="count-text">01</span>
                    </div>
                    <h3>
                      <Link href="/Services">
                        Private Client <br />
                        Investment Management
                      </Link>
                    </h3>
                    <div className="link">
                      <Link href="/Services">
                        <span>Explore Service</span>
                      </Link>
                    </div>
                    <p>
                      That they cannot foresee the pain trouble that are bound
                      ensue equal blame belongs to duty.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                <div className="service-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <div className="icon">
                        <i className="flaticon-office-building" />
                      </div>
                      <span className="count-text">02</span>
                    </div>
                    <h3>
                      <Link href="/Services">
                        Institutional <br />
                        Investment Consulting
                      </Link>
                    </h3>
                    <div className="link">
                      <Link href="/Services">
                        <span>Explore Service</span>
                      </Link>
                    </div>
                    <p>
                      Power of choice is untrammelled when nothing prevent our
                      being all to do what we like best.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                <div className="service-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <div className="icon">
                        <i className="flaticon-retirement" />
                      </div>
                      <span className="count-text">03</span>
                    </div>
                    <h3>
                      <Link href="/Services">
                        Retirement Plan <br />
                        Consulting
                      </Link>
                    </h3>
                    <div className="link">
                      <Link href="/Services">
                        <span>Explore Service</span>
                      </Link>
                    </div>
                    <p>
                      Obligations of business it will occurs that pleasures have
                      to be repudiated and annoyances accepted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                <div className="service-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <div className="icon">
                        <i className="flaticon-retirement" />
                      </div>
                      <span className="count-text">03</span>
                    </div>
                    <h3>
                      <Link href="/Services">
                        Retirement Plan <br />
                        Consulting
                      </Link>
                    </h3>
                    <div className="link">
                      <Link href="/Services">
                        <span>Explore Service</span>
                      </Link>
                    </div>
                    <p>
                      Obligations of business it will occurs that pleasures have
                      to be repudiated and annoyances accepted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* service-style-two end */}
    </>
  );
}
