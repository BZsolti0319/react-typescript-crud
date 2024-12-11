import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Product } from "../types/Product";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get<Product>(`/termekek/${id}`);
        setProduct(response.data);
        setNewStock(response.data.keszlet);
      } catch (err: any) {
        alert(err.message || "Hiba történt a termék lekérése közben.");
      }
    };

    fetchProduct();
  }, [id]);

  const updateStock = async () => {
    if (newStock < 0) {
      alert("Érvényes készlet értéket adj meg!");
      return;
    }

    try {
      await apiClient.put(`/termekek/${id}`, { keszlet: newStock });
      if (product) {
        const updatedProduct: Product = {
          ...product,
          keszlet: newStock,
        };
        setProduct(updatedProduct);
      }
      alert("Készlet sikeresen frissítve!");
    } catch (err: any) {
      alert(err.message || "Hiba történt a készlet frissítése közben.");
    }
  };

  const deleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Biztosan törölni szeretnéd ezt a terméket?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/termekek/${id}`);
      alert("Termék sikeresen törölve!");
      navigate("/termekek"); // Navigálás a terméklista oldalra
    } catch (err: any) {
      alert(err.message || "Hiba történt a termék törlése közben.");
    }
  };

  return (
    <div>
      <h1>Termék részletei</h1>
      {product ? (
        <div>
          <p>
            <strong>Név:</strong> {product.nev}
          </p>
          <p>
            <strong>Kategória:</strong> {product.kategoria.nev}
          </p>
          <p>
            <strong>Ár:</strong> {product.ar} Ft
          </p>
          <p>
            <strong>Készlet:</strong> {product.keszlet} db
          </p>
          <input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(Number(e.target.value))}
            placeholder="Új készlet"
          />
          <button onClick={updateStock}>Készlet frissítése</button>
          <p>
            <strong>Leírás:</strong> {product.leiras}
          </p>
          <button onClick={deleteProduct} style={{ color: "red" }}>
            Termék törlése
          </button>
        </div>
      ) : (
        <p>Nincs ilyen termék.</p>
      )}
    </div>
  );
};

export default ProductPage;
