import React from 'react';
import '../styles/nav.scss';
import { motion } from 'framer-motion';
import Logo from './logo';

export default function HomeNav({title=""}) {
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
            <nav className="m-2">
                <div id="nav">
                    <div className="flex flex-row justify-between items-center p-2">
                        <div className="flex-shrink-0 flex flex-row mx-5 justify-around">
                            <div>
                                {/* <Logo /> */}
                                <img
                                    width={180}
                                    height={180}
                                    className="w-8 h-8 md:w-10 md:h-10 ease-in-out cursor-pointer duration-500 transform hover:-translate-y-1 hover:scale-110"
                                    src="/logo192.webp"
                                    alt="NoobScience Logo"
                                    onClick={play_shutter}
                                />
                            </div>
                            <p className="text-2xl py-2 font-bold ml-5">
                                {title && <span>{title}</span>}
                            </p>
                        </div>
                        <ul className="items-end hidden gap-x-6 list-none lg:flex flex-row-reverse p-2 justify-center">
                            <li>
                                <a className="special_underline" href="/about">
                                    About
                                </a>
                            </li>
                            <li>
                                <a className="special_underline" href="/green">
                                    Greens
                                </a>
                            </li>
                            <li>
                                <a className="special_underline" href="/writes">
                                    Writings
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
