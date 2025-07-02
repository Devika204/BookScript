import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const calculatedTotal = cartItems.reduce(
      (acc, item) => acc + Number(item.price),
      0
    );
    setTotal(calculatedTotal);
  }, [cartItems]);

  const handleDelete = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const downloadInvoice = () => {
  const doc = new jsPDF();

  // BookScript logo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(139, 0, 139); // purple
  doc.text("BookScript", 105, 20, { align: "center" });

  // Slogan (below logo)
  doc.setFont("times", "normal");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text("Buy the Book. Own the Story.", 105, 23, { align: "center" });

  // Invoice header details
  const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Invoice #: ${invoiceNumber}`, 14, 50);
  doc.text(`Email: user@example.com`, 14, 56);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 62);

  // Table content
  const tableData = cartItems.map((item, i) => [
    i + 1,
    item.title,
    item.author,
    `₹${item.price}`,
  ]);

  autoTable(doc, {
    startY: 75,
    head: [["Sl No", "Title", "Author", "Price"]],
    body: tableData,
    headStyles: {
      fillColor: [139, 0, 139],
      textColor: [255, 255, 255],
      fontSize: 12,
    },
    styles: {
      fontSize: 11,
      halign: "center",
      valign: "middle",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    theme: "grid",
  });

  // Total amount
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 0);
  doc.text(`Total Amount: ₹${total}`, 127, doc.lastAutoTable.finalY + 10);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    "Thank you for choosing BookScript.",
    105,
    doc.lastAutoTable.finalY + 25,
    { align: "center" }
  );

  const dateStr = new Date().toLocaleDateString().replace(/\//g, "-");
  doc.save(`BookScript_Invoice_${dateStr}.pdf`);
};

  return (
    <div className="container my-5">
      <div className="mb-4">
        <Link to="/home" className="btn btn-outline-dark shadow-sm text-light">
          ⬅️ Back to Home
        </Link>
      </div>

      <h2 className="mb-4 fw-bold text-center text-light border-bottom pb-2" style={{fontFamily:'Italianno, cursive', fontWeight:'400', fontSize:'80px'}}>
        Your Cart Summary
      </h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          Your cart is empty. Start adding books!
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle shadow-sm">
              <thead className="table-dark text-center">
                <tr>
                  <th>Sl No</th>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        width="60"
                        height="80"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td className="text-success fw-semibold">₹{item.price}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(index)}
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 p-3 rounded shadow bg-white border border-2 border-primary">
            <h5 className="mb-0 fw-bold text-dark">
              Total Amount: <span className="text-success">₹{total}</span>
            </h5>
            <button className="btn btn-success fw-bold" onClick={downloadInvoice}>
  📥 Download Invoice
</button>
          </div>

          <div className="card mt-5 border-0 shadow-lg">
  <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
    <h5 className="mb-0">🧾 Invoice Preview</h5>
    <span className="badge bg-light text-dark">
      {new Date().toLocaleDateString()}
    </span>
  </div>
  <div className="card-body bg-light" style={{ fontFamily: "monospace" }}>
    <div className="mb-4">
      <h4 className="text-center text-decoration-underline">INVOICE</h4>
    </div>

    {cartItems.map((item, i) => (
      <div
        key={i}
        className="d-flex justify-content-between border-bottom py-2 px-2"
      >
        <span>
          #{i + 1}. {item.title} by {item.author}
        </span>
        <span className="text-success fw-bold">₹{item.price}</span>
      </div>
    ))}

    <div className="d-flex justify-content-between mt-4 px-2 border-top pt-3">
      <strong>Total Amount</strong>
      <strong className="text-success">₹{total}</strong>
    </div>

    <div className="text-end mt-3 px-2">
      <em>Generated on: {new Date().toLocaleString()}</em>
    </div>
  </div>
</div>
        </>
      )}
    </div>
  );
}

export default Cart;
