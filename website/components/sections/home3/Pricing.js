import Link from "next/link";


export default function Pricing() {
    return (
      <>
      {/* pricing-style-two */}
      <section className="pricing-style-two sec-pad">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="sec-title">
                  <span className="sub-title">Plan &amp; Pricing</span>
                  <h2>Effective &amp; Flexible Pricing</h2>
                </div>
                <div className="text-box">
                  <p>
                    Welcomed and every pain avoided but in certain circumstances.
                  </p>
                  <ul className="list-item clearfix">
                    <li>Investment Strategy</li>
                    <li>Investment Manager Selection</li>
                  </ul>
                  <h3>Get help to Choose Right Plan</h3>
                </div>
                <div className="author-box">
                  <figure className="author-thumb">
                    <img src="assets/images/resource/author-1.png" alt="" />
                  </figure>
                  <h3>Roman Harry</h3>
                  <span className="designation">Advisor</span>
                  <h4>
                    <i className="flaticon-whatsapp" />
                    <a href="tel:15557890123">+1 (555) 789.0123</a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 inner-column">
              <div className="inner-content">
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 pricing-block">
                    <div className="pricing-block-one">
                      <div className="pricing-table">
                        <div className="table-header">
                          <div className="icon-box">
                            <i className="flaticon-idea" />
                          </div>
                          <h3>
                            Basic <br />
                            Package
                          </h3>
                          <p>Pricing plan for small business</p>
                        </div>
                        <div className="table-content">
                          <ul className="feature-list clearfix">
                            <li>Traditional Consulting</li>
                            <li>Investment Management</li>
                            <li>Data Aggregation</li>
                            <li className="light">
                              Tax Planning &amp; Preparation
                            </li>
                          </ul>
                          <h2>
                            49 <span className="symble">$</span>
                            <span className="fraction">.99</span>
                            <span className="text">Billed Monthly</span>
                          </h2>
                          <Link href="/Services" className="theme-btn btn-two">
                            Get Started Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 pricing-block">
                    <div className="pricing-block-one active-block">
                      <div className="pricing-table">
                        <span className="discount-text">
                          10% Discount, Start Today
                        </span>
                        <div className="table-header">
                          <div className="icon-box">
                            <i className="flaticon-star" />
                          </div>
                          <h3>
                            Basic <br />
                            Package
                          </h3>
                          <p>Pricing plan for small business</p>
                        </div>
                        <div className="table-content">
                          <ul className="feature-list clearfix">
                            <li>Traditional Consulting</li>
                            <li>Investment Management</li>
                            <li>Data Aggregation</li>
                            <li>Tax Planning &amp; Preparation</li>
                          </ul>
                          <h2>
                            129 <span className="symble">$</span>
                            <span className="fraction">.99</span>
                            <span className="text">Billed Monthly</span>
                          </h2>
                          <Link href="/Services" className="theme-btn btn-two">
                            Get Started Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* pricing-style-two end */}
    </>   
    )
}
