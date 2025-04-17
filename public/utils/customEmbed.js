document.addEventListener('DOMContentLoaded', () => {
  // ✅ Inject Tailwind via CDN script tag
  const tailwindScript = document.createElement('script');
  tailwindScript.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(tailwindScript);

  const embeds = document.querySelectorAll('.custom-embed');

  embeds.forEach((el) => {
    const responseId = el.getAttribute('data-response-id');
    const layout = el.getAttribute('data-layout') || '1';
    const starColor = el.getAttribute('data-star-color') || '#FFD700'; // Default star color (gold)

    if (responseId) {
      fetch(`/api/responses/${responseId}`)
        .then((res) => res.json())
        .then((data) => {
          const answers = data.answers.join(' ');
          const rating = data.rating || 0; // Numeric rating
          const imageUrl = data.imageUrl;
          const responderName = data.responderName || 'Anonymous';
          const avatarInitial = responderName.charAt(0).toUpperCase(); // Get the first character of the name
          const responderRole = data.responderRole || 'Customer';
          let html = '';

          if (layout === '1') {
            // Layout 1 with dynamic stars
            html = `
              <div class="text-center p-4 rounded shadow border bg-white"
                   style="background-color: ${el.style.backgroundColor}; font-size: ${el.style.fontSize}; color: ${el.style.color};">
                <div class="flex justify-center">
                  ${
                    imageUrl
                      ? `<img src="${imageUrl}" class="w-20 h-20 rounded-full border object-cover" />`
                      : `<div class="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl border">
                          ${avatarInitial}
                        </div>`
                  }
                </div>
                <h3 class="font-semibold text-lg mt-1 font-serif text-black">${responderName}</h3>
                <p class="text-gray-700 italic text-xs">${responderRole}</p>
                <div class="flex justify-center items-center my-2">
                  ${Array.from({ length: 5 }, (_, index) => `
                    <span style="color: ${index < rating ? starColor : '#ccc'}; font-size: 24px;">★</span>
                  `).join('')}
                </div>
                <p class="leading-tight">“${answers}”</p>
              </div>
            `;
          } else if (layout === '2') {
            // Layout 2 without stars
            html = `
              <div class="text-center p-4 px-6 py-8 rounded shadow border bg-white"
                   style="background-color: ${el.style.backgroundColor}; font-size: ${el.style.fontSize}; color: ${el.style.color};">
                <p class="italic mb-6">“${answers}”</p>
                <div class="flex justify-center mb-2">
                  ${
                    imageUrl
                      ? `<img src="${imageUrl}" class="w-16 h-16 rounded-full border-2 border-gray-300 object-cover" />`
                      : `<div class="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-300">
                          ${avatarInitial}
                        </div>`
                  }
                </div>
                <p class="font-semibold text-black">${responderName}</p>
                <p class="text-xs text-gray-700">${responderRole || 'Customer'}</p>
              </div>
            `;
          } else if (layout === '3') {
            // Layout 3 without stars
            html = `
              <div class="p-6 rounded shadow border bg-white text-left"
                   style="background-color: ${el.style.backgroundColor}; font-size: ${el.style.fontSize}; color: ${el.style.color};">
                <p class="italic mb-6 leading-relaxed">“${answers}”</p>
                <div class="flex items-center gap-4">
                  ${
                    imageUrl
                      ? `<img src="${imageUrl}" class="w-12 h-12 rounded-full border border-gray-300 object-cover" />`
                      : `<div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm border">
                          ${avatarInitial}
                        </div>`
                  }
                  <div>
                    <p class="font-semibold text-black">${responderName}</p>
                    <p class="text-xs text-gray-700">${data.responderRole || 'Reviewer'}</p>
                  </div>
                </div>
              </div>
            `;
          }

          el.innerHTML = html;
        })
        .catch((err) => {
          el.innerHTML = `<p class="text-red-600 text-sm">Error loading testimonial.</p>`;
          console.error('Error fetching testimonial:', err);
        });
    }
  });
});