# Setup — Quiz Diagnóstico

## 1. Firebase — Criar o Firestore

No [Firebase Console](https://console.firebase.google.com/):

1. Abrir o projeto **aulas-ab703**
2. Menu lateral → **Build** → **Firestore Database**
3. Clicar em **Create database**
4. Escolher **Start in test mode** (para desenvolvimento)
5. Selecionar a região mais próxima (ex.: `europe-west1`)
6. Clicar **Enable**

### Regras de segurança (produção)

Depois de testar, atualizar as regras em **Firestore → Rules**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quiz-respostas/{document} {
      allow create: true;        // qualquer um pode enviar respostas
      allow read: true;          // dashboard lê os resultados
      allow update, delete: if false; // ninguém altera ou apaga
    }
  }
}
```

## 2. Rodar localmente

```bash
cd quiz-diagnostico
npm install
npm run dev
# → http://localhost:3000
```

## 3. Deploy na Vercel

```bash
# Opção 1: Via CLI
npm install -g vercel
vercel

# Opção 2: Via GitHub
# Push para GitHub e importar na vercel.com
```

### Variáveis de ambiente na Vercel

Em **Settings → Environment Variables**, adicionar:

| Variável | Valor |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | AIzaSyCKennAbel-WgTnZnlw1YMCxEhvy_eOf5o |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | aulas-ab703.firebaseapp.com |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | aulas-ab703 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | aulas-ab703.firebasestorage.app |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 410627580818 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | 1:410627580818:web:bc15c7e8f0a1025a35d74b |
| `NEXT_PUBLIC_DASHBOARD_PASSWORD` | (sua senha de acesso) |

## 4. URLs da aplicação

| Página | URL | Quem usa |
|---|---|---|
| Início | `/` | Alunos |
| Quiz | `/quiz` | Alunos |
| Resultado | `/resultado` | Alunos (após enviar) |
| Dashboard | `/dashboard` | Instrutor |

## 5. Alterar senha do dashboard

Editar a variável `NEXT_PUBLIC_DASHBOARD_PASSWORD` no `.env.local` (local) ou nas Environment Variables da Vercel (produção).
