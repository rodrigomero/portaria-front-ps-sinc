/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
"use client";

import { useContext, useState } from "react";
import "../styles/listagem.css";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useRouter } from "next/navigation";
import { EditContext } from "../context/editContext";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

DataTable.use(DT);
const EditModal = ({ entity }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { formData, setFormData, isModalOpen, setIsModalOpen } =
    useContext(EditContext);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = { ...selectedProduct, ...formData };
    updatedProduct.category = selectToValue(updatedProduct.category);

    fetch(`${baseUrl}/${entity}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then(() => {
        router.push(`/${entity}`);
        closeModal();
      })
      .catch((error) => console.error("Erro ao atualizar o produto:", error));
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Produto</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Descrição:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Categoria:</label>
                <select
                  name="category"
                  id="category"
                  value={valueToSelect(formData.category)}
                  onChange={handleChange}
                  required
                >
                  <option value={0}>Instrumento</option>
                  <option value={1}>Acessorio</option>
                  <option value={2}>Amplificador</option>
                </select>
              </div>
              <div className="flex price-stock">
                <div>
                  <label htmlFor="price">Preço:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="stock">Estoque:</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-btns">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-fechar-modal"
                >
                  Fechar
                </button>
                <button type="submit" className="btn-salvar">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;

function valueToSelect(category) {
  if (category === "INSTRUMENTO") return 0;
  if (category === "ACESSORIO") return 1;
  if (category === "AMPLIFICADOR") return 2;
}

function selectToValue(category) {
  if (category === "INSTRUMENTO") return 0;
  if (category === "ACESSORIO") return 1;
  if (category === "AMPLIFICADOR") return 2;
}
