const posts = [
  {
    category: 'Cirugías Estéticas',
    title: 'Cirugías Estéticas Modernas: Seguridad, Precisión y Resultados Naturales',
    excerpt: 'La medicina estética actual combina tecnología de vanguardia con técnicas mínimamente invasivas para lograr resultados que potencian tu belleza de forma natural y segura.',
    readTime: '5 min',
    date: 'Nov 2024',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=85&auto=format&fit=crop',
  },
  {
    category: 'Beneficios',
    title: 'Más Allá de la Estética: Los Beneficios Reales de los Procedimientos Estéticos',
    excerpt: 'Los tratamientos estéticos tienen un impacto profundo en la autoestima, la confianza personal y la calidad de vida. Descubre cómo un procedimiento puede transformar tu bienestar integral.',
    readTime: '4 min',
    date: 'Oct 2024',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=85&auto=format&fit=crop',
  },
  {
    category: 'Armonización Facial',
    title: 'Armonización Facial: El Arte de Realzar tu Belleza Natural',
    excerpt: 'La armonización facial no busca cambiar quién eres, sino equilibrar y potenciar tus rasgos únicos. Conoce en qué consiste, qué esperar y por qué es el procedimiento más solicitado de la clínica.',
    readTime: '4 min',
    date: 'Jun 2024',
    image: '/fotos/Valoración Armonización Facial.jpeg',
  },
]

function BlogCard({ post, featured }) {
  if (featured) {
    return (
      <article className="group col-span-1 md:col-span-2 flex flex-col md:flex-row overflow-hidden bg-white border border-[#e8e0d4] hover:border-[#b8973e]/50 hover:shadow-[0_12px_50px_rgba(0,0,0,0.10)] transition-all duration-400">
        <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden bg-[#f9f6f0] shrink-0">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 pointer-events-none" />
          <div className="absolute top-4 left-4">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-[#b8973e] text-white px-3 py-1.5">
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 md:p-10 flex-1">
          <div className="flex items-center gap-4 text-[#9a8e84]">
            <span className="text-[10px] font-medium">{post.date}</span>
            <span className="w-px h-3 bg-[#e8e0d4]" />
            <span className="text-[10px] font-medium">{post.readTime} lectura</span>
          </div>
          <h3 className="text-[26px] font-bold text-[#1a1612] font-serif leading-tight group-hover:text-[#b8973e] transition-colors duration-300">
            {post.title}
          </h3>
          <div className="w-8 h-px bg-[#b8973e]/50" />
          <p className="text-[#6b7280] text-[13px] leading-relaxed">{post.excerpt}</p>
          <div className="mt-2">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase text-[#1a1612] group-hover:text-[#b8973e] transition-colors duration-200">
              Leer más
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 5h6M5 2l3 3-3 3"/>
              </svg>
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group bg-white border border-[#e8e0d4] hover:border-[#b8973e]/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] transition-all duration-400 flex flex-col overflow-hidden">
      <div className="relative h-52 overflow-hidden bg-[#f9f6f0] shrink-0">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-[#b8973e] text-white px-2.5 py-1">
            {post.category}
          </span>
        </div>
        <div className={`absolute top-0 left-0 h-0.5 bg-[#b8973e] transition-all duration-500 w-0 group-hover:w-full`} />
      </div>
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="flex items-center gap-3 text-[#9a8e84]">
          <span className="text-[10px] font-medium">{post.date}</span>
          <span className="w-px h-3 bg-[#e8e0d4]" />
          <span className="text-[10px] font-medium">{post.readTime} lectura</span>
        </div>
        <h3 className="text-[17px] font-bold text-[#1a1612] font-serif leading-snug group-hover:text-[#b8973e] transition-colors duration-300 flex-1">
          {post.title}
        </h3>
        <p className="text-[#6b7280] text-[12px] leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="pt-3 border-t border-[#f0e8d8]">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#1a1612] group-hover:text-[#b8973e] transition-colors duration-200">
            Leer más
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 5h6M5 2l3 3-3 3"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}

export default function Blog() {
  const [featured, ...rest] = posts

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#b8973e]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
              Nuestro Blog
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-[40px] lg:text-[52px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.025em] font-serif">
              Información &<br />Consejos Médicos
            </h2>
            <p className="text-[#6b7280] text-[14px] leading-relaxed max-w-xs sm:text-right">
              Artículos especializados para que tomes decisiones informadas sobre tu salud estética.
            </p>
          </div>
        </div>

        {/* Featured + grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BlogCard post={featured} featured />
          {rest.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-10 border-t border-[#e8e0d4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-medium text-[#6b7280]">
            ¿Listo para dar el paso? Agenda una valoración sin compromiso y resuelve todas tus dudas.
          </p>
          <a
            href="#consulta"
            className="shrink-0 flex items-center gap-3 bg-[#b8973e] hover:bg-[#9a7c32] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 shadow-[0_4px_20px_rgba(184,151,62,0.3)]"
          >
            Agenda tu Consulta
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
