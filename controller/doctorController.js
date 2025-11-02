const doctors = require("../model/doctorModel");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
exports.getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await doctors.find();
    res.status(200).json(allDoctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json(err);
  }
};
exports.getADoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctorDetails = await doctors.findById(id);
    res.status(200).json(doctorDetails);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.makepayment = async (req, res) => {
  const { details } = req.body;

  try {
    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: details.name,
          },
          unit_amount: details.fee * 100,
        },
        quantity: 1,
      },
    ];
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "https://mediconnect-frontend-vory.vercel.app/psuccess",
      cancel_url: "https://mediconnect-frontend-vory.vercel.app/pfailure",
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
};
