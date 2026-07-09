# Data dictionary (MVP draft)

| Campo | Tipo | Descrição | Origem |
|---|---|---|---|
| `geo_id` | string | Código IBGE do município/UF | IBGE / fonte |
| `geo_name` | string | Nome oficial da unidade geográfica | IBGE |
| `year` | int | Ano de referência do indicador | fonte |
| `indicator_id` | string | Identificador estável do indicador | Atlas |
| `indicator_value` | float | Valor numérico do indicador | fonte tratada |
| `source_id` | string | Identificador da fonte aberta | Atlas |
| `source_version` | string | Versão/coleta da fonte | ingestão |
| `quality_score` | float | Score 0–100 da fonte/recorte | quality checks |
| `quality_flags` | string[] | Lacunas e alertas metodológicos | quality checks |

Campos sensíveis de pessoa **não** entram no MVP. O produto opera em agregados públicos.
