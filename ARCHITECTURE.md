# Context

- Ceramic architecture > 3 years old, designed for isomorphism and stream types
  as public APIs
- ComposeDB different product than Ceramic, needs an architecture that matches
  its product needs
- ComposeDB “beta” is a PoC implementation hacked on top of Ceramic's
  constraints, not designed for production

# Architecture overview

## Services-based

- SOA for clear separation of concerns
- Shared messaging layer (RxJS Subject)

## RPC

- JSON-RPC communication between services (tRPC)

## Shared structures

- Codecs for shared data structures (io-ts)

## Scalability

- Can scale up (services running in different OS threads or even data centers)
  and down (single thread, low overhead)

## Reliability

- Services monitoring, interruption and restart

## Dependencies diagram

```mermaid
flowchart TD
  subgraph Clients
    DEVC[devtools client]
    RUNC[runtime client]
  end
  DEVC --> CERC & MODC
  RUNC --> CERC & DOCC

  subgraph Server
    SER[server]
    SRUN[services-runner]
  end
  DEVC & RUNC -.->|RPC| SER
  SER --> SRUN
  SER -.->|RPC| COMS
  SRUN --> CERS & COMS & DBS & SRPC

  subgraph Services
    CERS[ceramic-service]
    COMS[composite-service]
    DBS[database-service]
    COMS -.->|RPC| CERS & DBS
  end
  CERS & COMS & DBS --> SRPC
  COMS --> CERC & COMC & DOCC & JSSC & GRAC & MODC
  CERS --> CERC
  DBS --> DOCC & GRAC & MODC

  subgraph Codecs
    CERC[ceramic-codecs]
    COMC[composite-codecs]
    DOCC[document-codecs]
    GRAC[graph-codecs]
    JSSC[json-schema-codecs]
    MODC[model-codecs]
  end
  COMC --> CERC & JSSC & GRAC & MODC
  DOCC --> CERC
  GRAC --> CERC & JSSC & MODC
  MODC --> CERC & JSSC

  subgraph Services dependencies
    SRPC[services-rpc]
  end
```
