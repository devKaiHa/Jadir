import Link from "next/link";

export default function Clients() {
    return (
      <>
      {/* clients-style-three */}
      <section className="clients-style-three centred">
        <div className="outer-container">
          <ul className="clients-logo-list">
            <li>
              <figure className="clients-logo">
                <Link href="/">
                  <img src="assets/images/clients/clients-1.png" alt="" />
                </Link>
              </figure>
            </li>
            <li>
              <figure className="clients-logo">
                <Link href="/">
                  <img src="assets/images/clients/clients-2.png" alt="" />
                </Link>
              </figure>
            </li>
            <li>
              <figure className="clients-logo">
                <Link href="/">
                  <img src="assets/images/clients/clients-3.png" alt="" />
                </Link>
              </figure>
            </li>
            <li>
              <figure className="clients-logo">
                <Link href="/">
                  <img src="assets/images/clients/clients-4.png" alt="" />
                </Link>
              </figure>
            </li>
            <li>
              <figure className="clients-logo">
                <Link href="/">
                  <img src="assets/images/clients/clients-5.png" alt="" />
                </Link>
              </figure>
            </li>
            <li>
              <figure className="clients-logo">
                <Link href="/">
                  <img src="assets/images/clients/clients-8.png" alt="" />
                </Link>
              </figure>
            </li>
          </ul>
          <div className="more-text">
            <h5>
              2.6k Companies &amp; Individuals Trusted Us.{" "}
              <Link href="/">
                <i className="flaticon-right-chevron" />
                View All Clients
              </Link>
            </h5>
          </div>
        </div>
      </section>
      {/* clients-style-three end */}
    </>
      
    )
}
