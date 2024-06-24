import ButtonGradient from "../assets/svg/ButtonGradient";
import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
            </div>
            <ButtonGradient />
        </>
    );
}

