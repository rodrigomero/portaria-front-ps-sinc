"use client";

import ListingTable from "../components/listingTable";
import "../styles/listagem.css";

export default function ListagemCarros() {
  let endpoint = "/driver";

  let headers = ["ID", "Nome", "Empresa", "CNH", "Idade"];

  let columns = [
    { data: "id" },
    { data: "staff", render: (data) => data.name },
    { data: "company", render: (data) => data.name },
    { data: "cnh" },
    { data: "age" },
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
            <h1 className="listagem-titulo align-self-center">Motoristas</h1>
          </div>
        </ListingTable>
      </div>
    </main>
  );
}
