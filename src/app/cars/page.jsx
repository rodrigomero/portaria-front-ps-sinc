"use client";

import ListingTable from "../components/listingTable";

import "../styles/listagem.css";

export default function ListagemCarros() {
  let endpoint = "/car";

  let headers = [
    "ID",
    "Carro",
    "Motorista",
    "Cor",
    "Placa",
    "Status",
    "Ultima manutenção",
  ];

  let columns = [
    { data: "id" },
    { data: "brand" },
    { data: "model" },
    { data: "releaseYear" },
    { data: "color" },
    { data: "plate" },
    {
      data: "type",
      render: (data) => data[0] + data.slice(1).toLowerCase(),
    },
    {
      data: "status",
      render: (data) => data[0] + data.slice(1).toLowerCase(),
    },
    {
      data: "lastMaintenance",
      render: (data) => new Date(data).toDateString(),
    },
  ];

  let extra = {};

  return (
    <main>
      <div>
        <ListingTable
          endpoint={endpoint}
          headers={headers}
          columns={columns}
          extra={extra}
        >
          <div className="container-title">
            <h1 className="listagem-titulo align-self-center">Carros</h1>
          </div>
        </ListingTable>
      </div>
    </main>
  );
}
