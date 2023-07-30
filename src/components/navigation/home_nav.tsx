import React from 'react';
import '../styles/nav.scss';
import { motion } from 'framer-motion';

export default function HomeNav({ title = "", bg = "#fff", color = "#000" }) {
    const [nav, setNav] = React.useState(false)
    const play_shutter = () => {
        const path = "/assets/audio/shutter.wav"
        const audio = new Audio(path)
        audio.play();
        setTimeout(() => {
            window.location.href = "/"
        }, 500);
    }
    return (
        <>
            <nav
                style={{
                    backgroundColor: bg,
                    color: color,
                }}
                id="home_nav"
                className="p-2"
            >
                <div id="nav">
                    <div className="flex flex-row justify-between items-center p-2">
                        <div className="flex-shrink-0 flex flex-row mx-5 justify-around">
                            <div>
                                {/* <Logo /> */}
                                <img
                                    width={192}
                                    height={192}
                                    className="w-10 h-10 md:w-12 md:h-12 ease-in-out cursor-pointer duration-500 transform hover:-translate-y-1 hover:scale-110"
                                    src="/logo192.webp"
                                    alt="NoobScience Logo"
                                    onClick={play_shutter}
                                />
                            </div>
                            <p className="md:block hidden text-2xl py-2 font-bold ml-5">
                                {title && <span>{title}</span>}
                            </p>
                        </div>
                        <div
                            onClick={() => setNav(!nav)}
                            className="space-y-1 cursor-pointer z-50 lg:hidden"
                        >
                            <motion.span
                                animate={{
                                    rotateZ: nav ? 45 : 0,
                                    y: nav ? 8 : 0,
                                }}
                                className="block h-0.5 w-8 bg-current"
                            ></motion.span>
                            <motion.span
                                animate={{
                                    opacity: nav ? 0 : 1,
                                }}
                                className="block h-0.5 w-8 bg-current"
                            ></motion.span>
                            <motion.span
                                animate={{
                                    rotateZ: nav ? -45 : 0,
                                    y: nav ? -8 : 0,
                                }}
                                className="block h-0.5 w-8 bg-current"
                            ></motion.span>
                        </div>
                        {nav && (
                            <motion.div
                                className="fixed flex bottom-0 bg-black left-0 w-full h-screen items-center justify-center"
                                animate={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: 25 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ul className="flex bg-black flex-col-reverse gap-4">
                                    <li>
                                        <a
                                            className="special_underline"
                                            href="/others"
                                        >
                                            Others
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="special_underline"
                                            href="/social"
                                        >
                                            Social
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="special_underline"
                                            href="/contact"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="special_underline"
                                            href="/about"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="special_underline"
                                            href="/creations"
                                        >
                                            Creations
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="special_underline"
                                            href="/blog"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <div className="search_container">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    typeof window !==
                                                        'undefined' &&
                                                        (window.location.href = `/search/${e.currentTarget.text.value}`);
                                                }}
                                            >
                                                <input
                                                    placeholder="Enter To Search"
                                                    required={true}
                                                    className="input"
                                                    name="text"
                                                    type="text"
                                                />
                                            </form>
                                            <div className="icon">
                                                {/* <svg
                                            viewBox="0 0 512 512"
                                            className="ionicon"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>Search</title>
                                            <path
                                                strokeWidth="32"
                                                strokeMiterlimit="10"
                                                stroke="currentColor"
                                                fill="none"
                                                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                            ></path>
                                            <path
                                                d="M338.29 338.29L448 448"
                                                strokeWidth="32"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                fill="none"
                                            ></path>
                                        </svg> */}
                                                <img
                                                    src="/assets/icons/search_left.png"
                                                    className="w-10"
                                                    width="32"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                        <ul className="items-end hidden gap-x-6 list-none lg:flex flex-row-reverse p-2 justify-center">
                            <li>
                                <a className="special_underline" href="/others">
                                    Others
                                </a>
                            </li>
                            <li>
                                <a className="special_underline" href="/social">
                                    Social
                                </a>
                            </li>
                            <li>
                                <a
                                    className="special_underline"
                                    href="/contact"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a className="special_underline" href="/about">
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    className="special_underline"
                                    href="/creations"
                                >
                                    Creations
                                </a>
                            </li>
                            <li>
                                <a className="special_underline" href="/blog">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <div className="search_container">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            typeof window !== 'undefined' &&
                                                (window.location.href = `/search/${e.currentTarget.text.value}`);
                                        }}
                                    >
                                        <input
                                            placeholder="Enter To Search"
                                            required={true}
                                            className="input"
                                            name="text"
                                            type="text"
                                        />
                                    </form>
                                    <div className="icon">
                                        <img
                                            src="/assets/icons/search_left.png"
                                            className="w-8"
                                            width={32}
                                            height={32}
                                            alt="Search Icon"
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
