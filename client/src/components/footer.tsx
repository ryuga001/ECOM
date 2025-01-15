import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-12 relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Company</h3>
                        <ul>
                            <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Press</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Support</h3>
                        <ul>
                            <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
                            <li><a href="#" className="hover:text-indigo-400">FAQ</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Contact Us</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-xl hover:text-indigo-400">
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-xl hover:text-indigo-400">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-xl hover:text-indigo-400">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-xl hover:text-indigo-400">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact</h3>
                        <ul>
                            <li className="text-gray-400">1234 Street Name</li>
                            <li className="text-gray-400">City, State, 12345</li>
                            <li className="text-gray-400">Email: contact@company.com</li>
                            <li className="text-gray-400">Phone: +1 234 567 890</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">© 2025 Company Name. All rights reserved.</p>
                        <div className="mt-4 sm:mt-0">
                            <a href="#" className="text-sm text-gray-400 hover:text-indigo-400 mr-4">Terms of Service</a>
                            <a href="#" className="text-sm text-gray-400 hover:text-indigo-400">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
