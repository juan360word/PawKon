import { useEffect,useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import  { AnimalesData } from "../Types/DataInfo"
import IconVeterinaria from '/home/juan360dev/Escritorio/PawKon/Frontend/public/Veterian.png'
import { VetToolsData } from "../Types/DataInfo"
import { useTranslation } from "react-i18next"
import i18n from "../Locales/I18n/Traduccion_I18n"




gsap.registerPlugin(ScrollTrigger)


export default function Home() {
  const { t } = useTranslation()
  const lang = i18n.language as "en" | "es"
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


              const toolsTl = gsap.timeline({
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top top",
            end: "+=1000",
            pin: true,
            scrub: 1,
          },
        });

        
        toolsTl.fromTo(
          toolsContentRef.current,
          { x: -100, opacity: 0, filter: "blur(10px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          }
        );

       
        toolsTl.to(toolsContentRef.current, {
          x: "-230%",
          duration: 1.5,
          ease: "power2.inOut",
        });

        
        toolsTl.fromTo(
          ".tool-card",
          {
            opacity: 0,
            y: 80,
            rotateY: -15,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "-=0.8"
        );

    });

  
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#051d1b", paddingBottom: "100px" }}>

       
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
                {t("home.aboutTitle")}
              </h2>
              <p style={{ color: '#fffef0' }} className="info-paragraph text-xl leading-relaxed opacity-80">
                {t("home.aboutP1")}
              </p>
              <p style={{ color: '#fffef0' }} className="info-paragraph text-xl leading-relaxed opacity-80">
                {t("home.aboutP2")}
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

       
        <section ref={dogsRef} className="h-screen overflow-hidden">
          
          <div className="h-full flex flex-col justify-center">
            <h2
              className="text-4xl font-bold text-center mb-12"
              style={{ color: "#72cf2a" }}
            >
              {t("home.friendsTitle")}
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
                      {dog.description[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section
          ref={toolsRef}
          className="min-h-screen flex items-center px-8 md:px-20 py-20"
          style={{ backgroundColor: "#051d1b" }}
        >
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_2fr] gap-12">
            <div ref={toolsContentRef} className="flex flex-col gap-4">
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#72cf2a" }}
              >
                {t("home.toolsTitle")}
              </h2>
              <p style={{ color: '#fffef0' }} className="text-xl opacity-70">
                {t("home.toolsDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VetToolsData.map((tool) => (
                <div
                  key={tool.id}
                  className="tool-card p-6 rounded-2xl"
                  style={{ backgroundColor: "#151212" }}
                >
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-bold mt-4" style={{ color: "#72cf2a" }}>
                    {tool.name}
                  </h3>
                  <p style={{ color: '#fffef0' }} className="text-base opacity-60 mt-2">
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