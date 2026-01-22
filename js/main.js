      // CONFIGURACIÓN DE IMÁGENES - (Provisional)
      // Personalizables:
      // 1. Subir fotos a ImgBB, Cloudinary o similar
      // 2. Copiar las URLs de las imágenes
      // 3. Reemplazar las URLs abajo
      // 4. Cambiar título y descripción de cada trabajo

      const galleryImages = [
        {
          src: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800",
          thumb:
            "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400",
          alt: "Construcción de muro de ladrillos",
          title: "Muro de Ladrillos",
          description: "Construcción de muro perimetral - Zona Norte",
        },
        {
          src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800",
          thumb:
            "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400",
          alt: "Reforma de baño completa",
          title: "Reforma de Baño",
          description: "Renovación completa con cerámica premium",
        },
        {
          src: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800",
          thumb:
            "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400",
          alt: "Colocación de cerámica",
          title: "Colocación de Cerámica",
          description: "Porcelanato de primera calidad",
        },
        {
          src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
          thumb:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
          alt: "Revoque exterior",
          title: "Revoque Exterior",
          description: "Frente de casa con revoque impermeable",
        },
        {
          src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
          thumb:
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400",
          alt: "Construcción de pared",
          title: "Construcción de Pared",
          description: "División de ambientes con ladrillo hueco",
        },
        {
          src: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800",
          thumb:
            "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400",
          alt: "Cocina reformada",
          title: "Reforma de Cocina",
          description: "Mesada y revestimiento cerámico completo",
        },
      ];

      // Función que crea elementos de galería con lazy loading
      function createGalleryItems() {
        const container = document.getElementById("gallery-container");

        galleryImages.forEach((image, index) => {
          const div = document.createElement("div");
          div.className =
            "relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl cursor-pointer group";
          div.style.animationDelay = `${index * 0.1}s`;
          div.classList.add("fade-in");
          div.onclick = () => openLightbox(index);

          div.innerHTML = `
                    <img 
                        data-src="${image.thumb}" 
                        alt="${image.alt}"
                        class="lazy-img w-full h-64 object-cover transform group-hover:scale-110"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end transition-all duration-300 p-4">
                        <div class="text-white">
                            <p class="font-bold text-lg">${image.title}</p>
                            <p class="text-sm opacity-90">Click para ver más</p>
                        </div>
                    </div>
                `;

          container.appendChild(div);
        });
      }

      // Sistema de Lightbox/Carrete de fotos
      let currentImageIndex = 0;

      function openLightbox(index) {
        currentImageIndex = index;
        const modal = document.getElementById("lightbox-modal");
        const img = document.getElementById("lightbox-image");
        const title = document.getElementById("lightbox-title");
        const description = document.getElementById("lightbox-description");
        const counter = document.getElementById("lightbox-counter");

        const imageData = galleryImages[index];

        img.src = imageData.src;
        img.alt = imageData.alt;
        title.textContent = imageData.title;
        description.textContent = imageData.description;
        counter.textContent = `${index + 1} / ${galleryImages.length}`;

        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevenir scroll
      }

      function closeLightbox() {
        const modal = document.getElementById("lightbox-modal");
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }

      function navigateLightbox(direction) {
        currentImageIndex += direction;

        // Loop circular
        if (currentImageIndex < 0) {
          currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
          currentImageIndex = 0;
        }

        openLightbox(currentImageIndex);
      }

      // Event listeners para el lightbox
      document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("lightbox-close").onclick = closeLightbox;
        document.getElementById("lightbox-prev").onclick = () =>
          navigateLightbox(-1);
        document.getElementById("lightbox-next").onclick = () =>
          navigateLightbox(1);

        // Cerrar al hacer click en el fondo
        document.getElementById("lightbox-modal").onclick = (e) => {
          if (e.target.id === "lightbox-modal") {
            closeLightbox();
          }
        };

        // Navegación con teclado
        document.addEventListener("keydown", (e) => {
          const modal = document.getElementById("lightbox-modal");
          if (modal.classList.contains("active")) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigateLightbox(-1);
            if (e.key === "ArrowRight") navigateLightbox(1);
          }
        });
      });

      // Intersection Observer para lazy loading optimizado
      function setupLazyLoading() {
        const images = document.querySelectorAll("img[data-src]");

        const imageObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy-img");
                observer.unobserve(img);
              }
            });
          },
          {
            rootMargin: "50px",
          },
        );

        images.forEach((img) => imageObserver.observe(img));
      }

      // Animación de elementos al scroll
      function setupScrollAnimations() {
        const sections = document.querySelectorAll("section");

        const sectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
              }
            });
          },
          {
            threshold: 0.1,
          },
        );

        sections.forEach((section) => sectionObserver.observe(section));
      }

      // Inicialización
      document.addEventListener("DOMContentLoaded", () => {
        createGalleryItems();
        setupLazyLoading();
        setupScrollAnimations();
      });

      // Optimización: remover transiciones durante scroll para mejor performance
      let scrollTimer;
      window.addEventListener(
        "scroll",
        () => {
          document.body.style.pointerEvents = "none";
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            document.body.style.pointerEvents = "auto";
          }, 100);
        },
        { passive: true },
      );