"use client";

import { createContext, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isInspectionModalOpen, SetIsInspectionModalOpen] = useState(false);
  const [formData, setFormData] = useState({
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

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isNewModalOpen,
        setIsNewModalOpen,
        formData,
        setFormData,
        isInspectionModalOpen,
        SetIsInspectionModalOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
