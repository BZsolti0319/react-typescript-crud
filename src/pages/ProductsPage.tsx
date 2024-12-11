import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { Product } from "../types/Product";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>("/termekek");
        setProducts(response.data);
      } catch (err: any) {
        alert(err.message || "Hiba történt a termékek lekérése közben.");
      }
    };

    fetchProducts();
  }, []);

  const handleViewClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <h1>Termékek</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Kategória</th>
            <th>Ár (Ft)</th>
            <th>Készlet (db)</th>
            <th>Leírás</th>
            <th>Kép URL</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nev}</td>
              <td>{product.kategoria.nev}</td>
              <td>{product.ar}</td>
              <td>{product.keszlet}</td>
              <td>{product.leiras}</td>
              <td>{product.kepUrl}</td>
              <td>
                <button onClick={() => handleViewClick(product.id)}>
                  Megtekintés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
