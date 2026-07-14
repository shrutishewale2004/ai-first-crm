import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  fetchInteractions,
  removeInteraction,
  updateInteractionInStore,
} from "../features/interactionSlice";


function InteractionHistory() {
  const dispatch = useDispatch();

  const {
    interactions,
    loading,
    error,
  } = useSelector((state) => state.interactions);


  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editSentiment, setEditSentiment] = useState("");

  const [editFollowUp, setEditFollowUp] = useState("");


  useEffect(() => {
    dispatch(fetchInteractions());
  }, [dispatch]);


  const deleteInteraction = async (interactionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interaction?"
    );

    if (!confirmDelete) return;


    try {
      await axios.delete(
        `http://127.0.0.1:8000/interactions/${interactionId}`
      );


      dispatch(removeInteraction(interactionId));


      setMessage(
        "Interaction deleted successfully."
      );

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      setMessage(
        "Failed to delete interaction."
      );
    }
  };


  const startEditing = (interaction) => {

    setEditingId(interaction.id);

    setEditSentiment(
      interaction.sentiment || "Neutral"
    );

    setEditFollowUp(
      interaction.follow_up_actions || ""
    );

    setMessage("");
  };


  const cancelEditing = () => {

    setEditingId(null);

    setEditSentiment("");

    setEditFollowUp("");

    setMessage("");
  };


  const saveInteraction = async (interaction) => {

    try {

      const updatedData = {

        hcp_name:
          interaction.hcp_name,

        interaction_type:
          interaction.interaction_type,

        attendees:
          interaction.attendees || "",

        topics_discussed:
          interaction.topics_discussed || "",

        materials_shared:
          interaction.materials_shared || "",

        samples_distributed:
          interaction.samples_distributed || "",

        sentiment:
          editSentiment,

        outcomes:
          interaction.outcomes || "",

        follow_up_actions:
          editFollowUp,
      };


      const response = await axios.put(

        `http://127.0.0.1:8000/interactions/${interaction.id}`,

        updatedData

      );


      dispatch(
        updateInteractionInStore(
          response.data
        )
      );


      setMessage(
        "Interaction updated successfully."
      );


      setEditingId(null);

      setEditSentiment("");

      setEditFollowUp("");


    } catch (error) {

      console.error(
        "Update error:",
        error
      );


      setMessage(
        "Failed to update interaction."
      );
    }
  };


  if (loading) {

    return (
      <div className="history-card">

        <p>
          Loading interactions...
        </p>

      </div>
    );
  }


  if (error) {

    return (
      <div className="history-card">

        <p>
          {error}
        </p>

      </div>
    );
  }


  return (

    <div className="history-card">


      <div className="section-heading">

        <p>
          CRM RECORDS
        </p>

        <h2>
          Interaction History
        </h2>

      </div>


      {message && (

        <p className="history-message">

          {message}

        </p>

      )}


      {interactions.length === 0 ? (

        <p>
          No interactions found.
        </p>

      ) : (

        <div className="interaction-list">


          {interactions.map((interaction) => (


            <div
              className="interaction-item"
              key={interaction.id}
            >


              <div className="interaction-header">


                <h3>
                  {interaction.hcp_name}
                </h3>


                <div className="interaction-actions">


                  <button
                    className="edit-button"
                    onClick={() =>
                      startEditing(interaction)
                    }
                  >

                    Edit

                  </button>


                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteInteraction(
                        interaction.id
                      )
                    }
                  >

                    Delete

                  </button>


                </div>


              </div>


              <p>

                <strong>
                  Type:
                </strong>{" "}

                {interaction.interaction_type}

              </p>


              <p>

                <strong>
                  Topics:
                </strong>{" "}

                {interaction.topics_discussed || "Not provided"}

              </p>


              {editingId === interaction.id ? (


                <div className="edit-section">


                  <label>
                    Sentiment
                  </label>


                  <select
                    value={editSentiment}
                    onChange={(event) =>
                      setEditSentiment(
                        event.target.value
                      )
                    }
                  >

                    <option value="Positive">
                      Positive
                    </option>

                    <option value="Neutral">
                      Neutral
                    </option>

                    <option value="Negative">
                      Negative
                    </option>

                  </select>


                  <label>
                    Follow-up Actions
                  </label>


                  <textarea
                    value={editFollowUp}
                    onChange={(event) =>
                      setEditFollowUp(
                        event.target.value
                      )
                    }
                  />


                  <div className="edit-buttons">


                    <button
                      className="save-button"
                      onClick={() =>
                        saveInteraction(interaction)
                      }
                    >

                      Save

                    </button>


                    <button
                      className="cancel-button"
                      onClick={cancelEditing}
                    >

                      Cancel

                    </button>


                  </div>


                </div>


              ) : (


                <>


                  <p>

                    <strong>
                      Sentiment:
                    </strong>{" "}

                    {interaction.sentiment || "Not provided"}

                  </p>


                  <p>

                    <strong>
                      Outcomes:
                    </strong>{" "}

                    {interaction.outcomes || "Not provided"}

                  </p>


                  <p>

                    <strong>
                      Follow-up:
                    </strong>{" "}

                    {interaction.follow_up_actions || "Not provided"}

                  </p>


                </>


              )}


            </div>


          ))}


        </div>


      )}


    </div>

  );
}


export default InteractionHistory;