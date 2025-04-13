'use client';

import { useEffect } from 'react';

// Extend the Window interface to include iFrameResize
declare global {
    interface Window {
        iFrameResize?: (options: object, selector: string) => void;
    }
}

const SimpleFlexPage = () => {
    useEffect(() => {
        // Dynamically load the iframeResizer script
        const script = document.createElement('script');
        script.src = 'https://testimonial.to/js/iframeResizer.min.js';
        script.async = true;
        script.onload = () => {
            // Initialize iframeResizer after the script is loaded
            if (window.iFrameResize) {
                window.iFrameResize(
                    { log: false, checkOrigin: false },
                    '#testimonialto-embed-text--ONWV2ULUtYUv4vW-TqB'
                );
            }
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div className=" ">
            {/* Testimonial 1 */}
           
                <iframe id="testimonialto-embed-text--ONWV2ULUtYUv4vW-TqB" src="https://embed-v2.testimonial.to/text/-ONWV2ULUtYUv4vW-TqB" width="100%"></iframe>
     

            {/* Testimonial 2 */}
         
                <iframe id="testimonialto-embed-text--ONWV2ULUtYUv4vW-TqB" src="https://embed-v2.testimonial.to/text/-ONWV2ULUtYUv4vW-TqB" width="100%"></iframe>
            
            {/* Testimonial 3 */}
           
                <iframe id="testimonialto-embed-text--ONWV2ULUtYUv4vW-TqB" src="https://embed-v2.testimonial.to/text/-ONWV2ULUtYUv4vW-TqB" width="100%"></iframe>
         
        </div>
    );
};

export default SimpleFlexPage;