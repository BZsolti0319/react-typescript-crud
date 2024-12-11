import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Product } from "../types/Product";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get<Product>(`/termekek/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        console.error(err.message || "Hiba történt a termék lekérése közben.");
      }
    };

    fetchProduct();
  }, []);

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
          <p>
            <strong>Leírás:</strong> {product.leiras}
          </p>
        </div>
      ) : (
        <p>Nincs ilyen termék.</p>
      )}
    </div>
  );
};

export default ProductPage;
