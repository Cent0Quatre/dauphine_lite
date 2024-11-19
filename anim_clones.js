import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animClones(dClones) {
    const anim = gsap.timeline();

    dClones.forEach((clone, index) => {
        anim.to(clone.position, {
            x: "+=2.5", // Déplacement vers la droite (ajout de 5 à la position X)
            duration: 2,
            ease: "power4.easeOut",
            repeat: -1 // Répéter infiniment
        }, 0);
        anim.to(clone.rotation, {
            z: -2*Math.PI,
            duration: 2,
            ease: "power4.easeOut",
            repeat: -1 // Répéter infiniment 
        }, 0);

        anim.from(clone.position, {
            y: "-8",
            scrollTrigger: {
                trigger: "#sec-1",
                start: "top 20%",
                end: "top top",
                scrub: true
            }
        });
        anim.to(clone.position, {
            y: "8",
            scrollTrigger: {
                trigger: "#sec-1",
                start: "top top",
                end: "20% top",
                scrub: true,
                immediateRender: false
            }
        });
    });
}
