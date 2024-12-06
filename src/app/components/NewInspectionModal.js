/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
"use client";

import DT from "datatables.net-dt";
import DataTable from "datatables.net-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import "../styles/listagem.css";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

DataTable.use(DT);
const NewInspectionModal = () => {
  const {
    formData,
    setFormData,
    isNewModalOpen,
    setIsNewModalOpen,
    isInspectionModalOpen,
    SetIsInspectionModalOpen,
  } = useContext(UserContext);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/driver`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
      })
      .catch((error) => console.error("Erro resgatar motoristas:", error));

    fetch(`${baseUrl}/car`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => console.error("Erro resgatar carros:", error));
  }, []);

  const closeModal = () => {
    setFormData({
      carId: 1,
      driverId: 1,
      type: 0,
      inspectorId: 1,
      inspectionDetails: {
        pneus: false,
        rodas: false,
        freioDeMao: false,
        estepe: false,
        freioDePe: false,
        embreagem: false,
        luzesPainel: false,
        buzina: false,
        farolAlto: false,
        farolBaixo: false,
        setas: false,
        luzEmergencia: false,
        luzFreio: false,
        luzRe: false,
        retrovisor: false,
        nivelAgua: false,
        limpadorParabrisa: false,
        oleoMotor: false,
        pintura: false,
        limpeza: false,
        parabrisa: false,
        semRiscos: false,
        semAmassados: false,
        lateralMotorista: false,
        lateralPassageiro: false,
        traseira: false,
        frente: false,
      },
    });
    setIsNewModalOpen(false);
    SetIsInspectionModalOpen(false);
  };

  const router = useRouter();
  const handlePartialSubmit = (e) => {
    e.preventDefault();
    setIsNewModalOpen(false);
    SetIsInspectionModalOpen(true);
  };

  function handleSubmit(e) {
    e.preventDefault();

    let tempForm = formData;
    console.log(tempForm);

    for (let i = 0; i < 44; i += 2) {
      if (e.target[i].checked) {
        tempForm.inspectionDetails[e.target[i].name] = true;
      }
    }
    console.log(tempForm);

    fetch(`${baseUrl}/inspection/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempForm),
    })
      .then((response) => response.json())
      .then(() => {
        SetIsInspectionModalOpen(false);
        setIsNewModalOpen(false);
        router.push(`/dashboard`);
      })
      .catch((error) => console.error("Erro ao criar inspeção:", error));
  }

  function handleChange({ target }) {
    formData[target.name] = target.value;
    setFormData(formData);
  }

  const types = {
    0: "Entrada",
    1: "Saída",
    2: "Rotina",
  };

  return (
    <div>
      {isNewModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Registrar inspeção</h2>
            <form
              onSubmit={handlePartialSubmit}
              onChange={(e) => handleChange(e)}
            >
              <div>
                <label htmlFor="type">Ação:</label>

                <select name="type" id="type">
                  {Object.keys(types).map((key, index) => (
                    <option key={`${index}id`} value={key}>
                      {types[key]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="driverId">Motorista:</label>

                <select name="driverId" id="driverId">
                  {drivers.map((e) => (
                    <option key={`${e.id}id`} value={e.id}>
                      {`${e.id} - ${e.staff.name} `}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="carId">Carro:</label>

                <select name="carId" id="carId">
                  {cars.map((e) => (
                    <option key={`${e.id}id`} value={e.id}>
                      {`${e.id} - ${e.brand} ${e.model} ${e.releaseYear} (${e.plate})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-btns">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-fechar-modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  Inspecionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isInspectionModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-checklist">
            <h2>Checklist</h2>
            <form onSubmit={handleSubmit}>
              <div className="checklist-container">
                <div className="half-modal">
                  <div className="radio-group">
                    <div className="header-group">
                      <span>Status</span>
                      <span>Conforme</span>
                      <span>Não-Conforme</span>
                    </div>
                  </div>
                  <div className="radio-group">
                    <label htmlFor="pneus">Pneus</label>
                    <div className="input-group">
                      <input type="radio" name="pneus"></input>
                      <input type="radio" name="pneus"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="rodas">Rodas</label>
                    <div className="input-group">
                      <input type="radio" name="rodas"></input>
                      <input type="radio" name="rodas"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="freioDeMao">Freio de Mão</label>
                    <div className="input-group">
                      <input type="radio" name="freioDeMao"></input>
                      <input type="radio" name="freioDeMao"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="estepe">Estepe</label>
                    <div className="input-group">
                      <input type="radio" name="estepe"></input>
                      <input type="radio" name="estepe"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="freioDePe">Freio de Pé</label>
                    <div className="input-group">
                      <input type="radio" name="freioDePe"></input>
                      <input type="radio" name="freioDePe"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="embreagem">Embreagem</label>
                    <div className="input-group">
                      <input type="radio" name="embreagem"></input>
                      <input type="radio" name="embreagem"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="luzesPainel">Luzes do Painel</label>
                    <div className="input-group">
                      <input type="radio" name="luzesPainel"></input>
                      <input type="radio" name="luzesPainel"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="buzina">Buzina</label>
                    <div className="input-group">
                      <input type="radio" name="buzina"></input>
                      <input type="radio" name="buzina"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="farolAlto">Farol Alto</label>
                    <div className="input-group">
                      <input type="radio" name="farolAlto"></input>
                      <input type="radio" name="farolAlto"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="farolBaixo">Farol Baixo</label>
                    <div className="input-group">
                      <input type="radio" name="farolBaixo"></input>
                      <input type="radio" name="farolBaixo"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="setas">Setas</label>
                    <div className="input-group">
                      <input type="radio" name="setas"></input>
                      <input type="radio" name="setas"></input>
                    </div>
                  </div>
                </div>
                <div className="half-modal">
                  <div className="radio-group">
                    <div className="header-group">
                      <span>Status</span>
                      <span>Conforme</span>
                      <span>Não-Conforme</span>
                    </div>
                  </div>
                  <div className="radio-group">
                    <label htmlFor="luzEmergencia">Luz de Emergência</label>
                    <div className="input-group">
                      <input type="radio" name="luzEmergencia"></input>
                      <input type="radio" name="luzEmergencia"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="luzFreio">Luz de Freio</label>
                    <div className="input-group">
                      <input type="radio" name="luzFreio"></input>
                      <input type="radio" name="luzFreio"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="luzRe">Luz de Ré</label>
                    <div className="input-group">
                      <input type="radio" name="luzRe"></input>
                      <input type="radio" name="luzRe"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="retrovisor">Retrovisor</label>
                    <div className="input-group">
                      <input type="radio" name="retrovisor"></input>
                      <input type="radio" name="retrovisor"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="nivelAgua">Nível de Água</label>
                    <div className="input-group">
                      <input type="radio" name="nivelAgua"></input>
                      <input type="radio" name="nivelAgua"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="limpadorParabrisa">
                      Limpador de Para-brisa
                    </label>
                    <div className="input-group">
                      <input type="radio" name="limpadorParabrisa"></input>
                      <input type="radio" name="limpadorParabrisa"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="oleoMotor">Óleo do Motor</label>
                    <div className="input-group">
                      <input type="radio" name="oleoMotor"></input>
                      <input type="radio" name="oleoMotor"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="pintura">Pintura</label>
                    <div className="input-group">
                      <input type="radio" name="pintura"></input>
                      <input type="radio" name="pintura"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="limpeza">Limpeza</label>
                    <div className="input-group">
                      <input type="radio" name="limpeza"></input>
                      <input type="radio" name="limpeza"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="volante">Volante</label>
                    <div className="input-group">
                      <input type="radio" name="volante"></input>
                      <input type="radio" name="volante"></input>
                    </div>
                  </div>

                  <div className="radio-group">
                    <label htmlFor="bancos">Bancos</label>
                    <div className="input-group">
                      <input type="radio" name="bancos"></input>
                      <input type="radio" name="bancos"></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-btns">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-fechar-modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  Inspecionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewInspectionModal;
