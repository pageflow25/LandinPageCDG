---
trigger: always_on
---

## 🧠 Mente Operacional do Agent

O agent Antigravity opera sempre em **ciclos controlados**, nunca em improviso.

---

## 🔄 Ciclo de Execução (Obrigatório)

1. **Compreensão**
   - Entender objetivo
   - Identificar restrições
   - Ler contexto completo
2. **Planejamento**
   - Definir responsabilidades
   - Escolher arquitetura mínima
   - Decidir o que NÃO fazer
3. **Execução**
   - Criar estrutura mínima
   - Implementar funcionalidade essencial
   - Evitar otimizações
4. **Validação**
   - Revisar clareza
   - Revisar segurança
   - Revisar performance básica

---

## 🏗️ Arquitetura Padrão Antigravity (Next.js)

- App Router
- Server Components default
- Client Components apenas quando necessário
- API Routes simples e finas
- Regra de negócio fora de rotas

---

## 📁 Processo para Criar Pastas e Arquivos

Antes de criar qualquer pasta ou arquivo, responder:

1. Qual responsabilidade isso atende?
2. Isso é UI, lógica ou integração?
3. Isso será reutilizado?
4. Isso pertence ao server ou client?

Se houver dúvida → **não criar**.

---

## 📂 Estrutura Mental Base

- `app/` → rotas e páginas
- `components/` → UI pura
- `hooks/` → regras reutilizáveis
- `services/` → integrações
- `lib/` → código puro
- `schemas/` → validações
- `types/` → tipagem

Pastas existem para **controle cognitivo**, não conveniência.

---

## 🧩 Regra de Responsabilidade Única

- Um arquivo = um motivo para mudar
- Um componente não busca dados complexos
- Um hook não renderiza UI
- Um service não conhece UI
- Uma rota não contém regra pesada

---

## ✍️ Início Padrão de Arquivos

Todo arquivo deve seguir esta ordem:

1. Imports
2. Tipos / interfaces
3. Função principal
4. Export explícito

Nada implícito.

---

## 🧠 Antes de Escrever Código

O agent deve responder mentalmente:

- Entrada?
- Saída?
- Dependências?
- Possíveis falhas?
- Onde tratar erro?

Sem resposta clara → não escrever.

---

## ✂️ Padrão de Código

- Funções pequenas
- Componentes focados
- JSX limpo
- Sem lógica complexa inline
- Early returns
- Evitar aninhamento profundo

---

## 🔐 Segurança no Workflow

- Validar tudo no server
- Nunca confiar no client
- Nunca expor secrets
- Logs mínimos

---

## ⚡ Performance no Workflow

- Menos dependências
- Menos renders
- Server-first
- Client-only quando necessário

---

## 🧪 Critério de Conclusão

O agent só encerra quando:

- Código está funcional
- Código está simples
- Código está legível
- Código respeita regras
- Código está pronto para humano manter

---

## 🎯 Resultado Esperado

Todo output Antigravity deve gerar:

- Código previsível
- Baixo risco técnico
- Alta legibilidade
- Crescimento saudável