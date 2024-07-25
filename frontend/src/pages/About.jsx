import React from 'react';
import { InfiniteMovingCards } from '../components/Testimonial';

const About = () => {


const testimonials = [
    {
      quote: "Finding our dream home was so easy with this website. The listings are up-to-date and the details are very thorough.",
      name: "John Doe",
      title: "Homeowner",
    },
    {
      quote: "We sold our house in just three weeks! The platform made it easy to connect with serious buyers.",
      name: "Jane Smith",
      title: "Seller",
    },
    {
      quote: "As a real estate agent, this site has been invaluable in finding new properties for my clients. Highly recommended!",
      name: "Michael Johnson",
      title: "Real Estate Agent",
    },
    {
      quote: "The user interface is so intuitive. We could easily browse through various properties and make our decision.",
      name: "Emily Davis",
      title: "Home Buyer",
    },
    {
      quote: "I found the perfect rental apartment within days of searching here. The process was seamless and hassle-free.",
      name: "Chris Brown",
      title: "Renter",
    },
  ];
  
    return (
        <div class=" text-black  min-h-screen py-10 px-5">
        <div class="max-w-7xl mx-auto font-raleway">
        <div className="mx-8 mb-16 font-raleway text-center max-[1036px]:text-[3rem] text-[4rem] font-bold  mt-4 max-[706px]:text-[3rem] max-[706px]:text-center max-[546px]:text-[2rem]">
                About <span className="text-[#F9A826] font-philosopher">EstateElite</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="flex flex-col justify-center">
                    <h2 class="text-3xl font-semibold mb-4">Welcome to EstateElite</h2>
                    <p class="mb-4">
                        At EstateElite, we are dedicated to providing the best property management services. Our team of experienced professionals is here to help you find, list, and manage properties with ease and efficiency.
                    </p>
                    <p class="mb-4">
                        We believe in transparency, reliability, and customer satisfaction. Whether you are looking for a new home or an investment property, we are here to assist you every step of the way.
                    </p>
                    <p class="mb-4">
                        Our platform offers a seamless experience for property owners and seekers alike. Join us today and discover the EstateElite difference.
                    </p>
                </div>
                <div class="flex justify-center">
                    <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg" alt="About Us Image" class="rounded-lg shadow-lg"/>
                </div>
            </div>
            <div class="mt-10">
                <h2 class="text-3xl font-semibold text-center mb-8 mt-16">Our Team</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="flex flex-col items-center">
                        <img src="https://placehold.co/150x150" alt="Team Member 1" class="rounded-full mb-4"/>
                        <h3 class="text-xl font-medium">John Doe</h3>
                        <p class="text-zinc-600 dark:text-zinc-400">CEO</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="https://placehold.co/150x150" alt="Team Member 2" class="rounded-full mb-4"/>
                        <h3 class="text-xl font-medium">Jane Smith</h3>
                        <p class="text-zinc-600 dark:text-zinc-400">COO</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="https://placehold.co/150x150" alt="Team Member 3" class="rounded-full mb-4"/>
                        <h3 class="text-xl font-medium">Alice Johnson</h3>
                        <p class="text-zinc-600 dark:text-zinc-400">CFO</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="https://placehold.co/150x150" alt="Team Member 4" class="rounded-full mb-4"/>
                        <h3 class="text-xl font-medium">Bob Brown</h3>
                        <p class="text-zinc-600 dark:text-zinc-400">CTO</p>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <h2 class="text-3xl font-semibold text-center mb-8 mt-16">Our Properties</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="flex flex-col items-center">
                        <img src="https://the-view-luxury-villas.com/wp-content/uploads/2019/11/Luxury-Villas-Lefkada-Infinity-Pool-und-Garten6.jpg" alt="Property 1" class="rounded-lg mb-4"/>
                        <h3 class="text-xl font-medium">Luxury Villa</h3>
                        <p class="text-zinc-600 dark:text-zinc-400">Located in Beverly Hills</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="https://apxconstructiongroup.com/wp-content/uploads/2022/11/modern-apartment-building-designs-dusk.jpeg" alt="Property 2" class="rounded-lg mb-4"/>
                        <h3 class="text-xl font-medium">Modern Apartment</h3>
                        <p class="text-zinc-600 dark:text-zinc-400">Located in New York City</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="https://media.vrbo.com/lodging/79000000/78180000/78173200/78173105/dc9919fa.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill" alt="Property 3" class="rounded-lg mb-4"/>
                        <h3 class="text-xl font-medium">Cozy Cottage</h3>
                        <p class="text-zinc-600 dark:text-zinc-400">Located in the Countryside</p>
                    </div>
                </div>
            </div>
            <div class="mt-16 mb-8">
                <h2 class="text-3xl font-semibold text-center mb-8 mt-16">Customer Testimonials</h2>
                <div>
                <InfiniteMovingCards
      items={testimonials}
      direction="left"
      speed="normal"
      pauseOnHover={true}
      className="my-custom-class"
    />
                </div>
            </div>
        </div>
    </div>
    );
    }

export default About;