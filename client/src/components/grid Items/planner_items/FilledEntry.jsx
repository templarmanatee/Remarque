const EntryModal = () => {
  /* You can open the modal using document.getElementById('ID').showModal() method */
  return (
    <div className="my-2">
      {/* The button to open modal */}
      <label
        htmlFor="planner_entry"
        className="btn bg-transparent border-2 btn-sm rounded-full"
      >
        <h1 className="text-s">Filled Entry</h1>
      </label>
      <input type="checkbox" id="planner_entry" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white items-center">
          <h3 className="font-bold text-xl">Journal Entry</h3>
          <input
            type="text"
            placeholder="Description: "
            className="input w-full max-w-xs"
          ></input>
          <p className="font-bold text-m">Time:</p>
          <div className="text-primary"></div>
          <div className="modal-action">
            <label htmlFor="planner_entry" className="btn btn-sm btn-primary">
              Submit Entry
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryModal;
