const EntryModal = () => {
  /* You can open the modal using document.getElementById('ID').showModal() method */
  return (
    <div>
      {/* The button to open modal */}
      <label
        htmlFor="planner_entry"
        className="btn bg-transparent border-2 btn-sm rounded-full"
      >
        <h1 className="text-s">New Entry</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path fill="" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
        </svg>
      </label>

      <input type="checkbox" id="planner_entry" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white items-center">
          <h3 className="font-bold text-xl">Journal Entry</h3>
          <input
            type="text"
            placeholder="Description: "
            className="input w-full max-w-xs my-2"
          ></input>
          <input
            type="text"
            placeholder="Time: "
            className="input w-full max-w-xs"
          ></input>
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
