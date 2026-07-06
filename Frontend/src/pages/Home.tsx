import { useEffect,useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import  { AnimalesData } from "../Types/DataInfo"
import IconVeterinaria from '/home/juan360dev/Escritorio/PawKon/Frontend/public/Veterian.png'
import { VetToolsData } from "../Types/DataInfo"




gsap.registerPlugin(ScrollTrigger)


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const infoTitleRef = useRef<HTMLHeadingElement>(null);
  const dogsRef = useRef<HTMLDivElement>(null);
  const dogsTrackRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Sección 1 — título letra por letra con rebote
      const letters = titleRef.current?.querySelectorAll(".letter");
      if (letters) {
        gsap.fromTo(
          letters,
          { y: -200, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.08,
            delay: 0.2,
          }
        );
      }

      // ── Sección 2 — título desde la izquierda + párrafos reveal
      gsap.fromTo(
        infoTitleRef.current,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".info-paragraph",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          stagger: 0.4,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".info-image",
        { scale: 0.8, opacity: 0, rotate: -5 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 70%",
          },
        }
      );

      // ── Sección 3 — scroll horizontal de cards
      const track = dogsTrackRef.current;
      if (track) {
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: dogsRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          },
        });
      }

      // ── Sección 4 — herramientas veterinarias con pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: toolsRef.current,
          start: "top top",
          end: "+=1300",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(toolsContentRef.current, {
        x: "180%",
        duration: 1,
        ease: "power2.inOut",
      });

        tl.from(".tool-card", {
      opacity: 0,
       x: -60,
      stagger: 0.1,
      duration: 0.5,
});


    });

  
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#051d1b", paddingBottom: "100px" }}>

        {/* ── Sección 1 — Hero */}
        <section
          ref={heroRef}
          className="h-screen flex items-center justify-center overflow-hidden"
        >
          <h1
            ref={titleRef}
            className="text-8xl md:text-[12rem] font-black tracking-tighter flex"
            style={{ color: "#72cf2a", perspective: "800px" }}
          >
            {"PawKon".split("").map((letter, i) => (
              <span key={i} className="letter inline-block">
                {letter}
              </span>
            ))}
          </h1>
        </section>

        {/* ── Sección 2 — Info veterinaria */}
        <section className="min-h-screen flex items-center px-8 md:px-20 py-20">
          <div
            ref={infoRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full"
          >
            <div className="flex flex-col justify-center gap-6">
              <h2
                ref={infoTitleRef}
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "#72cf2a" }}
              >
                About PawKon
              </h2>
              <p style={{ color: '#fffef0' }} className="info-paragraph text-xl leading-relaxed opacity-80">
                Welcome to PawKon, a veterinary clinic with over 30 years of experience dedicated
                to the care and well-being of animals. Our team is made up of the best specialists and doctors
                in the field, committed to giving every animal the attention they deserve — from the smallest to
                the largest, all are welcome here.
              </p>
              <p style={{ color: '#fffef0' }} className="info-paragraph text-xl leading-relaxed opacity-80">
                At PawKon, we pride ourselves on using the latest technology
                to accurately diagnose and treat any condition your pet may face.
                But above all, we know that machines are only part of the equation — what truly sets us
                apart is the warm, compassionate service we provide to every animal and their owner.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="info-image w-full h-180 rounded-2xl"
                style={{ backgroundColor: "#151212" }}
              >
                <img
                  src={IconVeterinaria}
                  alt="PawKon Veterinary"
                  className="w-full h-full object-cover rounded-2xl opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Sección 3 — Scroll horizontal de animales */}
        <section ref={dogsRef} className="h-screen overflow-hidden">
          
          <div className="h-full flex flex-col justify-center">
            <h2
              className="text-4xl font-bold text-center mb-12"
              style={{ color: "#72cf2a" }}
            >
              Meet Our Friends
            </h2>
            <div
              ref={dogsTrackRef}
              className="flex gap-8 px-20 w-max"
            >
              {AnimalesData.map((dog) => (
                <div
                  key={dog.id}
                  className="dog-card rounded-3xl overflow-hidden relative flex shrink-0"
                  style={{ width: "500px", height: "600px" }}
                >
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    style={{
                      background: "linear-gradient(to top, rgba(5,29,27,0.95) 0%, transparent 100%)"
                    }}
                  >
                    <h3 className="text-3xl font-bold" style={{ color: "#72cf2a" }}>
                      {dog.name}
                    </h3>
                    <p style={{ color: '#fffef0' }} className="text-lg opacity-80 mt-2">
                      {dog.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sección 4 — Herramientas de la veterinaria */}
        <section
          ref={toolsRef}
          className="h-screen flex items-center px-8 md:px-20 overflow-hidden"
          style={{ backgroundColor: "#051d1b" }}
        >
          <div className="max-w-6xl mx-auto w-full relative">
            <h2
              className="text-4xl font-bold mb-12"
              style={{ color: "#72cf2a" }}
            >
              Our Medical Equipment
            </h2>

            {/* contenido que se mueve a la derecha */}
            <div ref={toolsContentRef} className="flex flex-col gap-4 w-fit">
              <p style={{ color: '#fffef0' }} className="text-xl opacity-70 max-w-sm">
                We use state-of-the-art veterinary equipment to provide
                the most accurate diagnosis and effective treatments for your pets.
              </p>
            </div>

            {/* tools cards que aparecen */}
            <div className="absolute top-15 left-0 w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {VetToolsData.map((tool) => (
                <div
                  key={tool.id}
                  className="tool-card p-6 rounded-2xl"
                  style={{ backgroundColor: "#151212" }}
                >
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-bold mt-3" style={{ color: "#72cf2a" }}>
                    {tool.name}
                  </h3>
                  <p style={{ color: '#fffef0' }} className="text-sm opacity-60 mt-1">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}