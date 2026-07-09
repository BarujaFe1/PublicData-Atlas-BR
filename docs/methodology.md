# Metodologia — PublicData Atlas BR

## Princípios

1. **Uma pergunta forte por release** — o MVP não cobre o Brasil inteiro em todos os domínios.
2. **Fontes versionadas** — cada ingestão registra URL, data de coleta, hash e schema observado.
3. **Qualidade explícita** — completude, atualidade, consistência e cobertura geográfica viram score por fonte.
4. **Limites visíveis** — lacunas, quebras de série e incompatibilidades entre fontes aparecem no produto.
5. **Decisão assistida, não automatizada** — o atlas informa; não substitui análise institucional.

## Pipeline analítico

```txt
Fonte aberta (CSV/API)
  → Ingestão Python (Polars/Pandas)
  → Validação de schema + checks de qualidade
  → Camada DuckDB (bronze → silver → gold)
  → Indicadores + ranking metodológico
  → MapLibre / explorer municipal
  → Relatório público + dicionário de dados
```

## Dimensões do Quality Score (rascunho)

| Dimensão | Peso sugerido | O que mede |
|---|---:|---|
| Completude | 25% | Nulos e campos obrigatórios |
| Atualidade | 20% | Lag vs. calendário esperado da fonte |
| Consistência | 25% | Tipos, ranges, chaves geográficas |
| Cobertura | 15% | Municípios/UFs presentes vs. esperado |
| Rastreabilidade | 15% | Metadados de versão e linhagem |

## Fora de escopo do MVP

- Cobertura multi-domínio nacional
- Alertas em tempo real
- API pública estável
- Colaboração comunitária editável
