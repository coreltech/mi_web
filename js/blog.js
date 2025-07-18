// ===== CARGADOR DEL BLOG =====
document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blog-posts');
  const BLOG_URL = 'https://coreltech.github.io/corel_blog/blog.json'; // URL de tu JSON
  
  // Función para formatear fecha (ej: "2024-07-20" → "20 Julio 2024")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Cargar posts desde JSON
  const loadBlogPosts = async () => {
    try {
      const response = await fetch(BLOG_URL);
      
      if (!response.ok) {
        throw new Error('No se pudo cargar el blog');
      }
      
      const posts = await response.json();
      
      // Mostrar solo los 3 posts más recientes
      const recentPosts = posts.slice(0, 3);
      
      if (recentPosts.length === 0) {
        blogContainer.innerHTML = `
          <div class="blog-error">
            <i class="fas fa-exclamation-circle fa-3x mb-3 text-muted"></i>
            <h3>No hay publicaciones recientes</h3>
            <a href="${BLOG_URL.replace('/blog.json', '')}" class="btn btn-primary mt-3">
              Visitar el blog
            </a>
          </div>
        `;
        return;
      }
      
      // Generar HTML para cada post
      blogContainer.innerHTML = recentPosts.map(post => `
        <div class="blog-card">
          <img src="${post.image}" alt="${post.title}" class="blog-img" loading="lazy">
          <div class="blog-content">
            <span class="blog-date">${formatDate(post.date)}</span>
            <h3>${post.title}</h3>
            <p>${post.summary || 'Lee más sobre este tema en nuestro blog...'}</p>
            <a href="${post.url}" class="blog-link">Leer más</a>
          </div>
        </div>
      `).join('');
      
    } catch (error) {
      console.error('Error al cargar el blog:', error);
      blogContainer.innerHTML = `
        <div class="blog-error">
          <i class="fas fa-exclamation-triangle fa-3x mb-3 text-danger"></i>
          <h3>Error al cargar las publicaciones</h3>
          <p class="text-muted">Por favor, intenta recargar la página o visita el blog directamente.</p>
          <a href="${BLOG_URL.replace('/blog.json', '')}" class="btn btn-primary mt-3">
            <i class="fas fa-external-link-alt me-2"></i>Ir al blog
          </a>
        </div>
      `;
    }
  };

  // Iniciar carga
  loadBlogPosts();
});