import React, { useState } from "react";

export default function ECardForm() {
  const [recipientPhone, setRecipientPhone] = useState("");
  const [selectedECard, setSelectedECard] = useState(null);

  const handleRecipientPhoneChange = (e) => {
    setRecipientPhone(e.target.value);
  };

  const handleECardSelection = (eCard) => {
    setSelectedECard(eCard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedECard) {
      // No e-card selected, handle accordingly
      return;
    }

    // Construct the WhatsApp message with the selected e-card
    const message = `Check out this e-card: ${selectedECard}`;

    // Construct the WhatsApp link
    const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      recipientPhone
    )}&text=${encodeURIComponent(message)}`;

    // Open the WhatsApp link in a new window or tab
    window.open(whatsappLink, "_blank");

    // Reset the form
    setRecipientPhone("");
    setSelectedECard(null);
  };

  const eCardPictures = [
    "https://www.freepik.com/free-vector/watercolor-hand-drawn-wedding-greeting-card_21534713.htm#query=thank%20you%20card&position=2&from_view=search&track=ais",
    "https://www.freepik.com/free-vector/thank-you-placard-concept-illustration_34680457.htm#query=thank%20you%20card&position=10&from_view=search&track=ais",
    "https://www.freepik.com/free-vector/thank-you-lettering_1430602.htm#query=thank%20you%20card&position=18&from_view=search&track=ais",

  ];

  return (
    <div>
      <h1>Send an E-Card</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipientPhone">Phone Number:</label>
          <input
            type="text"
            id="recipientPhone"
            value={recipientPhone}
            onChange={handleRecipientPhoneChange}
          />
        </div>
        <div>
          <p>Select an E-Card Picture:</p>
          {eCardPictures.map((eCard, index) => (
            <img
              key={index}
              src={eCard}
              alt={`E-Card ${index + 1}`}
              onClick={() => handleECardSelection(eCard)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        <button type="submit" disabled={!selectedECard}>
          Send E-Card via WhatsApp
        </button>
      </form>
    </div>
  );
}
