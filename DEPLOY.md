# 🚀 Guia de Deploy - Vercel

## Problema: Deploy Desatualizado

Se o site na Vercel está desatualizado mesmo após commits para `main`, siga estes passos:

### ✅ Solução 1: Redeploy Manual na Vercel

1. Acesse o dashboard da Vercel: https://vercel.com/dashboard
2. Encontre o projeto **Fundeb** ou **fundeb-simulacao**
3. Vá na aba **Deployments**
4. Clique nos **3 pontos** do último deploy
5. Selecione **Redeploy**
6. Aguarde o build concluir

### ✅ Solução 2: Verificar Configuração do Git

1. No dashboard da Vercel, vá em **Settings** → **Git**
2. Verifique se está conectado ao repositório correto: `JoaoSchulz/Fundeb`
3. Verifique se a **Production Branch** está como `main`
4. Verifique se **Auto-deploy** está habilitado

### ✅ Solução 3: Verificar Logs de Erro

1. No dashboard da Vercel, vá em **Deployments**
2. Clique no último deploy
3. Verifique se há erros no build
4. Se houver erros, corriga e faça novo commit

### ✅ Solução 4: Trigger Manual via Git

Execute no terminal:

```bash
# Forçar push que dispara deploy
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

### ✅ Solução 5: Verificar Configuração do Build

O arquivo `vercel.json` foi criado com as configurações corretas:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

Se ainda não funcionar, verifique no dashboard da Vercel:
- **Settings** → **General**
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Framework Preset**: `Vite`

### 🔍 Verificações Importantes

1. **Branch está atualizada?**
   ```bash
   git log origin/main -1
   ```

2. **Build funciona localmente?**
   ```bash
   npm run build
   ```

3. **Vercel está conectado ao repositório correto?**
   - Verificar em Settings → Git

### 📝 Configuração Recomendada

- **Framework**: Vite
- **Node Version**: 18.x ou superior
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `.` (raiz do projeto)

### 🆘 Se Nada Funcionar

1. Desconecte o repositório da Vercel
2. Reconecte o repositório
3. Configure novamente as variáveis de ambiente (se houver)
4. Faça um novo deploy inicial

---

**Última atualização**: Após adicionar `vercel.json` na branch `main`

