# Projeto: Reage Brasil - Plataforma de Voluntariado e Transparência

## Descrição Geral
O **Reage Brasil** é uma plataforma front-end desenvolvida para uma ONG voltada à resposta a desastres e apoio social.  
Este projeto foi criado como parte do trabalho final da disciplina de Front-End, com o objetivo de aplicar na prática conceitos de desenvolvimento profissional — como arquitetura modular em JavaScript, criação de uma Single Page Application, acessibilidade e otimização para produção.

## Funcionalidades Principais
- **Arquitetura Modular:** O código JavaScript foi organizado em módulos (IIFE) para facilitar manutenção e separar responsabilidades.
- **Single Page Application:** A navegação entre as páginas ocorre sem recarregar o navegador, utilizando a API.
- **Painel de Inscrições:** Simula uma área administrativa (painel.html) com autenticação e exibição de dados de voluntários salvos localmente (módulo 'ModStorage').
- **Gráficos com Chart.js:** A página de Transparência exibe gráficos interativos sobre a distribuição de recursos e crescimento de voluntários.
- **Validação de Formulários:** Campos são verificados em tempo real, com mensagens claras em caso de erro.
- **Temas Acessíveis:** A plataforma oferece Modo Escuro e versão de Alto Contraste (preto e branco) para garantir legibilidade.

## Tecnologias e Desafios
O projeto foi construído com **HTML5, CSS3 (variáveis e Flexbox) e JavaScript (ES6).  
Durante o desenvolvimento, o maior desafio foi ajustar o layout para garantir alinhamento preciso dos elementos interativos. Em alguns casos, foi necessário recorrer a pequenos ajustes com '' transform: translateY() ''.

### APIs e Bibliotecas
- **ViaCEP:** Usada para preenchimento automático de endereço no formulário de voluntariado.
- **Chart.js:** Responsável pelos gráficos dinâmicos na seção de Transparência.

## Práticas Profissionais e Entrega Final (4).

### 1. Versionamento (GitFlow)
O projeto seguiu a estratégia **GitFlow**, com a branch principal 'develop' e criação de branches de funcionalidade (feature). Todos os merges foram feitos via Pull Request.  
Os commits seguem uma convenção semântica, usando prefixos como feat:, fix: e refactor:.

### 2. Acessibilidade (WCAG 2.1 - Nível AA)
- **Navegação via teclado** e uso de HTML semântico (<main>, <nav>, <section>).
- **Contraste mínimo de 4.5:1**, validado para todos os elementos.
- **Compatibilidade com leitores de tela**, usando ''aria-label'' e ''alt'' corretamente.

### 3. Otimização para Produção
- **Minificação** dos arquivos CSS, JS e HTML.
- **Compressão** de imagens para reduzir o tempo de carregamento.
