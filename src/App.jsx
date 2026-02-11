import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 120, scale: 0.82, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const SectionReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
)

const CardReveal = ({ children, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
)

const StaggerContainer = ({ children }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
)

const StaggerItem = ({ children }) => (
  <motion.div variants={itemVariants}>
    {children}
  </motion.div>
)

export default function App() {
  const { scrollY } = useScroll()
  const yHero = useTransform(scrollY, [0, 700], [0, -280])
  const scaleHero = useTransform(scrollY, [0, 700], [1, 0.92])
  
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const roles = ['Python Developer', 'Data Analyst', 'Backend Engineer']
  const [roleIndex, setRoleIndex] = useState(0)

  const sendMessage = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    const to = 'khansashafeeq660@gmail.com'
    const subject = encodeURIComponent(`Portfolio message from ${contactName || contactEmail || 'Visitor'}`)
    const body = encodeURIComponent(`${contactMessage || ''}\n\nFrom: ${contactName || ''} ${contactEmail || ''}`)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden">

      {/* Header Pill */}
      <header className="site-header">
          <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="pill-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="vertical-name" style={{ fontSize: 14 }}>
              <div>Khansa Shafeeq</div>
            </div>
          </div>
          <div className="pill-center" style={{ padding: '10px 18px', background: 'linear-gradient(90deg,#06b6d4,#d4944f)', borderRadius: 20, color: '#1f2937', fontWeight: 600 }}>
            <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Hire Me</a>
          </div>
          <div className="pill-right" style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </div>
        </div>
        {menuOpen && (
          <div style={{ position: 'fixed', top: 78, left: '50%', transform: 'translateX(-50%)', zIndex: 55, width: '90%', maxWidth: 520 }}>
            <div style={{ background: 'rgba(61,47,47,0.9)', border: '1px solid rgba(212,148,79,0.18)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Home', href: '#home' },
                { label: 'Skills', href: '#skills' },
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
                { label: 'Resume', href: '/Khansa_shafeeq_resume_2026.pdf' }
              ].map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ padding: '10px 12px', borderRadius: 8, color: '#e6e2df', fontWeight: 600, background: 'transparent' }}>{item.label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main style={{ paddingTop: 20 }}>
        {/* Hero */}
        <section id="home" className="hero" style={{minHeight: 'auto',padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="absolute-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
            <div className="blob blob-gold" style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', filter: 'blur(48px)', opacity: 0.12, background: '#d4944f', right: -80, top: -120 }} />
            <div className="blob blob-cyan" style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', filter: 'blur(48px)', opacity: 0.12, background: '#06b6d4', left: -80, bottom: -120 }} />
          </div>

          <motion.div className="hero-inner" style={{ y: yHero, scale: scaleHero, textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: 900 }}>
            <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#d4944f', marginBottom: 16 }}>Welcome to my portfolio</motion.p>
            
            <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2 }} style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', lineHeight: 1.05, letterSpacing: -1, marginBottom: 12, color: '#f6ecd2' }}>
              Python Developer &{' '}<span style={{ background: 'linear-gradient(90deg,#06b6d4,#d4944f)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Data Analyst</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }} style={{ fontSize: 22, marginBottom: 16, color: '#efefef' }}>I'm <span style={{color:'#d4944f', fontWeight: 600}}>Khansa Shafeeq</span></motion.p>

            <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }} style={{ fontSize: 18, color: 'rgba(230,226,223,0.9)', maxWidth: 700, margin: '0 auto 32px' }}>
              Building scalable backend systems and transforming data into actionable insights.<br/>
              <span style={{ color: 'rgba(200,180,160,0.8)' }}>From Allahabad, India</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(212,148,79,0.1)', border: '1px solid rgba(212,148,79,0.3)', borderRadius: 28, padding: '10px 16px', marginBottom: 28 }}>
              <span style={{ color: '#d4944f' }}>▶</span>
              <motion.span key={roleIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: 'rgba(200,180,160,0.9)', fontSize: 13, fontFamily: 'monospace' }}>{roles[roleIndex]}</motion.span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" style={{ padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(90deg, #06b6d4, #d4944f)', color: '#1f2937', fontWeight: 600, textDecoration: 'none', boxShadow: '0 0 20px rgba(212,148,79,0.4)' }}>View Projects</a>
              <a href="#contact" style={{ padding: '12px 24px', borderRadius: 10, border: '2px solid #d4944f', color: '#d4944f', fontWeight: 600, textDecoration: 'none', background: 'transparent' }}>Download Resume</a>
            </motion.div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="panel" style={{ padding: '80px 20px', maxWidth: 1200, margin: '0 auto' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>About <span style={{ background: 'linear-gradient(90deg,#06b6d4,#d4944f)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span></h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
              {/* Profile Picture - Centered */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{ position: 'relative', maxWidth: 350 }}
              >
                <img 
                  src="/images/profile.jpeg"
                  alt="Khansa Shafeeq"
                  style={{
                    width: '100%',
                    borderRadius: 16,
                    border: '2px solid rgba(212,148,79,0.3)',
                    boxShadow: '0 20px 60px rgba(212,148,79,0.2)'
                  }}
                />
              </motion.div>

              {/* Text Content */}
              <div style={{ lineHeight: 1.8, color: '#e6e2df', textAlign: 'center', maxWidth: 600 }}>
                <p style={{ fontSize: 18, marginBottom: 16 }}>Hi, I'm <strong style={{color:'#d4944f'}}>Khansa</strong> — a <strong style={{color:'#d4944f'}}>Python Developer</strong> and <strong style={{color:'#d4944f'}}>Data Analyst</strong> from Allahabad, India.</p>
                <p style={{ fontSize: 18, marginBottom: 16 }}>I specialize in <span style={{color:'#06b6d4'}}>building backend systems using FastAPI and PostgreSQL</span>, and uncovering insights through <span style={{color:'#06b6d4'}}>data analysis and visualization</span>.</p>
                <p style={{ fontSize: 18 }}>With an <strong style={{color:'#d4944f'}}>MBA background in Finance & IT</strong>, I blend technical expertise with business thinking.</p>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Skills */}
        <section id="skills" style={{ padding: '80px 20px', maxWidth: 1400, margin: '0 auto' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}><span style={{ background: 'linear-gradient(90deg,#06b6d4,#d4944f)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span> & Technologies</h2>
            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: 40 }}>Tools and technologies I work with</p>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Programming', icon: 'fas fa-code', color: '#d4944f', skills: [{ icon: 'fab fa-python', label: 'Python' }, { icon: 'fas fa-table', label: 'Pandas' }, { icon: 'fas fa-calculator', label: 'NumPy' }, { icon: 'fas fa-chart-line', label: 'Matplotlib' }] },
              { title: 'Backend', icon: 'fas fa-server', color: '#06b6d4', skills: [{ icon: 'fas fa-bolt', label: 'FastAPI' }, { icon: 'fas fa-network-wired', label: 'REST APIs' }, { icon: 'fas fa-cube', label: 'SQLAlchemy' }, { icon: 'fas fa-cogs', label: 'CRUD Ops' }] },
              { title: 'Databases', icon: 'fas fa-database', color: '#06b6d4', skills: [{ icon: 'fas fa-leaf', label: 'PostgreSQL' }, { icon: 'fas fa-fish', label: 'MySQL' }, { icon: 'fas fa-sitemap', label: 'Data Modeling' }, { icon: 'fas fa-zap', label: 'Query Opt.' }] },
              { title: 'Tools', icon: 'fas fa-wrench', color: '#06b6d4', skills: [{ icon: 'fas fa-chart-bar', label: 'Power BI' }, { icon: 'fas fa-th', label: 'Excel' }, { icon: 'fab fa-git-alt', label: 'Git & GitHub' }, { icon: 'fas fa-book', label: 'Jupyter' }] }
            ].map((cat, i) => (
              <CardReveal key={i} index={i}>
                <div style={{ background: 'rgba(61,47,47,0.4)', border: `1px solid rgba(${cat.color === '#d4944f' ? '212,148,79' : '6,182,212'},0.2)`, padding: 24, borderRadius: 12, height: '100%' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#d4944f' }}><i className={cat.icon} style={{marginRight: 8, color: '#d4944f', fontSize: 24}} />{cat.title}</h3>
                  <StaggerContainer>
                    {cat.skills.map((s, si) => (
                      <StaggerItem key={si}>
                        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e8e6e3' }} whileHover={{ x: 6, color: '#d4944f' }} transition={{ duration: 0.3 }}>
                          <i className={s.icon} style={{fontSize:28,color:'#d4944f',transition:'all 0.3s'}} />
                          <span>{s.label}</span>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </CardReveal>
            ))}
          </div>
        </section>

        {/* Experience & Certifications */}
        <section id="experience" style={{ padding: '80px 20px', maxWidth: 900, margin: '0 auto' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 40, textAlign: 'center' }}><span style={{ background: 'linear-gradient(90deg,#d4944f,#06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Experience</span></h2>
          </SectionReveal>
          
          <CardReveal>
            <div style={{ background: 'rgba(61,47,47,0.4)', border: '1px solid rgba(212,148,79,0.2)', padding: 24, borderRadius: 12, marginBottom: 40 }}>
              <h3 style={{fontSize:20,fontWeight:700,color:'#d4944f',marginBottom:4}}>Backend Development Intern</h3>
              <p style={{color:'#06b6d4',fontWeight:600,marginBottom:4}}>Amesie Enterprises</p>
              <p style={{color:'#aaa',fontSize:13,marginBottom:12}}>Sept 2025 – Nov 2025</p>
              <ul style={{color:'#e6e2df',lineHeight:1.8,paddingLeft:0,listStyle:'none'}}>
                <li>✓ Built RESTful APIs using FastAPI</li>
                <li>✓ Integrated PostgreSQL with SQLAlchemy ORM</li>
                <li>✓ Implemented CRUD operations with validation</li>
                <li>✓ Used Git & GitHub for version control</li>
              </ul>
            </div>
          </CardReveal>

          <SectionReveal delay={0.2}>
            <h3 style={{fontSize:28,fontWeight:700,textAlign:'center',marginBottom:24}}>Certifications</h3>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'fas fa-server', title: 'Backend Development Internship', org: 'Amesie Enterprises • 2025', color: '#d4944f' },
              { icon: 'fas fa-chart-bar', title: 'Data Analytics with Python', org: 'UPTEC Prayagraj', color: '#06b6d4' },
              { icon: 'fab fa-python', title: 'Python & Data Structures', org: 'IIIT Allahabad', color: '#d4944f' },
              { icon: 'fas fa-th', title: 'Microsoft Excel Certification', org: 'Learn MorePro', color: '#06b6d4' }
            ].map((cert, i) => (
              <CardReveal key={i} index={i}>
                <div style={{ background: 'rgba(61,47,47,0.4)', border: `1px solid rgba(${cert.color === '#d4944f' ? '212,148,79' : '6,182,212'},0.2)`, borderLeft: `4px solid ${cert.color}`, padding: 20, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <i className={cert.icon} style={{fontSize: 32, color: cert.color, marginBottom: 12}} />
                  <p style={{fontWeight:600,color:cert.color,marginBottom:4,fontSize:14}}>{cert.title}</p>
                  <p style={{color:'#aaa',fontSize:12}}>{cert.org}</p>
                </div>
              </CardReveal>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" style={{ padding: '60px 20px', maxWidth: 1200, margin: '0 auto' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Featured <span style={{ background: 'linear-gradient(90deg,#d4944f,#06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span></h2>
            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: 32 }}>Work I'm proud of</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { image: '/projects/smart-resume-screener-api.jpeg', title: 'Smart Resume Screener API', desc: 'Python-based resume screening with intelligent text processing and modular backend.', tags: ['Python','NLP','FastAPI'], github: 'https://github.com/Khansashafeeq/smart_resume_screener_api.git' },
              { image: '/projects/hotel-booking-cancellation-dashboard.png', title: 'Hotel Booking Cancellation Dashboard', desc: '10,000+ records with pivot tables, slicers, and revenue optimization insights.', tags: ['Excel','Pivot Tables','Analytics'], github: 'https://github.com/Khansashafeeq/Power-Bi-Dashboard-and-MS-Excel-File-dashboard-.git' },
              { image: '/projects/power-bi-project.png', title: 'Population Analysis Dashboard', desc: 'Power BI interactive reports with continent-wise population insights.', tags: ['Power BI','Data Viz','Analytics'], github: 'https://github.com/Khansashafeeq/Power-Bi-Dashboard-and-MS-Excel-File-dashboard-.git' },
              { image: '/projects/student-marks-data-analysis.jpeg', title: 'Student Marks Data Analysis', desc: 'Python & SQL EDA with complex JOINs, GROUP BY, and Matplotlib visualizations.', tags: ['Python','SQL','EDA'], github: 'https://github.com/Khansashafeeq/StudentMarksProject.git' }
            ].map((p, i) => (
              <CardReveal key={i} index={i}>
                <div style={{ background: 'rgba(61,47,47,0.4)', border: '1px solid rgba(212,148,79,0.2)', borderRadius: 12, overflow: 'hidden' }}>
                  <img 
                    src={p.image} 
                    alt={p.title}
                    style={{width:'100%',height:200,objectFit:'cover',background:'linear-gradient(135deg, rgba(212,148,79,0.15), rgba(6,182,212,0.15))'}}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div style={{padding:20}}>
                    <h3 style={{fontSize:18,fontWeight:700,color:'#d4944f',marginBottom:8}}>{p.title}</h3>
                    <p style={{color:'#e6e2df',fontSize:14,marginBottom:12,lineHeight:1.6}}>{p.desc}</p>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
                      {p.tags.map((t,ti) => <span key={ti} style={{fontSize:11,padding:'4px 10px',borderRadius:16,background:'rgba(212,148,79,0.15)',color:'#d4944f'}}>{t}</span>)}
                    </div>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',padding:'8px 16px',fontSize:12,fontWeight:600,background:'linear-gradient(90deg,#06b6d4,#d4944f)',color:'#1f2937',borderRadius:6,textDecoration:'none',transition:'all 0.3s',cursor:'pointer'}} onMouseEnter={(e)=>e.target.style.transform='translateY(-2px)'} onMouseLeave={(e)=>e.target.style.transform='translateY(0)'}>View on GitHub →</a>
                  </div>
                </div>
              </CardReveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{ padding: '80px 20px', maxWidth: 1000, margin: '0 auto' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Get In <span style={{ background: 'linear-gradient(90deg,#d4944f,#06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Touch</span></h2>
            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: 40, fontSize: 16 }}>Feel free to reach out if you'd like to collaborate</p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <form onSubmit={sendMessage} style={{ background: 'rgba(61,47,47,0.4)', border: '1px solid rgba(212,148,79,0.2)', padding: 28, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#d4944f', marginBottom: 8 }}>Name</label>
                  <input value={contactName} onChange={(e) => setContactName(e.target.value)} type="text" placeholder="Your name" style={{ width: '100%', padding: '10px 12px', background: 'rgba(61,47,47,0.5)', border: '1px solid rgba(212,148,79,0.3)', borderRadius: 8, color: '#e6e2df', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#d4944f', marginBottom: 8 }}>Email</label>
                  <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" placeholder="your.email@example.com" style={{ width: '100%', padding: '10px 12px', background: 'rgba(61,47,47,0.5)', border: '1px solid rgba(212,148,79,0.3)', borderRadius: 8, color: '#e6e2df', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#d4944f', marginBottom: 8 }}>Message</label>
                  <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Your message..." rows={5} style={{ width: '100%', padding: '10px 12px', background: 'rgba(61,47,47,0.5)', border: '1px solid rgba(212,148,79,0.3)', borderRadius: 8, color: '#e6e2df', outline: 'none', resize: 'none' }} />
                </div>
                <button type="submit" style={{ padding: '11px 20px', background: 'linear-gradient(90deg, #06b6d4, #d4944f)', color: '#1f2937', fontWeight: 600, border: 'none', borderRadius: 8, cursor: 'pointer' }}>Send Message</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} style={{ background: 'linear-gradient(135deg, rgba(212,148,79,0.08), rgba(6,182,212,0.08))', padding: 32, borderRadius: 12, textAlign: 'center' }}>
                    <img src="/images/contact-logo.jpeg" alt="logo" style={{ width: 140, height: 100, objectFit: 'contain', borderRadius: 8 }} />
                  </motion.div>

                {[{ icon: '📧', label: 'Email', value: 'khansashafeeq660@gmail.com', color: '#d4944f' }, { icon: '📞', label: 'Phone', value: '+91-9335533889', color: '#06b6d4' }, { icon: '📍', label: 'Location', value: 'Allahabad, India', color: '#d4944f' }].map((c, i) => (
                  <CardReveal key={i} index={i}>
                    <motion.div style={{ background: 'rgba(61,47,47,0.4)', border: `1px solid rgba(${c.color === '#d4944f' ? '212,148,79' : '6,182,212'},0.15)`, padding: 16, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }} whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>
                      <div style={{ fontSize: 20 }}>{c.icon}</div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#aaa', margin: 0, marginBottom: 2 }}>{c.label}</p>
                        <a href={c.label === 'Email' ? `mailto:${c.value}` : c.label === 'Phone' ? `tel:${c.value.replace(/[^\d+]/g, '')}` : '#'} style={{ color: c.color, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>{c.value}</a>
                      </div>
                    </motion.div>
                  </CardReveal>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  viewport={{ once: true }}
                  style={{ textAlign: 'center', borderTop: '1px solid rgba(212,148,79,0.1)', paddingTop: 16 }}
                >
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#aaa', marginBottom: 12 }}>Connect With Me</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                    {[{icon:'fab fa-github', url:'https://github.com/Khansashafeeq'}, {icon:'fab fa-linkedin-in', url:'https://linkedin.com/in/khansa-shafeeq-771040279'}, {icon:'fas fa-file-pdf', url:'/Khansa_shafeeq_resume_2026.pdf'}].map((s, si) => (
                      <motion.a 
                        key={si} 
                        href={s.url}
                        download={s.icon === 'fas fa-file-pdf'}
                        target={s.icon !== 'fas fa-file-pdf' ? '_blank' : undefined}
                        rel={s.icon !== 'fas fa-file-pdf' ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ scale: 1.15, y: -4, boxShadow: '0 8px 20px rgba(212,148,79,0.3)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 + si * 0.1 }}
                        viewport={{ once: true }}
                        style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(212,148,79,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4944f' }}
                      >
                        <i className={s.icon} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(212,148,79,0.2)', background: 'rgba(61,47,47,0.5)', padding: '32px 20px', textAlign: 'center', marginTop: 60 }}>
          <p style={{color:'#aaa',marginBottom:8}}>© 2026 <strong style={{color:'#d4944f'}}>Khansa Shafeeq</strong>. All rights reserved.</p>
          <p style={{color:'#999',fontSize:12}}>Built with passion • Crafted with care</p>
        </footer>
      </main>
    </div>
  )
}
