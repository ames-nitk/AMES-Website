import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";
import logo1 from '../../assets/logo3.png';
import Logo from '../../assets/footerlogo.png';

let scrollToFooterSection = () => { };

const Footer = () => {
    const FooterRef = useRef(null);
    const year = new Date().getFullYear();

    useEffect(() => {
        scrollToFooterSection = () => {
            FooterRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
    }, []);

    return (
        <div className="global-footer-wrapper">
            <div className="footer" ref={FooterRef}>
                {/* Left Section */}
                <div className="footer-left">
                    <div className="zxz">
                        <img style={{ width: '185px', height: '80px' }} src={Logo} alt="AMES Logo" className="logo" />
                    </div>
                    <p>
                        Association of Mechanical Engineering Students (AMES),<br />
                        Department of Mechanical Engineering, NITK
                    </p>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/ames.nitk?igsh=MXN0cjlxNmN5anE5cA==" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#f7842b"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                            >
                                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.8-2.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/association-of-mechanical-engineering-students-nitk/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#f7842b"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                            >
                                <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.5h-3.55v-11h3.4v1.5h.05c.47-.88 1.62-1.8 3.34-1.8 3.57 0 4.23 2.35 4.23 5.4v5.9zM5.34 7.94a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56v-11h3.56v11z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="footer-right">
                    <div className="footer-column1">
                        <h3>Contact Us</h3>
                        <p>
                            Department of Mechanical Engineering, NITK,<br />
                            NH 66, Srinivasnagar, Surathkal, Mangalore,<br />
                            Karnataka – 575 025
                        </p>
                    </div>
                </div>
            </div>

            <div className="dashed-divider bottom"></div>
            <ul className="footer-bottom">
                <li className="footer-text">© {year} AMES. All rights reserved.</li>
                <li className="footer-text2">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li className="footer-text3"><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
        </div>
    );
}

export { scrollToFooterSection };
export default Footer;
