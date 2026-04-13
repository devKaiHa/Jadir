import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

export default function Error404() {
  return (
    <Layout breadcrumbTitle="404" image="/assets/images/background/404.jpg">
      <section
        className="relative overflow-hidden"
        style={{
          padding: "110px 20px 140px",
          background:
            "radial-gradient(circle at top left, rgba(74,177,212,0.12), transparent 32%), radial-gradient(circle at bottom right, rgba(15,86,98,0.10), transparent 30%)",
        }}
      >
        {/* Background glow shapes */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(74,177,212,0.18)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            right: "-100px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "rgba(15,86,98,0.16)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />

        <div className="auto-container">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              position: "relative",
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            {/* Big faded 404 */}
            <div
              style={{
                position: "absolute",
                top: "-80px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "clamp(90px, 18vw, 220px)",
                fontWeight: 800,
                lineHeight: 1,
                color: "rgba(15, 86, 98, 0.07)",
                letterSpacing: "8px",
                userSelect: "none",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              404
            </div>

            <div
              className="content-box"
              style={{
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                borderRadius: "32px",
                padding: "60px 34px",
                textAlign: "center",
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.65)",
                boxShadow:
                  "0 30px 90px rgba(15, 86, 98, 0.14), inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
            >
              {/* Top badge */}
              <div
                style={{
                  width: "92px",
                  height: "92px",
                  margin: "0 auto 24px",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "38px",
                  background:
                    "linear-gradient(135deg, rgba(15,86,98,0.12), rgba(74,177,212,0.20))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                ✦
              </div>

              <span
                style={{
                  display: "inline-block",
                  marginBottom: "16px",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#0f5662",
                  background: "rgba(15,86,98,0.08)",
                }}
              >
                Oops! Page unavailable
              </span>

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  lineHeight: 1.15,
                  marginBottom: "18px",
                  color: "#0f172a",
                  fontWeight: 800,
                }}
              >
                This page wandered off.
              </h1>

              <p
                style={{
                  maxWidth: "620px",
                  margin: "0 auto 34px",
                  fontSize: "17px",
                  lineHeight: 1.9,
                  color: "#475569",
                }}
              >
                The page you are looking for does not exist, was moved, or is
                temporarily unavailable. Let’s get you back to somewhere useful.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <Link
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "170px",
                    padding: "15px 24px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    background: "linear-gradient(135deg, #0f5662, #17808f)",
                    boxShadow: "0 16px 35px rgba(15, 86, 98, 0.22)",
                    textDecoration: "none",
                    transition: "0.3s ease",
                  }}
                >
                  Back to Home
                </Link>

                <Link
                  href="/Services"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "170px",
                    padding: "15px 24px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    color: "#0f5662",
                    background: "#ffffff",
                    border: "1px solid rgba(15, 86, 98, 0.12)",
                    textDecoration: "none",
                    transition: "0.3s ease",
                  }}
                >
                  Explore Services
                </Link>
              </div>

              {/* Bottom decorative line */}
              <div
                style={{
                  width: "140px",
                  height: "6px",
                  borderRadius: "999px",
                  margin: "34px auto 0",
                  background:
                    "linear-gradient(90deg, rgba(15,86,98,0.18), rgba(74,177,212,0.55), rgba(15,86,98,0.18))",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
