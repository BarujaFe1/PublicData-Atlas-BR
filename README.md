<div align="center">
  <img src="./assets/icon.png" alt="PublicData Atlas BR Logo" width="120" height="120" />

  <h1>PublicData Atlas BR</h1>

  <p><strong>Atlas cívico de dados abertos BR — scores de qualidade, indicadores por UF, mapa e relatório metodológico.</strong></p>
  <p><strong>Civic atlas of Brazilian open data — quality scores, UF indicators, map and methodological report.</strong></p>

  <p>
    <a href="#pt-br">PT-BR</a> ·
    <a href="#en">English</a> ·
    <a href="#live-demo">Live Demo</a> ·
    <a href="#stack--tecnologias">Stack</a> ·
    <a href="#arquitetura--architecture">Architecture</a> ·
    <a href="#quick-start--início-rápido">Quick Start</a> ·
    <a href="#autor--author">Author</a>
  </p>

  <p>
    <a href="https://publicdata-atlas-br.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-publicdata--atlas--br.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-React-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Python" src="https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white" />
    <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-API-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
    <img alt="Lab Demo" src="https://img.shields.io/badge/Status-Lab%20demo-2563EB?style=for-the-badge" />
    <img alt="MIT" src="https://img.shields.io/badge/License-MIT-111827?style=for-the-badge" />
  </p>

  <p>
    <a href="https://publicdata-atlas-br.vercel.app"><strong>Live Demo</strong></a> ·
    <a href="https://github.com/BarujaFe1/PublicData-Atlas-BR"><strong>Repositório</strong></a> ·
    <a href="https://barujafe.vercel.app/"><strong>Portfólio</strong></a> ·
    <a href="https://www.linkedin.com/in/barujafe/"><strong>LinkedIn</strong></a>
  </p>
</div>

<p align="center">
  <img src="./assets/hero-cover.png" alt="PublicData Atlas BR overview" width="100%" />
</p>

---

<a id="pt-br"></a>

## PT-BR

## Visão geral

**PublicData Atlas BR** é um lab de atlas cívico: qualidade de fontes, indicadores por UF, mapa esquemático e relatório metodológico — com seeds sintéticos de educação para demo segura.

> **Aviso de lab:** demo de portfólio com dados sintéticos/amostra. Não é produto em produção com SLA, integrações reais de clientes ou garantia operacional.

---

## Problema

Dados abertos brasileiros existem, mas qualidade, cobertura e metodologia raramente aparecem juntas em uma narrativa auditável.

---

## Para quem

- Jornalistas de dados e civic tech
- Analistas de políticas públicas
- Engenheiros interessados em open data BR

---

## Funcionalidades

- Score de qualidade por fonte
- Indicadores por UF
- Mapa esquemático
- Relatório metodológico
- Camadas bronze/silver/gold + seeds

---

## Escopo e limites

- **É:** lab cívico com seeds sintéticos de educação.
- **Não é:** portal oficial de governo, dados em tempo real de todas as UFs, BI enterprise.

---

<a id="en"></a>

## English

## Overview

**PublicData Atlas BR** is a civic-atlas lab: source quality, UF indicators, schematic map and methodological report — with synthetic education seeds for a safe demo.

> **Lab notice:** portfolio demo with synthetic/sample data. Not a production product with SLA, real customer integrations, or operational guarantees.

---

## Problem

Brazilian open data exists, but quality, coverage and methodology rarely appear together in an auditable narrative.

---

## Who it is for

- Data journalists and civic-tech builders
- Public-policy analysts
- Engineers interested in Brazilian open data

---

## Features

- Per-source quality score
- UF indicators
- Schematic map
- Methodological report
- Bronze/silver/gold layers + seeds

---

## Scope and limits

- **Is:** civic lab with synthetic education seeds.
- **Is not:** official government portal, realtime all-UF feeds, enterprise BI.

---

<a id="live-demo"></a>

## Live Demo

**URL:** [https://publicdata-atlas-br.vercel.app](https://publicdata-atlas-br.vercel.app)

Demo hospedada para avaliação de portfólio / Hosted for portfolio review.

> Lab demo — synthetic / sample data unless noted. Not a production SLA product.

---

<a id="stack--tecnologias"></a>

## Stack / Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| Next.js 15 / React 19 / TypeScript | Frontend |
| FastAPI / Pandas / Polars / DuckDB | Backend analítico |
| Pytest / httpx | Testes |

---

<a id="arquitetura--architecture"></a>

## Arquitetura / Architecture

Separação ackend/ + rontend/ com pipeline de dados em data/ (raw → bronze → silver → gold).

`	xt
PublicData-Atlas-BR/
├── backend/
├── frontend/
├── data/
│   ├── raw/ bronze/ silver/ gold/ seed/
├── assets/
├── docs/
├── scripts/
└── start.bat
`

---

<a id="quick-start--início-rápido"></a>

## Quick Start / Início rápido

### Pré-requisitos / Requirements

- Node.js 20+
- Python 3.12+
- npm

### Clonar / Clone

`ash
git clone https://github.com/BarujaFe1/PublicData-Atlas-BR.git
cd PublicData-Atlas-BR
`

### Backend

`ash
cd backend
python -m venv .venv
# activate venv
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
`

### Frontend

`ash
cd frontend
npm install
npm run dev
`

Ou use start.bat no Windows.


---

## Technical decisions / Decisões técnicas

- **Polars/DuckDB** para camadas analíticas leves.
- **Seeds sintéticos** — honestidade sobre não ser feed oficial.
- **Relatório metodológico** como artefato de confiança.

---

## Roadmap

### Implementado
- Scores, UF, mapa, relatório, demo Vercel

### Planejado
- Mais temas além de educação
- Ingestão documentada de fontes reais (com cache)
- Comparativos temporais

---

<a id="autor--author"></a>

## Autor / Author

Developed by **Felipe Alirio Baruja**.

- **Portfolio:** [https://barujafe.vercel.app/](https://barujafe.vercel.app/)
- **GitHub:** [github.com/BarujaFe1](https://github.com/BarujaFe1)
- **LinkedIn:** [linkedin.com/in/barujafe](https://www.linkedin.com/in/barujafe/)
- **Repository:** [github.com/BarujaFe1/PublicData-Atlas-BR](https://github.com/BarujaFe1/PublicData-Atlas-BR)

---

## License / Licença

MIT License.

See [LICENSE](./LICENSE) for details.

---

<div align="center">
  <p><strong>PublicData Atlas BR</strong></p>
  <p>Atlas cívico com qualidade e método visíveis.</p>
  <p><em>Civic atlas with visible quality and method.</em></p>
</div>
