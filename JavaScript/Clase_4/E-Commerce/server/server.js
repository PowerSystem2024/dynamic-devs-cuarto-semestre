const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { MercadoPagoConfig, Preference } = require("mercadopago");

// =============== Configurar MercadoPago (TEST) ===============
const client = new MercadoPagoConfig({
  accessToken: "ACCESS_TOKEN_DE_PRUEBAS",  // Colocar el access Token de pruebas
});

const preference = new Preference(client);

// ========================= Middlewares =========================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// ================ Servir archivos estáticos ====================
app.use(express.static(path.join(__dirname, "../client")));
app.use("/js", express.static(path.join(__dirname, "../client/js")));
app.use("/media", express.static(path.join(__dirname, "../client/media")));

// ========================= Ruta principal ======================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// =========== Ruta para crear preferencia de pago ===============
app.post("/create_preference", async (req, res) => {
  try {
    const preferenceData = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:8080/success.html",
        failure: "http://localhost:8080/failure.html",
        pending: "http://localhost:8080/pending.html",
      },
    };

    const result = await preference.create({ body: preferenceData });

    // ============== Devolvemos id e init_point ==============
    res.json({
      id: result.id,
      init_point: result.init_point || result.sandbox_init_point,
    });
  } catch (error) {
    console.log(
      "Error creating preference:",
      error?.response?.data || error.message || error
    );
    res.status(500).json({ error: "MP preference error" });
  }
});

// ======================== Feedback de pago =====================
app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

// ============================ Server ===========================
app.listen(8080, () => {
  console.log("The server is now running on Port 8080");
  console.log("Frontend disponible en: http://localhost:8080");
});
