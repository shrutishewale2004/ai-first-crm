import { useState } from "react";
import axios from "axios";

const initialForm = {
  hcp_name: "",
  interaction_type: "Meeting",
  attendees: "",
  topics_discussed: "",
  materials_shared: "",
  samples_distributed: "",
  sentiment: "Neutral",
  outcomes: "",
  follow_up_actions: "",
};

function InteractionForm() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await axios.post("http://127.0.0.1:8000/interactions/", form);

      setMessage("Interaction logged successfully.");
      setForm(initialForm);
    } catch (error) {
      setMessage("Unable to log interaction.");
    }
  };

  return (
    <section className="card form-card">
      <div className="card-heading">
        <div>
          <span className="section-label">Interaction Details</span>
          <h2>Structured Log</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            HCP Name
            <input
              name="hcp_name"
              value={form.hcp_name}
              onChange={handleChange}
              placeholder="Enter HCP name"
              required
            />
          </label>

          <label>
            Interaction Type
            <select
              name="interaction_type"
              value={form.interaction_type}
              onChange={handleChange}
            >
              <option>Meeting</option>
              <option>Call</option>
              <option>Email</option>
              <option>Conference</option>
            </select>
          </label>
        </div>

        <label>
          Attendees
          <input
            name="attendees"
            value={form.attendees}
            onChange={handleChange}
            placeholder="Enter attendees"
          />
        </label>

        <label>
          Topics Discussed
          <textarea
            name="topics_discussed"
            value={form.topics_discussed}
            onChange={handleChange}
            placeholder="Enter key discussion points"
          />
        </label>

        <div className="form-grid">
          <label>
            Materials Shared
            <input
              name="materials_shared"
              value={form.materials_shared}
              onChange={handleChange}
              placeholder="Brochure, clinical paper..."
            />
          </label>

          <label>
            Samples Distributed
            <input
              name="samples_distributed"
              value={form.samples_distributed}
              onChange={handleChange}
              placeholder="Enter sample details"
            />
          </label>
        </div>

        <fieldset>
          <legend>HCP Sentiment</legend>

          <div className="sentiment-options">
            {["Positive", "Neutral", "Negative"].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="sentiment"
                  value={item}
                  checked={form.sentiment === item}
                  onChange={handleChange}
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          Outcomes
          <textarea
            name="outcomes"
            value={form.outcomes}
            onChange={handleChange}
            placeholder="Enter outcomes or agreements"
          />
        </label>

        <label>
          Follow-up Actions
          <textarea
            name="follow_up_actions"
            value={form.follow_up_actions}
            onChange={handleChange}
            placeholder="Enter next steps"
          />
        </label>

        {message && <p className="status-message">{message}</p>}

        <button className="primary-button" type="submit">
          Log Interaction
        </button>
      </form>
    </section>
  );
}

export default InteractionForm;