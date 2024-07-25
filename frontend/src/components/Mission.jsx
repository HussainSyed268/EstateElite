import React from 'react';

const Mission = () => {
    return (
        <div className={"mb-20 h-full w-[97%] mx-auto"}>
        <div
          className={"rounded-2xl bg-no-repeat bg-center bg-cover w-full"}
          style={{
            backgroundImage: `url(assets/background-homes.jpg)`,
          }}
        >
          <div className={"h-full w-full rounded-xl"}>
            <div
              className={
                "flex h-full w-full rounded-xl bg-gray-950 bg-opacity-40"
              }
            >
              <div className={"m-10"}>
                <h1
                  className={
                    "my-auto text-start text-3xl font-bold tracking-tighter font-raleway text-white lg:text-5xl"
                  }
                >
                  OUR MISSION
                </h1>
                <h1
                  className=
                  "my-auto text-start tracking-tighter text-white mt-3 md:mt-10 text-sm md:text-xl lg:m-6 lg:mt-14 lg:text-3xl font-light">
                At EstateElite, our mission is to transform the real estate experience by making the process of finding, buying, and owning properties simple, transparent, and accessible for everyone. We are dedicated to leveraging innovative technology and expert guidance to connect buyers with their dream homes, ensuring every transaction is seamless and stress-free. With a commitment to excellence and integrity, we strive to build lasting relationships and trust with our clients, empowering them to make informed decisions and achieve their real estate goals with confidence.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Mission;