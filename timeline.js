import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const coefLook = { valeur: 0 };
export const coefRotaZ = { valeur: 0 };

export function scrollTimeline(modelD, camera) {
    if (!modelD) return;

    const tl = gsap.timeline({
        defaults: { 
            immediateRender: false, // évite des faux raccords entre animations successives
        }
    });

    tl.to(coefLook, {
        valeur: 1,
        scrollTrigger: {
            start: "200px",
            end: "300px",
            scrub: true // synchronise les anim en scroll up/down
        }
    });
    tl.to(coefLook, {
        valeur: 0,
        scrollTrigger: {
            start: "1500px",
            end: "1800px",
            scrub: true
        }
    });
    tl.to(coefRotaZ, {
        valeur: 1,
        scrollTrigger: {
            start: "2300px",
            end: "2500px",
            scrub: true
        }
    });

    // animations modelD
    tl.to(modelD.position, {
        x: 0,
        z: 0,
        scrollTrigger: {
            start: "0px",
            end: "300px",
            scrub: true
        }
    });
    tl.to(modelD.position, {
        x: -2.5,
        z: 4,
        scrollTrigger: {
            start: "600px",
            end: "900px",
            scrub: true
        }
    }); 
    tl.to(modelD.position, {
        x: 2.5,
        scrollTrigger: {
            start: "1200px",
            end: "1500px",
            scrub: true
        }
    });
    tl.to(modelD.position, {
        x: 0,
        z: 0,
        scrollTrigger: {
            start: "2000px",
            end: "2300px",
            scrub: true
        }
    });
    tl.to(modelD.rotation, {
        x: Math.PI/2,
        y: 0,
        z: Math.PI/2,
        scrollTrigger: {
            start: "2000px",
            end: "2300px",
            scrub: true
        }
    });

    // animations caméra
    tl.to(camera.position, {
        y: 2,
        z: 4,
        scrollTrigger: {
            start: "2000px",
            end: "2300px",
            scrub: true
        }
    });
    tl.to(camera.rotation, {
        x: -Math.PI/10,
        scrollTrigger: {
            start: "2000px",
            end: "2300px",
            scrub: true
        }
    });
}
