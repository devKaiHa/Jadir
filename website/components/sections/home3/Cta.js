import Link from "next/link";

export default function Cta() {
    return (
        <>
        {/* cta-section */}
        <section className="cta-section">
          <div className="outer-container">
            <div
              className="pattern-layer"
              style={{ backgroundImage: "url(assets/images/shape/shape-25.png)" }}
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
                        The moment, so blinded by desire, that they cannot foresee and
                        trouble that are bound to ensue.
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
      </>
      
    )
}
