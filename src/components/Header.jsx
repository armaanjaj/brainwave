"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { brainwave } from "../assets";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { navigation } from "../constants/index";
import Button from "./Button";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

const Header = () => {
    const pathname = usePathname();
    const [currentHash, setCurrentHash] = useState("");
    const [openNavigation, setOpenNavigation] = useState(false);

    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    useEffect(() => {
        // Get the initial hash from localStorage or window location
        const initialHash =
            localStorage.getItem("currentHash") || window.location.hash;
        setCurrentHash(initialHash);
    }, []);

    const handleLinkClick = (hash) => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        }
        setCurrentHash(hash);
        localStorage.setItem("currentHash", hash);
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
                openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
            }`}
        >
            <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                <Link
                    className="block w-[12rem]"
                    href="#hero"
                    onClick={() => handleLinkClick("#hero")}
                >
                    <Image
                        src={brainwave}
                        width={190}
                        height={40}
                        alt="Brainwave"
                    />
                </Link>
                <nav
                    className={`fixed top-[5rem] right-0 left-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent ${
                        openNavigation ? "flex" : "hidden"
                    }`}
                >
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                        {navigation.map((item) => (
                            <Link
                                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                                    item.onlyMobile ? "lg:hidden" : ""
                                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-start lg:font-semibold ${
                                    `${currentHash}` === item.url
                                        ? "z-2 lg:text-n-1"
                                        : "lg:text-n-1/50"
                                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                                key={item.id}
                                href={item.url}
                                onClick={() => handleLinkClick(item.url)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    <HamburgerMenu />
                </nav>
                <Link
                    href={"#signup"}
                    className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
                >
                    New Account
                </Link>
                <Button href={"login"} className="hidden lg:flex">
                    Sign in
                </Button>
                <Button
                    className={"ml-auto lg:hidden"}
                    px={"px-3"}
                    onClick={toggleNavigation}
                >
                    <MenuSvg openNavigation={openNavigation} />
                </Button>
            </div>
        </div>
    );
};

export default Header;
