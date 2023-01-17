import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import Item from "./Item";

export default function ItemDetail() {
  const [producto, setProducto] = useState([]);
  let { itemID } = useParams();

  useEffect(() => {
    getItem(itemID);
  }, [itemID]);

  const getItem = (id) => {
    const db = getFirestore();
    const docRef = doc(db, "items", id);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setProducto({ id: doc.id, ...doc.data() });
        }
      })
      .catch((error) => {
        alert("Ocurrió un error al obtener el producto")
        console.log("Error getting document:", error);
      });
  };

  const AddCartProduct = (producto) => {
    let productos = [];
    let cartStorage = localStorage.getItem("cart");
    if (cartStorage === null) {
      productos.push(producto);
      localStorage.setItem("cart", JSON.stringify(productos));
    } else {
      productos = JSON.parse(cartStorage);
      productos.push(producto);
      localStorage.setItem("cart", JSON.stringify(productos));
    }
    alert("Producto agregado al carrito")
  };


  return (
    <div>
      <h1>Detalle del Producto</h1>
      <Item props={producto} />
      <button  onClick={() => AddCartProduct(producto)}> Agregar al carrito </button>
      <Link to={`/`}>Volver</Link>
    </div>
  );
}