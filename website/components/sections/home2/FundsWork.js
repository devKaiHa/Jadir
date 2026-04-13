import Link from "next/link";
export default function FundsWork() {
  return (
    <>
      {/* chooseus-style-two */}
      <section className="chooseus-style-two sec-pad">
        <span className="big-text">Strategic Goals</span>
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">Funds Work</span>
            <h2>How do funds work?</h2>
          </div>
          <div className="inner-container">
            <div
              className="bg-layer"
              style={{
                backgroundImage:
                  "url(assets/images/background/chooseus-bg.jpg)",
              }}
            />
            <div className="inner-content clearfix">
              <div className="chooseus-block-two">
                <div className="inner-box">
                  <div className="icon-box">
                    <i
                      className="flaticon-downloads"
                      style={{ color: "#2c9497" }}
                    />
                  </div>
                  <div className="text">
                    Reason<span>01</span>
                  </div>

                  <p>
                    The fund is the vessel in which the investor places his
                    money and then authorizes the fund management company to
                    follow up on his investments and make the appropriate
                    decision in his favor.
                  </p>
                </div>
              </div>
              <div className="chooseus-block-two">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="flaticon-downloads" />
                  </div>
                  <div className="text">
                    Reason<span>01</span>
                  </div>
                  <p>
                    A fund management company searches for investments or
                    opportunities that can generate profits for investors and
                    protect their capital from risks.
                  </p>
                </div>
              </div>
              <div className="chooseus-block-two">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="flaticon-downloads" />
                  </div>
                  <div className="text">
                    Reason<span>03</span>
                  </div>

                  <p>
                    When deciding to enter into any investment, the approval of
                    the custodian and the approval of the exchange bank must be
                    obtained.
                  </p>
                </div>
              </div>
              <div className="chooseus-block-two" />
              <div className="chooseus-block-two">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="flaticon-downloads" />
                  </div>
                  <div className="text">
                    Reason<span>04</span>
                  </div>

                  <p>
                    The fund receives profits from the companies in which it has
                    invested annually, and the profits are distributed to
                    investors.
                  </p>
                </div>
              </div>
              <div className="chooseus-block-two">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="flaticon-downloads" />
                  </div>
                  <div className="text">
                    Reason<span>05</span>
                  </div>

                  <p>
                    Investment management companies receive management fees of
                    approximately 2% of the deposited amount annually and
                    percentages of the annual profits.
                  </p>
                </div>
              </div>
              <div className="chooseus-block-two">
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="flaticon-downloads" />
                  </div>
                  <div className="text">
                    Reason<span>05</span>
                  </div>

                  <p>
                    Each fund has a specific period. At the end of the period,
                    the fund management liquidates the investments and returns
                    them to the investors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* chooseus-style-two end */}
    </>
  );
}
