import asyncio
import uuid
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

# Sample posts about "Frontend no Celular"
posts_data = [
    {
        "id": str(uuid.uuid4()),
        "title": "Como Começar no Frontend Usando Apenas o Celular",
        "content": """
        <p>Programar frontend no celular não é mais um sonho distante. Com as ferramentas certas e algumas técniques, é possível criar interfaces incríveis usando apenas seu smartphone.</p>
        
        <h3>Ferramentas Essenciais</h3>
        <ul>
            <li><strong>Termux</strong> - Terminal Linux completo para Android</li>
            <li><strong>Spck Code Editor</strong> - Editor com preview em tempo real</li>
            <li><strong>CodePen</strong> - Para testes rápidos de HTML/CSS/JS</li>
            <li><strong>GitHub Mobile</strong> - Gerenciamento de repositórios</li>
        </ul>
        
        <h3>Configuração Inicial</h3>
        <p>O primeiro passo é instalar o Termux e configurar um ambiente de desenvolvimento básico:</p>
        <code>pkg install git nodejs-lts</code>
        
        <h3>Dicas de Produtividade</h3>
        <p>Use teclados externos e suportes para melhorar sua experiência de programação móvel.</p>
        """,
        "excerpt": "Descubra como começar sua jornada no desenvolvimento frontend usando apenas seu smartphone.",
        "category": "Iniciante",
        "tags": ["termux", "mobile", "setup", "ferramentas"],
        "author": "Frontend no Celular (Alírio Neto)",
        "image_url": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
        "video_url": "",
        "source_urls": [
            "https://termux.com/",
            "https://spck.io/",
            "https://codepen.io/"
        ],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "CSS Grid e Flexbox no Mobile: Guia Prático",
        "content": """
        <p>Criar layouts responsivos usando CSS Grid e Flexbox diretamente no celular é uma habilidade fundamental para o desenvolvedor mobile.</p>
        
        <h3>CSS Grid no Celular</h3>
        <p>O CSS Grid permite criar layouts complexos de forma simples:</p>
        <code>
        .container { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 1rem; 
        }
        </code>
        
        <h3>Flexbox para Componentes</h3>
        <p>Use Flexbox para alinhar componentes menores:</p>
        <code>
        .flex-container { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
        }
        </code>
        
        <h3>Testando no Próprio Dispositivo</h3>
        <p>A vantagem de programar no celular é testar instantaneamente como o layout fica em dispositivos móveis reais.</p>
        """,
        "excerpt": "Aprenda a dominar CSS Grid e Flexbox programando diretamente no seu celular.",
        "category": "CSS",
        "tags": ["css", "grid", "flexbox", "responsive", "layout"],
        "author": "Frontend no Celular (Alírio Neto)",
        "image_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        "video_url": "https://www.youtube.com/embed/jV8B24rSN5o",
        "source_urls": [
            "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
            "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout"
        ],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "JavaScript Moderno: ES6+ no Desenvolvimento Mobile",
        "content": """
        <p>O JavaScript moderno oferece funcionalidades que facilitam muito o desenvolvimento no celular. Vamos explorar as principais features do ES6+.</p>
        
        <h3>Arrow Functions</h3>
        <p>Sintaxe mais limpa e menos digitação no teclado touch:</p>
        <code>const add = (a, b) => a + b;</code>
        
        <h3>Template Literals</h3>
        <p>Facilita a criação de strings dinâmicas:</p>
        <code>const message = `Olá, ${name}! Hoje é ${new Date().toLocaleDateString()}`;</code>
        
        <h3>Destructuring</h3>
        <p>Extraia dados de objetos e arrays de forma elegante:</p>
        <code>const { name, age } = user;</code>
        
        <h3>Async/Await</h3>
        <p>Trabalhe com APIs de forma mais intuitiva:</p>
        <code>
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        </code>
        """,
        "excerpt": "Domine as funcionalidades modernas do JavaScript para desenvolvimento frontend no celular.",
        "category": "JavaScript",
        "tags": ["javascript", "es6", "modern", "async", "functions"],
        "author": "Frontend no Celular (Alírio Neto)",
        "image_url": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
        "video_url": "",
        "source_urls": [
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            "https://javascript.info/"
        ],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "React no Celular: Criando Componentes Touch-First",
        "content": """
        <p>Desenvolver aplicações React pensando em touch-first muda completamente a experiência do usuário. Vamos ver como criar componentes otimizados para toque.</p>
        
        <h3>Componentes Touch-Friendly</h3>
        <p>Sempre considere o tamanho mínimo de 44px para elementos clicáveis:</p>
        <code>
        const TouchButton = ({ children, onClick }) => (
            &lt;button 
                style={{ minHeight: '44px', minWidth: '44px', padding: '12px' }}
                onClick={onClick}
            &gt;
                {children}
            &lt;/button&gt;
        );
        </code>
        
        <h3>Gestos e Interações</h3>
        <p>Use eventos de toque para melhorar a experiência:</p>
        <code>
        const SwipeCard = () => {
            const handleTouchStart = (e) => {
                // Lógica de swipe
            };
            
            return (
                &lt;div 
                    onTouchStart={handleTouchStart}
                    style={{ touchAction: 'pan-y' }}
                &gt;
                    Conteúdo do card
                &lt;/div&gt;
            );
        };
        </code>
        
        <h3>Performance em Dispositivos Móveis</h3>
        <p>Use React.memo e useMemo para otimizar componentes pesados.</p>
        """,
        "excerpt": "Aprenda a criar componentes React otimizados para dispositivos touch.",
        "category": "React",
        "tags": ["react", "components", "touch", "mobile-first", "ux"],
        "author": "Frontend no Celular (Alírio Neto)",
        "image_url": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
        "video_url": "https://www.youtube.com/embed/Ke90Tje7VS0",
        "source_urls": [
            "https://react.dev/",
            "https://web.dev/mobile-ux/"
        ],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Git e GitHub no Celular: Workflow Completo",
        "content": """
        <p>Gerenciar código usando Git diretamente no celular é essencial para o desenvolvedor móvel. Vamos ver como criar um workflow eficiente.</p>
        
        <h3>Configuração do Git no Termux</h3>
        <code>
        git config --global user.name "Seu Nome"
        git config --global user.email "seu@email.com"
        git config --global init.defaultBranch main
        </code>
        
        <h3>Comandos Essenciais</h3>
        <p>Os comandos mais usados no dia a dia:</p>
        <ul>
            <li><code>git status</code> - Verificar estado dos arquivos</li>
            <li><code>git add .</code> - Adicionar mudanças</li>
            <li><code>git commit -m "mensagem"</code> - Commitar</li>
            <li><code>git push origin main</code> - Enviar para o GitHub</li>
        </ul>
        
        <h3>GitHub Mobile</h3>
        <p>Use o app oficial do GitHub para:</p>
        <ul>
            <li>Revisar pull requests</li>
            <li>Responder issues</li>
            <li>Acompanhar notificações</li>
            <li>Fazer code review básico</li>
        </ul>
        
        <h3>Aliases Úteis</h3>
        <code>
        git config --global alias.st status
        git config --global alias.co checkout
        git config --global alias.br branch
        </code>
        """,
        "excerpt": "Domine o Git e GitHub Mobile para um workflow completo no seu smartphone.",
        "category": "Git",
        "tags": ["git", "github", "version-control", "workflow", "termux"],
        "author": "Frontend no Celular (Alírio Neto)",
        "image_url": "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
        "video_url": "",
        "source_urls": [
            "https://git-scm.com/docs",
            "https://github.com/mobile"
        ],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

async def seed_database():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client.blog_database
    
    # Insert posts
    await db.posts.delete_many({})  # Clear existing posts
    await db.posts.insert_many(posts_data)
    
    print(f"Inserted {len(posts_data)} posts successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())