import Link from "next/link";

export default function Skills() {
  return (
    <>
      {/* skills-section */}
      <section className="skills-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <div className="image-box">
                <figure className="image image-1">
                  <img src="/assets/images/about-2.jpg" alt="about" />
                </figure>
                <figure className="image image-2">
                  <img src="/assets/images/about-2.jpg" alt="about" />
                </figure>

                <div
                  className="image-shape"
                  style={{
                    backgroundImage: "url(assets/images/shape/shape-15.png)",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="sec-title">
                  <span className="sub-title">Introduction</span>
                  <h2>Investment funds</h2>
                </div>
                <div className="text-box">
                  <p>
                    It is a portfolio established by fund management companies.
                    It is a safe investment vehicle in which investors deposit
                    their money with the aim of obtaining profit. It is
                    considered one of the safest methods because it is subject
                    to strict oversight by state institutions and external
                    oversight companies.
                  </p>
                </div>
                <div className="inner-box">
                  {/* <h3>Types of investment funds :</h3> */}

                  <div className=" clearfix">
                    <div
                      className="col-lg-6 col-md-6 col-sm-12 single-column"
                      style={{ width: "100%" }}
                    >
                      <div className="single-item">
                        <div className="icon-box">
                          <i className="flaticon-downloads" />
                        </div>
                        <h3>
                          Real estate funds :
                          <p>
                            It specializes in buying and selling real estate or
                            investing in real estate projects.
                          </p>
                        </h3>
                      </div>
                    </div>

                    <div
                      className="col-lg-6 col-md-6 col-sm-12 single-column"
                      style={{ width: "100%" }}
                    >
                      <div className="single-item">
                        <div className="icon-box">
                          <i className="flaticon-downloads" />
                        </div>
                        <h3>
                          Corporate investment funds :{" "}
                          <p>
                            It specializes in investing or purchasing stocks or
                            bonds in commercial companies. These funds are
                            characterized by high returns and profits and a high
                            market value of the fund's shares.
                          </p>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* skills-section end */}
    </>
  );
}
