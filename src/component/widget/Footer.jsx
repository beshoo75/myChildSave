// src/Footer.js
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
    faMailBulk,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6">
                        <ul>
                            <li>
                                <Link to="" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="" className="hover:underline">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="" className="hover:underline">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="" className="hover:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3 mb-6">
                        <h5 className="text-lg font-semibold mb-2">تابعونا</h5>
                        <ul className="flex flex-col justify-start">
                            <li>
                                <Link to="#" className="hover:underline ml-2 flex flex-row justify-start items-center">
                                    <FontAwesomeIcon icon={faFacebook} className="text-xl ml-2" />
                                    <p>Facebook</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:underline ml-2 flex flex-row justify-start items-center">
                                    <FontAwesomeIcon icon={faTwitter} className="text-xl ml-2" />
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:underline ml-2 flex flex-row justify-start items-center">
                                    <FontAwesomeIcon icon={faInstagram} className="text-xl ml-2" />
                                    Instagram
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3 mb-6">
                        <h5 className="text-lg font-semibold mb-2">التواصل </h5>
                        <p className="flex justify-start items-center">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="ml-2"
                            />
                            <Link
                                to="mailto:info@example.com"
                                className="hover:underline"
                            >
                                my-child-safe@example.com
                            </Link>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faPhone} className="ml-2" />
                            <Link
                                to="tel:+1234567890"
                                className="hover:underline"
                            >
                                0554881035
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} My-Child-Safe. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
