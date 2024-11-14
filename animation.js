import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.to("#bvn", {
    opacity: 0,
    scrollTrigger: {
        end: "100px",
        scrub: true,
        markers: true
    }
});
