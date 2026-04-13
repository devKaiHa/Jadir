import Link from "next/link";
import Brand from "@/components/slider/Brand";
export default function Growth() {
  return (
    <>
      {/* growth-section */}
      <section className="growth-section">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-24.png)" }}
        />
        <div className="auto-container">
          <div className="growth-inner">
            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                  <figure className="image-box">
                    <img src="assets/images/resource/growth-1.png" alt="" />
                  </figure>
                  <div className="sec-title light">
                    <span className="sub-title">Our Growth</span>
                    <h2>
                      Thinking <br />
                      Beyond Ordinary <br />
                      Strategies
                    </h2>
                  </div>
                  <div className="text-box">
                    <p>
                      The wise man therefore always holds in these <br />
                      matters to this principle of selection.
                    </p>
                    <Link href="/" className="theme-btn btn-two">
                      <span>Annual Report</span>
                    </Link>
                  </div>
                  <div className="progress-box">
                    <h5>Monthly Growth</h5>
                    <div className="progress-inner">
                      <h5>$48,560,25</h5>
                      <div className="bar">
                        <div
                          className="bar-inner count-bar"
                          data-percent="60%"
                        />
                        <div className="count-text">+18%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 inner-column">
                <div className="growth-content">
                  <div className="growth-block-one">
                    <div className="inner-box">
                      <h3>
                        <Link href="/">Global Impact</Link>
                      </h3>
                      <p>
                        Ever undertakes labor physic exercise except some
                        advantage.
                      </p>
                      <div className="icon-box">
                        <i className="flaticon-development" />
                      </div>
                      <div className="link-box">
                        <Link href="/">
                          <span>Read More</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="growth-block-one">
                    <div className="inner-box">
                      <h3>
                        <Link href="/">Corporate Sustainability</Link>
                      </h3>
                      <p>
                        Take a trivial example, which of ever laborious too
                        obtain some.
                      </p>
                      <div className="icon-box">
                        <i className="flaticon-strategy" />
                      </div>
                      <div className="link-box">
                        <Link href="/">
                          <span>Read More</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clients-section">
            <Brand />
            <div className="more-text centred">
              <h5>
                2.6k Companies &amp; Individuals Trusted Us.{" "}
                <Link href="/">
                  <i className="flaticon-right-chevron" />
                  View All Clients
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* growth-section end */}
    </>
  );
}
