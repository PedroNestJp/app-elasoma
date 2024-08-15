
# Soma README

## 1. Instalação do Projeto

1. Clone o repositório:
   \`\`\`bash
   git clone https://bitbucket.org/suporte-qualitare/app-elasoma.git
   \`\`\`
2. Selecione a branch alvo:
   \`\`\`bash
   git checkout <nome-da-branch>
   \`\`\`

## 2. Configuração do Ambiente

### 2.1. Gerenciamento de Versões do Node

1. Instale o [NVM para Windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe).
2. No terminal, execute os seguintes comandos:
   \`\`\`bash
   nvm install 18
   nvm use 18
   nvm current
   \`\`\`
   - **OBS:** Certifique-se de que a versão do Node seja a \`v18.x.x\`.

### 2.2. Instalação do JDK 11

1. Baixe e instale o [JDK 11 da Oracle](https://download.oracle.com/otn/java/jdk/11.0.24%2B7/21cffd70ff1e41a3a5ef9898f46e442d/jdk-11.0.24_windows-x64_bin.exe).
   - **OBS:** Se o link não funcionar, faça login na plataforma da Oracle para baixar o JDK.

### 2.3. Configuração de Variáveis de Ambiente

1. Pressione a tecla Windows e pesquise por "Variáveis de Ambiente".
2. Nas **Variáveis de Usuário**, procure por \`JAVA_HOME\`. Caso não exista:
   - Clique em "Novo..." e adicione:
     - **Nome da variável:** \`JAVA_HOME\`
     - **Valor da variável:** \`C:\Program Files\Java\jdk-11\`
3. Caso já exista, clique em \`JAVA_HOME\` e selecione "Editar...".
4. Nas **Variáveis de Sistema**, procure por \`Path\`:
   - Clique em "Novo" e adicione:
     - \`C:\Program Files\Java\jdk-11\bin\`

## 3. Executando o Projeto

1. Instale as dependências:
   \`\`\`bash
   yarn install
   \`\`\`
   - Se ocorrerem erros, tente:
     \`\`\`bash
     yarn cache clean
     rm -rf node_modules
     rm yarn.lock
     yarn install
     \`\`\`

### 3.1. Configuração do Android Studio

1. Baixe e instale o [Android Studio](https://redirector.gvt1.com/edgedl/android/studio/install/2024.1.1.13/android-studio-2024.1.1.13-windows.exe).
2. Siga o [guia de configuração do ambiente de desenvolvimento React Native](https://reactnative.dev/docs/set-up-your-environment).
3. No Android Studio:
   - Clique em "More Actions" > "Virtual Device Manager".
   - Se necessário, crie um novo emulador (ex: Pixel 8 ou 6a).
   - Execute o emulador clicando no botão "Play".

### 3.2. Executando no Emulador

1. Com o emulador aberto, execute:
   \`\`\`bash
   yarn android
   \`\`\`
   - **OBS:** Se ocorrerem erros relacionados a variáveis de ambiente após a configuração das mesmas, verique se estão configuradas corretamente e reinicie o seu computador (como \`ANDROID_HOME\`), reinicie o computador.

2. Se necessário, execute:
   \`\`\`bash
   cd android
   ./gradlew clean
   cd ..
   yarn start --reset-cache
   \`\`\`

## 4. Setups da Aplicação

### 4.1. Modo de Desenvolvimento

1. Use a variável \`apiDevKey\` no \`firebase.js\` (em \`src/config/firebase.js\`).
2. Copie o conteúdo de \`android/app/src/google-services-dev.json\` para \`android/app/src/google-services.json\`.

### 4.2. Modo de Produção

1. Use a variável \`apiProductionKey\` no \`firebase.js\` (em \`src/config/firebase.js\`).
2. Copie o conteúdo de \`android/app/src/google-services-production.json\` para \`android/app/src/google-services.json\`.

### 4.3. Build

- O APK foi gerado utilizando o [App Center](https://appcenter.ms/).

## 5. Versões do Projeto

- **React-Native:** 0.66.5
- **Gradle:** 6.8.3
