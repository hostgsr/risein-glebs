import React from 'react';
import dynamic from "next/dynamic";



const CurrentTime = dynamic(() => import('./CurrentTime'), { ssr: false });


//@ts-ignore
const HeroSection = ({ onClick }) => {


    return (
        <div className='  text-white w-full px-5 py-12  h-full '
       >
            <div className='border-y flex-items-center justify-center flex-col items-center border-white h-full' >
                <div className=' flex flex-col h-full justify-between py-12'>
                <div className='  text-4xl xl:text-6xl '>RiseIn Competition -</div>
                <div className='flex flex-col  mt-20 lg:mt-0 lg:flex-row lg:justify-between'>
                    <button 
                    onClick={onClick} 
                    className='border-white flex flex-row h-14 items-center justify-between  border rounded-full'>
                        <span className='ml-5 mr-16'>Start here</span>
                        <div className='w-12 h-12 mr-1 border flex items-center justify-center border-white rounded-full' > {'>'} </div>
                    </button>
                   
                    <div className='flex mt-12 lg:mb-0 mb-12 lg:mt-0 items-center justify-end'>

                        <div>
                            <CurrentTime initialTime={new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })} />
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    );
};

export default HeroSection;