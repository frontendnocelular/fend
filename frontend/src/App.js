import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, Calendar, User, Tag, ExternalLink } from 'lucide-react';
import './App.css';

const SplashScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('showText'), 2500);
    const timer2 = setTimeout(() => setStage('jumpOut'), 6000);
    const timer3 = setTimeout(() => setStage('focusF'), 6800);
    const timer4 = setTimeout(() => setStage('fadeOut'), 8000);
    const timer5 = setTimeout(() => onComplete(), 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div className={`splash-container ${stage === 'fadeOut' ? 'fade-out' : ''}`}>
      <div className="blob"></div>
      <h1 className={`logo ${stage === 'showText' ? 'show' : ''}`}>
        <span className={`letra f ${stage === 'focusF' ? 'focus' : ''} ${stage === 'focusF' ? 'center' : ''}`}>F</span>
        <span className={`letra ${stage === 'jumpOut' ? 'jump' : ''}`}>e</span>
        <span className={`letra ${stage === 'jumpOut' ? 'jump' : ''}`}>n</span>
        <span className={`letra ${stage === 'jumpOut' ? 'jump' : ''}`}>d</span>
      </h1>
    </div>
  );
};

const Header = ({ darkMode, toggleDarkMode, isFixed, toggleFixed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('inicio');

  const menuItems = [
    { id: 'inicio', label: 'Início', path: '/' },
    { id: 'categorias', label: 'Categorias', path: '/categorias' },
    { id: 'sobre', label: 'Sobre', path: '/sobre' },
    { id: 'contato', label: 'Contato', path: '/contato' }
  ];

  return (
    <header className={`header ${isFixed ? 'fixed' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="site-title">
            Frontend no Celular
          </Link>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="header-right">
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={toggleFixed}
            className="header-toggle"
            title={isFixed ? "Desfixar Cabeçalho" : "Fixar Cabeçalho"}
          >
            {isFixed ? 'Desfixar' : 'Fixar'}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-toggle md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

const SearchBar = ({ onSearch, darkMode }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar posts..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </div>
    </form>
  );
};

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      {post.image_url && (
        <div className="post-image">
          <img src={post.image_url} alt={post.title} />
        </div>
      )}
      <div className="post-content">
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-date">
            <Calendar size={14} />
            {new Date(post.created_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
        <h3 className="post-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="post-tag">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
        <div className="post-author">
          <User size={14} />
          {post.author}
        </div>
      </div>
    </article>
  );
};

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.author || !newComment.email || !newComment.content) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        setNewComment({ author: '', email: '', content: '' });
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!post) return <div className="error">Post não encontrado</div>;

  return (
    <div className="post-detail">
      <article className="post-full">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-category">{post.category}</span>
            <span className="post-date">
              <Calendar size={16} />
              {new Date(post.created_at).toLocaleDateString('pt-BR')}
            </span>
            <span className="post-author">
              <User size={16} />
              {post.author}
            </span>
          </div>
        </header>

        {post.image_url && (
          <div className="post-featured-image">
            <img src={post.image_url} alt={post.title} />
          </div>
        )}

        {post.video_url && (
          <div className="post-video">
            <iframe
              src={post.video_url}
              title={post.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="post-content-full">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.source_urls.length > 0 && (
          <div className="post-sources">
            <h4>Fontes e Referências:</h4>
            <ul>
              {post.source_urls.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="post-tags-full">
          {post.tags.map((tag, index) => (
            <span key={index} className="post-tag">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </article>

      <section className="comments-section">
        <h3>Comentários ({comments.length})</h3>
        
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Seu nome"
              value={newComment.author}
              onChange={(e) => setNewComment({...newComment, author: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Seu email"
              value={newComment.email}
              onChange={(e) => setNewComment({...newComment, email: e.target.value})}
              required
            />
          </div>
          <textarea
            placeholder="Seu comentário"
            value={newComment.content}
            onChange={(e) => setNewComment({...newComment, content: e.target.value})}
            required
          ></textarea>
          <button type="submit">Comentar</button>
        </form>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{comment.author}</strong>
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const HomePage = ({ posts, onSearch }) => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Frontend no Celular</h1>
          <p>Programação frontend para quem não tem computador</p>
          <SearchBar onSearch={onSearch} />
        </div>
      </section>

      <section className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
};

const CategoriesPage = ({ categories }) => {
  return (
    <div className="categories-page">
      <h1>Categorias</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link key={category} to={`/categoria/${category}`} className="category-card">
            <h3>{category}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>Sobre</h1>
      <div className="about-content">
        <p>
          Frontend no Celular é um blog dedicado a programadores que querem desenvolver 
          aplicações frontend usando apenas dispositivos móveis.
        </p>
        <p>
          Criado por Alírio Neto, este espaço compartilha experiências, tutoriais e 
          dicas para quem programa sem computador.
        </p>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contato</h1>
      <div className="contact-content">
        <p>Entre em contato conosco:</p>
        <p>Email: contato@frontendnocelular.com</p>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© Frontend no Celular (Alírio Neto). Todos os direitos reservados.</p>
        <div className="footer-links">
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(true);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (!showSplash) {
      fetchPosts();
      fetchCategories();
    }
  }, [showSplash]);

  const fetchPosts = async (search = '') => {
    try {
      const url = search 
        ? `${process.env.REACT_APP_BACKEND_URL}/api/posts?search=${encodeURIComponent(search)}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/posts`;
      
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleHeaderFixed = () => {
    setIsHeaderFixed(!isHeaderFixed);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          isFixed={isHeaderFixed}
          toggleFixed={toggleHeaderFixed}
        />
        
        <main className={`main-content ${isHeaderFixed ? 'with-fixed-header' : ''}`}>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage posts={posts} onSearch={fetchPosts} />} 
            />
            <Route 
              path="/post/:id" 
              element={<PostDetailRoute />} 
            />
            <Route 
              path="/categorias" 
              element={<CategoriesPage categories={categories} />} 
            />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/contato" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

const PostDetailRoute = () => {
  const { id } = window.location.pathname.split('/').pop();
  return <PostDetail postId={id} />;
};

export default App;