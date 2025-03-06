import Image from "next/image";

const TopBackground = () => {
  return (
    <>
      <div className="absolute top-0 w-full h-full dark:h-screen bg-grid-with-radial bg-[length:60px_60px] bg-blend-overlay z-[-10] ">
        <div className="absolute w-full max-w-[360px] md:max-w-screen-lg h-[285px] md:h-[656px] top-[188px] md:top-11 left-1/2 -translate-x-1/2 md:overflow-x-hidden z-50">
          <div className="w-full h-full relative">
            {/* <div className="circle-icon top-0 left-[171px] md:top-28 md:left-72">
                        <Image src="/rocket_icon.svg" alt="Rocket icon" width={23} height={23} />
                    </div>
                    <div className="circle-icon top-[162] -left-5 md:top-64 md:left-0">
                        <Image src="/bracket_icon.svg" alt="Bracket icon" width={23} height={23} />
                    </div>
                    <div className="circle-icon top-60 left-[149px] md:top-[570px] md:left-44">
                        <Image src="/github_icon.svg" alt="Github icon" width={23} height={23} />
                    </div>
                    <div className="hidden md:flex items-center justify-center rounded-full w-11 h-11 md:w-14 md:h-14 bg-[#f4ebff] bg-opacity-[12%] absolute md:top-[592px] md:left-[608px]">
                        <Image src="/electricity_icon.svg" alt="Electricity icon" width={23} height={23} />
                    </div>
                    <div className="hidden md:flex items-center justify-center rounded-full w-11 h-11 md:w-14 md:h-14 bg-[#f4ebff] bg-opacity-[12%] absolute md:top-[158px] md:left-[606px]">
                        <Image src="/merge_icon.svg" alt="Merge icon" width={23} height={23} />
                    </div>
                    <div className="hidden md:flex items-center justify-center rounded-full w-11 h-11 md:w-14 md:h-14 bg-[#f4ebff] bg-opacity-[12%] absolute md:top-[368px] md:left-[965px]">
                        <Image src="/stack_icon.svg" alt="Stack icon" width={23} height={23} />
                    </div> */}
          </div>
        </div>

        <Image
          src="/z_top_gradient-01-01.svg"
          alt="top dark mode background highlight"
          width={809}
          height={877}
          className="absolute top-[-100px] hidden dark:md:block left-1/2 -translate-x-1/2"
        />
        <Image
          src="/top_highlight_mobile.svg"
          alt="top dark mode background highlight"
          width={429}
          height={465}
          className="absolute top-[-229px] hidden dark:block dark:md:hidden left-1/2 -translate-x-1/2"
        />

        {/* <img src="/z_top_gradient-01-01.svg" alt="top dark mode background highlight" width={809} height={877} className="absolute top-[-100px] hidden dark:md:block left-1/2 -translate-x-1/2" />
            <img src="/top_highlight_mobile.svg" alt="top dark mode background highlight" width={429} height={465} className="absolute top-[-229px] hidden dark:block dark:md:hidden left-1/2 -translate-x-1/2" /> */}

        {/* <div className="absolute top-0 w-screen h-screen bg-no-repeat bg-[url('/top-bg-light-lg.svg')] bg-[auto-auto] hidden dark:hidden md:block"></div>
    <div className="absolute top-0 w-full h-[600px] bg-repeat-x bg-[url('/top_bg_mobile_light.svg')] bg-[auto-auto] dark:hidden md:hidden"></div>

    <div className="absolute top-0 w-screen h-screen  bg-cover bg-no-repeat bg-[url('/top-bg-dark-lg.svg')] hidden md:dark:block"></div>
    <div className="absolute top-0 w-full h-[600px] bg-repeat-x bg-[url('/top_bg_mobile_dark.svg')] bg-[auto-auto] hidden dark:block dark:md:hidden"></div> */}
        {/* <div className="absolute top-0 w-screen h-screen bg-grid-with-radial bg-[length:60px_60px] bg-blend-overlay"></div> */}
      </div>
    </>
  );
};

export default TopBackground;
