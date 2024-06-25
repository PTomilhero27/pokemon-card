# Projeto Pokémon Card

Bem-vindo ao Projeto Pokémon Card! Siga estes passos para configurar e executar o projeto.

## Pré-requisitos

Certifique-se de ter os seguintes programas instalados:
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes preferido)

## Instalação

1. **Clone o repositório**:
   ```Markdown
   git clone https://github.com/seuusuario/pokemon-card.git
   cd pokemon-card
   ```
2. **Instale as dependências**:
   ```Markdown
   pnpm install
   ```
3. **Configuração do Ambiente**:
   - Crie os arquivos `src/environments/environment.ts` e `src/environments/environment.prod.ts` com base no exemplo fornecido:
     ```Markdown
     // environment.ts
     export const environment = {
       production: false,
       apiKey: 'SUA_CHAVE_API_AQUI'
     };

     // environment.prod.ts
     export const environment = {
       production: true,
       apiKey: 'SUA_CHAVE_API_AQUI'
     };
     ```
   - Na Vercel, configure as variáveis de ambiente no painel de configurações do projeto:
     - Nome: `API_KEY`
     - Valor: [Pokemontcg](https://dev.pokemontcg.io/dashboard) (Entre nesse site e consiga sua API do pokemon) 

## Scripts

- **Iniciar o Servidor de Desenvolvimento**:
  ```Markdown
  pnpm start
  ```
  Acesse a aplicação em `http://localhost:4200`.

- **Build para Produção**:
  ```Markdown
  pnpm build
  ```
- **Assistir por Mudanças**:
  ```Markdown
  pnpm watch
  ```
- **Executar Testes**:
  ```Markdown
  pnpm test
  ```
- **Servir SSR (Server-Side Rendering)**:
  ```Markdown
  pnpm run serve:ssr:pokemon-card
  ```

## Dependências

- **Angular**: Framework principal para a aplicação.
- **PrimeNG**: Biblioteca de componentes UI.
- **Bootstrap**: Framework CSS para design responsivo.
- **Express**: Framework web para Node.js (usado para SSR).
- **RxJS**: Biblioteca de programação reativa.

## Ferramentas de Desenvolvimento

- **@angular/cli**: Ferramenta de linha de comando para Angular.
- **Jasmine**: Framework de testes.
- **Karma**: Executor de testes para Jasmine.
- **Typescript**: Superset do JavaScript que adiciona tipagem estática.

## Variáveis de Ambiente

- **apiKey**: Sua chave de API para acessar a API Pokémon TCG.

Certifique-se de **nunca cometer seus arquivos `environment.ts` ou `environment.prod.ts` com informações sensíveis** no repositório. Sempre use configurações específicas para o ambiente e proteja suas chaves de API.

Feliz codificação! Se você encontrar algum problema, sinta-se à vontade para abrir uma issue no repositório.
