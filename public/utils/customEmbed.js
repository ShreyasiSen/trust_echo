document.addEventListener('DOMContentLoaded', () => {
    const embeds = document.querySelectorAll('.custom-embed');
  
    embeds.forEach((el) => {
      const responseId = el.getAttribute('data-response-id');
  
      if (responseId) {
        // Fetching testimonial data from the API
        fetch(`/api/responses/${responseId}`)
          .then((res) => res.json())
          .then((data) => {
            // Combine answers into a single string
            const answers = data.answers.join(' ');
  
            // Format the rating as stars
            const ratingStars = '★'.repeat(data.rating || 0) + '☆'.repeat(5 - (data.rating || 0));
  
            // Create the testimonial HTML
            const testimonialHTML = `
              <div style="border: 1px solid #ddd; background-color: ${el.style.backgroundColor || '#f9f9f9'}; font-size: ${el.style.fontSize || '16px'}; color: ${el.style.color || '#333'};">
                <p style="font-style: italic; font-size: 1.1em;">"${answers}"</p>
                <p style="text-align: right; font-weight: bold; margin-top: 10px;">– ${data.responderName}</p>
                <p style="text-align: right; color: gold; margin-top: 5px;">${ratingStars}</p>
              </div>
            `;
            el.innerHTML = testimonialHTML;
          })
          .catch((err) => {
            el.innerHTML = `<p style="color:red;">Error loading testimonial.</p>`;
            console.error('Error fetching testimonial:', err);
          });
      }
    });
  });  