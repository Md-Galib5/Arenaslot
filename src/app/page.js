import WhyChooseUs from "@/component/WhyChooseUS.jsx";
import Banner from "../component/Banner.jsx";
import Navbar from "../component/Navbar.jsx";
import Image from "next/image";
import HowItWorks from "@/component/HowItWorks.jsx";
import FeaturedFacilities from "@/component/FeaturedFacilities.jsx";


export default function Home() {
  return (
    <>
    <Banner />
    <FeaturedFacilities />
    <WhyChooseUs />
    <HowItWorks />
    </>
  );
}
