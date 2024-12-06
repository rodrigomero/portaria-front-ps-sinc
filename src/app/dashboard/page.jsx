"use client";

import { useContext } from "react";
import ListingTable from "../components/listingTable";
import NewInspectionModal from "../components/NewInspectionModal";
import { UserContext } from "../context/userContext";
import "../styles/listagem.css";

export default function Dashboard() {
  const { setIsNewModalOpen } = useContext(UserContext);

  let endpoint = "/inspection";

  let headers = [
    "ID",
    "Carro",
    "Motorista",
    "Empresa",
    "Operação",
    "Responsável",
  ];

  let columns = [
    { data: "id" },
    {
      data: "car",
      render: (data) => `${data.brand} ${data.model} ${data.releaseYear}`,
    },
    { data: "driver", render: (data) => data.staff.name },
    {
      data: "driver",
      render: (data) => data.company.name,
    },
    {
      data: "type",
      render: (data) => data[0] + data.slice(1).toLowerCase(),
    },
    {
      data: "staff",
      render: (data) => data.name,
    },
  ];

  let extra = {};

  return (
    <main>
      <div>
        <NewInspectionModal />
        <ListingTable
          endpoint={endpoint}
          headers={headers}
          columns={columns}
          extra={extra}
        >
          <div className="container-title">
            <h1 className="listagem-titulo align-self-center">Dashboard</h1>
            <button
              className="btn-abrir-modal"
              onClick={() => setIsNewModalOpen(true)}
            >
              Registrar ação
            </button>
          </div>
        </ListingTable>
      </div>
    </main>
  );
}
