import Link from "next/link";

export default function Award() {
    return (
      <>
      {/* award-section */}
      <section className="award-section centred">
        <div
          className="bg-layer"
          style={{ backgroundImage: "url(assets/images/background/award-bg.jpg)" }}
        />
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-37.png)" }}
        />
        <div className="auto-container">
          <div className="content-box">
            <div className="award-inner">
              <div className="arrow-box">
                <div
                  className="arrow-1"
                  style={{
                    backgroundImage: "url(assets/images/shape/shape-40.png)"
                  }}
                />
                <div
                  className="arrow-2"
                  style={{
                    backgroundImage: "url(assets/images/shape/shape-41.png)"
                  }}
                />
              </div>
              <div className="single-award-box">
                <div
                  className="shape"
                  style={{
                    backgroundImage: "url(assets/images/shape/shape-39.png)"
                  }}
                />
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="flaticon-trophy" />
                  </div>
                  <h6>mca’s awards</h6>
                  <h3>
                    Finest Consulting <br />
                    Company
                  </h3>
                  <h5>2022</h5>
                </div>
              </div>
              <div className="single-award-box">
                <div
                  className="shape"
                  style={{
                    backgroundImage: "url(assets/images/shape/shape-39.png)"
                  }}
                />
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="flaticon-trophy" />
                  </div>
                  <h6>mca’s awards</h6>
                  <h3>
                    Customer Choice <br />
                    for Support
                  </h3>
                  <h5>2021</h5>
                </div>
              </div>
            </div>
            <h2>Award Winning Investment Advisor</h2>
            <p>
              The great explorer of the truth, the master-builder of human happiness{" "}
              <br />
              avoids pleasure itself, because it is pleasure.
            </p>
            <div className="btn-box">
              <Link href="/index-4" className="theme-btn btn-two">
                Our Achivements
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* award-section end */}
    </>
    )
}
