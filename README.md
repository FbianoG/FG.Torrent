# FG.Torrent

## Descrição

FG.Torrent é um sistema desenvolvido para centralizar informações pertinentes à recepção hospitalar e facilitar o trabalho administrativo e de atendimento nos hospitais. O sistema oferece funcionalidades como o armazenamento de documentos, geração de guias de internação, manutenção de uma lista de ramais, produção de etiquetas de identificação para pacientes, e gerenciamento de informações detalhadas de cada plano de saúde.

## Estrutura de Arquivos

O projeto está organizado nos seguintes diretórios dentro de `src/`:

- **html/**: Arquivos HTML para a interface do usuário.
- **css/**: Arquivos de estilo CSS.
- **js/**: Scripts JavaScript para lógica na frontend.
- **img/**: Imagens e ícones utilizados no projeto.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **Database**: MongoDB
- **APIs Externas**: ViaCEP para endereços, API interna de códigos TUSS para serviços médicos

## Funcionalidades

- **Salvar Documentos**: Armazenamento de documentos digitalizados.
- **Gerar Guias de Internação**: Automação na criação de guias de internação.
- **Lista de Ramais**: Acesso a uma lista atualizada de ramais hospitalares.
- **Gerar Etiquetas de Identificação**: Etiquetas para identificação dos pacientes.
- **Gerenciar Informações do Plano de Saúde**: Gestão de informações de planos de saúde.
- **Painel de Configurações**: Inclusão, atualização e exclusão de todos os dados armazenados.

## Configuração e Instalação

### Pré-requisitos

- Node.js instalado.
- MongoDB configurado e conectado.

### Instalação

```bash
git clone https://github.com/FbianoG/FG.Torrent.git
npm install
npm start
```

## Integração com APIs Externas

- **API ViaCEP**: Utilizada para o preenchimento automático de endereços no cadastro de pacientes.
- **Códigos TUSS**: Implementação de autocompletação de códigos em guias médicas, facilitando a entrada de dados e reduzindo erros.

## Problemas Conhecidos

- **Segurança**: O token de autenticação é enviado via query, o que pode expor vulnerabilidades de segurança.
- **Tratamento de Erros**: São necessárias melhorias no tratamento de erros no frontend para garantir uma resposta mais adequada aos usuários em caso de falhas.
- **Má Formatação de CSS**: Existem inconsistências e problemas na formatação do CSS, que podem afetar a apresentação e a usabilidade em diferentes dispositivos ou navegadores.
- **Código Confuso**: O código-fonte possui áreas que são difíceis de entender e manter devido ao conhecimento limitado do desenvolvedor na época do desenvolvimento. Isso pode complicar futuras atualizações e manutenções.

## Futuras Melhorias

- **Refatoração do Frontend**: Planeja-se implementar React para melhorar a separação e organização do código.
- **Melhoria na Segurança**: Aprimoramento dos métodos de autenticação para aumentar a segurança da aplicação.
- **Inclusão de Documentos via Firebase Storage**: Para uma gestão mais eficiente e segura de documentos médicos e administrativos.
- **Expansão das Funcionalidades de Guias**: Adicionar mais tipos de guias médicas para ampliar o suporte a diferentes procedimentos e serviços.

## Contribuições

Contribuições são bem-vindas! Se você está interessado em ajudar a melhorar o FG.Torrent, por favor, entre em contato com o administrador do projeto para saber como você pode contribuir.

## Contato

Para mais informações, dúvidas ou sugestões sobre o FG.Torrentl, não hesite em entrar em contato através do email: [fbiano.machado@gmail.com].

